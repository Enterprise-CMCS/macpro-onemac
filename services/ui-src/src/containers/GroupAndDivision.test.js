import React from "react";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";

// import groupData from "cmscommonlib/groupDivision.json";
// console.log("groupData ", groupData);

// const testGroupData = [
//   {
//     "id": 0,
//     "abbr": "DEHPG",
//     "name": "Disabled & Elderly Health Programs Group",
//     "divisions": [
//       { "id": 9, "abbr": "DMCP", "name": "Div of Managed Care Policy" },
//       { "id": 10, "abbr": "DHPC", "name": "Div of Health Homes, Pace & Cob/Tpl" },
//       { "id": 11, "abbr": "DBC", "name": "Div of Benefits & Coverage" },
//       { "id": 12, "abbr": "DLTSS", "name": "Div of Long Term Services & Supports" },
//       { "id": 13, "abbr": "DCST", "name": "Div of Community Systems Transformation" },
//       { "id": 14, "abbr": "DP", "name": "Div of Pharmacy" },
//       { "id": 15, "name": "DEHPG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 1,
//     "abbr": "CAHPG",
//     "name": "Children & Adults Health Programs Group",
//     "divisions": [
//       { "id": 16, "abbr": "DSCP", "name": "Div of State Coverage Programs" },
//       { "id": 17, "abbr": "DQHO", "name": "Div of Quality & Health Outcomes" },
//       { "id": 18, "abbr": "DMEP", "name": "Div of Medicaid Eligibility Policy" },
//       { "id": 19, "abbr": "DEPO", "name": "Div of Enrollment Policy & Operations" },
//       { "id": 20, "abbr": "DTA", "name": "Div of Tribal Affairs" },
//       { "id": 21, "name": "CAHPG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 3,
//     "abbr": "FMG",
//     "name": "Financial Management Group",
//     "divisions": [
//       { "id": 23, "abbr": "DRR", "name": "Div of Reimbursement Review" },
//       { "id": 24, "abbr": "DRP", "name": "Div of Reimbursement Policy" },
//       { "id": 25, "abbr": "DFOE", "name": "Div of Financial Operations East" },
//       { "id": 26, "abbr": "DFOW", "name": "Div of Financial Operations West" },
//       { "id": 27, "abbr": "DFP", "name": "Div of Financial Policy" },
//       { "id": 28, "name": "FMG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 4,
//     "abbr": "DSG",
//     "name": "Data & Systems Group",
//     "divisions": [
//       { "id": 29, "abbr": "DSS", "name": "Div of State Systems" },
//       { "id": 30, "abbr": "DIS", "name": "Div of Information Systems" },
//       { "id": 31, "abbr": "DBES", "name": "Div of Business Essential Systems" },
//       { "id": 32, "abbr": "DBDA", "name": "Div of Business & Data Analysis" },
//       { "id": 33, "abbr": "DHM", "name": "Div of Hitech & Mmis" },
//       { "id": 34, "name": "DSG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 5,
//     "abbr": "OSG",
//     "name": "Operations Services Group",
//     "divisions": [
//       { "id": 35, "abbr": "DBA", "name": "Div of Budget & Acquisitions" },
//       { "id": 36, "abbr": "DOES", "name": "Div of Operations & Executive Support" },
//       { "id": 37, "abbr": "DHC", "name": "Div of Human Capital" },
//       { "id": 38, "abbr": "DCO", "name": "Div of Communications & Outreach" },
//       { "id": 39, "name": "OSG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 6,
//     "abbr": "SDG",
//     "name": "State Demonstrations Group",
//     "divisions": [
//       { "id": 40, "abbr": "DECD", "name": "Div of Eligibility & Coverage Demonstrations" },
//       { "id": 41, "abbr": "DSRD", "name": "Div of System Reform Demonstrations" },
//       { "id": 42, "abbr": "DDME", "name": "Div of Demonstration Monitoring & Evaluation" },
//       { "id": 43, "name": "SDG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 7,
//     "abbr": "MCOG",
//     "name": "Medicaid & CHIP Operations Group",
//     "divisions": [
//       { "id": 44, "abbr": "DPO", "name": "Div of Program Operations" },
//       { "id": 45, "abbr": "DMCO", "name": "Div of Managed Care Operations" },
//       { "id": 46, "abbr": "DHCBSO", "name": "Div of Hcbs Operations & Oversight" },
//       { "id": 47, "name": "MCOG - Office of Group Director" }
//     ]
//   },
//   {
//     "id": 8,
//     "abbr": "OCD",
//     "name": "Office of Center Director",
//     "divisions": [{ "id": 48, "name": "OCD - Office of Group Director" }]
//   }
// ];

// jest.mock('cmscommonlib/groupDivision.json', ()=>( testGroupData ), { virtual: true });
import { AppContext } from "../libs/contextLib";
import UserDataApi from "../utils/UserDataApi";
import { GroupAndDivision, groupData } from "./GroupAndDivision";

