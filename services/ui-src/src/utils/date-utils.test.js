import {formatDate, formatDateOnly} from "./date-utils";

it("formats correctly", () => {
    const response = formatDate(1638462874431)
    expect(response).toBe("Thu, Dec 2 2021, 10:34:34 AM")

    const response2 = formatDateOnly(1638462874431)
    expect(response2).toBe("Thu, Dec 2 2021")

});
