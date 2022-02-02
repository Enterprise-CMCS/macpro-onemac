import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Review } from "@cmsgov/design-system";

import {
  APPROVING_USER_TYPE,
  RESPONSE_CODE,
  ROLES,
  ROUTES,
  effectiveRoleForUser,
  roleLabels,
  territoryMap,
  territoryList,
} from "cmscommonlib";
import { useAppContext } from "../libs/contextLib";
import { alertCodeAlerts, ALERTS_MSG } from "../libs/alertLib";
import UserDataApi from "../utils/UserDataApi";

import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { PhoneNumber } from "../components/PhoneNumber";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import closingX from "../images/ClosingX.svg";
import addStateButton from "../images/addStateButton.svg";
import groupData from "cmscommonlib/groupDivision.json";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

export const ACCESS_LABELS = {
  active: "Access Granted",
  pending: "Pending Access",
  denied: "Access Denied",
  revoked: "Access Revoked",
};

export const ContactList = ({ contacts, userType }) => {
  let label = roleLabels[APPROVING_USER_TYPE[userType]] ?? "Contact";
  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p>
      {label}:{" "}
      {contacts.map(({ fullName, email }, idx) => (
        <React.Fragment key={email}>
          <a href={`mailto:${email}`}>{fullName}</a>
          {idx < contacts.length - 1 && ", "}
        </React.Fragment>
      ))}
    </p>
  );
};

