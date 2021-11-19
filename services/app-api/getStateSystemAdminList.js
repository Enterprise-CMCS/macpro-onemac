import { USER_TYPE, latestAccessStatus } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { queryForUserType } from "./libs/user-table-lib";

// Gets active state system admins by state code
export const main = handler(async (event) => {
  // get the list of states we care about
  const states = event.multiValueQueryStringParameters.state;

  if (!Array.isArray(states) || !states.length) {
    console.warn("No states passed to query on.");
    return {};
  }

  return (await queryForUserType(USER_TYPE.STATE_SYSTEM_ADMIN)).reduce(
    (output, admin) => {
      for (const state of states) {
        if (latestAccessStatus(admin, state) === "active") {
          if (!output[state]) output[state] = [];

          output[state].push({
            email: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
          });
        }
      }

      return output;
    },
    {}
  );
});
