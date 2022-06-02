import updateWithVersion from "./updateWithVersion";
import updateComponent from "./updateComponent";

jest.mock("./updateWithVersion");
updateWithVersion.mockResolvedValue({});

const testData = {
  submissionTimestamp: "timestamp",
  submissionId: "submissionid",
  submitterId: "submitterId",
  submitterName: "submitterName",
  submitterEmail: "submitterEmail",
  attachments: ["attachments"],
  additionalInformation: "additionalInformation",
};
const testConfig = {
  allowMultiplesWithSameId: true,
};

it("calls the update", () => {
  const testData = {
    submissionTimestamp: "timestamp",
    submissionId: "submissionid",
    submitterId: "submitterId",
    submitterName: "submitterName",
    submitterEmail: "submitterEmail",
    attachments: ["attachments"],
    additionalInformation: "additionalInformation",
  };
  const testConfig = {
    allowMultiplesWithSameId: true,
  };

  expect(updateComponent(testData, testConfig))
    .resolves.toStrictEqual({})
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices when the parent component doesn't exist", async () => {
  updateWithVersion.mockImplementation(() => {
    const theError = new Error();
    theError.code = "ConditionalCheckFailedException";
    theError.message = "an error";
    throw theError;
  });

  expect(updateComponent(testData, testConfig))
    .resolves.toStrictEqual(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices other errors", async () => {
  updateWithVersion.mockImplementation(() => {
    const theError = new Error();
    theError.code = "NOTConditionalCheckFailedException";
    theError.message = "an error";
    throw theError;
  });
  expect(updateComponent(testData, testConfig))
    .resolves.toStrictEqual(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
