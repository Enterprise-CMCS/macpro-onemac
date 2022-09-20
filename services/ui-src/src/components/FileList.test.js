import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import FileList from "./FileList";

describe("FileList", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("renders without crashing", () => {
    render(<FileList />);
  });

  it("mocks a list of attachments from a download list and allows the creation of a zip file", async () => {
    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     ok: true,
    //     blob: () =>
    //       Promise.resolve({
    //         ok: true,
    //       }),
    //   })
    // );
    // try {
    //   const objectMock = {
    //     heading: "test",
    //     uploadList: [
    //       {
    //         contentType:
    //           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //         filename: "test - Copy.docx",
    //         s3Key: "1638819134932/test - Copy.docx",
    //         title:
    //           "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    //         url: "test?more",
    //       },
    //     ],
    //     zipId: "zipId",
    //   };
    //   render(<FileList {...objectMock} />);
    //   const downloadAllButton = await screen.findByRole("button", {
    //     name: /download all/i,
    //   });
    //   expect(downloadAllButton).toBeVisible();
    //   fireEvent.click(downloadAllButton);
    //   expect(global.fetch).toBeCalled();
    // } catch (error) {
    //   console.log("Error thrown: ", error);
    // }
  });
});
