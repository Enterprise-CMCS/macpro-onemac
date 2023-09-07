import handler from "./libs/handler-lib";
import packageExists from "./utils/packageExists";

export const main = handler(async (event) => {
  const doesExist = await packageExists(event.pathParameters.packageId);

  return doesExist;
});
