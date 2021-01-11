"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const temp_directory_1 = __importDefault(require("../../../../../utils/temp-directory"));
const promisified_functions_1 = require("../../../../../utils/promisified-functions");
const mime_db_1 = __importDefault(require("mime-db"));
function getMimeTypes() {
    const mimeTypes = Object.keys(mime_db_1.default);
    return mimeTypes.filter(mimeType => {
        // @ts-ignore: Export of the 'mime-db' module has no index signature.
        const { extensions } = mime_db_1.default[mimeType];
        return extensions && extensions.length;
    }).join(',');
}
async function generatePreferences(profileDir, { marionettePort, config }) {
    const prefsFileName = path_1.default.join(profileDir, 'user.js');
    let prefs = [
        'user_pref("browser.link.open_newwindow.override.external", 2);',
        'user_pref("app.update.enabled", false);',
        'user_pref("app.update.auto", false);',
        'user_pref("app.update.mode", 0);',
        'user_pref("app.update.service.enabled", false);',
        'user_pref("browser.shell.checkDefaultBrowser", false);',
        'user_pref("browser.usedOnWindows10", true);',
        'user_pref("browser.rights.3.shown", true);',
        'user_pref("browser.startup.homepage_override.mstone","ignore");',
        'user_pref("browser.tabs.warnOnCloseOtherTabs", false);',
        'user_pref("browser.tabs.warnOnClose", false);',
        'user_pref("browser.sessionstore.resume_from_crash", false);',
        `user_pref("browser.helperApps.neverAsk.saveToDisk", "${getMimeTypes()}");`,
        `user_pref("pdfjs.disabled", true);`,
        'user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);',
        'user_pref("toolkit.telemetry.enabled", false);',
        'user_pref("toolkit.telemetry.rejected", true);',
        'user_pref("datareporting.healthreport.uploadEnabled", false);',
        'user_pref("datareporting.healthreport.service.enabled", false);',
        'user_pref("datareporting.healthreport.service.firstRun", false);',
        'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
        'user_pref("datareporting.policy.dataSubmissionPolicyBypassNotification", true);',
        'user_pref("app.shield.optoutstudies.enabled", false);',
        'user_pref("extensions.shield-recipe-client.enabled", false);',
        'user_pref("extensions.shield-recipe-client.first_run", false);',
        'user_pref("extensions.shield-recipe-client.startupExperimentPrefs.browser.newtabpage.activity-stream.enabled", false);',
        'user_pref("devtools.toolbox.host", "window");',
        'user_pref("devtools.toolbox.previousHost", "bottom");',
        'user_pref("signon.rememberSignons", false);',
        // NOTE: dom.min_background_timeout_value should be equal to dom.min_timeout_value
        'user_pref("dom.min_background_timeout_value", 4);',
        'user_pref("dom.timeout.throttling_delay", 0);',
        'user_pref("dom.timeout.budget_throttling_max_delay", 0);',
        // NOTE: We set the foreground configuration for the background budget throttling parameters
        'user_pref("dom.timeout.background_throttling_max_budget", -1);',
        'user_pref("dom.timeout.background_budget_regeneration_rate", 1);'
    ];
    if (marionettePort) {
        prefs = prefs.concat([
            `user_pref("marionette.port", ${marionettePort});`,
            'user_pref("marionette.enabled", true);'
        ]);
    }
    if (config.disableMultiprocessing) {
        prefs = prefs.concat([
            'user_pref("browser.tabs.remote.autostart", false);',
            'user_pref("browser.tabs.remote.autostart.2", false);',
        ]);
    }
    await promisified_functions_1.writeFile(prefsFileName, prefs.join('\n'));
}
async function default_1(runtimeInfo) {
    const tmpDir = await temp_directory_1.default.createDirectory('firefox-profile');
    await generatePreferences(tmpDir.path, runtimeInfo);
    return tmpDir;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRlbXAtcHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL2RlZGljYXRlZC9maXJlZm94L2NyZWF0ZS10ZW1wLXByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIseUZBQWdFO0FBQ2hFLHNGQUF1RTtBQUN2RSxzREFBeUI7QUFFekIsU0FBUyxZQUFZO0lBQ2pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQUUsQ0FBQyxDQUFDO0lBRWxDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMvQixxRUFBcUU7UUFDckUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLGlCQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELEtBQUssVUFBVSxtQkFBbUIsQ0FBRSxVQUFrQixFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBMkM7SUFDdkgsTUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFdkQsSUFBSSxLQUFLLEdBQUc7UUFDUixnRUFBZ0U7UUFDaEUseUNBQXlDO1FBQ3pDLHNDQUFzQztRQUN0QyxrQ0FBa0M7UUFDbEMsaURBQWlEO1FBQ2pELHdEQUF3RDtRQUN4RCw2Q0FBNkM7UUFDN0MsNENBQTRDO1FBQzVDLGlFQUFpRTtRQUNqRSx3REFBd0Q7UUFDeEQsK0NBQStDO1FBQy9DLDZEQUE2RDtRQUM3RCx3REFBd0QsWUFBWSxFQUFFLEtBQUs7UUFDM0Usb0NBQW9DO1FBQ3BDLGlFQUFpRTtRQUNqRSxnREFBZ0Q7UUFDaEQsZ0RBQWdEO1FBQ2hELCtEQUErRDtRQUMvRCxpRUFBaUU7UUFDakUsa0VBQWtFO1FBQ2xFLGlFQUFpRTtRQUNqRSxpRkFBaUY7UUFDakYsdURBQXVEO1FBQ3ZELDhEQUE4RDtRQUM5RCxnRUFBZ0U7UUFDaEUsd0hBQXdIO1FBQ3hILCtDQUErQztRQUMvQyx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQzdDLGtGQUFrRjtRQUNsRixtREFBbUQ7UUFDbkQsK0NBQStDO1FBQy9DLDBEQUEwRDtRQUMxRCw0RkFBNEY7UUFDNUYsZ0VBQWdFO1FBQ2hFLGtFQUFrRTtLQUNyRSxDQUFDO0lBRUYsSUFBSSxjQUFjLEVBQUU7UUFDaEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDakIsZ0NBQWdDLGNBQWMsSUFBSTtZQUNsRCx3Q0FBd0M7U0FDM0MsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNqQixvREFBb0Q7WUFDcEQsc0RBQXNEO1NBQ3pELENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTSxpQ0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVjLEtBQUssb0JBQVcsV0FBZ0I7SUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVwRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBTkQsNEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBUZW1wRGlyZWN0b3J5IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3RlbXAtZGlyZWN0b3J5JztcbmltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3V0aWxzL3Byb21pc2lmaWVkLWZ1bmN0aW9ucyc7XG5pbXBvcnQgZGIgZnJvbSAnbWltZS1kYic7XG5cbmZ1bmN0aW9uIGdldE1pbWVUeXBlcyAoKTogc3RyaW5nIHtcbiAgICBjb25zdCBtaW1lVHlwZXMgPSBPYmplY3Qua2V5cyhkYik7XG5cbiAgICByZXR1cm4gbWltZVR5cGVzLmZpbHRlcihtaW1lVHlwZSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IEV4cG9ydCBvZiB0aGUgJ21pbWUtZGInIG1vZHVsZSBoYXMgbm8gaW5kZXggc2lnbmF0dXJlLlxuICAgICAgICBjb25zdCB7IGV4dGVuc2lvbnMgfSA9IGRiW21pbWVUeXBlXTtcblxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucyAmJiBleHRlbnNpb25zLmxlbmd0aDtcbiAgICB9KS5qb2luKCcsJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlUHJlZmVyZW5jZXMgKHByb2ZpbGVEaXI6IHN0cmluZywgeyBtYXJpb25ldHRlUG9ydCwgY29uZmlnIH06IHsgbWFyaW9uZXR0ZVBvcnQ6IG51bWJlcjsgY29uZmlnOiBhbnkgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByZWZzRmlsZU5hbWUgPSBwYXRoLmpvaW4ocHJvZmlsZURpciwgJ3VzZXIuanMnKTtcblxuICAgIGxldCBwcmVmcyA9IFtcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIubGluay5vcGVuX25ld3dpbmRvdy5vdmVycmlkZS5leHRlcm5hbFwiLCAyKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5lbmFibGVkXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5hdXRvXCIsIGZhbHNlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnVwZGF0ZS5tb2RlXCIsIDApOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJhcHAudXBkYXRlLnNlcnZpY2UuZW5hYmxlZFwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIuc2hlbGwuY2hlY2tEZWZhdWx0QnJvd3NlclwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudXNlZE9uV2luZG93czEwXCIsIHRydWUpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnJpZ2h0cy4zLnNob3duXCIsIHRydWUpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnN0YXJ0dXAuaG9tZXBhZ2Vfb3ZlcnJpZGUubXN0b25lXCIsXCJpZ25vcmVcIik7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy53YXJuT25DbG9zZU90aGVyVGFic1wiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIudGFicy53YXJuT25DbG9zZVwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImJyb3dzZXIuc2Vzc2lvbnN0b3JlLnJlc3VtZV9mcm9tX2NyYXNoXCIsIGZhbHNlKTsnLFxuICAgICAgICBgdXNlcl9wcmVmKFwiYnJvd3Nlci5oZWxwZXJBcHBzLm5ldmVyQXNrLnNhdmVUb0Rpc2tcIiwgXCIke2dldE1pbWVUeXBlcygpfVwiKTtgLFxuICAgICAgICBgdXNlcl9wcmVmKFwicGRmanMuZGlzYWJsZWRcIiwgdHJ1ZSk7YCxcbiAgICAgICAgJ3VzZXJfcHJlZihcInRvb2xraXQudGVsZW1ldHJ5LnJlcG9ydGluZ3BvbGljeS5maXJzdFJ1blwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcInRvb2xraXQudGVsZW1ldHJ5LmVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJ0b29sa2l0LnRlbGVtZXRyeS5yZWplY3RlZFwiLCB0cnVlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZGF0YXJlcG9ydGluZy5oZWFsdGhyZXBvcnQudXBsb2FkRW5hYmxlZFwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRhdGFyZXBvcnRpbmcuaGVhbHRocmVwb3J0LnNlcnZpY2UuZW5hYmxlZFwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRhdGFyZXBvcnRpbmcuaGVhbHRocmVwb3J0LnNlcnZpY2UuZmlyc3RSdW5cIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkYXRhcmVwb3J0aW5nLnBvbGljeS5kYXRhU3VibWlzc2lvbkVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkYXRhcmVwb3J0aW5nLnBvbGljeS5kYXRhU3VibWlzc2lvblBvbGljeUJ5cGFzc05vdGlmaWNhdGlvblwiLCB0cnVlKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiYXBwLnNoaWVsZC5vcHRvdXRzdHVkaWVzLmVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJleHRlbnNpb25zLnNoaWVsZC1yZWNpcGUtY2xpZW50LmVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJleHRlbnNpb25zLnNoaWVsZC1yZWNpcGUtY2xpZW50LmZpcnN0X3J1blwiLCBmYWxzZSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImV4dGVuc2lvbnMuc2hpZWxkLXJlY2lwZS1jbGllbnQuc3RhcnR1cEV4cGVyaW1lbnRQcmVmcy5icm93c2VyLm5ld3RhYnBhZ2UuYWN0aXZpdHktc3RyZWFtLmVuYWJsZWRcIiwgZmFsc2UpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJkZXZ0b29scy50b29sYm94Lmhvc3RcIiwgXCJ3aW5kb3dcIik7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRldnRvb2xzLnRvb2xib3gucHJldmlvdXNIb3N0XCIsIFwiYm90dG9tXCIpOycsXG4gICAgICAgICd1c2VyX3ByZWYoXCJzaWdub24ucmVtZW1iZXJTaWdub25zXCIsIGZhbHNlKTsnLFxuICAgICAgICAvLyBOT1RFOiBkb20ubWluX2JhY2tncm91bmRfdGltZW91dF92YWx1ZSBzaG91bGQgYmUgZXF1YWwgdG8gZG9tLm1pbl90aW1lb3V0X3ZhbHVlXG4gICAgICAgICd1c2VyX3ByZWYoXCJkb20ubWluX2JhY2tncm91bmRfdGltZW91dF92YWx1ZVwiLCA0KTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZG9tLnRpbWVvdXQudGhyb3R0bGluZ19kZWxheVwiLCAwKTsnLFxuICAgICAgICAndXNlcl9wcmVmKFwiZG9tLnRpbWVvdXQuYnVkZ2V0X3Rocm90dGxpbmdfbWF4X2RlbGF5XCIsIDApOycsXG4gICAgICAgIC8vIE5PVEU6IFdlIHNldCB0aGUgZm9yZWdyb3VuZCBjb25maWd1cmF0aW9uIGZvciB0aGUgYmFja2dyb3VuZCBidWRnZXQgdGhyb3R0bGluZyBwYXJhbWV0ZXJzXG4gICAgICAgICd1c2VyX3ByZWYoXCJkb20udGltZW91dC5iYWNrZ3JvdW5kX3Rocm90dGxpbmdfbWF4X2J1ZGdldFwiLCAtMSk7JyxcbiAgICAgICAgJ3VzZXJfcHJlZihcImRvbS50aW1lb3V0LmJhY2tncm91bmRfYnVkZ2V0X3JlZ2VuZXJhdGlvbl9yYXRlXCIsIDEpOydcbiAgICBdO1xuXG4gICAgaWYgKG1hcmlvbmV0dGVQb3J0KSB7XG4gICAgICAgIHByZWZzID0gcHJlZnMuY29uY2F0KFtcbiAgICAgICAgICAgIGB1c2VyX3ByZWYoXCJtYXJpb25ldHRlLnBvcnRcIiwgJHttYXJpb25ldHRlUG9ydH0pO2AsXG4gICAgICAgICAgICAndXNlcl9wcmVmKFwibWFyaW9uZXR0ZS5lbmFibGVkXCIsIHRydWUpOydcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5kaXNhYmxlTXVsdGlwcm9jZXNzaW5nKSB7XG4gICAgICAgIHByZWZzID0gcHJlZnMuY29uY2F0KFtcbiAgICAgICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnRhYnMucmVtb3RlLmF1dG9zdGFydFwiLCBmYWxzZSk7JyxcbiAgICAgICAgICAgICd1c2VyX3ByZWYoXCJicm93c2VyLnRhYnMucmVtb3RlLmF1dG9zdGFydC4yXCIsIGZhbHNlKTsnLFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBhd2FpdCB3cml0ZUZpbGUocHJlZnNGaWxlTmFtZSwgcHJlZnMuam9pbignXFxuJykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAocnVudGltZUluZm86IGFueSk6IFByb21pc2U8VGVtcERpcmVjdG9yeT4ge1xuICAgIGNvbnN0IHRtcERpciA9IGF3YWl0IFRlbXBEaXJlY3RvcnkuY3JlYXRlRGlyZWN0b3J5KCdmaXJlZm94LXByb2ZpbGUnKTtcblxuICAgIGF3YWl0IGdlbmVyYXRlUHJlZmVyZW5jZXModG1wRGlyLnBhdGgsIHJ1bnRpbWVJbmZvKTtcblxuICAgIHJldHVybiB0bXBEaXI7XG59XG4iXX0=