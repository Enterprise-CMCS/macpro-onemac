import { main } from "./batchUpdateChangeRequestId";

const mockQueryReturn = {
  Items: [
    {
      transmittalNumber: "MD-22-8585-0000",
      type: "spa",
      summary: "",
      userId: "abcde",
      id: "1234",
    },
  ],
};
jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      // just an object, not a function
      DocumentClient: jest.fn(() => ({
        query: () => {
          return {
            promise() {
              return Promise.resolve(mockQueryReturn);
            },
          };
        },
        update: () => {
          return {
            promise() {
              return Promise.resolve({});
            },
          };
        },
      })),
    },
  };
});
jest.mock("aws-sdk/clients/dynamodb", () => {
  return {
    DocumentClient: jest.fn(() => ({
      query: () => {
        return {
          promise() {
            return Promise.resolve({});
          },
        };
      },
    })),
  };
});

it("calls update for each item in the dataset", async () => {
  const testEvent = {
    csvUpdates:
      "Old ID Format,Type,State,Date Submitted,Submitted By,New ID Format\nMD-22-8585-0000,Medicaid SPA,MD,15-Jul-22,Testy McTester,MD-22-8585",
  };

  const expectedResponse = "Update Complete";

  await expect(main(testEvent)).resolves.toBe(expectedResponse);
});

it("throws an error if the csvUpdates property is missing", async () => {
  await expect(main({}))
    .rejects.toThrow(
      "Missing event parameter - csvUpdates: must be a csv string of update objects"
    )
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("throws an error if the csvUpdates have invalid data", async () => {
  const testEvent = {
    //missing State property
    csvUpdates:
      "Old ID Format,Type,Date Submitted,Submitted By,New ID Format\nMD-22-8585-0000,Medicaid SPA,15-Jul-22,Testy McTester,MD-22-8585",
  };
  await expect(main(testEvent))
    .rejects.toThrow(
      'Invalid update object - missing properties on {"Old ID Format":"MD-22-8585-0000","Type":"spa","Date Submitted":"15-Jul-22","Submitted By":"Testy McTester","New ID Format":"MD-22-8585"}'
    )
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
