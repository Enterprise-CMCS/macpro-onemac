"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const strip_bom_1 = __importDefault(require("strip-bom"));
const promisified_functions_1 = require("../utils/promisified-functions");
const runtime_1 = require("../errors/runtime");
const types_1 = require("../errors/types");
const compilers_1 = require("./compilers");
const SOURCE_CHUNK_LENGTH = 1000;
class Compiler {
    constructor(sources, options) {
        this.sources = sources;
        compilers_1.initTestFileCompilers(options);
    }
    static getSupportedTestFileExtensions() {
        return lodash_1.uniq(compilers_1.getTestFileCompilers().map(compiler => compiler.getSupportedExtension()));
    }
    async _createTestFileInfo(filename) {
        let code = null;
        try {
            code = await promisified_functions_1.readFile(filename);
        }
        catch (err) {
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindSpecifiedTestSource, filename);
        }
        code = strip_bom_1.default(code).toString();
        const compiler = lodash_1.find(compilers_1.getTestFileCompilers(), someCompiler => someCompiler.canCompile(code, filename));
        if (!compiler)
            return null;
        return {
            filename,
            code,
            compiler,
            compiledCode: null
        };
    }
    async _createTestFilesInfo(filenames) {
        const testFilesInfo = await Promise.all(filenames.map(filename => this._createTestFileInfo(filename)));
        return testFilesInfo.filter(info => !!info);
    }
    async _precompileFiles(compiler, testFilesInfo) {
        if (!compiler.canPrecompile)
            return;
        const precompiledCode = await compiler.precompile(testFilesInfo);
        for (let i = 0; i < testFilesInfo.length; i++)
            testFilesInfo[i].compiledCode = precompiledCode[i];
    }
    _getCompilerTasks(testFilesInfo) {
        const tasks = new WeakMap();
        const compilers = [];
        for (const info of testFilesInfo) {
            const { compiler } = info;
            if (!tasks.has(compiler)) {
                compilers.push(compiler);
                tasks.set(compiler, []);
            }
            tasks.get(info.compiler).push(info);
        }
        return compilers.map(compiler => ({ compiler, compilerTestFilesInfo: tasks.get(compiler) }));
    }
    async _getTests({ compiler, filename, code, compiledCode }) {
        if (compiledCode)
            return await compiler.execute(compiledCode, filename);
        return await compiler.compile(code, filename);
    }
    async _compileTestFiles(filenames) {
        const testFilesInfo = await this._createTestFilesInfo(filenames);
        const compilerTasks = this._getCompilerTasks(testFilesInfo);
        await Promise.all(compilerTasks.map(({ compiler, compilerTestFilesInfo }) => this._precompileFiles(compiler, compilerTestFilesInfo)));
        const tests = [];
        for (const info of testFilesInfo)
            tests.push(await this._getTests(info));
        return tests;
    }
    async getTests() {
        // NOTE: split sources into chunks because the fs module can't read all files
        // simultaneously if the number of them is too large (several thousands).
        const sourceChunks = lodash_1.chunk(this.sources, SOURCE_CHUNK_LENGTH);
        let tests = [];
        while (sourceChunks.length)
            tests = tests.concat(await this._compileTestFiles(sourceChunks.shift()));
        Compiler.cleanUp();
        return lodash_1.flattenDeep(tests).filter(test => !!test);
    }
    static cleanUp() {
        compilers_1.getTestFileCompilers().forEach(compiler => compiler.cleanUp());
    }
}
exports.default = Compiler;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcGlsZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBd0Q7QUFDeEQsMERBQWlDO0FBQ2pDLDBFQUEwRDtBQUMxRCwrQ0FBaUQ7QUFDakQsMkNBQWlEO0FBQ2pELDJDQUEwRTtBQUcxRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUVqQyxNQUFxQixRQUFRO0lBQ3pCLFlBQWEsT0FBTyxFQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsaUNBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FBQyw4QkFBOEI7UUFDakMsT0FBTyxhQUFJLENBQUMsZ0NBQW9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELEtBQUssQ0FBQyxtQkFBbUIsQ0FBRSxRQUFRO1FBQy9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJO1lBQ0EsSUFBSSxHQUFHLE1BQU0sZ0NBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1IsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQWMsQ0FBQyw2QkFBNkIsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpDLE1BQU0sUUFBUSxHQUFHLGFBQUksQ0FBQyxnQ0FBb0IsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUV2RyxJQUFJLENBQUMsUUFBUTtZ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QyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFM0MsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1YsNkVBQTZFO1FBQzdFLHlFQUF5RTtRQUN6RSxNQUFNLFlBQVksR0FBRyxjQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRTlELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVmLE9BQU8sWUFBWSxDQUFDLE1BQU07WUFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU3RSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkIsT0FBTyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU87UUFDVixnQ0FBb0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSjtBQTlHRCwyQkE4R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmbGF0dGVuRGVlcCwgZmluZCwgY2h1bmssIHVuaXEgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHN0cmlwQm9tIGZyb20gJ3N0cmlwLWJvbSc7XG5pbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gJy4uL3V0aWxzL3Byb21pc2lmaWVkLWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBHZW5lcmFsRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBSVU5USU1FX0VSUk9SUyB9IGZyb20gJy4uL2Vycm9ycy90eXBlcyc7XG5pbXBvcnQgeyBnZXRUZXN0RmlsZUNvbXBpbGVycywgaW5pdFRlc3RGaWxlQ29tcGlsZXJzIH0gZnJvbSAnLi9jb21waWxlcnMnO1xuXG5cbmNvbnN0IFNPVVJDRV9DSFVOS19MRU5HVEggPSAxMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21waWxlciB7XG4gICAgY29uc3RydWN0b3IgKHNvdXJjZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBpbml0VGVzdEZpbGVDb21waWxlcnMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFN1cHBvcnRlZFRlc3RGaWxlRXh0ZW5zaW9ucyAoKSB7XG4gICAgICAgIHJldHVybiB1bmlxKGdldFRlc3RGaWxlQ29tcGlsZXJzKCkubWFwKGNvbXBpbGVyID0+IGNvbXBpbGVyLmdldFN1cHBvcnRlZEV4dGVuc2lvbigpKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2NyZWF0ZVRlc3RGaWxlSW5mbyAoZmlsZW5hbWUpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBudWxsO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb2RlID0gYXdhaXQgcmVhZEZpbGUoZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90RmluZFNwZWNpZmllZFRlc3RTb3VyY2UsIGZpbGVuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvZGUgPSBzdHJpcEJvbShjb2RlKS50b1N0cmluZygpO1xuXG4gICAgICAgIGNvbnN0IGNvbXBpbGVyID0gZmluZChnZXRUZXN0RmlsZUNvbXBpbGVycygpLCBzb21lQ29tcGlsZXIgPT4gc29tZUNvbXBpbGVyLmNhbkNvbXBpbGUoY29kZSwgZmlsZW5hbWUpKTtcblxuICAgICAgICBpZiAoIWNvbXBpbGVyKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGVuYW1lLFxuICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgIGNvbXBpbGVyLFxuXG4gICAgICAgICAgICBjb21waWxlZENvZGU6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBfY3JlYXRlVGVzdEZpbGVzSW5mbyAoZmlsZW5hbWVzKSB7XG4gICAgICAgIGNvbnN0IHRlc3RGaWxlc0luZm8gPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlbmFtZXMubWFwKGZpbGVuYW1lID0+IHRoaXMuX2NyZWF0ZVRlc3RGaWxlSW5mbyhmaWxlbmFtZSkpKTtcblxuICAgICAgICByZXR1cm4gdGVzdEZpbGVzSW5mby5maWx0ZXIoaW5mbyA9PiAhIWluZm8pO1xuICAgIH1cblxuICAgIGFzeW5jIF9wcmVjb21waWxlRmlsZXMgKGNvbXBpbGVyLCB0ZXN0RmlsZXNJbmZvKSB7XG4gICAgICAgIGlmICghY29tcGlsZXIuY2FuUHJlY29tcGlsZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBwcmVjb21waWxlZENvZGUgPSBhd2FpdCBjb21waWxlci5wcmVjb21waWxlKHRlc3RGaWxlc0luZm8pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdEZpbGVzSW5mby5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRlc3RGaWxlc0luZm9baV0uY29tcGlsZWRDb2RlID0gcHJlY29tcGlsZWRDb2RlW2ldO1xuICAgIH1cblxuICAgIF9nZXRDb21waWxlclRhc2tzICh0ZXN0RmlsZXNJbmZvKSB7XG4gICAgICAgIGNvbnN0IHRhc2tzICAgICA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVycyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiB0ZXN0RmlsZXNJbmZvKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbXBpbGVyIH0gPSBpbmZvO1xuXG4gICAgICAgICAgICBpZiAoIXRhc2tzLmhhcyhjb21waWxlcikpIHtcbiAgICAgICAgICAgICAgICBjb21waWxlcnMucHVzaChjb21waWxlcik7XG4gICAgICAgICAgICAgICAgdGFza3Muc2V0KGNvbXBpbGVyLCBbXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhc2tzLmdldChpbmZvLmNvbXBpbGVyKS5wdXNoKGluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVycy5tYXAoY29tcGlsZXIgPT4gKHsgY29tcGlsZXIsIGNvbXBpbGVyVGVzdEZpbGVzSW5mbzogdGFza3MuZ2V0KGNvbXBpbGVyKSB9KSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2dldFRlc3RzICh7IGNvbXBpbGVyLCBmaWxlbmFtZSwgY29kZSwgY29tcGlsZWRDb2RlIH0pIHtcbiAgICAgICAgaWYgKGNvbXBpbGVkQ29kZSlcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBjb21waWxlci5leGVjdXRlKGNvbXBpbGVkQ29kZSwgZmlsZW5hbWUpO1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBjb21waWxlci5jb21waWxlKGNvZGUsIGZpbGVuYW1lKTtcbiAgICB9XG5cbiAgICBhc3luYyBfY29tcGlsZVRlc3RGaWxlcyAoZmlsZW5hbWVzKSB7XG4gICAgICAgIGNvbnN0IHRlc3RGaWxlc0luZm8gPSBhd2FpdCB0aGlzLl9jcmVhdGVUZXN0RmlsZXNJbmZvKGZpbGVuYW1lcyk7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVyVGFza3MgPSB0aGlzLl9nZXRDb21waWxlclRhc2tzKHRlc3RGaWxlc0luZm8pO1xuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGNvbXBpbGVyVGFza3MubWFwKCh7IGNvbXBpbGVyLCBjb21waWxlclRlc3RGaWxlc0luZm8gfSkgPT4gdGhpcy5fcHJlY29tcGlsZUZpbGVzKGNvbXBpbGVyLCBjb21waWxlclRlc3RGaWxlc0luZm8pKSk7XG5cbiAgICAgICAgY29uc3QgdGVzdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgdGVzdEZpbGVzSW5mbylcbiAgICAgICAgICAgIHRlc3RzLnB1c2goYXdhaXQgdGhpcy5fZ2V0VGVzdHMoaW5mbykpO1xuXG4gICAgICAgIHJldHVybiB0ZXN0cztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRUZXN0cyAoKSB7XG4gICAgICAgIC8vIE5PVEU6IHNwbGl0IHNvdXJjZXMgaW50byBjaHVua3MgYmVjYXVzZSB0aGUgZnMgbW9kdWxlIGNhbid0IHJlYWQgYWxsIGZpbGVzXG4gICAgICAgIC8vIHNpbXVsdGFuZW91c2x5IGlmIHRoZSBudW1iZXIgb2YgdGhlbSBpcyB0b28gbGFyZ2UgKHNldmVyYWwgdGhvdXNhbmRzKS5cbiAgICAgICAgY29uc3Qgc291cmNlQ2h1bmtzID0gY2h1bmsodGhpcy5zb3VyY2VzLCBTT1VSQ0VfQ0hVTktfTEVOR1RIKTtcblxuICAgICAgICBsZXQgdGVzdHMgPSBbXTtcblxuICAgICAgICB3aGlsZSAoc291cmNlQ2h1bmtzLmxlbmd0aClcbiAgICAgICAgICAgIHRlc3RzID0gdGVzdHMuY29uY2F0KGF3YWl0IHRoaXMuX2NvbXBpbGVUZXN0RmlsZXMoc291cmNlQ2h1bmtzLnNoaWZ0KCkpKTtcblxuICAgICAgICBDb21waWxlci5jbGVhblVwKCk7XG5cbiAgICAgICAgcmV0dXJuIGZsYXR0ZW5EZWVwKHRlc3RzKS5maWx0ZXIodGVzdCA9PiAhIXRlc3QpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhblVwICgpIHtcbiAgICAgICAgZ2V0VGVzdEZpbGVDb21waWxlcnMoKS5mb3JFYWNoKGNvbXBpbGVyID0+IGNvbXBpbGVyLmNsZWFuVXAoKSk7XG4gICAgfVxufVxuIl19