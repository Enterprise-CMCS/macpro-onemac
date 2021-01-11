"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_babel_libs_1 = __importDefault(require("../../../load-babel-libs"));
const api_based_1 = __importDefault(require("../../api-based"));
const BABEL_RUNTIME_RE = /^babel-runtime(\\|\/|$)/;
const FLOW_MARKER_RE = /^\s*\/\/\s*@flow\s*\n|^\s*\/\*\s*@flow\s*\*\//;
class ESNextTestFileCompiler extends api_based_1.default {
    static getBabelOptions(filename, code) {
        const { presetStage2, presetFlow, transformRuntime, transformClassProperties, presetEnv } = load_babel_libs_1.default();
        // NOTE: passPrePreset and complex presets is a workaround for https://github.com/babel/babel/issues/2877
        // Fixes https://github.com/DevExpress/testcafe/issues/969
        return {
            passPerPreset: true,
            presets: [
                {
                    passPerPreset: false,
                    presets: [{ plugins: [transformRuntime] }, presetStage2, presetEnv]
                },
                FLOW_MARKER_RE.test(code) ? {
                    passPerPreset: false,
                    presets: [{ plugins: [transformClassProperties] }, presetFlow]
                } : {}
            ],
            filename: filename,
            retainLines: true,
            sourceMaps: 'inline',
            ast: false,
            babelrc: false,
            highlightCode: false,
            resolveModuleSource: source => {
                if (source === 'testcafe')
                    return api_based_1.default.EXPORTABLE_LIB_PATH;
                if (BABEL_RUNTIME_RE.test(source)) {
                    try {
                        return require.resolve(source);
                    }
                    catch (err) {
                        return source;
                    }
                }
                return source;
            }
        };
    }
    _compileCode(code, filename) {
        const { babel } = load_babel_libs_1.default();
        if (this.cache[filename])
            return this.cache[filename];
        const opts = ESNextTestFileCompiler.getBabelOptions(filename, code);
        const compiled = babel.transform(code, opts);
        this.cache[filename] = compiled.code;
        return compiled.code;
    }
    _getRequireCompilers() {
        return { '.js': (code, filename) => this._compileCode(code, filename) };
    }
    getSupportedExtension() {
        return '.js';
    }
}
exports.default = ESNextTestFileCompiler;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGlsZXIvdGVzdC1maWxlL2Zvcm1hdHMvZXMtbmV4dC9jb21waWxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtFQUFxRDtBQUNyRCxnRUFBMkQ7QUFFM0QsTUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQztBQUNuRCxNQUFNLGNBQWMsR0FBSywrQ0FBK0MsQ0FBQztBQUV6RSxNQUFxQixzQkFBdUIsU0FBUSxtQkFBNEI7SUFDNUUsTUFBTSxDQUFDLGVBQWUsQ0FBRSxRQUFRLEVBQUUsSUFBSTtRQUNsQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsR0FBRyx5QkFBYSxFQUFFLENBQUM7UUFFNUcseUdBQXlHO1FBQ3pHLDBEQUEwRDtRQUMxRCxPQUFPO1lBQ0gsYUFBYSxFQUFFLElBQUk7WUFDbkIsT0FBTyxFQUFRO2dCQUNYO29CQUNJLGFBQWEsRUFBRSxLQUFLO29CQUNwQixPQUFPLEVBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDO2lCQUM1RTtnQkFDRCxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLE9BQU8sRUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQztpQkFDdkUsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUNUO1lBQ0QsUUFBUSxFQUFPLFFBQVE7WUFDdkIsV0FBVyxFQUFJLElBQUk7WUFDbkIsVUFBVSxFQUFLLFFBQVE7WUFDdkIsR0FBRyxFQUFZLEtBQUs7WUFDcEIsT0FBTyxFQUFRLEtBQUs7WUFDcEIsYUFBYSxFQUFFLEtBQUs7WUFFcEIsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQzFCLElBQUksTUFBTSxLQUFLLFVBQVU7b0JBQ3JCLE9BQU8sbUJBQTRCLENBQUMsbUJBQW1CLENBQUM7Z0JBRTVELElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMvQixJQUFJO3dCQUNBLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsT0FBTyxHQUFHLEVBQUU7d0JBQ1IsT0FBTyxNQUFNLENBQUM7cUJBQ2pCO2lCQUNKO2dCQUVELE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVksQ0FBRSxJQUFJLEVBQUUsUUFBUTtRQUN4QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcseUJBQWEsRUFBRSxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhDLE1BQU0sSUFBSSxHQUFPLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRXJDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBaEVELHlDQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2FkQmFiZWxMaWJzIGZyb20gJy4uLy4uLy4uL2xvYWQtYmFiZWwtbGlicyc7XG5pbXBvcnQgQVBJQmFzZWRUZXN0RmlsZUNvbXBpbGVyQmFzZSBmcm9tICcuLi8uLi9hcGktYmFzZWQnO1xuXG5jb25zdCBCQUJFTF9SVU5USU1FX1JFID0gL15iYWJlbC1ydW50aW1lKFxcXFx8XFwvfCQpLztcbmNvbnN0IEZMT1dfTUFSS0VSX1JFICAgPSAvXlxccypcXC9cXC9cXHMqQGZsb3dcXHMqXFxufF5cXHMqXFwvXFwqXFxzKkBmbG93XFxzKlxcKlxcLy87XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVTTmV4dFRlc3RGaWxlQ29tcGlsZXIgZXh0ZW5kcyBBUElCYXNlZFRlc3RGaWxlQ29tcGlsZXJCYXNlIHtcbiAgICBzdGF0aWMgZ2V0QmFiZWxPcHRpb25zIChmaWxlbmFtZSwgY29kZSkge1xuICAgICAgICBjb25zdCB7IHByZXNldFN0YWdlMiwgcHJlc2V0RmxvdywgdHJhbnNmb3JtUnVudGltZSwgdHJhbnNmb3JtQ2xhc3NQcm9wZXJ0aWVzLCBwcmVzZXRFbnYgfSA9IGxvYWRCYWJlbExpYnMoKTtcblxuICAgICAgICAvLyBOT1RFOiBwYXNzUHJlUHJlc2V0IGFuZCBjb21wbGV4IHByZXNldHMgaXMgYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzI4NzdcbiAgICAgICAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL0RldkV4cHJlc3MvdGVzdGNhZmUvaXNzdWVzLzk2OVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzc1BlclByZXNldDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXNldHM6ICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhc3NQZXJQcmVzZXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRzOiAgICAgICBbeyBwbHVnaW5zOiBbdHJhbnNmb3JtUnVudGltZV0gfSwgcHJlc2V0U3RhZ2UyLCBwcmVzZXRFbnZdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBGTE9XX01BUktFUl9SRS50ZXN0KGNvZGUpID8ge1xuICAgICAgICAgICAgICAgICAgICBwYXNzUGVyUHJlc2V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0czogICAgICAgW3sgcGx1Z2luczogW3RyYW5zZm9ybUNsYXNzUHJvcGVydGllc10gfSwgcHJlc2V0Rmxvd11cbiAgICAgICAgICAgICAgICB9IDoge31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmaWxlbmFtZTogICAgICBmaWxlbmFtZSxcbiAgICAgICAgICAgIHJldGFpbkxpbmVzOiAgIHRydWUsXG4gICAgICAgICAgICBzb3VyY2VNYXBzOiAgICAnaW5saW5lJyxcbiAgICAgICAgICAgIGFzdDogICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgYmFiZWxyYzogICAgICAgZmFsc2UsXG4gICAgICAgICAgICBoaWdobGlnaHRDb2RlOiBmYWxzZSxcblxuICAgICAgICAgICAgcmVzb2x2ZU1vZHVsZVNvdXJjZTogc291cmNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSAndGVzdGNhZmUnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQVBJQmFzZWRUZXN0RmlsZUNvbXBpbGVyQmFzZS5FWFBPUlRBQkxFX0xJQl9QQVRIO1xuXG4gICAgICAgICAgICAgICAgaWYgKEJBQkVMX1JVTlRJTUVfUkUudGVzdChzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5yZXNvbHZlKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX2NvbXBpbGVDb2RlIChjb2RlLCBmaWxlbmFtZSkge1xuICAgICAgICBjb25zdCB7IGJhYmVsIH0gPSBsb2FkQmFiZWxMaWJzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVbZmlsZW5hbWVdKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZmlsZW5hbWVdO1xuXG4gICAgICAgIGNvbnN0IG9wdHMgICAgID0gRVNOZXh0VGVzdEZpbGVDb21waWxlci5nZXRCYWJlbE9wdGlvbnMoZmlsZW5hbWUsIGNvZGUpO1xuICAgICAgICBjb25zdCBjb21waWxlZCA9IGJhYmVsLnRyYW5zZm9ybShjb2RlLCBvcHRzKTtcblxuICAgICAgICB0aGlzLmNhY2hlW2ZpbGVuYW1lXSA9IGNvbXBpbGVkLmNvZGU7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkLmNvZGU7XG4gICAgfVxuXG4gICAgX2dldFJlcXVpcmVDb21waWxlcnMgKCkge1xuICAgICAgICByZXR1cm4geyAnLmpzJzogKGNvZGUsIGZpbGVuYW1lKSA9PiB0aGlzLl9jb21waWxlQ29kZShjb2RlLCBmaWxlbmFtZSkgfTtcbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWRFeHRlbnNpb24gKCkge1xuICAgICAgICByZXR1cm4gJy5qcyc7XG4gICAgfVxufVxuIl19