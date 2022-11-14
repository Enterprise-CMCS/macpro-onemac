import handler from "./libs/handler-lib";

export const main = handler(async (event) => {
  console.log("One Stream event: ", event);
});
