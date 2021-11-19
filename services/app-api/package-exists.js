import handler from "./libs/handler-lib";
import packageExists from "./utils/packageExists";

export const main = handler(async (event) => {
  console.log("being Handled... id is: " + event.pathParameters.packageId);
  const doesExist = await packageExists(event.pathParameters.packageId);

  console.log("doesExist is: " + doesExist);

  return doesExist;
});
