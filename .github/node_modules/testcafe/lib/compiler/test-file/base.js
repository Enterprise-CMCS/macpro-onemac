"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class TestFileCompilerBase {
    constructor() {
        const escapedExt = lodash_1.escapeRegExp(this.getSupportedExtension());
        this.supportedExtensionRe = new RegExp(`${escapedExt}$`);
    }
    _hasTests( /* code */) {
        throw new Error('Not implemented');
    }
    getSupportedExtension() {
        throw new Error('Not implemented');
    }
    async precompile( /* testFilesInfo */) {
        throw new Error('Not implemented');
    }
    async compile( /* code, filename */) {
        throw new Error('Not implemented');
    }
    async execute( /* compiledCode, filename */) {
        throw new Error('Not implemented');
    }
    canCompile(code, filename) {
        return this.supportedExtensionRe.test(filename);
    }
    get canPrecompile() {
        return false;
    }
    cleanUp() {
        // NOTE: Optional. Do nothing by default.
    }
}
exports.default = TestFileCompilerBase;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrRDtBQUVsRCxNQUFxQixvQkFBb0I7SUFDckM7UUFDSSxNQUFNLFVBQVUsR0FBRyxxQkFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsU0FBUyxFQUFFLFVBQVU7UUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxFQUFFLG1CQUFtQjtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLEVBQUUsb0JBQW9CO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sRUFBRSw0QkFBNEI7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxVQUFVLENBQUUsSUFBSSxFQUFFLFFBQVE7UUFDdEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTztRQUNILHlDQUF5QztJQUM3QyxDQUFDO0NBQ0o7QUF0Q0QsdUNBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXNjYXBlUmVnRXhwIGFzIGVzY2FwZVJlIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdEZpbGVDb21waWxlckJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgY29uc3QgZXNjYXBlZEV4dCA9IGVzY2FwZVJlKHRoaXMuZ2V0U3VwcG9ydGVkRXh0ZW5zaW9uKCkpO1xuXG4gICAgICAgIHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9uUmUgPSBuZXcgUmVnRXhwKGAke2VzY2FwZWRFeHR9JGApO1xuICAgIH1cblxuICAgIF9oYXNUZXN0cyAoLyogY29kZSAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIGdldFN1cHBvcnRlZEV4dGVuc2lvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJlY29tcGlsZSAoLyogdGVzdEZpbGVzSW5mbyAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIGFzeW5jIGNvbXBpbGUgKC8qIGNvZGUsIGZpbGVuYW1lICovKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZXhlY3V0ZSAoLyogY29tcGlsZWRDb2RlLCBmaWxlbmFtZSAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIGNhbkNvbXBpbGUgKGNvZGUsIGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZEV4dGVuc2lvblJlLnRlc3QoZmlsZW5hbWUpO1xuICAgIH1cblxuICAgIGdldCBjYW5QcmVjb21waWxlICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNsZWFuVXAgKCkge1xuICAgICAgICAvLyBOT1RFOiBPcHRpb25hbC4gRG8gbm90aGluZyBieSBkZWZhdWx0LlxuICAgIH1cbn1cbiJdfQ==