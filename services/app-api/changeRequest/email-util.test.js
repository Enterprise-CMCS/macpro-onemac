import {
  getCMSDateFormat,
  getCMSDateFormatNow,
  getLinksHtml,
} from "./email-util";

it("Change Request Types", async () => {
  const response = getLinksHtml([{ title: "foox" }]);
  expect(response.includes("foox")).toBe(true);

  const response2 = getCMSDateFormatNow(1631626754502);
  expect(response2).toBe("Tuesday, September 14, 2021 @ 9:39 AM EDT");

  const response3 = getCMSDateFormat(1631626754502);
  expect(response3).toBe("Tuesday, September 14, 2021 @ 11:59pm EDT");
});
