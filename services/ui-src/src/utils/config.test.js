import config from "./config";

it("creates a configuration from environment variables", () => {
  expect(config).toMatchObject({
    MAX_ATTACHMENT_SIZE_MB: expect.any(Number),
    MAX_ADDITIONAL_INFO_LENGTH: expect.any(Number),
  });
});
