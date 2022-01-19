import { formatDate, formatDateOnly } from "./date-utils";

it("formats correctly", () => {
  const response = formatDate(1638462874431);
  expect(response).toMatch(/Thu, Dec 2 2021, \d{1,2}:34:34 [AP]M/);

  const response2 = formatDateOnly(1638462874431);
  expect(response2).toBe("Thu, Dec 2 2021");
});
