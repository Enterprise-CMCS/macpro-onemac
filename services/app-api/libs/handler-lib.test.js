import handler from "./handler-lib";

const testLambda = jest.fn();

const warmupResponse = {
  statusCode: 200,
  body: null,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

describe("test the handler handling", () => {
  it("returns null with source of warmup", () => {
    const event = { source: "serverless-plugin-warmup" };
    const main = handler(testLambda);

    main(event)
      .then((data) => {
        expect(data).toMatchObject(warmupResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
