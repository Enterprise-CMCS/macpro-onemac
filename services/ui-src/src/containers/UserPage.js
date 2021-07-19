import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Review } from "@cmsgov/design-system";

import {
  RESPONSE_CODE,
  ROLES,
  latestAccessStatus,
  territoryMap,
  territoryList,
} from "cmscommonlib";
import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { getAlert } from "../libs/error-mappings";
import { ALERTS_MSG } from "../libs/alert-messages";
import UserDataApi from "../utils/UserDataApi";

import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { PhoneNumber } from "../components/PhoneNumber";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import closingX from "../images/ClosingX.svg";
import addStateButton from "../images/addStateButton.svg";
import groupData from "cmscommonlib/groupDivision.json";
import { helpDeskContact } from "../libs/helpDeskContact";

const CLOSING_X_IMAGE = <img alt="" className="closing-x" src={closingX} />;

/**
 * Formats multi-part name into single full name
 */
const getFullName = (...names) => names.filter(Boolean).join(" ");

const ROLE_TO_APPROVER_LABEL = {
  [ROLES.STATE_SUBMITTER]: "State Admin",
  [ROLES.STATE_ADMIN]: "CMS Role Approver",
  [ROLES.CMS_APPROVER]: "CMS System Admin",
  [ROLES.HELPDESK]: "CMS System Admin",
  [ROLES.CMS_REVIEWER]: "CMS Reviewer",
};

function getUserGroup(groupId, currentGroup, currentDivision) {
  const search = (id) =>
    groupData.find((element) => element.id === currentGroup);
  const divisions = search(currentGroup).divisions;
  const searchDivision = (id) =>
    divisions.find((element) => element.id === currentDivision);
  return {
    group: search(currentGroup).name,
    division: searchDivision(currentDivision).name,
  };
}

const ContactList = ({ contacts, userType }) => {
  let label = ROLE_TO_APPROVER_LABEL[userType] ?? "Contact";
  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p>
      {label}:{" "}
      {contacts.map(({ firstName, lastName, email }, idx) => (
        <React.Fragment key={email}>
          <a href={`mailto:${email}`}>{getFullName(firstName, lastName)}</a>
          {idx < contacts.length - 1 && ", "}
        </React.Fragment>
      ))}
    </p>
  );
};

const ACCESS_LABELS = {
  active: "Access Granted",
  pending: "Pending Access",
  denied: "Access Denied",
  revoked: "Access Revoked",
};

