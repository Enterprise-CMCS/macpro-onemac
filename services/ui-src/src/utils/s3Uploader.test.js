import {
  ensureLowerCaseFileExtension,
  // uploadFile,
  uploadFiles,
} from "./s3Uploader";
import { Storage } from "aws-amplify";
jest.mock("aws-amplify");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ensureLowerCaseFileExtension function", () => {
  it("returns the original file if the extension is already lowercase", () => {
    const originalFile = new File(["I am a test file."], "test.txt", {
      type: "text/plain",
    });
    const returnedFile = ensureLowerCaseFileExtension(originalFile);

    expect(returnedFile).toBe(originalFile);
  });

  it("returns a copy of the file with a lowercase extension if the extension isn't lowercase", () => {
    const originalFile = new File(["I am a test file."], "test.TXT", {
      type: "text/plain",
    });
    const returnedFile = ensureLowerCaseFileExtension(originalFile);

    expect(returnedFile).not.toBe(originalFile);
    expect(returnedFile.name).toBe("test.txt");
  });

  it("ensures that a file copy contains the added 'title' key", () => {
    const title = "Super Title";

    const originalFile = new File(["I am a test file."], "test.TXT", {
      type: "text/plain",
    });
    originalFile.title = title;

    const returnedFile = ensureLowerCaseFileExtension(originalFile);

    expect(returnedFile.title).toBe(title);
  });
});

it("exists without crashing", () => {
  // const originalFile = new File(["I am a test file."], "test.TXT", {
  //   type: "text/plain",
  // });
  // Storage.put.mockResolvedValue({ key: "theKeyToTheUniverse" });
  // Storage.get.mockResolvedValue({ url: "whatwillthisdo?ignorethispart" });
  // expect(uploadFiles([originalFile]))
  //   .rejects.toEqual("AT001")
  //   .catch((error) => {
  //     console.log("caught test error: ", error);
  //   });
});