export const AccessDisplay = ({
  isReadOnly,
  selfRevoke,
  userType,
  accesses = [],
}) => {
  let accessHeading;

  switch (userType) {
    case ROLES.STATE_SUBMITTER:
    case ROLES.STATE_SYSTEM_ADMIN:
      accessHeading = "State Access Management";
      break;
    case ROLES.CMS_REVIEWER:
    case ROLES.CMS_ROLE_APPROVER:
    case ROLES.HELPDESK:
      accessHeading = "Status";
      break;
    default:
      return null;
  }

  return (
    <>
      <h2 id="accessHeader">{accessHeading}</h2>
      <dl>
        {accesses.map(({ territory, status, contacts }) => (
          <div className="access-card-container" key={territory ?? "only-one"}>
            <div className="gradient-border" />
            <div className="state-access-card">
              {!isReadOnly &&
                userType === ROLES.STATE_SUBMITTER &&
                (status === "active" || status === "pending") && (
                  <button
                    aria-label={`Self-revoke access to ${territoryMap[territory]}`}
                    disabled={isReadOnly}
                    className="close-button"
                    onClick={() => selfRevoke(territory)}
                  >
                    {CLOSING_X_IMAGE}
                  </button>
                )}
              {!!territory && <dt>{territoryMap[territory] || territory}</dt>}
              <dd>
                <em>{ACCESS_LABELS[status] || status}</em>
                <br />
                <br />
                <ContactList contacts={contacts} userType={userType} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </>
  );
};

export function getUserGroup(userData) {
  const group = groupData.find(({ id }) => id === userData.group);
  let division;

  if (!userData.division) return { group };

  const getDivisionFromGroup = ({ divisions }) =>
    divisions.find(({ id }) => id === userData.division);

  // first, try the group found above. if the org chart has not changed since
  // the user last modified their info, it should succeed
  division = getDivisionFromGroup(group);

  // if the org chart has changed, go through the whole list of groups to find
  // the right division
  for (
    let groupIndex = 0;
    !division && groupIndex < groupData.length;
    groupIndex++
  ) {
    division = getDivisionFromGroup(groupData[groupIndex]);
  }

  return { group, division };
}

export const GroupDivisionDisplay = ({ userData = {} }) => {
  if (userData.type !== ROLES.CMS_REVIEWER) return null;

  const groupInfo = getUserGroup(userData);

  return (
    <div className="access-card-container">
      <h2 id="accessHeader">Group & Division</h2>
      <div className="gradient-border" />
      <dl className="access-card-container">
        <div className="cms-group-division-section">
          <dt>Group</dt>
          <dd>{groupInfo.group?.name}</dd>
        </div>
        <div className="cms-group-division-section cms-division-background">
          <dt>Division</dt>
          <dd>{groupInfo.division?.name}</dd>
        </div>
      </dl>
    </div>
  );
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile, setUserInfo, updatePhoneNumber } = useAppContext();
  const location = useLocation();
  const { userId } = useParams() ?? {};
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [accesses, setAccesses] = useState(userData?.roleList ?? []);
  const [isStateSelectorVisible, setIsStateSelectorVisible] = useState(false);
  const [stateAccessToRemove, setStateAccessToRemove] = useState(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const isReadOnly =
    location.pathname !== ROUTES.PROFILE &&
    decodeURIComponent(userId) !== userProfile.email;
  let userType = "user";
  const userAccess = effectiveRoleForUser(userData?.roleList);
  if (userAccess !== null) [userType] = userAccess;
  const userTypeDisplayText = roleLabels[userType];

  useEffect(() => {
    if (!isReadOnly) {
      setUserData(userProfile.userData);
      return;
    }

    (async () => {
      try {
        setUserData(await UserDataApi.userProfile(userId));
      } catch (e) {
        console.error("Error fetching user data", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
    })();
  }, [isReadOnly, userId, userProfile]);

  const onPhoneNumberCancel = useCallback(() => {
    setIsEditingPhone(false);
  }, [setIsEditingPhone]);

  const onPhoneNumberEdit = useCallback(() => {
    setIsStateSelectorVisible(false); // closes out state selector if we're editing the phone section
    setIsEditingPhone(true);
  }, [setIsStateSelectorVisible, setIsEditingPhone]);

  const onPhoneNumberSubmit = useCallback(
    async (newNumber) => {
      try {
        var result = await UserDataApi.updatePhoneNumber(
          userProfile.email,
          newNumber
        );
        if (result === RESPONSE_CODE.USER_SUBMITTED)
          result = RESPONSE_CODE.NONE; // do not show success message
        setAlertCode(result);
        setUserData((data) => ({ ...data, phoneNumber: newNumber }));
        updatePhoneNumber(newNumber);
      } catch (e) {
        console.error("Error updating phone number", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
      setIsEditingPhone(false);
    },
    [userProfile.email, setUserData, updatePhoneNumber]
  );

  const signupUser = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        payload = payload.map(({ value }) => ({
          stateCode: value,
          status: "pending",
        }));

        let answer = await UserDataApi.updateUser({
          userEmail: userProfile.email,
          doneBy: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          type: userType,
          attributes: payload,
        });

        if (answer && answer !== RESPONSE_CODE.USER_SUBMITTED) throw answer;
        setAlertCode(RESPONSE_CODE.USER_SUBMITTED);
        setIsStateSelectorVisible(false);
        setUserInfo();
      } catch (e) {
        console.error("Could not create new user:", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      } finally {
        setLoading(false);
      }
    },
    [
      userProfile.email,
      userProfile.firstName,
      userProfile.lastName,
      userType,
      setIsStateSelectorVisible,
      setLoading,
      setUserInfo,
    ]
  );

  const closeConfirmation = useCallback(() => setStateAccessToRemove(null), []);

  const onRemoveAccess = useCallback(() => {
    try {
      UserDataApi.setUserStatus({
        userEmail: userProfile.email,
        doneBy: userProfile.email,
        attributes: [
          {
            stateCode: stateAccessToRemove, // required for state submitter and state system admin
            status: "revoked",
          },
        ],
        type: userType,
      }).then(function (returnCode) {
        if (alertCodeAlerts[returnCode] === ALERTS_MSG.SUBMISSION_SUCCESS) {
          setUserInfo();
        } else {
          console.log("Returned: ", returnCode);
          setAlertCode(returnCode);
        }
      });
    } catch (e) {
      setAlertCode(RESPONSE_CODE[e.message]);
    }
    closeConfirmation();
  }, [
    closeConfirmation,
    stateAccessToRemove,
    userProfile.email,
    userType,
    setUserInfo,
  ]);

  const renderSelectStateAccess = useMemo(() => {
    const territoryRequestList = [];
    const activeStateList = [];

    accesses.forEach(({ state, status }) => {
      if (status === "active" || status === "pending")
        activeStateList.push(state);
    });
    territoryList.forEach(({ label, value }) => {
      if (activeStateList.includes(value) === false)
        territoryRequestList.push({ label, value });
    });

    return (
      <div className="profile-signup-container">
        <MultiSelectDropDown
          cancelFn={() => setIsStateSelectorVisible(false)}
          errorMessage="Please select at least one state."
          loading={loading}
          options={territoryRequestList}
          placeholder="Select state here"
          required
          showCancelButton
          subtitle="Select your State Access."
          submitFn={signupUser}
          title="Choose State Access"
          type="selectprofile"
        />
      </div>
    );
  }, [loading, signupUser, setIsStateSelectorVisible, accesses]);

  const renderAddStateButton = useMemo(() => {
    return (
      <Button
        className="add-state-button"
        onClick={() => {
          setIsEditingPhone(false); // closes out the phone edit mode if we want to modify state access through state selector
          setIsStateSelectorVisible(true);
        }}
      >
        <img src={addStateButton} alt="add state or territory" />
      </Button>
    );
  }, [setIsEditingPhone, setIsStateSelectorVisible]);

  useEffect(() => {
    (async () => {
      try {
        let contacts = [],
          getContacts = () => contacts;

        switch (userType) {
          case ROLES.STATE_SUBMITTER: {
            const adminsByState = await UserDataApi.getStateSystemAdmins(
              userData.roleList
                .map(({ territory }) => territory)
                .filter(Boolean)
            );
            getContacts = ({ state }) => adminsByState[state];
            break;
          }

          case ROLES.CMS_REVIEWER:
          case ROLES.STATE_SYSTEM_ADMIN: {
            contacts = await UserDataApi.getCmsRoleApprovers();
            break;
          }
          case ROLES.HELPDESK:
          case ROLES.CMS_ROLE_APPROVER: {
            contacts = await UserDataApi.getCmsSystemAdmins();
            break;
          }

          default:
            return;
        }

        setAccesses(
          userData?.roleList.map((access) => ({
            ...access,
            contacts: getContacts(access),
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userData, userType]);

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  return (
    <div>
      <PageTitleBar heading={isReadOnly ? "User Profile" : "My Profile"} />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="profile-container">
        <div className="profile-content">
          <div className="left-column">
            <h2 id="profileInfoHeader" className="profileTest">
              Profile Information
            </h2>
            <Review heading="Full Name">{userData.fullName}</Review>
            <Review heading="Role">
              {userTypeDisplayText ? userTypeDisplayText : "Unregistered"}
            </Review>
            <Review heading="Email">
              {userData.email ? (
                isReadOnly ? (
                  <a href={`mailto:${userData.email}`}>{userData.email}</a>
                ) : (
                  userData.email
                )
              ) : (
                ""
              )}
            </Review>
            <PhoneNumber
              isEditing={isEditingPhone}
              phoneNumber={userData.phoneNumber}
              onCancel={onPhoneNumberCancel}
              onEdit={onPhoneNumberEdit}
              onSubmit={onPhoneNumberSubmit}
              readOnly={isReadOnly}
            />
          </div>
          {userType !== ROLES.SYSTEM_ADMIN && (
            <div className="right-column">
              <AccessDisplay
                accesses={accesses}
                isReadOnly={isReadOnly}
                selfRevoke={setStateAccessToRemove}
                userType={userType}
              />
              {!isReadOnly && userType === ROLES.STATE_SUBMITTER && (
                <div className="add-access-container">
                  {isStateSelectorVisible
                    ? renderSelectStateAccess
                    : renderAddStateButton}
                </div>
              )}
              <GroupDivisionDisplay userData={userData} />
            </div>
          )}
          {!isReadOnly && (
            <div id="profileDisclaimer" className="disclaimer-message">
              This page contains Profile Information for the{" "}
              {userTypeDisplayText ?? userType}. The information cannot be
              changed in the portal. However, the{" "}
              {userTypeDisplayText ?? userType} can change their contact phone
              number in their account.
            </div>
          )}
        </div>
      </div>
      {stateAccessToRemove && (
        <ConfirmationDialog
          onAccept={onRemoveAccess}
          acceptText="Confirm"
          onCancel={closeConfirmation}
          heading="Withdraw State Access?"
          size="wide"
        >
          This action cannot be undone. {territoryMap[stateAccessToRemove]}{" "}
          State System Admin will be notified.
        </ConfirmationDialog>
      )}
    </div>
  );
};

export default UserPage;
