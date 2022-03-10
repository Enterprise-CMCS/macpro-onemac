import handler from "./libs/handler-lib";

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  return "Done";
});
