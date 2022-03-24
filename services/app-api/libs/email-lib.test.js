import sendEmail from "./email-lib";

const testEmail = {
  toAddresses: "1,2",
  subject: "subject",
  HTML: "<p>HTML stuff</p>",
  fromAddressSource: "from",
};

it("email Offline Stub", async () => {
  process.env.IS_OFFLINE = true;
  const response = sendEmail(testEmail);
  expect(response).toBeInstanceOf(Promise);
});
