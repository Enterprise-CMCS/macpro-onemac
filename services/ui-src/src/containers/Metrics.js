import React, { useEffect } from "react";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";

export default function Metrics() {
  useEffect(() => {
    async function onLoad() {

      try {
        const metrics = await ChangeRequestDataApi.listAll();
        console.log(metrics);
      } catch (error) {
        console.log("Error while fetching list.", error);
        AlertBar.alert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      }
    }

    onLoad();
  });
  return (
    <div className="form-container">
     Downloaded Metrics
    </div>
  );

}
