import { USER_TYPE } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { queryForUserRole } from "./libs/user-table-lib";

// Gets active state system admins by state code
export const main = handler(async (event) => {
  // get the list of states we care about
  const territories = event.multiValueQueryStringParameters.state;
  if (!Array.isArray(territories) || !territories.length) {
    console.warn("No states passed to query on.");
    return {};
  }

  const ssaList = {};

  return Promise.all(
    territories.map(async (territory) => {
      ssaList[territory] = await queryForUserRole(
        USER_TYPE.STATE_SYSTEM_ADMIN,
        territory
      );
      console.log("results are: ", ssaList[territory]);

      return ssaList;
    })
  )
    .then((values) => {
      console.log("the promises resolve to: ", values);
      return values;
    })
    .catch((error) => {
      console.log("error is: ", error);
      return error;
    });
});
