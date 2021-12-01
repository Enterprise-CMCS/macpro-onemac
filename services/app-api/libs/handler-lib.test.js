import handler from "./handler-lib";

it('Handler Code Stub', async () => {

  const response = handler("")
  const response2 = response({ "source": "serverless-plugin-warmup"}, "foo")
  expect(response).toBeInstanceOf(Function)
  expect(response2).toBeInstanceOf(Promise)

});
