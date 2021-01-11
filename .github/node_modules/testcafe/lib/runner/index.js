"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const debug_1 = __importDefault(require("debug"));
const promisify_event_1 = __importDefault(require("promisify-event"));
const map_reverse_1 = __importDefault(require("map-reverse"));
const events_1 = require("events");
const lodash_1 = require("lodash");
const bootstrapper_1 = __importDefault(require("./bootstrapper"));
const reporter_1 = __importDefault(require("../reporter"));
const task_1 = __importDefault(require("./task"));
const debug_logger_1 = __importDefault(require("../notifications/debug-logger"));
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const type_assertions_1 = require("../errors/runtime/type-assertions");
const utils_1 = require("../errors/test-run/utils");
const detect_ffmpeg_1 = __importDefault(require("../utils/detect-ffmpeg"));
const check_file_path_1 = __importDefault(require("../utils/check-file-path"));
const handle_errors_1 = require("../utils/handle-errors");
const option_names_1 = __importDefault(require("../configuration/option-names"));
const flag_list_1 = __importDefault(require("../utils/flag-list"));
const prepare_reporters_1 = __importDefault(require("../utils/prepare-reporters"));
const load_1 = __importDefault(require("../custom-client-scripts/load"));
const utils_2 = require("../custom-client-scripts/utils");
const string_1 = require("../utils/string");
const reporter_stream_controller_1 = __importDefault(require("./reporter-stream-controller"));
const DEBUG_LOGGER = debug_1.default('testcafe:runner');
class Runner extends events_1.EventEmitter {
    constructor(proxy, browserConnectionGateway, configuration, compilerService) {
        super();
        this.proxy = proxy;
        this.bootstrapper = this._createBootstrapper(browserConnectionGateway, compilerService);
        this.pendingTaskPromises = [];
        this.configuration = configuration;
        this.isCli = false;
        this.apiMethodWasCalled = new flag_list_1.default([
            option_names_1.default.src,
            option_names_1.default.browsers,
            option_names_1.default.reporter,
            option_names_1.default.clientScripts
        ]);
    }
    _createBootstrapper(browserConnectionGateway, compilerService) {
        return new bootstrapper_1.default(browserConnectionGateway, compilerService);
    }
    _disposeBrowserSet(browserSet) {
        return browserSet.dispose().catch(e => DEBUG_LOGGER(e));
    }
    _disposeReporters(reporters) {
        return Promise.all(reporters.map(reporter => reporter.dispose().catch(e => DEBUG_LOGGER(e))));
    }
    _disposeTestedApp(testedApp) {
        return testedApp ? testedApp.kill().catch(e => DEBUG_LOGGER(e)) : Promise.resolve();
    }
    async _disposeTaskAndRelatedAssets(task, browserSet, reporters, testedApp) {
        task.abort();
        task.unRegisterClientScriptRouting();
        task.clearListeners();
        await this._disposeAssets(browserSet, reporters, testedApp);
    }
    _disposeAssets(browserSet, reporters, testedApp) {
        return Promise.all([
            this._disposeBrowserSet(browserSet),
            this._disposeReporters(reporters),
            this._disposeTestedApp(testedApp)
        ]);
    }
    _prepareArrayParameter(array) {
        array = lodash_1.flattenDeep(array);
        if (this.isCli)
            return array.length === 0 ? void 0 : array;
        return array;
    }
    _createCancelablePromise(taskPromise) {
        const promise = taskPromise.then(({ completionPromise }) => completionPromise);
        const removeFromPending = () => lodash_1.pull(this.pendingTaskPromises, promise);
        promise
            .then(removeFromPending)
            .catch(removeFromPending);
        promise.cancel = () => taskPromise
            .then(({ cancelTask }) => cancelTask())
            .then(removeFromPending);
        this.pendingTaskPromises.push(promise);
        return promise;
    }
    // Run task
    _getFailedTestCount(task, reporter) {
        let failedTestCount = reporter.testCount - reporter.passed;
        if (task.opts.stopOnFirstFail && !!failedTestCount)
            failedTestCount = 1;
        return failedTestCount;
    }
    async _getTaskResult(task, browserSet, reporters, testedApp) {
        task.on('browser-job-done', job => browserSet.releaseConnection(job.browserConnection));
        const browserSetErrorPromise = promisify_event_1.default(browserSet, 'error');
        const streamController = new reporter_stream_controller_1.default(task, reporters);
        const taskDonePromise = task.once('done')
            .then(() => browserSetErrorPromise.cancel())
            .then(() => {
            return Promise.all(reporters.map(reporter => reporter.pendingTaskDonePromise));
        });
        const promises = [
            taskDonePromise,
            browserSetErrorPromise
        ];
        if (testedApp)
            promises.push(testedApp.errorPromise);
        try {
            await Promise.race(promises);
        }
        catch (err) {
            await this._disposeTaskAndRelatedAssets(task, browserSet, reporters, testedApp);
            throw err;
        }
        await this._disposeAssets(browserSet, reporters, testedApp);
        if (streamController.multipleStreamError)
            throw streamController.multipleStreamError;
        return this._getFailedTestCount(task, reporters[0]);
    }
    _createTask(tests, browserConnectionGroups, proxy, opts) {
        return new task_1.default(tests, browserConnectionGroups, proxy, opts);
    }
    _runTask(reporterPlugins, browserSet, tests, testedApp) {
        const task = this._createTask(tests, browserSet.browserConnectionGroups, this.proxy, this.configuration.getOptions());
        const reporters = reporterPlugins.map(reporter => new reporter_1.default(reporter.plugin, task, reporter.outStream, reporter.name));
        const completionPromise = this._getTaskResult(task, browserSet, reporters, testedApp);
        let completed = false;
        task.on('start', handle_errors_1.startHandlingTestErrors);
        if (!this.configuration.getOption(option_names_1.default.skipUncaughtErrors)) {
            task.on('test-run-start', handle_errors_1.addRunningTest);
            task.on('test-run-done', handle_errors_1.removeRunningTest);
        }
        task.on('done', handle_errors_1.stopHandlingTestErrors);
        const onTaskCompleted = () => {
            task.unRegisterClientScriptRouting();
            completed = true;
        };
        completionPromise
            .then(onTaskCompleted)
            .catch(onTaskCompleted);
        const cancelTask = async () => {
            if (!completed)
                await this._disposeTaskAndRelatedAssets(task, browserSet, reporters, testedApp);
        };
        return { completionPromise, cancelTask };
    }
    _registerAssets(assets) {
        assets.forEach(asset => this.proxy.GET(asset.path, asset.info));
    }
    _validateDebugLogger() {
        const debugLogger = this.configuration.getOption(option_names_1.default.debugLogger);
        const debugLoggerDefinedCorrectly = debugLogger === null || !!debugLogger &&
            ['showBreakpoint', 'hideBreakpoint'].every(method => method in debugLogger && lodash_1.isFunction(debugLogger[method]));
        if (!debugLoggerDefinedCorrectly) {
            this.configuration.mergeOptions({
                [option_names_1.default.debugLogger]: debug_logger_1.default
            });
        }
    }
    _validateSpeedOption() {
        const speed = this.configuration.getOption(option_names_1.default.speed);
        if (speed === void 0)
            return;
        if (typeof speed !== 'number' || isNaN(speed) || speed < 0.01 || speed > 1)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.invalidSpeedValue);
    }
    _validateConcurrencyOption() {
        const concurrency = this.configuration.getOption(option_names_1.default.concurrency);
        if (concurrency === void 0)
            return;
        if (typeof concurrency !== 'number' || isNaN(concurrency) || concurrency < 1)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.invalidConcurrencyFactor);
    }
    _validateProxyBypassOption() {
        let proxyBypass = this.configuration.getOption(option_names_1.default.proxyBypass);
        if (proxyBypass === void 0)
            return;
        type_assertions_1.assertType([type_assertions_1.is.string, type_assertions_1.is.array], null, '"proxyBypass" argument', proxyBypass);
        if (typeof proxyBypass === 'string')
            proxyBypass = [proxyBypass];
        proxyBypass = proxyBypass.reduce((arr, rules) => {
            type_assertions_1.assertType(type_assertions_1.is.string, null, '"proxyBypass" argument', rules);
            return arr.concat(rules.split(','));
        }, []);
        this.configuration.mergeOptions({ proxyBypass });
    }
    _getScreenshotOptions() {
        let { path, pathPattern } = this.configuration.getOption(option_names_1.default.screenshots) || {};
        if (!path)
            path = this.configuration.getOption(option_names_1.default.screenshotPath);
        if (!pathPattern)
            pathPattern = this.configuration.getOption(option_names_1.default.screenshotPathPattern);
        return { path, pathPattern };
    }
    _validateScreenshotOptions() {
        const { path, pathPattern } = this._getScreenshotOptions();
        const disableScreenshots = this.configuration.getOption(option_names_1.default.disableScreenshots) || !path;
        this.configuration.mergeOptions({ [option_names_1.default.disableScreenshots]: disableScreenshots });
        if (disableScreenshots)
            return;
        if (path) {
            this._validateScreenshotPath(path, 'screenshots base directory path');
            this.configuration.mergeOptions({ [option_names_1.default.screenshots]: { path: path_1.resolve(path) } });
        }
        if (pathPattern) {
            this._validateScreenshotPath(pathPattern, 'screenshots path pattern');
            this.configuration.mergeOptions({ [option_names_1.default.screenshots]: { pathPattern } });
        }
    }
    async _validateVideoOptions() {
        const videoPath = this.configuration.getOption(option_names_1.default.videoPath);
        const videoEncodingOptions = this.configuration.getOption(option_names_1.default.videoEncodingOptions);
        let videoOptions = this.configuration.getOption(option_names_1.default.videoOptions);
        if (!videoPath) {
            if (videoOptions || videoEncodingOptions)
                throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotSetVideoOptionsWithoutBaseVideoPathSpecified);
            return;
        }
        this.configuration.mergeOptions({ [option_names_1.default.videoPath]: path_1.resolve(videoPath) });
        if (!videoOptions) {
            videoOptions = {};
            this.configuration.mergeOptions({ [option_names_1.default.videoOptions]: videoOptions });
        }
        if (videoOptions.ffmpegPath)
            videoOptions.ffmpegPath = path_1.resolve(videoOptions.ffmpegPath);
        else
            videoOptions.ffmpegPath = await detect_ffmpeg_1.default();
        if (!videoOptions.ffmpegPath)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindFFMPEG);
    }
    async _validateRunOptions() {
        this._validateDebugLogger();
        this._validateScreenshotOptions();
        await this._validateVideoOptions();
        this._validateSpeedOption();
        this._validateConcurrencyOption();
        this._validateProxyBypassOption();
    }
    _validateTestForAllowMultipleWindowsOption(tests) {
        if (tests.some(test => test.isLegacy))
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotUseAllowMultipleWindowsOptionForLegacyTests);
    }
    _validateBrowsersForAllowMultipleWindowsOption(browserSet) {
        const browserConnections = browserSet.browserConnectionGroups.map(browserConnectionGroup => browserConnectionGroup[0]);
        const unsupportedBrowserConnections = browserConnections.filter(browserConnection => !browserConnection.activeWindowId);
        if (!unsupportedBrowserConnections.length)
            return;
        const unsupportedBrowserAliases = unsupportedBrowserConnections.map(browserConnection => browserConnection.browserInfo.alias);
        const browserAliases = string_1.getConcatenatedValuesString(unsupportedBrowserAliases);
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotUseAllowMultipleWindowsOptionForSomeBrowsers, browserAliases);
    }
    _validateAllowMultipleWindowsOption(tests, browserSet) {
        const allowMultipleWindows = this.configuration.getOption(option_names_1.default.allowMultipleWindows);
        if (!allowMultipleWindows)
            return;
        this._validateTestForAllowMultipleWindowsOption(tests);
        this._validateBrowsersForAllowMultipleWindowsOption(browserSet);
    }
    _createRunnableConfiguration() {
        return this.bootstrapper
            .createRunnableConfiguration()
            .then(runnableConfiguration => {
            this.emit('done-bootstrapping');
            return runnableConfiguration;
        });
    }
    _validateScreenshotPath(screenshotPath, pathType) {
        const forbiddenCharsList = check_file_path_1.default(screenshotPath);
        if (forbiddenCharsList.length)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.forbiddenCharatersInScreenshotPath, screenshotPath, pathType, utils_1.renderForbiddenCharsList(forbiddenCharsList));
    }
    _setBootstrapperOptions() {
        this.configuration.prepare();
        this.configuration.notifyAboutOverriddenOptions();
        this.bootstrapper.sources = this.configuration.getOption(option_names_1.default.src) || this.bootstrapper.sources;
        this.bootstrapper.browsers = this.configuration.getOption(option_names_1.default.browsers) || this.bootstrapper.browsers;
        this.bootstrapper.concurrency = this.configuration.getOption(option_names_1.default.concurrency);
        this.bootstrapper.appCommand = this.configuration.getOption(option_names_1.default.appCommand) || this.bootstrapper.appCommand;
        this.bootstrapper.appInitDelay = this.configuration.getOption(option_names_1.default.appInitDelay);
        this.bootstrapper.filter = this.configuration.getOption(option_names_1.default.filter) || this.bootstrapper.filter;
        this.bootstrapper.reporters = this.configuration.getOption(option_names_1.default.reporter) || this.bootstrapper.reporters;
        this.bootstrapper.tsConfigPath = this.configuration.getOption(option_names_1.default.tsConfigPath);
        this.bootstrapper.clientScripts = this.configuration.getOption(option_names_1.default.clientScripts) || this.bootstrapper.clientScripts;
        this.bootstrapper.allowMultipleWindows = this.configuration.getOption(option_names_1.default.allowMultipleWindows);
    }
    // API
    embeddingOptions(opts) {
        const { assets, TestRunCtor } = opts;
        this._registerAssets(assets);
        this.configuration.mergeOptions({ TestRunCtor });
        return this;
    }
    src(...sources) {
        if (this.apiMethodWasCalled.src)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.src);
        sources = this._prepareArrayParameter(sources);
        this.configuration.mergeOptions({ [option_names_1.default.src]: sources });
        this.apiMethodWasCalled.src = true;
        return this;
    }
    browsers(...browsers) {
        if (this.apiMethodWasCalled.browsers)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.browsers);
        browsers = this._prepareArrayParameter(browsers);
        this.configuration.mergeOptions({ browsers });
        this.apiMethodWasCalled.browsers = true;
        return this;
    }
    concurrency(concurrency) {
        this.configuration.mergeOptions({ concurrency });
        return this;
    }
    reporter(name, output) {
        if (this.apiMethodWasCalled.reporter)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.reporter);
        let reporters = prepare_reporters_1.default(name, output);
        reporters = this._prepareArrayParameter(reporters);
        this.configuration.mergeOptions({ [option_names_1.default.reporter]: reporters });
        this.apiMethodWasCalled.reporter = true;
        return this;
    }
    filter(filter) {
        this.configuration.mergeOptions({ filter });
        return this;
    }
    useProxy(proxy, proxyBypass) {
        this.configuration.mergeOptions({ proxy, proxyBypass });
        return this;
    }
    screenshots(...options) {
        let fullPage;
        let [path, takeOnFails, pathPattern] = options;
        if (options.length === 1 && options[0] && typeof options[0] === 'object')
            ({ path, takeOnFails, pathPattern, fullPage } = options[0]);
        this.configuration.mergeOptions({ screenshots: { path, takeOnFails, pathPattern, fullPage } });
        return this;
    }
    video(path, options, encodingOptions) {
        this.configuration.mergeOptions({
            [option_names_1.default.videoPath]: path,
            [option_names_1.default.videoOptions]: options,
            [option_names_1.default.videoEncodingOptions]: encodingOptions
        });
        return this;
    }
    startApp(command, initDelay) {
        this.configuration.mergeOptions({
            [option_names_1.default.appCommand]: command,
            [option_names_1.default.appInitDelay]: initDelay
        });
        return this;
    }
    tsConfigPath(path) {
        this.configuration.mergeOptions({
            [option_names_1.default.tsConfigPath]: path
        });
        return this;
    }
    clientScripts(...scripts) {
        if (this.apiMethodWasCalled.clientScripts)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.multipleAPIMethodCallForbidden, option_names_1.default.clientScripts);
        scripts = this._prepareArrayParameter(scripts);
        this.configuration.mergeOptions({ [option_names_1.default.clientScripts]: scripts });
        this.apiMethodWasCalled.clientScripts = true;
        return this;
    }
    async _prepareClientScripts(tests, clientScripts) {
        return Promise.all(tests.map(async (test) => {
            if (test.isLegacy)
                return;
            let loadedTestClientScripts = await load_1.default(test.clientScripts, path_1.dirname(test.testFile.filename));
            loadedTestClientScripts = clientScripts.concat(loadedTestClientScripts);
            test.clientScripts = utils_2.setUniqueUrls(loadedTestClientScripts);
        }));
    }
    run(options = {}) {
        this.apiMethodWasCalled.reset();
        this.configuration.mergeOptions(options);
        this._setBootstrapperOptions();
        const runTaskPromise = Promise.resolve()
            .then(() => this._validateRunOptions())
            .then(() => this._createRunnableConfiguration())
            .then(async ({ reporterPlugins, browserSet, tests, testedApp, commonClientScripts }) => {
            await this._prepareClientScripts(tests, commonClientScripts);
            this._validateAllowMultipleWindowsOption(tests, browserSet);
            return this._runTask(reporterPlugins, browserSet, tests, testedApp);
        });
        return this._createCancelablePromise(runTaskPromise);
    }
    async stop() {
        // NOTE: When taskPromise is cancelled, it is removed from
        // the pendingTaskPromises array, which leads to shifting indexes
        // towards the beginning. So, we must copy the array in order to iterate it,
        // or we can perform iteration from the end to the beginning.
        const cancellationPromises = map_reverse_1.default(this.pendingTaskPromises, taskPromise => taskPromise.cancel());
        await Promise.all(cancellationPromises);
    }
}
exports.default = Runner;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcnVubmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0JBQXVEO0FBQ3ZELGtEQUEwQjtBQUMxQixzRUFBNkM7QUFDN0MsOERBQXFDO0FBQ3JDLG1DQUFzQztBQUN0QyxtQ0FBNEU7QUFDNUUsa0VBQTBDO0FBQzFDLDJEQUFtQztBQUNuQyxrREFBMEI7QUFDMUIsaUZBQStEO0FBQy9ELCtDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsdUVBQW1FO0FBQ25FLG9EQUFvRTtBQUNwRSwyRUFBa0Q7QUFDbEQsK0VBQXFEO0FBQ3JELDBEQUE0SDtBQUM1SCxpRkFBeUQ7QUFDekQsbUVBQTBDO0FBQzFDLG1GQUEwRDtBQUMxRCx5RUFBOEQ7QUFDOUQsMERBQStEO0FBQy9ELDRDQUE4RDtBQUM5RCw4RkFBb0U7QUFFcEUsTUFBTSxZQUFZLEdBQUcsZUFBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFOUMsTUFBcUIsTUFBTyxTQUFRLHFCQUFZO0lBQzVDLFlBQWEsS0FBSyxFQUFFLHdCQUF3QixFQUFFLGFBQWEsRUFBRSxlQUFlO1FBQ3hFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLEtBQUssR0FBaUIsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQVUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBUyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBaUIsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLG1CQUFRLENBQUM7WUFDbkMsc0JBQVksQ0FBQyxHQUFHO1lBQ2hCLHNCQUFZLENBQUMsUUFBUTtZQUNyQixzQkFBWSxDQUFDLFFB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YXRoLCBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHByb21pc2lmeUV2ZW50IGZyb20gJ3Byb21pc2lmeS1ldmVudCc7XG5pbXBvcnQgbWFwUmV2ZXJzZSBmcm9tICdtYXAtcmV2ZXJzZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgZmxhdHRlbkRlZXAgYXMgZmxhdHRlbiwgcHVsbCBhcyByZW1vdmUsIGlzRnVuY3Rpb24gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEJvb3RzdHJhcHBlciBmcm9tICcuL2Jvb3RzdHJhcHBlcic7XG5pbXBvcnQgUmVwb3J0ZXIgZnJvbSAnLi4vcmVwb3J0ZXInO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcbmltcG9ydCBkZWZhdWx0RGVidWdMb2dnZXIgZnJvbSAnLi4vbm90aWZpY2F0aW9ucy9kZWJ1Zy1sb2dnZXInO1xuaW1wb3J0IHsgR2VuZXJhbEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL3J1bnRpbWUnO1xuaW1wb3J0IHsgUlVOVElNRV9FUlJPUlMgfSBmcm9tICcuLi9lcnJvcnMvdHlwZXMnO1xuaW1wb3J0IHsgYXNzZXJ0VHlwZSwgaXMgfSBmcm9tICcuLi9lcnJvcnMvcnVudGltZS90eXBlLWFzc2VydGlvbnMnO1xuaW1wb3J0IHsgcmVuZGVyRm9yYmlkZGVuQ2hhcnNMaXN0IH0gZnJvbSAnLi4vZXJyb3JzL3Rlc3QtcnVuL3V0aWxzJztcbmltcG9ydCBkZXRlY3RGRk1QRUcgZnJvbSAnLi4vdXRpbHMvZGV0ZWN0LWZmbXBlZyc7XG5pbXBvcnQgY2hlY2tGaWxlUGF0aCBmcm9tICcuLi91dGlscy9jaGVjay1maWxlLXBhdGgnO1xuaW1wb3J0IHsgYWRkUnVubmluZ1Rlc3QsIHJlbW92ZVJ1bm5pbmdUZXN0LCBzdGFydEhhbmRsaW5nVGVzdEVycm9ycywgc3RvcEhhbmRsaW5nVGVzdEVycm9ycyB9IGZyb20gJy4uL3V0aWxzL2hhbmRsZS1lcnJvcnMnO1xuaW1wb3J0IE9QVElPTl9OQU1FUyBmcm9tICcuLi9jb25maWd1cmF0aW9uL29wdGlvbi1uYW1lcyc7XG5pbXBvcnQgRmxhZ0xpc3QgZnJvbSAnLi4vdXRpbHMvZmxhZy1saXN0JztcbmltcG9ydCBwcmVwYXJlUmVwb3J0ZXJzIGZyb20gJy4uL3V0aWxzL3ByZXBhcmUtcmVwb3J0ZXJzJztcbmltcG9ydCBsb2FkQ2xpZW50U2NyaXB0cyBmcm9tICcuLi9jdXN0b20tY2xpZW50LXNjcmlwdHMvbG9hZCc7XG5pbXBvcnQgeyBzZXRVbmlxdWVVcmxzIH0gZnJvbSAnLi4vY3VzdG9tLWNsaWVudC1zY3JpcHRzL3V0aWxzJztcbmltcG9ydCB7IGdldENvbmNhdGVuYXRlZFZhbHVlc1N0cmluZyB9IGZyb20gJy4uL3V0aWxzL3N0cmluZyc7XG5pbXBvcnQgUmVwb3J0ZXJTdHJlYW1Db250cm9sbGVyIGZyb20gJy4vcmVwb3J0ZXItc3RyZWFtLWNvbnRyb2xsZXInO1xuXG5jb25zdCBERUJVR19MT0dHRVIgPSBkZWJ1ZygndGVzdGNhZmU6cnVubmVyJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bm5lciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IgKHByb3h5LCBicm93c2VyQ29ubmVjdGlvbkdhdGV3YXksIGNvbmZpZ3VyYXRpb24sIGNvbXBpbGVyU2VydmljZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucHJveHkgICAgICAgICAgICAgICA9IHByb3h5O1xuICAgICAgICB0aGlzLmJvb3RzdHJhcHBlciAgICAgICAgPSB0aGlzLl9jcmVhdGVCb290c3RyYXBwZXIoYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5LCBjb21waWxlclNlcnZpY2UpO1xuICAgICAgICB0aGlzLnBlbmRpbmdUYXNrUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uICAgICAgID0gY29uZmlndXJhdGlvbjtcbiAgICAgICAgdGhpcy5pc0NsaSAgICAgICAgICAgICAgID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5hcGlNZXRob2RXYXNDYWxsZWQgPSBuZXcgRmxhZ0xpc3QoW1xuICAgICAgICAgICAgT1BUSU9OX05BTUVTLnNyYyxcbiAgICAgICAgICAgIE9QVElPTl9OQU1FUy5icm93c2VycyxcbiAgICAgICAgICAgIE9QVElPTl9OQU1FUy5yZXBvcnRlcixcbiAgICAgICAgICAgIE9QVElPTl9OQU1FUy5jbGllbnRTY3JpcHRzXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIF9jcmVhdGVCb290c3RyYXBwZXIgKGJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheSwgY29tcGlsZXJTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQm9vdHN0cmFwcGVyKGJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheSwgY29tcGlsZXJTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBfZGlzcG9zZUJyb3dzZXJTZXQgKGJyb3dzZXJTZXQpIHtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXJTZXQuZGlzcG9zZSgpLmNhdGNoKGUgPT4gREVCVUdfTE9HR0VSKGUpKTtcbiAgICB9XG5cbiAgICBfZGlzcG9zZVJlcG9ydGVycyAocmVwb3J0ZXJzKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyZXBvcnRlcnMubWFwKHJlcG9ydGVyID0+IHJlcG9ydGVyLmRpc3Bvc2UoKS5jYXRjaChlID0+IERFQlVHX0xPR0dFUihlKSkpKTtcbiAgICB9XG5cbiAgICBfZGlzcG9zZVRlc3RlZEFwcCAodGVzdGVkQXBwKSB7XG4gICAgICAgIHJldHVybiB0ZXN0ZWRBcHAgPyB0ZXN0ZWRBcHAua2lsbCgpLmNhdGNoKGUgPT4gREVCVUdfTE9HR0VSKGUpKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGFzeW5jIF9kaXNwb3NlVGFza0FuZFJlbGF0ZWRBc3NldHMgKHRhc2ssIGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwKSB7XG4gICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgdGFzay51blJlZ2lzdGVyQ2xpZW50U2NyaXB0Um91dGluZygpO1xuICAgICAgICB0YXNrLmNsZWFyTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZGlzcG9zZUFzc2V0cyhicm93c2VyU2V0LCByZXBvcnRlcnMsIHRlc3RlZEFwcCk7XG4gICAgfVxuXG4gICAgX2Rpc3Bvc2VBc3NldHMgKGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlQnJvd3NlclNldChicm93c2VyU2V0KSxcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VSZXBvcnRlcnMocmVwb3J0ZXJzKSxcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VUZXN0ZWRBcHAodGVzdGVkQXBwKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBfcHJlcGFyZUFycmF5UGFyYW1ldGVyIChhcnJheSkge1xuICAgICAgICBhcnJheSA9IGZsYXR0ZW4oYXJyYXkpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzQ2xpKVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA9PT0gMCA/IHZvaWQgMCA6IGFycmF5O1xuXG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2FuY2VsYWJsZVByb21pc2UgKHRhc2tQcm9taXNlKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgICAgICAgICAgID0gdGFza1Byb21pc2UudGhlbigoeyBjb21wbGV0aW9uUHJvbWlzZSB9KSA9PiBjb21wbGV0aW9uUHJvbWlzZSk7XG4gICAgICAgIGNvbnN0IHJlbW92ZUZyb21QZW5kaW5nID0gKCkgPT4gcmVtb3ZlKHRoaXMucGVuZGluZ1Rhc2tQcm9taXNlcywgcHJvbWlzZSk7XG5cbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4ocmVtb3ZlRnJvbVBlbmRpbmcpXG4gICAgICAgICAgICAuY2F0Y2gocmVtb3ZlRnJvbVBlbmRpbmcpO1xuXG4gICAgICAgIHByb21pc2UuY2FuY2VsID0gKCkgPT4gdGFza1Byb21pc2VcbiAgICAgICAgICAgIC50aGVuKCh7IGNhbmNlbFRhc2sgfSkgPT4gY2FuY2VsVGFzaygpKVxuICAgICAgICAgICAgLnRoZW4ocmVtb3ZlRnJvbVBlbmRpbmcpO1xuXG4gICAgICAgIHRoaXMucGVuZGluZ1Rhc2tQcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8vIFJ1biB0YXNrXG4gICAgX2dldEZhaWxlZFRlc3RDb3VudCAodGFzaywgcmVwb3J0ZXIpIHtcbiAgICAgICAgbGV0IGZhaWxlZFRlc3RDb3VudCA9IHJlcG9ydGVyLnRlc3RDb3VudCAtIHJlcG9ydGVyLnBhc3NlZDtcblxuICAgICAgICBpZiAodGFzay5vcHRzLnN0b3BPbkZpcnN0RmFpbCAmJiAhIWZhaWxlZFRlc3RDb3VudClcbiAgICAgICAgICAgIGZhaWxlZFRlc3RDb3VudCA9IDE7XG5cbiAgICAgICAgcmV0dXJuIGZhaWxlZFRlc3RDb3VudDtcbiAgICB9XG5cbiAgICBhc3luYyBfZ2V0VGFza1Jlc3VsdCAodGFzaywgYnJvd3NlclNldCwgcmVwb3J0ZXJzLCB0ZXN0ZWRBcHApIHtcbiAgICAgICAgdGFzay5vbignYnJvd3Nlci1qb2ItZG9uZScsIGpvYiA9PiBicm93c2VyU2V0LnJlbGVhc2VDb25uZWN0aW9uKGpvYi5icm93c2VyQ29ubmVjdGlvbikpO1xuXG4gICAgICAgIGNvbnN0IGJyb3dzZXJTZXRFcnJvclByb21pc2UgPSBwcm9taXNpZnlFdmVudChicm93c2VyU2V0LCAnZXJyb3InKTtcbiAgICAgICAgY29uc3Qgc3RyZWFtQ29udHJvbGxlciAgICAgICA9IG5ldyBSZXBvcnRlclN0cmVhbUNvbnRyb2xsZXIodGFzaywgcmVwb3J0ZXJzKTtcblxuICAgICAgICBjb25zdCB0YXNrRG9uZVByb21pc2UgPSB0YXNrLm9uY2UoJ2RvbmUnKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gYnJvd3NlclNldEVycm9yUHJvbWlzZS5jYW5jZWwoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVwb3J0ZXJzLm1hcChyZXBvcnRlciA9PiByZXBvcnRlci5wZW5kaW5nVGFza0RvbmVQcm9taXNlKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtcbiAgICAgICAgICAgIHRhc2tEb25lUHJvbWlzZSxcbiAgICAgICAgICAgIGJyb3dzZXJTZXRFcnJvclByb21pc2VcbiAgICAgICAgXTtcblxuICAgICAgICBpZiAodGVzdGVkQXBwKVxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0ZXN0ZWRBcHAuZXJyb3JQcm9taXNlKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5yYWNlKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9kaXNwb3NlVGFza0FuZFJlbGF0ZWRBc3NldHModGFzaywgYnJvd3NlclNldCwgcmVwb3J0ZXJzLCB0ZXN0ZWRBcHApO1xuXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLl9kaXNwb3NlQXNzZXRzKGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwKTtcblxuICAgICAgICBpZiAoc3RyZWFtQ29udHJvbGxlci5tdWx0aXBsZVN0cmVhbUVycm9yKVxuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQ29udHJvbGxlci5tdWx0aXBsZVN0cmVhbUVycm9yO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRGYWlsZWRUZXN0Q291bnQodGFzaywgcmVwb3J0ZXJzWzBdKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlVGFzayAodGVzdHMsIGJyb3dzZXJDb25uZWN0aW9uR3JvdXBzLCBwcm94eSwgb3B0cykge1xuICAgICAgICByZXR1cm4gbmV3IFRhc2sodGVzdHMsIGJyb3dzZXJDb25uZWN0aW9uR3JvdXBzLCBwcm94eSwgb3B0cyk7XG4gICAgfVxuXG4gICAgX3J1blRhc2sgKHJlcG9ydGVyUGx1Z2lucywgYnJvd3NlclNldCwgdGVzdHMsIHRlc3RlZEFwcCkge1xuICAgICAgICBjb25zdCB0YXNrICAgICAgICAgICAgICA9IHRoaXMuX2NyZWF0ZVRhc2sodGVzdHMsIGJyb3dzZXJTZXQuYnJvd3NlckNvbm5lY3Rpb25Hcm91cHMsIHRoaXMucHJveHksIHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb25zKCkpO1xuICAgICAgICBjb25zdCByZXBvcnRlcnMgICAgICAgICA9IHJlcG9ydGVyUGx1Z2lucy5tYXAocmVwb3J0ZXIgPT4gbmV3IFJlcG9ydGVyKHJlcG9ydGVyLnBsdWdpbiwgdGFzaywgcmVwb3J0ZXIub3V0U3RyZWFtLCByZXBvcnRlci5uYW1lKSk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRpb25Qcm9taXNlID0gdGhpcy5fZ2V0VGFza1Jlc3VsdCh0YXNrLCBicm93c2VyU2V0LCByZXBvcnRlcnMsIHRlc3RlZEFwcCk7XG4gICAgICAgIGxldCBjb21wbGV0ZWQgICAgICAgICAgID0gZmFsc2U7XG5cbiAgICAgICAgdGFzay5vbignc3RhcnQnLCBzdGFydEhhbmRsaW5nVGVzdEVycm9ycyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5za2lwVW5jYXVnaHRFcnJvcnMpKSB7XG4gICAgICAgICAgICB0YXNrLm9uKCd0ZXN0LXJ1bi1zdGFydCcsIGFkZFJ1bm5pbmdUZXN0KTtcbiAgICAgICAgICAgIHRhc2sub24oJ3Rlc3QtcnVuLWRvbmUnLCByZW1vdmVSdW5uaW5nVGVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrLm9uKCdkb25lJywgc3RvcEhhbmRsaW5nVGVzdEVycm9ycyk7XG5cbiAgICAgICAgY29uc3Qgb25UYXNrQ29tcGxldGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGFzay51blJlZ2lzdGVyQ2xpZW50U2NyaXB0Um91dGluZygpO1xuXG4gICAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBsZXRpb25Qcm9taXNlXG4gICAgICAgICAgICAudGhlbihvblRhc2tDb21wbGV0ZWQpXG4gICAgICAgICAgICAuY2F0Y2gob25UYXNrQ29tcGxldGVkKTtcblxuICAgICAgICBjb25zdCBjYW5jZWxUYXNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb21wbGV0ZWQpXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fZGlzcG9zZVRhc2tBbmRSZWxhdGVkQXNzZXRzKHRhc2ssIGJyb3dzZXJTZXQsIHJlcG9ydGVycywgdGVzdGVkQXBwKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geyBjb21wbGV0aW9uUHJvbWlzZSwgY2FuY2VsVGFzayB9O1xuICAgIH1cblxuICAgIF9yZWdpc3RlckFzc2V0cyAoYXNzZXRzKSB7XG4gICAgICAgIGFzc2V0cy5mb3JFYWNoKGFzc2V0ID0+IHRoaXMucHJveHkuR0VUKGFzc2V0LnBhdGgsIGFzc2V0LmluZm8pKTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVEZWJ1Z0xvZ2dlciAoKSB7XG4gICAgICAgIGNvbnN0IGRlYnVnTG9nZ2VyID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuZGVidWdMb2dnZXIpO1xuXG4gICAgICAgIGNvbnN0IGRlYnVnTG9nZ2VyRGVmaW5lZENvcnJlY3RseSA9IGRlYnVnTG9nZ2VyID09PSBudWxsIHx8ICEhZGVidWdMb2dnZXIgJiZcbiAgICAgICAgICAgIFsnc2hvd0JyZWFrcG9pbnQnLCAnaGlkZUJyZWFrcG9pbnQnXS5ldmVyeShtZXRob2QgPT4gbWV0aG9kIGluIGRlYnVnTG9nZ2VyICYmIGlzRnVuY3Rpb24oZGVidWdMb2dnZXJbbWV0aG9kXSkpO1xuXG4gICAgICAgIGlmICghZGVidWdMb2dnZXJEZWZpbmVkQ29ycmVjdGx5KSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBbT1BUSU9OX05BTUVTLmRlYnVnTG9nZ2VyXTogZGVmYXVsdERlYnVnTG9nZ2VyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF92YWxpZGF0ZVNwZWVkT3B0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3BlZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5zcGVlZCk7XG5cbiAgICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzcGVlZCAhPT0gJ251bWJlcicgfHwgaXNOYU4oc3BlZWQpIHx8IHNwZWVkIDwgMC4wMSB8fCBzcGVlZCA+IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLmludmFsaWRTcGVlZFZhbHVlKTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVDb25jdXJyZW5jeU9wdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuY29uY3VycmVuY3kpO1xuXG4gICAgICAgIGlmIChjb25jdXJyZW5jeSA9PT0gdm9pZCAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uY3VycmVuY3kgIT09ICdudW1iZXInIHx8IGlzTmFOKGNvbmN1cnJlbmN5KSB8fCBjb25jdXJyZW5jeSA8IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLmludmFsaWRDb25jdXJyZW5jeUZhY3Rvcik7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlUHJveHlCeXBhc3NPcHRpb24gKCkge1xuICAgICAgICBsZXQgcHJveHlCeXBhc3MgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5wcm94eUJ5cGFzcyk7XG5cbiAgICAgICAgaWYgKHByb3h5QnlwYXNzID09PSB2b2lkIDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgYXNzZXJ0VHlwZShbIGlzLnN0cmluZywgaXMuYXJyYXkgXSwgbnVsbCwgJ1wicHJveHlCeXBhc3NcIiBhcmd1bWVudCcsIHByb3h5QnlwYXNzKTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3h5QnlwYXNzID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHByb3h5QnlwYXNzID0gW3Byb3h5QnlwYXNzXTtcblxuICAgICAgICBwcm94eUJ5cGFzcyA9IHByb3h5QnlwYXNzLnJlZHVjZSgoYXJyLCBydWxlcykgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0VHlwZShpcy5zdHJpbmcsIG51bGwsICdcInByb3h5QnlwYXNzXCIgYXJndW1lbnQnLCBydWxlcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBhcnIuY29uY2F0KHJ1bGVzLnNwbGl0KCcsJykpO1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IHByb3h5QnlwYXNzIH0pO1xuICAgIH1cblxuICAgIF9nZXRTY3JlZW5zaG90T3B0aW9ucyAoKSB7XG4gICAgICAgIGxldCB7IHBhdGgsIHBhdGhQYXR0ZXJuIH0gPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5zY3JlZW5zaG90cykgfHwge307XG5cbiAgICAgICAgaWYgKCFwYXRoKVxuICAgICAgICAgICAgcGF0aCA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnNjcmVlbnNob3RQYXRoKTtcblxuICAgICAgICBpZiAoIXBhdGhQYXR0ZXJuKVxuICAgICAgICAgICAgcGF0aFBhdHRlcm4gPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5zY3JlZW5zaG90UGF0aFBhdHRlcm4pO1xuXG4gICAgICAgIHJldHVybiB7IHBhdGgsIHBhdGhQYXR0ZXJuIH07XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlU2NyZWVuc2hvdE9wdGlvbnMgKCkge1xuICAgICAgICBjb25zdCB7IHBhdGgsIHBhdGhQYXR0ZXJuIH0gPSB0aGlzLl9nZXRTY3JlZW5zaG90T3B0aW9ucygpO1xuXG4gICAgICAgIGNvbnN0IGRpc2FibGVTY3JlZW5zaG90cyA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmRpc2FibGVTY3JlZW5zaG90cykgfHwgIXBhdGg7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IFtPUFRJT05fTkFNRVMuZGlzYWJsZVNjcmVlbnNob3RzXTogZGlzYWJsZVNjcmVlbnNob3RzIH0pO1xuXG4gICAgICAgIGlmIChkaXNhYmxlU2NyZWVuc2hvdHMpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlU2NyZWVuc2hvdFBhdGgocGF0aCwgJ3NjcmVlbnNob3RzIGJhc2UgZGlyZWN0b3J5IHBhdGgnKTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IFtPUFRJT05fTkFNRVMuc2NyZWVuc2hvdHNdOiB7IHBhdGg6IHJlc29sdmVQYXRoKHBhdGgpIH0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGF0aFBhdHRlcm4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlU2NyZWVuc2hvdFBhdGgocGF0aFBhdHRlcm4sICdzY3JlZW5zaG90cyBwYXRoIHBhdHRlcm4nKTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IFtPUFRJT05fTkFNRVMuc2NyZWVuc2hvdHNdOiB7IHBhdGhQYXR0ZXJuIH0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBfdmFsaWRhdGVWaWRlb09wdGlvbnMgKCkge1xuICAgICAgICBjb25zdCB2aWRlb1BhdGggICAgICAgICAgICA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLnZpZGVvUGF0aCk7XG4gICAgICAgIGNvbnN0IHZpZGVvRW5jb2RpbmdPcHRpb25zID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMudmlkZW9FbmNvZGluZ09wdGlvbnMpO1xuXG4gICAgICAgIGxldCB2aWRlb09wdGlvbnMgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy52aWRlb09wdGlvbnMpO1xuXG4gICAgICAgIGlmICghdmlkZW9QYXRoKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9PcHRpb25zIHx8IHZpZGVvRW5jb2RpbmdPcHRpb25zKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90U2V0VmlkZW9PcHRpb25zV2l0aG91dEJhc2VWaWRlb1BhdGhTcGVjaWZpZWQpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHsgW09QVElPTl9OQU1FUy52aWRlb1BhdGhdOiByZXNvbHZlUGF0aCh2aWRlb1BhdGgpIH0pO1xuXG4gICAgICAgIGlmICghdmlkZW9PcHRpb25zKSB7XG4gICAgICAgICAgICB2aWRlb09wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IFtPUFRJT05fTkFNRVMudmlkZW9PcHRpb25zXTogdmlkZW9PcHRpb25zIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZGVvT3B0aW9ucy5mZm1wZWdQYXRoKVxuICAgICAgICAgICAgdmlkZW9PcHRpb25zLmZmbXBlZ1BhdGggPSByZXNvbHZlUGF0aCh2aWRlb09wdGlvbnMuZmZtcGVnUGF0aCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZpZGVvT3B0aW9ucy5mZm1wZWdQYXRoID0gYXdhaXQgZGV0ZWN0RkZNUEVHKCk7XG5cbiAgICAgICAgaWYgKCF2aWRlb09wdGlvbnMuZmZtcGVnUGF0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90RmluZEZGTVBFRyk7XG4gICAgfVxuXG4gICAgYXN5bmMgX3ZhbGlkYXRlUnVuT3B0aW9ucyAoKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlRGVidWdMb2dnZXIoKTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVTY3JlZW5zaG90T3B0aW9ucygpO1xuICAgICAgICBhd2FpdCB0aGlzLl92YWxpZGF0ZVZpZGVvT3B0aW9ucygpO1xuICAgICAgICB0aGlzLl92YWxpZGF0ZVNwZWVkT3B0aW9uKCk7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQ29uY3VycmVuY3lPcHRpb24oKTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVQcm94eUJ5cGFzc09wdGlvbigpO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVRlc3RGb3JBbGxvd011bHRpcGxlV2luZG93c09wdGlvbiAodGVzdHMpIHtcbiAgICAgICAgaWYgKHRlc3RzLnNvbWUodGVzdCA9PiB0ZXN0LmlzTGVnYWN5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90VXNlQWxsb3dNdWx0aXBsZVdpbmRvd3NPcHRpb25Gb3JMZWdhY3lUZXN0cyk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlQnJvd3NlcnNGb3JBbGxvd011bHRpcGxlV2luZG93c09wdGlvbiAoYnJvd3NlclNldCkge1xuICAgICAgICBjb25zdCBicm93c2VyQ29ubmVjdGlvbnMgICAgICAgICAgICA9IGJyb3dzZXJTZXQuYnJvd3NlckNvbm5lY3Rpb25Hcm91cHMubWFwKGJyb3dzZXJDb25uZWN0aW9uR3JvdXAgPT4gYnJvd3NlckNvbm5lY3Rpb25Hcm91cFswXSk7XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkQnJvd3NlckNvbm5lY3Rpb25zID0gYnJvd3NlckNvbm5lY3Rpb25zLmZpbHRlcihicm93c2VyQ29ubmVjdGlvbiA9PiAhYnJvd3NlckNvbm5lY3Rpb24uYWN0aXZlV2luZG93SWQpO1xuXG4gICAgICAgIGlmICghdW5zdXBwb3J0ZWRCcm93c2VyQ29ubmVjdGlvbnMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkQnJvd3NlckFsaWFzZXMgPSB1bnN1cHBvcnRlZEJyb3dzZXJDb25uZWN0aW9ucy5tYXAoYnJvd3NlckNvbm5lY3Rpb24gPT4gYnJvd3NlckNvbm5lY3Rpb24uYnJvd3NlckluZm8uYWxpYXMpO1xuICAgICAgICBjb25zdCBicm93c2VyQWxpYXNlcyAgICAgICAgICAgID0gZ2V0Q29uY2F0ZW5hdGVkVmFsdWVzU3RyaW5nKHVuc3VwcG9ydGVkQnJvd3NlckFsaWFzZXMpO1xuXG4gICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90VXNlQWxsb3dNdWx0aXBsZVdpbmRvd3NPcHRpb25Gb3JTb21lQnJvd3NlcnMsIGJyb3dzZXJBbGlhc2VzKTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVBbGxvd011bHRpcGxlV2luZG93c09wdGlvbiAodGVzdHMsIGJyb3dzZXJTZXQpIHtcbiAgICAgICAgY29uc3QgYWxsb3dNdWx0aXBsZVdpbmRvd3MgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5hbGxvd011bHRpcGxlV2luZG93cyk7XG5cbiAgICAgICAgaWYgKCFhbGxvd011bHRpcGxlV2luZG93cylcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLl92YWxpZGF0ZVRlc3RGb3JBbGxvd011bHRpcGxlV2luZG93c09wdGlvbih0ZXN0cyk7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQnJvd3NlcnNGb3JBbGxvd011bHRpcGxlV2luZG93c09wdGlvbihicm93c2VyU2V0KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlUnVubmFibGVDb25maWd1cmF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwcGVyXG4gICAgICAgICAgICAuY3JlYXRlUnVubmFibGVDb25maWd1cmF0aW9uKClcbiAgICAgICAgICAgIC50aGVuKHJ1bm5hYmxlQ29uZmlndXJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lLWJvb3RzdHJhcHBpbmcnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBydW5uYWJsZUNvbmZpZ3VyYXRpb247XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVTY3JlZW5zaG90UGF0aCAoc2NyZWVuc2hvdFBhdGgsIHBhdGhUeXBlKSB7XG4gICAgICAgIGNvbnN0IGZvcmJpZGRlbkNoYXJzTGlzdCA9IGNoZWNrRmlsZVBhdGgoc2NyZWVuc2hvdFBhdGgpO1xuXG4gICAgICAgIGlmIChmb3JiaWRkZW5DaGFyc0xpc3QubGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5mb3JiaWRkZW5DaGFyYXRlcnNJblNjcmVlbnNob3RQYXRoLCBzY3JlZW5zaG90UGF0aCwgcGF0aFR5cGUsIHJlbmRlckZvcmJpZGRlbkNoYXJzTGlzdChmb3JiaWRkZW5DaGFyc0xpc3QpKTtcbiAgICB9XG5cbiAgICBfc2V0Qm9vdHN0cmFwcGVyT3B0aW9ucyAoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5wcmVwYXJlKCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5ub3RpZnlBYm91dE92ZXJyaWRkZW5PcHRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5ib290c3RyYXBwZXIuc291cmNlcyAgICAgICAgICAgICAgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5zcmMpIHx8IHRoaXMuYm9vdHN0cmFwcGVyLnNvdXJjZXM7XG4gICAgICAgIHRoaXMuYm9vdHN0cmFwcGVyLmJyb3dzZXJzICAgICAgICAgICAgID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuYnJvd3NlcnMpIHx8IHRoaXMuYm9vdHN0cmFwcGVyLmJyb3dzZXJzO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcHBlci5jb25jdXJyZW5jeSAgICAgICAgICA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmNvbmN1cnJlbmN5KTtcbiAgICAgICAgdGhpcy5ib290c3RyYXBwZXIuYXBwQ29tbWFuZCAgICAgICAgICAgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy5hcHBDb21tYW5kKSB8fCB0aGlzLmJvb3RzdHJhcHBlci5hcHBDb21tYW5kO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcHBlci5hcHBJbml0RGVsYXkgICAgICAgICA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmFwcEluaXREZWxheSk7XG4gICAgICAgIHRoaXMuYm9vdHN0cmFwcGVyLmZpbHRlciAgICAgICAgICAgICAgID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuZmlsdGVyKSB8fCB0aGlzLmJvb3RzdHJhcHBlci5maWx0ZXI7XG4gICAgICAgIHRoaXMuYm9vdHN0cmFwcGVyLnJlcG9ydGVycyAgICAgICAgICAgID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMucmVwb3J0ZXIpIHx8IHRoaXMuYm9vdHN0cmFwcGVyLnJlcG9ydGVycztcbiAgICAgICAgdGhpcy5ib290c3RyYXBwZXIudHNDb25maWdQYXRoICAgICAgICAgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZ2V0T3B0aW9uKE9QVElPTl9OQU1FUy50c0NvbmZpZ1BhdGgpO1xuICAgICAgICB0aGlzLmJvb3RzdHJhcHBlci5jbGllbnRTY3JpcHRzICAgICAgICA9IHRoaXMuY29uZmlndXJhdGlvbi5nZXRPcHRpb24oT1BUSU9OX05BTUVTLmNsaWVudFNjcmlwdHMpIHx8IHRoaXMuYm9vdHN0cmFwcGVyLmNsaWVudFNjcmlwdHM7XG4gICAgICAgIHRoaXMuYm9vdHN0cmFwcGVyLmFsbG93TXVsdGlwbGVXaW5kb3dzID0gdGhpcy5jb25maWd1cmF0aW9uLmdldE9wdGlvbihPUFRJT05fTkFNRVMuYWxsb3dNdWx0aXBsZVdpbmRvd3MpO1xuICAgIH1cblxuICAgIC8vIEFQSVxuICAgIGVtYmVkZGluZ09wdGlvbnMgKG9wdHMpIHtcbiAgICAgICAgY29uc3QgeyBhc3NldHMsIFRlc3RSdW5DdG9yIH0gPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyQXNzZXRzKGFzc2V0cyk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tZXJnZU9wdGlvbnMoeyBUZXN0UnVuQ3RvciB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzcmMgKC4uLnNvdXJjZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBpTWV0aG9kV2FzQ2FsbGVkLnNyYylcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMubXVsdGlwbGVBUElNZXRob2RDYWxsRm9yYmlkZGVuLCBPUFRJT05fTkFNRVMuc3JjKTtcblxuICAgICAgICBzb3VyY2VzID0gdGhpcy5fcHJlcGFyZUFycmF5UGFyYW1ldGVyKHNvdXJjZXMpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHsgW09QVElPTl9OQU1FUy5zcmNdOiBzb3VyY2VzIH0pO1xuXG4gICAgICAgIHRoaXMuYXBpTWV0aG9kV2FzQ2FsbGVkLnNyYyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYnJvd3NlcnMgKC4uLmJyb3dzZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLmFwaU1ldGhvZFdhc0NhbGxlZC5icm93c2VycylcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMubXVsdGlwbGVBUElNZXRob2RDYWxsRm9yYmlkZGVuLCBPUFRJT05fTkFNRVMuYnJvd3NlcnMpO1xuXG4gICAgICAgIGJyb3dzZXJzID0gdGhpcy5fcHJlcGFyZUFycmF5UGFyYW1ldGVyKGJyb3dzZXJzKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IGJyb3dzZXJzIH0pO1xuXG4gICAgICAgIHRoaXMuYXBpTWV0aG9kV2FzQ2FsbGVkLmJyb3dzZXJzID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25jdXJyZW5jeSAoY29uY3VycmVuY3kpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IGNvbmN1cnJlbmN5IH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlcG9ydGVyIChuYW1lLCBvdXRwdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBpTWV0aG9kV2FzQ2FsbGVkLnJlcG9ydGVyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5tdWx0aXBsZUFQSU1ldGhvZENhbGxGb3JiaWRkZW4sIE9QVElPTl9OQU1FUy5yZXBvcnRlcik7XG5cbiAgICAgICAgbGV0IHJlcG9ydGVycyA9IHByZXBhcmVSZXBvcnRlcnMobmFtZSwgb3V0cHV0KTtcblxuICAgICAgICByZXBvcnRlcnMgPSB0aGlzLl9wcmVwYXJlQXJyYXlQYXJhbWV0ZXIocmVwb3J0ZXJzKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHsgW09QVElPTl9OQU1FUy5yZXBvcnRlcl06IHJlcG9ydGVycyB9KTtcblxuICAgICAgICB0aGlzLmFwaU1ldGhvZFdhc0NhbGxlZC5yZXBvcnRlciA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZmlsdGVyIChmaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7IGZpbHRlciB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1c2VQcm94eSAocHJveHksIHByb3h5QnlwYXNzKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tZXJnZU9wdGlvbnMoeyBwcm94eSwgcHJveHlCeXBhc3MgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2NyZWVuc2hvdHMgKC4uLm9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGZ1bGxQYWdlO1xuICAgICAgICBsZXQgW3BhdGgsIHRha2VPbkZhaWxzLCBwYXRoUGF0dGVybl0gPSBvcHRpb25zO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBvcHRpb25zWzBdICYmIHR5cGVvZiBvcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICh7IHBhdGgsIHRha2VPbkZhaWxzLCBwYXRoUGF0dGVybiwgZnVsbFBhZ2UgfSA9IG9wdGlvbnNbMF0pO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tZXJnZU9wdGlvbnMoeyBzY3JlZW5zaG90czogeyBwYXRoLCB0YWtlT25GYWlscywgcGF0aFBhdHRlcm4sIGZ1bGxQYWdlIH0gfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmlkZW8gKHBhdGgsIG9wdGlvbnMsIGVuY29kaW5nT3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHtcbiAgICAgICAgICAgIFtPUFRJT05fTkFNRVMudmlkZW9QYXRoXTogICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgW09QVElPTl9OQU1FUy52aWRlb09wdGlvbnNdOiAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICBbT1BUSU9OX05BTUVTLnZpZGVvRW5jb2RpbmdPcHRpb25zXTogZW5jb2RpbmdPcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0YXJ0QXBwIChjb21tYW5kLCBpbml0RGVsYXkpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7XG4gICAgICAgICAgICBbT1BUSU9OX05BTUVTLmFwcENvbW1hbmRdOiAgIGNvbW1hbmQsXG4gICAgICAgICAgICBbT1BUSU9OX05BTUVTLmFwcEluaXREZWxheV06IGluaXREZWxheVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0c0NvbmZpZ1BhdGggKHBhdGgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1lcmdlT3B0aW9ucyh7XG4gICAgICAgICAgICBbT1BUSU9OX05BTUVTLnRzQ29uZmlnUGF0aF06IHBhdGhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xpZW50U2NyaXB0cyAoLi4uc2NyaXB0cykge1xuICAgICAgICBpZiAodGhpcy5hcGlNZXRob2RXYXNDYWxsZWQuY2xpZW50U2NyaXB0cylcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMubXVsdGlwbGVBUElNZXRob2RDYWxsRm9yYmlkZGVuLCBPUFRJT05fTkFNRVMuY2xpZW50U2NyaXB0cyk7XG5cbiAgICAgICAgc2NyaXB0cyA9IHRoaXMuX3ByZXBhcmVBcnJheVBhcmFtZXRlcihzY3JpcHRzKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWVyZ2VPcHRpb25zKHsgW09QVElPTl9OQU1FUy5jbGllbnRTY3JpcHRzXTogc2NyaXB0cyB9KTtcblxuICAgICAgICB0aGlzLmFwaU1ldGhvZFdhc0NhbGxlZC5jbGllbnRTY3JpcHRzID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhc3luYyBfcHJlcGFyZUNsaWVudFNjcmlwdHMgKHRlc3RzLCBjbGllbnRTY3JpcHRzKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0ZXN0cy5tYXAoYXN5bmMgdGVzdCA9PiB7XG4gICAgICAgICAgICBpZiAodGVzdC5pc0xlZ2FjeSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGxldCBsb2FkZWRUZXN0Q2xpZW50U2NyaXB0cyA9IGF3YWl0IGxvYWRDbGllbnRTY3JpcHRzKHRlc3QuY2xpZW50U2NyaXB0cywgZGlybmFtZSh0ZXN0LnRlc3RGaWxlLmZpbGVuYW1lKSk7XG5cbiAgICAgICAgICAgIGxvYWRlZFRlc3RDbGllbnRTY3JpcHRzID0gY2xpZW50U2NyaXB0cy5jb25jYXQobG9hZGVkVGVzdENsaWVudFNjcmlwdHMpO1xuXG4gICAgICAgICAgICB0ZXN0LmNsaWVudFNjcmlwdHMgPSBzZXRVbmlxdWVVcmxzKGxvYWRlZFRlc3RDbGllbnRTY3JpcHRzKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJ1biAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBpTWV0aG9kV2FzQ2FsbGVkLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tZXJnZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3NldEJvb3RzdHJhcHBlck9wdGlvbnMoKTtcblxuICAgICAgICBjb25zdCBydW5UYXNrUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl92YWxpZGF0ZVJ1bk9wdGlvbnMoKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX2NyZWF0ZVJ1bm5hYmxlQ29uZmlndXJhdGlvbigpKVxuICAgICAgICAgICAgLnRoZW4oYXN5bmMgKHsgcmVwb3J0ZXJQbHVnaW5zLCBicm93c2VyU2V0LCB0ZXN0cywgdGVzdGVkQXBwLCBjb21tb25DbGllbnRTY3JpcHRzIH0pID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9wcmVwYXJlQ2xpZW50U2NyaXB0cyh0ZXN0cywgY29tbW9uQ2xpZW50U2NyaXB0cyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUFsbG93TXVsdGlwbGVXaW5kb3dzT3B0aW9uKHRlc3RzLCBicm93c2VyU2V0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5UYXNrKHJlcG9ydGVyUGx1Z2lucywgYnJvd3NlclNldCwgdGVzdHMsIHRlc3RlZEFwcCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlQ2FuY2VsYWJsZVByb21pc2UocnVuVGFza1Byb21pc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0b3AgKCkge1xuICAgICAgICAvLyBOT1RFOiBXaGVuIHRhc2tQcm9taXNlIGlzIGNhbmNlbGxlZCwgaXQgaXMgcmVtb3ZlZCBmcm9tXG4gICAgICAgIC8vIHRoZSBwZW5kaW5nVGFza1Byb21pc2VzIGFycmF5LCB3aGljaCBsZWFkcyB0byBzaGlmdGluZyBpbmRleGVzXG4gICAgICAgIC8vIHRvd2FyZHMgdGhlIGJlZ2lubmluZy4gU28sIHdlIG11c3QgY29weSB0aGUgYXJyYXkgaW4gb3JkZXIgdG8gaXRlcmF0ZSBpdCxcbiAgICAgICAgLy8gb3Igd2UgY2FuIHBlcmZvcm0gaXRlcmF0aW9uIGZyb20gdGhlIGVuZCB0byB0aGUgYmVnaW5uaW5nLlxuICAgICAgICBjb25zdCBjYW5jZWxsYXRpb25Qcm9taXNlcyA9IG1hcFJldmVyc2UodGhpcy5wZW5kaW5nVGFza1Byb21pc2VzLCB0YXNrUHJvbWlzZSA9PiB0YXNrUHJvbWlzZS5jYW5jZWwoKSk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoY2FuY2VsbGF0aW9uUHJvbWlzZXMpO1xuICAgIH1cbn1cbiJdfQ==