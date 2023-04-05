import { DateTime } from "luxon";

export function getCMSDateFormat(theTimestamp) {
  const theDate = DateTime.fromMillis(theTimestamp).setZone("America/New_York");

  return theDate.toFormat("DDDD '@' t ZZZZ");
}
