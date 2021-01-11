"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../types");
const utils_1 = require("./utils");
const EXTERNAL_LINKS = {
    createNewIssue: 'https://github.com/DevExpress/testcafe/issues/new?template=bug-report.md',
    troubleshootNetwork: 'https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx',
    viewportSizes: 'http://viewportsizes.com'
};
exports.default = {
    [types_1.TEST_RUN_ERRORS.actionIntegerOptionError]: err => `
        The "${err.optionName}" option is expected to be an integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionPositiveIntegerOptionError]: err => `
        The "${err.optionName}" option is expected to be a positive integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionBooleanOptionError]: err => `
        The "${err.optionName}" option is expected to be a boolean value, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionSpeedOptionError]: err => `
        The "${err.optionName}" option is expected to be a number between 0.01 and 1, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.pageLoadError]: err => `
        A request to ${utils_1.formatUrl(err.url)} has failed.
        Use quarantine mode to perform additional attempts to execute this test.
        You can find troubleshooting information for this issue at ${utils_1.formatUrl(EXTERNAL_LINKS.troubleshootNetwork)}.

        Error details:
        ${err.errMsg}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorOnPage]: err => `
        A JavaScript error occurred on ${utils_1.formatUrl(err.pageDestUrl)}.
        Repeat test actions in the browser and check the console for errors.
        If you see this error, it means that the tested website caused it. You can fix it or disable tracking JavaScript errors in TestCafe. To do the latter, enable the "--skip-js-errors" option.
        If this error does not occur, please write a new issue at:
        ${utils_1.formatUrl(EXTERNAL_LINKS.createNewIssue)}.

        JavaScript error details:
        ${utils_1.replaceLeadingSpacesWithNbsp(lodash_1.escape(err.errStack))}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInTestCode]: err => `
        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.nativeDialogNotHandledError]: err => `
        A native ${err.dialogType} dialog was invoked on page ${utils_1.formatUrl(err.pageUrl)}, but no handler was set for it. Use the "setNativeDialogHandler" function to introduce a handler function for native dialogs.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInNativeDialogHandler]: err => `
        An error occurred in the native dialog handler called for a native ${err.dialogType} dialog on page ${utils_1.formatUrl(err.pageUrl)}:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.setTestSpeedArgumentError]: err => `
        Speed is expected to be a number between 0.01 and 1, but ${err.actualValue} was passed.
    `,
    [types_1.TEST_RUN_ERRORS.setNativeDialogHandlerCodeWrongTypeError]: err => `
        The native dialog handler is expected to be a function, ClientFunction or null, but it was ${err.actualType}.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInClientFunctionCode]: err => `
        An error occurred in ${err.instantiationCallsiteName} code:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomDOMPropertyCode]: err => `
        An error occurred when trying to calculate a custom Selector property "${err.property}":

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.clientFunctionExecutionInterruptionError]: err => `
        ${err.instantiationCallsiteName} execution was interrupted by page unload. This problem may appear if you trigger page navigation from ${err.instantiationCallsiteName} code.
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtNonErrorObjectInTestCode]: err => `
        Uncaught ${err.objType} "${lodash_1.escape(err.objStr)}" was thrown. Throw Error instead.
    `,
    [types_1.TEST_RUN_ERRORS.unhandledPromiseRejection]: err => `
        Unhandled promise rejection:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtException]: err => `
        Uncaught exception:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.actionOptionsTypeError]: err => `
        Action options is expected to be an object, null or undefined but it was ${err.actualType}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a non-empty string, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionBooleanArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a boolean value, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionNullableStringArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a null or a string, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringOrStringArrayArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a non-empty string or a string array, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionStringArrayElementError]: err => `
        Elements of the "${err.argumentName}" argument are expected to be non-empty strings, but the element at index ${err.elementIndex} was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionIntegerArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be an integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionRoleArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a Role instance, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionPositiveIntegerArgumentError]: err => `
        The "${err.argumentName}" argument is expected to be a positive integer, but it was ${err.actualValue}.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotFoundError]: (err, viewportWidth) => `
        The specified selector does not match any element in the DOM tree.

        ${utils_1.formatSelectorCallstack(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.actionElementIsInvisibleError]: () => `
        The element that matches the specified selector is not visible.
    `,
    [types_1.TEST_RUN_ERRORS.actionSelectorMatchesWrongNodeTypeError]: err => `
        The specified selector is expected to match a DOM element, but it matches a ${err.nodeDescription} node.
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalElementNotFoundError]: (err, viewportWidth) => `
        The specified "${err.argumentName}" does not match any element in the DOM tree.

        ${utils_1.formatSelectorCallstack(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalElementIsInvisibleError]: err => `
        The element that matches the specified "${err.argumentName}" is not visible.
    `,
    [types_1.TEST_RUN_ERRORS.actionAdditionalSelectorMatchesWrongNodeTypeError]: err => `
        The specified "${err.argumentName}" is expected to match a DOM element, but it matches a ${err.nodeDescription} node.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNonEditableError]: () => `
        The action element is expected to be editable (an input, textarea or element with the contentEditable attribute).
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNonContentEditableError]: err => `
        The element that matches the specified "${err.argumentName}" is expected to have the contentEditable attribute enabled or the entire document should be in design mode.
    `,
    [types_1.TEST_RUN_ERRORS.actionRootContainerNotFoundError]: () => `
        Content between the action elements cannot be selected because the root container for the selection range cannot be found, i.e. these elements do not have a common ancestor with the contentEditable attribute.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementIsNotFileInputError]: () => `
        The specified selector does not match a file input element.
    `,
    [types_1.TEST_RUN_ERRORS.actionCannotFindFileToUploadError]: err => `
        Cannot find the following file(s) to upload:
        ${err.filePaths.map(path => lodash_1.escape(path)).join('\n')}

        The following locations were scanned for the missing upload files:
        ${err.scannedFilePaths.map(path => lodash_1.escape(path)).join('\n')}

        Ensure these files exist or change the working directory.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotTextAreaError]: () => `
        The action element is expected to be a &lt;textarea&gt;.
    `,
    [types_1.TEST_RUN_ERRORS.actionElementNotIframeError]: () => `
        The action element is expected to be an &lt;iframe&gt.
    `,
    [types_1.TEST_RUN_ERRORS.actionIncorrectKeysError]: err => `
        The "${err.argumentName}" argument contains an incorrect key or key combination.
    `,
    [types_1.TEST_RUN_ERRORS.actionUnsupportedDeviceTypeError]: err => `
        The "${err.argumentName}" argument specifies an unsupported "${err.actualValue}" device. For a list of supported devices, refer to ${utils_1.formatUrl(EXTERNAL_LINKS.viewportSizes)}.
    `,
    [types_1.TEST_RUN_ERRORS.actionInvalidScrollTargetError]: err => `
        Unable to scroll to the specified point because a point with the specified ${err.properties} is not located inside the element's cropping region.
    `,
    [types_1.TEST_RUN_ERRORS.actionIframeIsNotLoadedError]: () => `
        Content of the iframe to which you are switching did not load.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeIsNotLoadedError]: () => `
        Content of the iframe in which the test is currently operating did not load.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeNotFoundError]: () => `
        The iframe in which the test is currently operating does not exist anymore.
    `,
    [types_1.TEST_RUN_ERRORS.currentIframeIsInvisibleError]: () => `
        The iframe in which the test is currently operating is not visible anymore.
    `,
    [types_1.TEST_RUN_ERRORS.missingAwaitError]: () => `
        A call to an async function is not awaited. Use the "await" keyword before actions, assertions or chains of them to ensure that they run in the right sequence.
    `,
    [types_1.TEST_RUN_ERRORS.externalAssertionLibraryError]: err => `
        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.domNodeClientFunctionResultError]: err => `
       ${err.instantiationCallsiteName} cannot return DOM elements. Use Selector functions for this purpose.
    `,
    [types_1.TEST_RUN_ERRORS.invalidSelectorResultError]: () => `
        Function that specifies a selector can only return a DOM node, an array of nodes, NodeList, HTMLCollection, null or undefined. Use ClientFunction to return other values.
    `,
    [types_1.TEST_RUN_ERRORS.actionSelectorError]: err => `
        Action "${err.selectorName}" argument error:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.cannotObtainInfoForElementSpecifiedBySelectorError]: (err, viewportWidth) => `
        Cannot obtain information about the node because the specified selector does not match any node in the DOM tree.

        ${utils_1.formatSelectorCallstack(err.apiFnChain, err.apiFnIndex, viewportWidth)}
    `,
    [types_1.TEST_RUN_ERRORS.windowDimensionsOverflowError]: () => `
        Unable to resize the window because the specified size exceeds the screen size. On macOS, a window cannot be larger than the screen.
    `,
    [types_1.TEST_RUN_ERRORS.forbiddenCharactersInScreenshotPathError]: err => `
        There are forbidden characters in the "${err.screenshotPath}" screenshot path:
        ${utils_1.renderForbiddenCharsList(err.forbiddenCharsList)}
    `,
    [types_1.TEST_RUN_ERRORS.invalidElementScreenshotDimensionsError]: err => `
         Unable to capture an element image because the resulting image ${err.dimensions} ${err.verb} zero or negative.
    `,
    [types_1.TEST_RUN_ERRORS.roleSwitchInRoleInitializerError]: () => `
        Role cannot be switched while another role is being initialized.
    `,
    [types_1.TEST_RUN_ERRORS.assertionExecutableArgumentError]: err => `
        Cannot evaluate the "${err.actualValue}" expression in the "${err.argumentName}" parameter because of the following error:

        ${err.errMsg}
    `,
    [types_1.TEST_RUN_ERRORS.assertionWithoutMethodCallError]: () => `
        An assertion method is not specified.
    `,
    [types_1.TEST_RUN_ERRORS.assertionUnawaitedPromiseError]: () => `
        Attempted to run assertions on a Promise object. Did you forget to await it? If not, pass "{ allowUnawaitedPromise: true }" to the assertion options.
    `,
    [types_1.TEST_RUN_ERRORS.requestHookNotImplementedError]: err => `
        You should implement the "${err.methodName}" method in the "${err.hookClassName}" class.
    `,
    [types_1.TEST_RUN_ERRORS.requestHookUnhandledError]: err => `
        An unhandled error occurred in the "${err.methodName}" method of the "${err.hookClassName}" class:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCode]: err => `
        An error occurred in a script injected into the tested page:

        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomClientScriptCodeLoadedFromModule]: err => `
        An error occurred in the '${err.moduleName}' module injected into the tested page. Make sure that this module can be executed in the browser environment.

        Error details:
        ${lodash_1.escape(err.errMsg)}
    `,
    [types_1.TEST_RUN_ERRORS.uncaughtErrorInCustomScript]: err => `
        An unhandled error occurred in the custom script:

        Error details: ${lodash_1.escape(err.errMsg)}

        ${utils_1.formatExpressionMessage(err.expression, err.line, err.column)}
    `,
    [types_1.TEST_RUN_ERRORS.childWindowIsNotLoadedError]: () => `
        The page in the child window is not loaded.
    `,
    [types_1.TEST_RUN_ERRORS.childWindowNotFoundError]: () => `
        The child window is not found.
    `,
    [types_1.TEST_RUN_ERRORS.cannotSwitchToWindowError]: () => `
        Cannot switch to the window.
    `,
    [types_1.TEST_RUN_ERRORS.closeChildWindowError]: () => `
        An error occurred while closing child windows.
    `,
    [types_1.TEST_RUN_ERRORS.childWindowClosedBeforeSwitchingError]: () => `
        The child window was closed before TestCafe could switch to it.
    `
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9ycy90ZXN0LXJ1bi90ZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBOEM7QUFDOUMsb0NBQTJDO0FBQzNDLG1DQU1pQjtBQUVqQixNQUFNLGNBQWMsR0FBRztJQUNuQixjQUFjLEVBQU8sMEVBQTBFO0lBQy9GLG1CQUFtQixFQUFFLCtEQUErRDtJQUNwRixhQUFhLEVBQVEsMEJBQTBCO0NBQ2xELENBQUM7QUFFRixrQkFBZTtJQUNYLENBQUMsdUJBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7ZUFDeEMsR0FBRyxDQUFDLFVBQVUscURBQXFELEdBQUcsQ0FBQyxXQUFXO0tBQzVGO0lBRUQsQ0FBQyx1QkFBZSxDQUFDLGdDQUFnQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztlQUNoRCxHQUFHLENBQUMsVUFBVSw2REFBNkQsR0FBRyxDQUFDLFdBQVc7S0FDcEc7SUFFRCxDQUFDLHVCQUFlLENBQUMsd0JBQXdCLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO2VBQ3hDLEdBQUcsQ0FBQyxVQUFVLDBEQUEwRCxHQUFHLENBQUMsV0FBVztLQUNqRztJQUVELENBQUMsdUJBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7ZUFDdEMsR0FBRyxDQUFDLFVBQVUsc0VBQXNFLEdBQUcsQ0FBQyxXQUFXO0tBQzdHO0lBRUQsQ0FBQyx1QkFBZSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7dUJBQ3JCLGlCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7cUVBRTRCLGlCQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDOzs7VUFHeEcsR0FBRyxDQUFDLE1BQU07S0FDZjtJQUVELENBQUMsdUJBQWUsQ0FBQyxtQkFB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cUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUU5QztJQUVELENBQUMsdUJBQWUsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUU5RDtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlc2NhcGUgYXMgZXNjYXBlSHRtbCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBURVNUX1JVTl9FUlJPUlMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICAgIHJlbmRlckZvcmJpZGRlbkNoYXJzTGlzdCxcbiAgICBmb3JtYXRTZWxlY3RvckNhbGxzdGFjayxcbiAgICBmb3JtYXRVcmwsXG4gICAgcmVwbGFjZUxlYWRpbmdTcGFjZXNXaXRoTmJzcCxcbiAgICBmb3JtYXRFeHByZXNzaW9uTWVzc2FnZVxufSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgRVhURVJOQUxfTElOS1MgPSB7XG4gICAgY3JlYXRlTmV3SXNzdWU6ICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9EZXZFeHByZXNzL3Rlc3RjYWZlL2lzc3Vlcy9uZXc/dGVtcGxhdGU9YnVnLXJlcG9ydC5tZCcsXG4gICAgdHJvdWJsZXNob290TmV0d29yazogJ2h0dHBzOi8vZ28uZGV2ZXhwcmVzcy5jb20vVGVzdENhZmVfRkFRX0FSZXF1ZXN0SGFzRmFpbGVkLmFzcHgnLFxuICAgIHZpZXdwb3J0U2l6ZXM6ICAgICAgICdodHRwOi8vdmlld3BvcnRzaXplcy5jb20nXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25JbnRlZ2VyT3B0aW9uRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5vcHRpb25OYW1lfVwiIG9wdGlvbiBpcyBleHBlY3RlZCB0byBiZSBhbiBpbnRlZ2VyLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25Qb3NpdGl2ZUludGVnZXJPcHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLm9wdGlvbk5hbWV9XCIgb3B0aW9uIGlzIGV4cGVjdGVkIHRvIGJlIGEgcG9zaXRpdmUgaW50ZWdlciwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQm9vbGVhbk9wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gaXMgZXhwZWN0ZWQgdG8gYmUgYSBib29sZWFuIHZhbHVlLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25TcGVlZE9wdGlvbkVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIub3B0aW9uTmFtZX1cIiBvcHRpb24gaXMgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXIgYmV0d2VlbiAwLjAxIGFuZCAxLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5wYWdlTG9hZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQSByZXF1ZXN0IHRvICR7Zm9ybWF0VXJsKGVyci51cmwpfSBoYXMgZmFpbGVkLlxuICAgICAgICBVc2UgcXVhcmFudGluZSBtb2RlIHRvIHBlcmZvcm0gYWRkaXRpb25hbCBhdHRlbXB0cyB0byBleGVjdXRlIHRoaXMgdGVzdC5cbiAgICAgICAgWW91IGNhbiBmaW5kIHRyb3VibGVzaG9vdGluZyBpbmZvcm1hdGlvbiBmb3IgdGhpcyBpc3N1ZSBhdCAke2Zvcm1hdFVybChFWFRFUk5BTF9MSU5LUy50cm91Ymxlc2hvb3ROZXR3b3JrKX0uXG5cbiAgICAgICAgRXJyb3IgZGV0YWlsczpcbiAgICAgICAgJHtlcnIuZXJyTXNnfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JPblBhZ2VdOiBlcnIgPT4gYFxuICAgICAgICBBIEphdmFTY3JpcHQgZXJyb3Igb2NjdXJyZWQgb24gJHtmb3JtYXRVcmwoZXJyLnBhZ2VEZXN0VXJsKX0uXG4gICAgICAgIFJlcGVhdCB0ZXN0IGFjdGlvbnMgaW4gdGhlIGJyb3dzZXIgYW5kIGNoZWNrIHRoZSBjb25zb2xlIGZvciBlcnJvcnMuXG4gICAgICAgIElmIHlvdSBzZWUgdGhpcyBlcnJvciwgaXQgbWVhbnMgdGhhdCB0aGUgdGVzdGVkIHdlYnNpdGUgY2F1c2VkIGl0LiBZb3UgY2FuIGZpeCBpdCBvciBkaXNhYmxlIHRyYWNraW5nIEphdmFTY3JpcHQgZXJyb3JzIGluIFRlc3RDYWZlLiBUbyBkbyB0aGUgbGF0dGVyLCBlbmFibGUgdGhlIFwiLS1za2lwLWpzLWVycm9yc1wiIG9wdGlvbi5cbiAgICAgICAgSWYgdGhpcyBlcnJvciBkb2VzIG5vdCBvY2N1ciwgcGxlYXNlIHdyaXRlIGEgbmV3IGlzc3VlIGF0OlxuICAgICAgICAke2Zvcm1hdFVybChFWFRFUk5BTF9MSU5LUy5jcmVhdGVOZXdJc3N1ZSl9LlxuXG4gICAgICAgIEphdmFTY3JpcHQgZXJyb3IgZGV0YWlsczpcbiAgICAgICAgJHtyZXBsYWNlTGVhZGluZ1NwYWNlc1dpdGhOYnNwKGVzY2FwZUh0bWwoZXJyLmVyclN0YWNrKSl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluVGVzdENvZGVdOiBlcnIgPT4gYFxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMubmF0aXZlRGlhbG9nTm90SGFuZGxlZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQSBuYXRpdmUgJHtlcnIuZGlhbG9nVHlwZX0gZGlhbG9nIHdhcyBpbnZva2VkIG9uIHBhZ2UgJHtmb3JtYXRVcmwoZXJyLnBhZ2VVcmwpfSwgYnV0IG5vIGhhbmRsZXIgd2FzIHNldCBmb3IgaXQuIFVzZSB0aGUgXCJzZXROYXRpdmVEaWFsb2dIYW5kbGVyXCIgZnVuY3Rpb24gdG8gaW50cm9kdWNlIGEgaGFuZGxlciBmdW5jdGlvbiBmb3IgbmF0aXZlIGRpYWxvZ3MuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluTmF0aXZlRGlhbG9nSGFuZGxlcl06IGVyciA9PiBgXG4gICAgICAgIEFuIGVycm9yIG9jY3VycmVkIGluIHRoZSBuYXRpdmUgZGlhbG9nIGhhbmRsZXIgY2FsbGVkIGZvciBhIG5hdGl2ZSAke2Vyci5kaWFsb2dUeXBlfSBkaWFsb2cgb24gcGFnZSAke2Zvcm1hdFVybChlcnIucGFnZVVybCl9OlxuXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5zZXRUZXN0U3BlZWRBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgU3BlZWQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXIgYmV0d2VlbiAwLjAxIGFuZCAxLCBidXQgJHtlcnIuYWN0dWFsVmFsdWV9IHdhcyBwYXNzZWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuc2V0TmF0aXZlRGlhbG9nSGFuZGxlckNvZGVXcm9uZ1R5cGVFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBuYXRpdmUgZGlhbG9nIGhhbmRsZXIgaXMgZXhwZWN0ZWQgdG8gYmUgYSBmdW5jdGlvbiwgQ2xpZW50RnVuY3Rpb24gb3IgbnVsbCwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxUeXBlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DbGllbnRGdW5jdGlvbkNvZGVdOiBlcnIgPT4gYFxuICAgICAgICBBbiBlcnJvciBvY2N1cnJlZCBpbiAke2Vyci5pbnN0YW50aWF0aW9uQ2FsbHNpdGVOYW1lfSBjb2RlOlxuXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy51bmNhdWdodEVycm9ySW5DdXN0b21ET01Qcm9wZXJ0eUNvZGVdOiBlcnIgPT4gYFxuICAgICAgICBBbiBlcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byBjYWxjdWxhdGUgYSBjdXN0b20gU2VsZWN0b3IgcHJvcGVydHkgXCIke2Vyci5wcm9wZXJ0eX1cIjpcblxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2xpZW50RnVuY3Rpb25FeGVjdXRpb25JbnRlcnJ1cHRpb25FcnJvcl06IGVyciA9PiBgXG4gICAgICAgICR7ZXJyLmluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWV9IGV4ZWN1dGlvbiB3YXMgaW50ZXJydXB0ZWQgYnkgcGFnZSB1bmxvYWQuIFRoaXMgcHJvYmxlbSBtYXkgYXBwZWFyIGlmIHlvdSB0cmlnZ2VyIHBhZ2UgbmF2aWdhdGlvbiBmcm9tICR7ZXJyLmluc3RhbnRpYXRpb25DYWxsc2l0ZU5hbWV9IGNvZGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHROb25FcnJvck9iamVjdEluVGVzdENvZGVdOiBlcnIgPT4gYFxuICAgICAgICBVbmNhdWdodCAke2Vyci5vYmpUeXBlfSBcIiR7ZXNjYXBlSHRtbChlcnIub2JqU3RyKX1cIiB3YXMgdGhyb3duLiBUaHJvdyBFcnJvciBpbnN0ZWFkLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuaGFuZGxlZFByb21pc2VSZWplY3Rpb25dOiBlcnIgPT4gYFxuICAgICAgICBVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb246XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXhjZXB0aW9uXTogZXJyID0+IGBcbiAgICAgICAgVW5jYXVnaHQgZXhjZXB0aW9uOlxuXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25PcHRpb25zVHlwZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQWN0aW9uIG9wdGlvbnMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gb2JqZWN0LCBudWxsIG9yIHVuZGVmaW5lZCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFR5cGV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ0FyZ3VtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBUaGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nLCBidXQgaXQgd2FzICR7ZXJyLmFjdHVhbFZhbHVlfS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25Cb29sZWFuQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhIGJvb2xlYW4gdmFsdWUsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbk51bGxhYmxlU3RyaW5nQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhIG51bGwgb3IgYSBzdHJpbmcsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblN0cmluZ09yU3RyaW5nQXJyYXlBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHN0cmluZyBhcnJheSwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uU3RyaW5nQXJyYXlFbGVtZW50RXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBFbGVtZW50cyBvZiB0aGUgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgYXJndW1lbnQgYXJlIGV4cGVjdGVkIHRvIGJlIG5vbi1lbXB0eSBzdHJpbmdzLCBidXQgdGhlIGVsZW1lbnQgYXQgaW5kZXggJHtlcnIuZWxlbWVudEluZGV4fSB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludGVnZXJBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGFuIGludGVnZXIsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblJvbGVBcmd1bWVudEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGEgUm9sZSBpbnN0YW5jZSwgYnV0IGl0IHdhcyAke2Vyci5hY3R1YWxWYWx1ZX0uXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uUG9zaXRpdmVJbnRlZ2VyQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBhcmd1bWVudCBpcyBleHBlY3RlZCB0byBiZSBhIHBvc2l0aXZlIGludGVnZXIsIGJ1dCBpdCB3YXMgJHtlcnIuYWN0dWFsVmFsdWV9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RGb3VuZEVycm9yXTogKGVyciwgdmlld3BvcnRXaWR0aCkgPT4gYFxuICAgICAgICBUaGUgc3BlY2lmaWVkIHNlbGVjdG9yIGRvZXMgbm90IG1hdGNoIGFueSBlbGVtZW50IGluIHRoZSBET00gdHJlZS5cblxuICAgICAgICAke2Zvcm1hdFNlbGVjdG9yQ2FsbHN0YWNrKGVyci5hcGlGbkNoYWluLCBlcnIuYXBpRm5JbmRleCwgdmlld3BvcnRXaWR0aCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudElzSW52aXNpYmxlRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBlbGVtZW50IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yIGlzIG5vdCB2aXNpYmxlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblNlbGVjdG9yTWF0Y2hlc1dyb25nTm9kZVR5cGVFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgc2VsZWN0b3IgaXMgZXhwZWN0ZWQgdG8gbWF0Y2ggYSBET00gZWxlbWVudCwgYnV0IGl0IG1hdGNoZXMgYSAke2Vyci5ub2RlRGVzY3JpcHRpb259IG5vZGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbEVsZW1lbnROb3RGb3VuZEVycm9yXTogKGVyciwgdmlld3BvcnRXaWR0aCkgPT4gYFxuICAgICAgICBUaGUgc3BlY2lmaWVkIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGRvZXMgbm90IG1hdGNoIGFueSBlbGVtZW50IGluIHRoZSBET00gdHJlZS5cblxuICAgICAgICAke2Zvcm1hdFNlbGVjdG9yQ2FsbHN0YWNrKGVyci5hcGlGbkNoYWluLCBlcnIuYXBpRm5JbmRleCwgdmlld3BvcnRXaWR0aCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbEVsZW1lbnRJc0ludmlzaWJsZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgbm90IHZpc2libGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQWRkaXRpb25hbFNlbGVjdG9yTWF0Y2hlc1dyb25nTm9kZVR5cGVFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgZXhwZWN0ZWQgdG8gbWF0Y2ggYSBET00gZWxlbWVudCwgYnV0IGl0IG1hdGNoZXMgYSAke2Vyci5ub2RlRGVzY3JpcHRpb259IG5vZGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vbkVkaXRhYmxlRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBhY3Rpb24gZWxlbWVudCBpcyBleHBlY3RlZCB0byBiZSBlZGl0YWJsZSAoYW4gaW5wdXQsIHRleHRhcmVhIG9yIGVsZW1lbnQgd2l0aCB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSkuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudE5vbkNvbnRlbnRFZGl0YWJsZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgXCIke2Vyci5hcmd1bWVudE5hbWV9XCIgaXMgZXhwZWN0ZWQgdG8gaGF2ZSB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSBlbmFibGVkIG9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblJvb3RDb250YWluZXJOb3RGb3VuZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IGJldHdlZW4gdGhlIGFjdGlvbiBlbGVtZW50cyBjYW5ub3QgYmUgc2VsZWN0ZWQgYmVjYXVzZSB0aGUgcm9vdCBjb250YWluZXIgZm9yIHRoZSBzZWxlY3Rpb24gcmFuZ2UgY2Fubm90IGJlIGZvdW5kLCBpLmUuIHRoZXNlIGVsZW1lbnRzIGRvIG5vdCBoYXZlIGEgY29tbW9uIGFuY2VzdG9yIHdpdGggdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uRWxlbWVudElzTm90RmlsZUlucHV0RXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgc2VsZWN0b3IgZG9lcyBub3QgbWF0Y2ggYSBmaWxlIGlucHV0IGVsZW1lbnQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uQ2Fubm90RmluZEZpbGVUb1VwbG9hZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQ2Fubm90IGZpbmQgdGhlIGZvbGxvd2luZyBmaWxlKHMpIHRvIHVwbG9hZDpcbiAgICAgICAgJHtlcnIuZmlsZVBhdGhzLm1hcChwYXRoID0+IGVzY2FwZUh0bWwocGF0aCkpLmpvaW4oJ1xcbicpfVxuXG4gICAgICAgIFRoZSBmb2xsb3dpbmcgbG9jYXRpb25zIHdlcmUgc2Nhbm5lZCBmb3IgdGhlIG1pc3NpbmcgdXBsb2FkIGZpbGVzOlxuICAgICAgICAke2Vyci5zY2FubmVkRmlsZVBhdGhzLm1hcChwYXRoID0+IGVzY2FwZUh0bWwocGF0aCkpLmpvaW4oJ1xcbicpfVxuXG4gICAgICAgIEVuc3VyZSB0aGVzZSBmaWxlcyBleGlzdCBvciBjaGFuZ2UgdGhlIHdvcmtpbmcgZGlyZWN0b3J5LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RUZXh0QXJlYUVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgYWN0aW9uIGVsZW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgYSAmbHQ7dGV4dGFyZWEmZ3Q7LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkVsZW1lbnROb3RJZnJhbWVFcnJvcl06ICgpID0+IGBcbiAgICAgICAgVGhlIGFjdGlvbiBlbGVtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGFuICZsdDtpZnJhbWUmZ3QuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYWN0aW9uSW5jb3JyZWN0S2V5c0Vycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IGNvbnRhaW5zIGFuIGluY29ycmVjdCBrZXkgb3Iga2V5IGNvbWJpbmF0aW9uLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblVuc3VwcG9ydGVkRGV2aWNlVHlwZUVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlIFwiJHtlcnIuYXJndW1lbnROYW1lfVwiIGFyZ3VtZW50IHNwZWNpZmllcyBhbiB1bnN1cHBvcnRlZCBcIiR7ZXJyLmFjdHVhbFZhbHVlfVwiIGRldmljZS4gRm9yIGEgbGlzdCBvZiBzdXBwb3J0ZWQgZGV2aWNlcywgcmVmZXIgdG8gJHtmb3JtYXRVcmwoRVhURVJOQUxfTElOS1Mudmlld3BvcnRTaXplcyl9LlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvbkludmFsaWRTY3JvbGxUYXJnZXRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIFVuYWJsZSB0byBzY3JvbGwgdG8gdGhlIHNwZWNpZmllZCBwb2ludCBiZWNhdXNlIGEgcG9pbnQgd2l0aCB0aGUgc3BlY2lmaWVkICR7ZXJyLnByb3BlcnRpZXN9IGlzIG5vdCBsb2NhdGVkIGluc2lkZSB0aGUgZWxlbWVudCdzIGNyb3BwaW5nIHJlZ2lvbi5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hY3Rpb25JZnJhbWVJc05vdExvYWRlZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IG9mIHRoZSBpZnJhbWUgdG8gd2hpY2ggeW91IGFyZSBzd2l0Y2hpbmcgZGlkIG5vdCBsb2FkLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmN1cnJlbnRJZnJhbWVJc05vdExvYWRlZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBDb250ZW50IG9mIHRoZSBpZnJhbWUgaW4gd2hpY2ggdGhlIHRlc3QgaXMgY3VycmVudGx5IG9wZXJhdGluZyBkaWQgbm90IGxvYWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY3VycmVudElmcmFtZU5vdEZvdW5kRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFRoZSBpZnJhbWUgaW4gd2hpY2ggdGhlIHRlc3QgaXMgY3VycmVudGx5IG9wZXJhdGluZyBkb2VzIG5vdCBleGlzdCBhbnltb3JlLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmN1cnJlbnRJZnJhbWVJc0ludmlzaWJsZUVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgaWZyYW1lIGluIHdoaWNoIHRoZSB0ZXN0IGlzIGN1cnJlbnRseSBvcGVyYXRpbmcgaXMgbm90IHZpc2libGUgYW55bW9yZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5taXNzaW5nQXdhaXRFcnJvcl06ICgpID0+IGBcbiAgICAgICAgQSBjYWxsIHRvIGFuIGFzeW5jIGZ1bmN0aW9uIGlzIG5vdCBhd2FpdGVkLiBVc2UgdGhlIFwiYXdhaXRcIiBrZXl3b3JkIGJlZm9yZSBhY3Rpb25zLCBhc3NlcnRpb25zIG9yIGNoYWlucyBvZiB0aGVtIHRvIGVuc3VyZSB0aGF0IHRoZXkgcnVuIGluIHRoZSByaWdodCBzZXF1ZW5jZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5leHRlcm5hbEFzc2VydGlvbkxpYnJhcnlFcnJvcl06IGVyciA9PiBgXG4gICAgICAgICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5kb21Ob2RlQ2xpZW50RnVuY3Rpb25SZXN1bHRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgJHtlcnIuaW5zdGFudGlhdGlvbkNhbGxzaXRlTmFtZX0gY2Fubm90IHJldHVybiBET00gZWxlbWVudHMuIFVzZSBTZWxlY3RvciBmdW5jdGlvbnMgZm9yIHRoaXMgcHVycG9zZS5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5pbnZhbGlkU2VsZWN0b3JSZXN1bHRFcnJvcl06ICgpID0+IGBcbiAgICAgICAgRnVuY3Rpb24gdGhhdCBzcGVjaWZpZXMgYSBzZWxlY3RvciBjYW4gb25seSByZXR1cm4gYSBET00gbm9kZSwgYW4gYXJyYXkgb2Ygbm9kZXMsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiwgbnVsbCBvciB1bmRlZmluZWQuIFVzZSBDbGllbnRGdW5jdGlvbiB0byByZXR1cm4gb3RoZXIgdmFsdWVzLlxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmFjdGlvblNlbGVjdG9yRXJyb3JdOiBlcnIgPT4gYFxuICAgICAgICBBY3Rpb24gXCIke2Vyci5zZWxlY3Rvck5hbWV9XCIgYXJndW1lbnQgZXJyb3I6XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLmNhbm5vdE9idGFpbkluZm9Gb3JFbGVtZW50U3BlY2lmaWVkQnlTZWxlY3RvckVycm9yXTogKGVyciwgdmlld3BvcnRXaWR0aCkgPT4gYFxuICAgICAgICBDYW5ub3Qgb2J0YWluIGluZm9ybWF0aW9uIGFib3V0IHRoZSBub2RlIGJlY2F1c2UgdGhlIHNwZWNpZmllZCBzZWxlY3RvciBkb2VzIG5vdCBtYXRjaCBhbnkgbm9kZSBpbiB0aGUgRE9NIHRyZWUuXG5cbiAgICAgICAgJHtmb3JtYXRTZWxlY3RvckNhbGxzdGFjayhlcnIuYXBpRm5DaGFpbiwgZXJyLmFwaUZuSW5kZXgsIHZpZXdwb3J0V2lkdGgpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLndpbmRvd0RpbWVuc2lvbnNPdmVyZmxvd0Vycm9yXTogKCkgPT4gYFxuICAgICAgICBVbmFibGUgdG8gcmVzaXplIHRoZSB3aW5kb3cgYmVjYXVzZSB0aGUgc3BlY2lmaWVkIHNpemUgZXhjZWVkcyB0aGUgc2NyZWVuIHNpemUuIE9uIG1hY09TLCBhIHdpbmRvdyBjYW5ub3QgYmUgbGFyZ2VyIHRoYW4gdGhlIHNjcmVlbi5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5mb3JiaWRkZW5DaGFyYWN0ZXJzSW5TY3JlZW5zaG90UGF0aEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgVGhlcmUgYXJlIGZvcmJpZGRlbiBjaGFyYWN0ZXJzIGluIHRoZSBcIiR7ZXJyLnNjcmVlbnNob3RQYXRofVwiIHNjcmVlbnNob3QgcGF0aDpcbiAgICAgICAgJHtyZW5kZXJGb3JiaWRkZW5DaGFyc0xpc3QoZXJyLmZvcmJpZGRlbkNoYXJzTGlzdCl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuaW52YWxpZEVsZW1lbnRTY3JlZW5zaG90RGltZW5zaW9uc0Vycm9yXTogZXJyID0+IGBcbiAgICAgICAgIFVuYWJsZSB0byBjYXB0dXJlIGFuIGVsZW1lbnQgaW1hZ2UgYmVjYXVzZSB0aGUgcmVzdWx0aW5nIGltYWdlICR7ZXJyLmRpbWVuc2lvbnN9ICR7ZXJyLnZlcmJ9IHplcm8gb3IgbmVnYXRpdmUuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMucm9sZVN3aXRjaEluUm9sZUluaXRpYWxpemVyRXJyb3JdOiAoKSA9PiBgXG4gICAgICAgIFJvbGUgY2Fubm90IGJlIHN3aXRjaGVkIHdoaWxlIGFub3RoZXIgcm9sZSBpcyBiZWluZyBpbml0aWFsaXplZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hc3NlcnRpb25FeGVjdXRhYmxlQXJndW1lbnRFcnJvcl06IGVyciA9PiBgXG4gICAgICAgIENhbm5vdCBldmFsdWF0ZSB0aGUgXCIke2Vyci5hY3R1YWxWYWx1ZX1cIiBleHByZXNzaW9uIGluIHRoZSBcIiR7ZXJyLmFyZ3VtZW50TmFtZX1cIiBwYXJhbWV0ZXIgYmVjYXVzZSBvZiB0aGUgZm9sbG93aW5nIGVycm9yOlxuXG4gICAgICAgICR7ZXJyLmVyck1zZ31cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5hc3NlcnRpb25XaXRob3V0TWV0aG9kQ2FsbEVycm9yXTogKCkgPT4gYFxuICAgICAgICBBbiBhc3NlcnRpb24gbWV0aG9kIGlzIG5vdCBzcGVjaWZpZWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuYXNzZXJ0aW9uVW5hd2FpdGVkUHJvbWlzZUVycm9yXTogKCkgPT4gYFxuICAgICAgICBBdHRlbXB0ZWQgdG8gcnVuIGFzc2VydGlvbnMgb24gYSBQcm9taXNlIG9iamVjdC4gRGlkIHlvdSBmb3JnZXQgdG8gYXdhaXQgaXQ/IElmIG5vdCwgcGFzcyBcInsgYWxsb3dVbmF3YWl0ZWRQcm9taXNlOiB0cnVlIH1cIiB0byB0aGUgYXNzZXJ0aW9uIG9wdGlvbnMuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMucmVxdWVzdEhvb2tOb3RJbXBsZW1lbnRlZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgWW91IHNob3VsZCBpbXBsZW1lbnQgdGhlIFwiJHtlcnIubWV0aG9kTmFtZX1cIiBtZXRob2QgaW4gdGhlIFwiJHtlcnIuaG9va0NsYXNzTmFtZX1cIiBjbGFzcy5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5yZXF1ZXN0SG9va1VuaGFuZGxlZEVycm9yXTogZXJyID0+IGBcbiAgICAgICAgQW4gdW5oYW5kbGVkIGVycm9yIG9jY3VycmVkIGluIHRoZSBcIiR7ZXJyLm1ldGhvZE5hbWV9XCIgbWV0aG9kIG9mIHRoZSBcIiR7ZXJyLmhvb2tDbGFzc05hbWV9XCIgY2xhc3M6XG5cbiAgICAgICAgJHtlc2NhcGVIdG1sKGVyci5lcnJNc2cpfVxuICAgIGAsXG5cbiAgICBbVEVTVF9SVU5fRVJST1JTLnVuY2F1Z2h0RXJyb3JJbkN1c3RvbUNsaWVudFNjcmlwdENvZGVdOiBlcnIgPT4gYFxuICAgICAgICBBbiBlcnJvciBvY2N1cnJlZCBpbiBhIHNjcmlwdCBpbmplY3RlZCBpbnRvIHRoZSB0ZXN0ZWQgcGFnZTpcblxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluQ3VzdG9tQ2xpZW50U2NyaXB0Q29kZUxvYWRlZEZyb21Nb2R1bGVdOiBlcnIgPT4gYFxuICAgICAgICBBbiBlcnJvciBvY2N1cnJlZCBpbiB0aGUgJyR7ZXJyLm1vZHVsZU5hbWV9JyBtb2R1bGUgaW5qZWN0ZWQgaW50byB0aGUgdGVzdGVkIHBhZ2UuIE1ha2Ugc3VyZSB0aGF0IHRoaXMgbW9kdWxlIGNhbiBiZSBleGVjdXRlZCBpbiB0aGUgYnJvd3NlciBlbnZpcm9ubWVudC5cblxuICAgICAgICBFcnJvciBkZXRhaWxzOlxuICAgICAgICAke2VzY2FwZUh0bWwoZXJyLmVyck1zZyl9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMudW5jYXVnaHRFcnJvckluQ3VzdG9tU2NyaXB0XTogZXJyID0+IGBcbiAgICAgICAgQW4gdW5oYW5kbGVkIGVycm9yIG9jY3VycmVkIGluIHRoZSBjdXN0b20gc2NyaXB0OlxuXG4gICAgICAgIEVycm9yIGRldGFpbHM6ICR7ZXNjYXBlSHRtbChlcnIuZXJyTXNnKX1cblxuICAgICAgICAke2Zvcm1hdEV4cHJlc3Npb25NZXNzYWdlKGVyci5leHByZXNzaW9uLCBlcnIubGluZSwgZXJyLmNvbHVtbil9XG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2hpbGRXaW5kb3dJc05vdExvYWRlZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgcGFnZSBpbiB0aGUgY2hpbGQgd2luZG93IGlzIG5vdCBsb2FkZWQuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2hpbGRXaW5kb3dOb3RGb3VuZEVycm9yXTogKCkgPT4gYFxuICAgICAgICBUaGUgY2hpbGQgd2luZG93IGlzIG5vdCBmb3VuZC5cbiAgICBgLFxuXG4gICAgW1RFU1RfUlVOX0VSUk9SUy5jYW5ub3RTd2l0Y2hUb1dpbmRvd0Vycm9yXTogKCkgPT4gYFxuICAgICAgICBDYW5ub3Qgc3dpdGNoIHRvIHRoZSB3aW5kb3cuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2xvc2VDaGlsZFdpbmRvd0Vycm9yXTogKCkgPT4gYFxuICAgICAgICBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBjbG9zaW5nIGNoaWxkIHdpbmRvd3MuXG4gICAgYCxcblxuICAgIFtURVNUX1JVTl9FUlJPUlMuY2hpbGRXaW5kb3dDbG9zZWRCZWZvcmVTd2l0Y2hpbmdFcnJvcl06ICgpID0+IGBcbiAgICAgICAgVGhlIGNoaWxkIHdpbmRvdyB3YXMgY2xvc2VkIGJlZm9yZSBUZXN0Q2FmZSBjb3VsZCBzd2l0Y2ggdG8gaXQuXG4gICAgYFxufTtcbiJdfQ==