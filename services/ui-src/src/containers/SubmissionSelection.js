import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { ROUTES } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";

const SubmissionSelection = () => {
  const history = useHistory();

  return (
    <>
      <PageTitleBar heading="Submission Type" />
      <div className="submission-selection-container">
        <div className="action-title">SPAs</div>
        <Button
          id="spaSubmitBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.SPA)}
        >
          Submit New Medicaid SPA
        </Button>
        <Button
          id="spaRaiBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.SPA_RAI)}
        >
          Respond to Medicaid SPA RAI
        </Button>
        <Button
          id="chipSpaBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.CHIP_SPA)}
        >
          Submit New CHIP SPA
        </Button>
        <Button
          id="chipSpaRaiBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.CHIP_SPA_RAI)}
        >
          Respond to CHIP SPA RAI
        </Button>
        <div className="action-title">Waivers</div>
        <Button
          id="waiverBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.WAIVER)}
        >
          Submit 1915(b) Waiver Action
        </Button>
        <Button
          id={"waiverRaiBtn"}
          variation="transparent"
          onClick={() => history.push(ROUTES.WAIVER_RAI)}
        >
          Respond to 1915(b) Waiver RAI
        </Button>
        <Button
          id="waiverExtBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.WAIVER_EXTENSION)}
        >
          Request Temporary Extension form - 1915(b) and 1915(c)
        </Button>
        <Button
          id="waiverAppKBtn"
          variation="transparent"
          onClick={() => history.push(ROUTES.WAIVER_APP_K)}
        >
          Submit 1915(c) Appendix K Amendment
        </Button>
      </div>
    </>
  );
};

export default SubmissionSelection;
