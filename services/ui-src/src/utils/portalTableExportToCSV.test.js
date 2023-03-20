import { portalTableExportToCSV } from "./portalTableExportToCSV";

const mockRows = [
  {
    cells: [
      { column: { Header: "SPA ID", id: "SPA ID" }, value: "123" },
      { column: { Header: "State", id: "State" }, value: "CA" },
      { column: { Header: "Type", id: "Type" }, value: "Residential" },
      { column: { Header: "Status", id: "Status" }, value: "Active" },
      {
        column: {
          Header: "Initial Submission Date",
          id: "Initial Submission Date",
        },
        value: 1646275200000,
      },
    ],
  },
];

const transformMap = {
  "Initial Submission Date": (cell) =>
    new Date(cell.value).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }),
};

describe("portalTableExportToCSV", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should export CSV with correct data and format", () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");
    const clickSpy = jest.fn();

    const linkMock = document.createElement("a");
    linkMock.click = clickSpy;
    createElementSpy.mockReturnValue(linkMock);

    portalTableExportToCSV(mockRows, transformMap, "Test Report");

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(appendChildSpy).toHaveBeenCalledWith(linkMock);
    expect(linkMock.href).toBe(
      "data:text/csv;charset=utf-8,SPA%20ID%2CState%2CType%2CStatus%2CInitial%20Submission%20Date%0D%0A%22123%22%2C%22CA%22%2C%22Residential%22%2C%22Active%22%2C%22Mar%2003%2C%202022%22%0D%0A"
    );
    expect(linkMock.download).toBe("Report_Test_Report.csv");
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(linkMock);
  });

  it("should display an alert when the generated CSV is empty", () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");
    const clickSpy = jest.fn();
    const linkMock = {
      href: "",
      style: "",
      download: "",
      click: clickSpy,
    };
    createElementSpy.mockReturnValue(linkMock);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    portalTableExportToCSV([], transformMap, "Empty Report");

    expect(alertSpy).toHaveBeenCalledWith("Invalid data");
    expect(createElementSpy).not.toHaveBeenCalled();
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
    expect(removeChildSpy).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
