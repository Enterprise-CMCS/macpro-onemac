import React, { useState, useEffect } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { useHistory, useLocation } from "react-router-dom";
import UserDataApi from "../utils/UserDataApi";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";

/**
 * Component containing dashboard
 */
const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState();
  const { userProfile } = useAppContext();

  const history = useHistory();
  const location = useLocation();

  // Load the data from the backend.
  useEffect(() => {
    let mounted = true;
    let newAlert = ALERTS_MSG.NONE;
    let tmpUserList = { ...userList };

    async function onLoad() {
      try {
        if (mounted && userProfile.email) {
          const newUserList = await UserDataApi.getMyUserList(
            userProfile.email
          );
          console.log("User List is: ", newUserList);
          tmpUserList = { ...newUserList };
        }
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        newAlert = ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR;
      }
    }

    if (location.state) newAlert = location.state.showAlert;
    if (mounted) onLoad();
    if (mounted) setUserList(tmpUserList);
    if (mounted) setAlert(newAlert);

    return function cleanup() {
      mounted = false;
    };
  }, [location, userProfile]);

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    if (alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
        <div className="alert-bar">
          <Alert variation={alert.type} heading={alert.heading}>
            <p className="ds-c-alert__text">{alert.text}</p>
          </Alert>
        </div>
      );
    }
  };

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="Account Management" text="" />
      {renderAlert(alert)}
      <div className="dashboard-container">
        <div className="action-title">Submissions List</div>
        <LoadingScreen isLoading={isLoading}>
              <EmptyList message="You have no submissions yet." />
        </LoadingScreen>
      </div>
    </div>
  );
};

export default AdminDashboard;
