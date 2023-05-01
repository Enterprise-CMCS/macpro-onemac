import handler from "./libs/handler-lib";

export const main = handler(async () => {
  // wait for 10 seconds before exiting
  await new Promise(resolve => setTimeout(resolve, 10000));
  return "Done";
});
