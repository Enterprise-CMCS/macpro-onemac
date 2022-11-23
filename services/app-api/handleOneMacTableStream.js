import handler from "./libs/handler-lib";

export const main = handler(async (event) => {
  console.log("handleOneMacTableStream got event: ", event);

  return null;
});
