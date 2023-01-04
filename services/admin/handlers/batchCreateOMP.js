/* eslint-disable no-prototype-builtins */
import csv from "csvtojson";

import { createOneMacPackage } from "./createOneMacPackage";

function validateEvent(event) {
  //validate required input params
  if (!event.csvPackages) {
    throw new Error(
      "Missing event parameter - csvPackages: must be a csv string of package objects"
    );
  }
}

/**
 * Create OneMAC "packages" from a csv of details.  This is to "import"
 * SEA Tool packages so they can be acted upon using OneMAC.
 *
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("batchCreateOMP.main", event);

  validateEvent(event);

  const packageArray = await csv().fromString(event.csvPackages);

  await Promise.all(packageArray.map(createOneMacPackage));

  console.log("\n\n------ END OF RUN REPORT ------");

  return "Update Complete";
};
