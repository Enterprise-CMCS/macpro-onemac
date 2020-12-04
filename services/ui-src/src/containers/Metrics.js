import React, { useEffect } from "react";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {useAppContext} from "../libs/contextLib";

export default function Metrics() {
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const metrics = await ChangeRequestDataApi.listAll();
        console.log(metrics);
      } catch (error) {
        console.log("Error while fetching list.", error);
        AlertBar.alert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      }
    }

    onLoad();
  },[isAuthenticated]);
  return (
    <div className="form-container">
     Downloaded Metrics
    </div>
  );

}