const transformAccesses = (user = {}) => {
  switch (user.type) {
    case ROLES.STATE_SUBMITTER:
    case ROLES.STATE_ADMIN:
      return user.attributes?.map(({ stateCode }) => ({
        state: stateCode,
        status: latestAccessStatus(user, stateCode),
      }));

    case ROLES.CMS_REVIEWER:
    case ROLES.CMS_APPROVER:
    case ROLES.HELPDESK:
      return [{ status: latestAccessStatus(user) }];

    case ROLES.SYSTEM_ADMIN:
    default:
      return [];
  }
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const {
    userProfile: { email, firstName, lastName, userData },
    setUserInfo,
  } = useAppContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [accesses, setAccesses] = useState(transformAccesses(userData));
  const [isStateSelectorVisible, setIsStateSelectorVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  let userType = userData?.type ?? "user";
  const userTypeDisplayText = userTypes[userType];

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
        const result = await UserDataApi.updatePhoneNumber(email, newNumber);
        setAlertCode(result);
        setPhoneNumber(newNumber);
      } catch (e) {
        console.error("Error updating phone number", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
      setIsEditingPhone(false);
    },
    [email, setPhoneNumber]
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
          userEmail: email,
          doneBy: email,
          firstName,
          lastName,
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
      email,
      firstName,
      lastName,
      userType,
      setIsStateSelectorVisible,
      setLoading,
      setUserInfo,
    ]
  );

  const xClicked = useCallback(
    (stateCode) => {
      if (
        window.confirm(
          "Warning Withdraw of State Access\n\nThis action cannot be undone. State Admin will be notified. Are you sure you would like to withdraw State Access?\n\nAre you sure you want to proceed?"
        )
      ) {
        const updateStatusRequest = {
          userEmail: email,
          doneBy: email,
          attributes: [
            {
              stateCode: stateCode, // required for state submitter and state admin
              status: "revoked",
            },
          ],
          type: userType,
        };
        try {
          console.log("updateStatusRequest", updateStatusRequest);
          UserDataApi.setUserStatus(updateStatusRequest).then(function (
            returnCode
          ) {
            if (getAlert(returnCode) === ALERTS_MSG.SUBMISSION_SUCCESS) {
              setUserInfo();
            } else {
              console.log("Returned: ", returnCode);
              setAlertCode(returnCode);
            }
          });
        } catch (e) {
          setAlertCode(RESPONSE_CODE[e.message]);
        }
      }
    },
    [email, userType, setUserInfo]
  );

  const renderSelectStateAccess = useMemo(() => {
    return (
      <div className="profile-signup-container">
        <MultiSelectDropDown
          cancelFn={() => setIsStateSelectorVisible(false)}
          errorMessage="Please select at least one state."
          loading={loading}
          options={territoryList}
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
  }, [loading, signupUser, setIsStateSelectorVisible]);

  const renderAddStateButton = useMemo(() => {
    return (
      <Button
        className="add-state-button"
        onClick={() => {
          setIsEditingPhone(false); // closes out the phone edit mode if we want to modify state access through state selector
          setIsStateSelectorVisible(true);
        }}
      >
        <img src={addStateButton} alt="add state or territiory" />
      </Button>
    );
  }, [setIsEditingPhone, setIsStateSelectorVisible]);

  const accessSection = useMemo(() => {
    let heading;

    switch (userType) {
      case ROLES.STATE_SUBMITTER:
      case ROLES.STATE_ADMIN:
        heading = "State Access Management";
        break;
      case ROLES.CMS_REVIEWER:
        heading = "Group & Division";
        break;
      case ROLES.CMS_APPROVER:
      case ROLES.HELPDESK:
        heading = "Status";
        break;
      default:
        // CMS System Admins do not see this section at all
        return null;
    }
    if (userType === ROLES.CMS_REVIEWER) {
      return (
        <div className="ds-l-col--6">
          <h2 id="accessHeader">{heading}</h2>
          <div className="gradient-border" />
          <dl>
            {accesses.map(({ state, status, contacts }) => (
              <div className="access-card-container" key={state ?? "only-one"}>
                <div className="gradient-border" />
                <div className="cms-group-and-division-box ">
                  <div className="cms-group-division-section">
                    <h3>Group</h3>
                    <br />
                    <p>
                      {
                        getUserGroup(
                          groupData.group,
                          userData.group,
                          userData.division
                        ).group
                      }
                    </p>
                  </div>
                  <div className="cms-group-division-section cms-division-background">
                    <h3>Division</h3>
                    <br />
                    <p>
                      {
                        getUserGroup(
                          groupData.group,
                          userData.group,
                          userData.division
                        ).division
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      );
    } else {
      return (
        <div className="right-column">
          <h2 id="accessHeader">{heading}</h2>
          <dl>
            {accesses.map(({ state, status, contacts }) => (
              <div className="access-card-container" key={state ?? "only-one"}>
                <div className="gradient-border" />
                <div className="state-access-card">
                  {userType === ROLES.STATE_SUBMITTER &&
                    (status === "active" || status === "pending") && (
                      <button
                        className="close-button"
                        onClick={() => xClicked(state)}
                      >
                        {CLOSING_X_IMAGE}
                      </button>
                    )}
                  {!!state && <dt>{territoryMap[state] || state}</dt>}
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
          {userType === ROLES.STATE_SUBMITTER && (
            <div className="add-access-container">
              {isStateSelectorVisible
                ? renderSelectStateAccess
                : renderAddStateButton}
            </div>
          )}
        </div>
      );
    }
  }, [
    accesses,
    userType,
    xClicked,
    isStateSelectorVisible,
    renderSelectStateAccess,
    renderAddStateButton,
  ]);

  useEffect(() => {
    (async () => {
      try {
        let contacts = [],
          getContacts = () => contacts;

        switch (userType) {
          case ROLES.STATE_SUBMITTER: {
            const adminsByState = await UserDataApi.getStateAdmins(
              userData.attributes
                .map(({ stateCode }) => stateCode)
                .filter(Boolean)
            );
            getContacts = ({ state }) => adminsByState[state];
            break;
          }

          case ROLES.STATE_ADMIN: {
            contacts = await UserDataApi.getCmsApprovers();
            break;
          }
          case ROLES.HELPDESK:
          case ROLES.CMS_APPROVER: {
            contacts = await UserDataApi.getCmsSystemAdmins();
            break;
          }

          default:
            return;
        }

        setAccesses(
          transformAccesses(userData).map((access) => ({
            ...access,
            contacts: getContacts(access),
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userData, userType]);

  return (
    <div>
      <PageTitleBar heading="User Profile" />
      <AlertBar alertCode={alertCode} />
      <div className="profile-container">
        <div className="ds-l-row">
          <div className="left-column">
            <h2 id="profileInfoHeader" className="profileTest">
              Profile Information
            </h2>
            <Review heading="Full Name">
              {getFullName(firstName, lastName)}
            </Review>
            <Review heading="Role">
              {userTypeDisplayText ? userTypeDisplayText : "Unregistered"}
            </Review>
            <Review heading="Email">{email}</Review>
            <PhoneNumber
              isEditing={isEditingPhone}
              initialValue={userData.phoneNumber}
              phoneNumber={phoneNumber}
              onCancel={onPhoneNumberCancel}
              onEdit={onPhoneNumberEdit}
              onSubmit={onPhoneNumberSubmit}
            />
          </div>
          {accessSection}
        </div>
        <div id="profileDisclaimer" className="disclaimer-message">
          This page contains Profile Information for the{" "}
          {userTypeDisplayText ?? userType}. The information cannot be changed
          in the portal. However, the {userTypeDisplayText ?? userType} can
          change their contact phone number in their account.
        </div>
      </div>
    </div>
  );
};

export default UserPage;
