import sendEmail from "./email-lib";

it('Email Stub', async () => {

  const response =  sendEmail("foo");
  expect(response).toBeInstanceOf(Promise)

});



it('email Offline Stub', async () => {

  process.env.IS_OFFLINE=true
  const response =  sendEmail("foo");
  expect(response).toBeInstanceOf(Promise)

});
