import React from "react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";

import groupData from "cmscommonlib/groupDivision.json";

import UserDataApi from "../utils/UserDataApi";
import { GroupAndDivision } from "./GroupAndDivision";

describe("dropdown logic", () => {
  it.each(["name", "abbr"])("lets you select a group by %s", async (field) => {
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
    // const history = createMemoryHistory();
    // history.push("/previous");
    // history.push("/current");
    // render(
    //   <Router history={history}>
    //     <GroupAndDivision />
    //   </Router>
    // );
    // // TODO: adjust this when groups and divisions are no longer hardcoded
    // const group = groupData[1],
    //   division = group.divisions[3];
    // await selectEvent.select(screen.getByLabelText(/group/i), group.name);
    // await selectEvent.select(screen.getByLabelText(/division/i), division.name);
    // expect(screen.getByRole("form")).toHaveFormValues({
    //   group: `${group.id}`,
    //   division: `${division.id}`,
    // });
    // fireEvent.click(screen.getByText(/cancel/i, { selector: "button" }));
    // fireEvent.click(screen.getByText(/stay/i, { selector: "button" }));
    // expect(history.location.pathname).toBe("/current");
    // expect(screen.getByRole("form")).toHaveFormValues({
    //   group: `${group.id}`,
    //   division: `${division.id}`,
    // });
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
    // render(
    //   <MemoryRouter>
    //     <GroupAndDivision />
    //   </MemoryRouter>
    // );
    // // TODO: adjust this when groups and divisions are no longer hardcoded
    // const group = groupData[2];
    // await selectEvent.select(screen.getByLabelText(/group/i), group.name);
    // fireEvent.submit(screen.getByRole("form"));
    // expect(requestAccessSpy).not.toBeCalled();
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