describe("dropdown logic", () => {
  it.each(["name", "abbr"])("lets you select group by %s", async (field) => {
    render(
      <MemoryRouter>
        <GroupAndDivision />
      </MemoryRouter>
    );
    expect(screen.getByRole("form")).toHaveFormValues({ group: "" });
    // TODO: adjust this when groups and divisions are no longer hardcoded
    const group = groupData[2];
    await selectEvent.select(screen.getByLabelText(/group/i), group[field]);
    expect(screen.getByRole("form")).toHaveFormValues({
      group: `${group.id}`,
    });
  });

  it("doesn't let you select a division until a group is selected", () => {
    render(
      <MemoryRouter>
        <GroupAndDivision />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/division/i)).toBeNull();
  });

  it.each(["name", "abbr"])(
    "lets you select a division by %s once a group is selected",
    async (field) => {
      render(
        <MemoryRouter>
          <GroupAndDivision />
        </MemoryRouter>
      );
      // TODO: adjust this when groups and divisions are no longer hardcoded
      const group = groupData[1],
        division = group.divisions[3];
      await selectEvent.select(screen.getByLabelText(/group/i), group.name);
      expect(screen.getByRole("form")).toHaveFormValues({
        group: `${group.id}`,
        division: "",
      });
      await selectEvent.select(
        screen.getByLabelText(/division/i),
        division[field]
      );
      expect(screen.getByRole("form")).toHaveFormValues({
        group: `${group.id}`,
        division: `${division.id}`,
      });
    }
  );

  it("clears the selected division when group is changed", async () => {
    render(
      <MemoryRouter>
        <GroupAndDivision />
      </MemoryRouter>
    );
    // TODO: adjust this when groups and divisions are no longer hardcoded
    const group = groupData[3],
      division = group.divisions[2],
      otherGroup = groupData[2];
    await selectEvent.select(screen.getByLabelText(/group/i), group.name);
    await selectEvent.select(screen.getByLabelText(/division/i), division.name);
    expect(screen.getByRole("form")).toHaveFormValues({
      group: `${group.id}`,
      division: `${division.id}`,
    });
    await selectEvent.select(screen.getByLabelText(/group/i), otherGroup.name);
    expect(screen.getByRole("form")).toHaveFormValues({
      group: `${otherGroup.id}`,
      division: "",
    });
  });
});

describe("submission and navigation", () => {
  let requestAccessSpy;
  beforeAll(() => {
    requestAccessSpy = jest.spyOn(UserDataApi, "requestAccess");
  });
  afterAll(() => {
    requestAccessSpy.mockRestore();
  });

  it("lets you cancel and returns you to the previous page", () => {
    const history = createMemoryHistory();
    history.push("/previous");
    history.push("/current");
    render(
      <Router history={history}>
        <GroupAndDivision />
      </Router>
    );
    fireEvent.click(screen.getByText(/cancel/i, { selector: "button" }));
    fireEvent.click(screen.getByText(/confirm/i, { selector: "button" }));
    expect(history.location.pathname).toBe("/previous");
  });

  it("gives you the chance to stay on the page after clicking cancel", () => {
    const history = createMemoryHistory();
    history.push("/previous");
    history.push("/current");
    render(
      <Router history={history}>
        <GroupAndDivision />
      </Router>
    );
    fireEvent.click(screen.getByText(/cancel/i, { selector: "button" }));
    expect(history.location.pathname).toBe("/current");
    fireEvent.click(screen.getByText(/stay/i, { selector: "button" }));
    expect(history.location.pathname).toBe("/current");
  });

  it("keeps your selections when you choose not to cancel", async () => {
    const history = createMemoryHistory();
    history.push("/previous");
    history.push("/current");
    render(
      <Router history={history}>
        <GroupAndDivision />
      </Router>
    );
    // TODO: adjust this when groups and divisions are no longer hardcoded
    const group = groupData[1],
      division = group.divisions[3];
    await selectEvent.select(screen.getByLabelText(/group/i), group.name);
    await selectEvent.select(screen.getByLabelText(/division/i), division.name);
    expect(screen.getByRole("form")).toHaveFormValues({
      group: `${group.id}`,
      division: `${division.id}`,
    });
    fireEvent.click(screen.getByText(/cancel/i, { selector: "button" }));
    fireEvent.click(screen.getByText(/stay/i, { selector: "button" }));
    expect(history.location.pathname).toBe("/current");
    expect(screen.getByRole("form")).toHaveFormValues({
      group: `${group.id}`,
      division: `${division.id}`,
    });
  });

  it("does not let you submit if no group is selected", async () => {
    render(
      <MemoryRouter>
        <GroupAndDivision />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByRole("form"));
    expect(requestAccessSpy).not.toBeCalled();
  });

  it("does not let you submit if no division is selected", async () => {
    render(
      <MemoryRouter>
        <GroupAndDivision />
      </MemoryRouter>
    );
    // TODO: adjust this when groups and divisions are no longer hardcoded
    const group = groupData[2];
    await selectEvent.select(screen.getByLabelText(/group/i), group.name);
    fireEvent.submit(screen.getByRole("form"));
    expect(requestAccessSpy).not.toBeCalled();
  });

  it("allows you to submit once both group and division are selected", async () => {
    /*  requestAccessSpy.mockImplementation(jest.fn());
    render(
      <AppContext.Provider value={{ setUserInfo: jest.fn() }}>
        <MemoryRouter>
          <GroupAndDivision />
        </MemoryRouter>
      </AppContext.Provider>
    );
    // TODO: adjust this when groups and divisions are no longer hardcoded
    const group = groupData[3],
      division = group.divisions[2];
    // not sure why this `act` is necessary, but here we are
    await act(async () => {
      await selectEvent.select(screen.getByLabelText(/group/i), group.name);
      await selectEvent.select(
        screen.getByLabelText(/division/i),
        division.name
      );
      fireEvent.submit(screen.getByRole("form"));
    });
    expect(requestAccessSpy).toBeCalledWith(
      expect.objectContaining({ role: "cmsapprover" })
    );
    */
  });
});
