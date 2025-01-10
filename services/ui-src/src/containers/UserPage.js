import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Button, Review } from "@cmsgov/design-system";

import {
  APPROVING_USER_ROLE,
  RESPONSE_CODE,
  USER_ROLE,
  ROUTES,
  USER_STATUS,
  effectiveRoleForUser,
  inFlightRoleRequestForUser,
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
import addStateButton from "../images/addStateButton.svg";
import groupData from "cmscommonlib/groupDivision.json";
import { MACCard, MACRemovableCard } from "../components/MACCard";

export const ACCESS_LABELS = {
  active: "Access Granted",
  pending: "Pending Access",
  denied: "Access Denied",
  revoked: "Access Revoked",
};

export const ContactList = ({ contacts, profileRole }) => {
  let label = roleLabels[APPROVING_USER_ROLE[profileRole]] ?? "Contact";
  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p className="ds-u-lg-margin-top--3">
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
  profileRole,
  accesses = [],
}) => {
  const getTitle = useCallback(
    (territory, territoryMap) =>
      (!!territory && territory !== "N/A" && territoryMap[territory]) ||
      territory,
    []
  );
  let accessHeading;

  switch (profileRole) {
    case USER_ROLE.STATE_SUBMITTER:
    case USER_ROLE.STATE_SYSTEM_ADMIN:
      accessHeading = "State Access Management";
      break;
    case USER_ROLE.CMS_REVIEWER:
    case USER_ROLE.CMS_ROLE_APPROVER:
    case USER_ROLE.HELPDESK:
      accessHeading = "Status";
      break;
    default:
      return null;
  }

  return (
    <>
      <h2 id="accessHeader">{accessHeading}</h2>
      <div className="mac-card-spaced-vertical-list">
        {accesses
          .filter(({ role }) => role === profileRole)
          .map(({ territory, status, contacts }) => (
            <MACRemovableCard
              withGradientBar
              title={getTitle(territory, territoryMap)}
              onClick={() => selfRevoke(territory)}
              isReadOnly={isReadOnly}
              hasRoleAccess={profileRole === USER_ROLE.STATE_SUBMITTER}
              isRemovable={
                status === USER_STATUS.ACTIVE || status === USER_STATUS.PENDING
              }
            >
              <em>{ACCESS_LABELS[status] || status}</em>
              <ContactList contacts={contacts} profileRole={profileRole} />
            </MACRemovableCard>
          ))}
      </div>
    </>
  );
};

export function getUserGroup(profileData) {
  const group = groupData.find(({ id }) => id === profileData.group);
  let division;

  if (!profileData.division) return { group };

  const getDivisionFromGroup = ({ divisions }) =>
    divisions.find(({ id }) => id === profileData.division);

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

export const GroupDivisionDisplay = ({ profileData = {} }) => {
  const groupInfo = getUserGroup(profileData);
  return (
    <>
      <h2 id="accessHeader">Group & Division</h2>
      <MACCard withGradientBar childContainerClassName="access-card-container">
        <dl>
          <div className="cms-group-division-section">
            <dt>Group</dt>
            <dd>{groupInfo.group?.name}</dd>
          </div>
          <div className="cms-group-division-section cms-division-background">
            <dt>Division</dt>
            <dd>{groupInfo.division?.name}</dd>
          </div>
        </dl>
      </MACCard>
    </>
  );
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const history = useHistory();
  const { userProfile, setUserInfo, updatePhoneNumber, userRole, userStatus } =
    useAppContext();
  const location = useLocation();
  const { userId } = useParams() ?? {};
  const [profileData, setProfileData] = useState({});
  const [profileRole, setProfileRole] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [accesses, setAccesses] = useState(
    userProfile?.userData?.roleList ?? []
  );
  const [isStateSelectorVisible, setIsStateSelectorVisible] = useState(false);
  const [stateAccessToRemove, setStateAccessToRemove] = useState(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const isReadOnly =
    location.pathname !== ROUTES.PROFILE &&
    decodeURIComponent(userId) !== window.btoa(userProfile.email);

  useEffect(() => {
    const getProfile = async (encodedProfileEmail) => {
      if (!isReadOnly) {
        return [{ ...userProfile.userData }, userRole, userStatus];
      }

      let tempProfileData = {},
        tempProfileRole = "user",
        tempProfileStatus = "status";

      try {
        const profileEmail = window.atob(encodedProfileEmail);
        tempProfileData = await UserDataApi.userProfile(profileEmail);
        const profileAccess = effectiveRoleForUser(tempProfileData?.roleList);
        if (profileAccess !== null)
          [tempProfileRole, tempProfileStatus] = profileAccess;
      } catch (e) {
        console.error("Error fetching user data", e);
        setAlertCode(RESPONSE_CODE[e.message]);
        // redirect if the user is not found
        history.push("/notfound");
      }

      return [tempProfileData, tempProfileRole, tempProfileStatus];
    };

    getProfile(userId)
      .then(([newProfileData, newProfileRole, newProfileStatus]) => {
        setProfileData(newProfileData);
        setProfileRole(newProfileRole);
        setProfileStatus(newProfileStatus);
      })
      .catch((e) => {
        console.error("Error fetching user data", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      });
  }, [isReadOnly, userId, userProfile, userRole, userStatus, history]);

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
        setProfileData((data) => ({ ...data, phoneNumber: newNumber }));
        updatePhoneNumber(newNumber);
      } catch (e) {
        console.error("Error updating phone number", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
      setIsEditingPhone(false);
    },
    [userProfile.email, setProfileData, updatePhoneNumber]
  );

  const signupUser = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        let answer = await UserDataApi.requestAccess(
          userProfile.email,
          userRole,
          payload.map(({ value }) => value)
        );

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
      userRole,
      setIsStateSelectorVisible,
      setLoading,
      setUserInfo,
    ]
  );

  const closeConfirmation = useCallback(() => setStateAccessToRemove(null), []);

  const onRemoveAccess = useCallback(() => {
    try {
      UserDataApi.updateUserStatus({
        email: userProfile.email,
        doneByEmail: userProfile.email,
        role: userRole,
        territory: stateAccessToRemove,
        status: USER_STATUS.REVOKED,
      }).then(function (returnCode) {
        if (alertCodeAlerts[returnCode] === ALERTS_MSG.SUBMISSION_SUCCESS) {
          setUserInfo();
        } else {
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
    userRole,
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
          ariaLabel={
            "Select one or more states to request access. Use down key to enter the menu. You can also begin typing a territory name to search."
          }
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
    if (
      profileData.roleList &&
      profileStatus === USER_STATUS.ACTIVE &&
      !inFlightRoleRequestForUser(profileData.roleList)
    )
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

    return (
      <p>State Access Requests Disabled until Role Request is finalized.</p>
    );
  }, [
    setIsEditingPhone,
    setIsStateSelectorVisible,
    profileData.roleList,
    profileStatus,
  ]);

  useEffect(() => {
    const createAccessList = async (inRoles) => {
      if (!inRoles) return [];

      return await Promise.all(
        inRoles.map((access) =>
          UserDataApi.getMyApprovers(access.role, access.territory).then(
            (result) => {
              return { ...access, contacts: result };
            }
          )
        )
      );
    };

    createAccessList(profileData?.roleList)
      .then(setAccesses)
      .catch((e) => {
        console.log("error:  ", e);
      });
  }, [profileData]);

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
            <Review heading="Full Name">
              {profileData.fullName ? profileData.fullName : "Unknown"}
            </Review>
            <Review heading="Role">
              {roleLabels[profileRole]
                ? roleLabels[profileRole]
                : "Unregistered"}
            </Review>
            <Review heading="Email">
              {profileData.email ? (
                isReadOnly ? (
                  <a href={`mailto:${profileData.email}`}>
                    {profileData.email}
                  </a>
                ) : (
                  profileData.email
                )
              ) : (
                ""
              )}
            </Review>
            <PhoneNumber
              isEditing={isEditingPhone}
              phoneNumber={profileData.phoneNumber}
              onCancel={onPhoneNumberCancel}
              onEdit={onPhoneNumberEdit}
              onSubmit={onPhoneNumberSubmit}
              readOnly={isReadOnly}
            />
          </div>
          {profileRole !== USER_ROLE.SYSTEM_ADMIN && (
            <div className="right-column">
              <AccessDisplay
                accesses={accesses}
                isReadOnly={isReadOnly}
                selfRevoke={setStateAccessToRemove}
                profileRole={profileRole}
              />
              {!isReadOnly && profileRole === USER_ROLE.STATE_SUBMITTER && (
                <div className="add-access-container">
                  {isStateSelectorVisible
                    ? renderSelectStateAccess
                    : renderAddStateButton}
                </div>
              )}
              {profileRole === USER_ROLE.CMS_REVIEWER && (
                <GroupDivisionDisplay profileData={profileData} />
              )}
            </div>
          )}
          {!isReadOnly && (
            <div id="profileDisclaimer" className="disclaimer-message">
              This page contains Profile Information for the{" "}
              {roleLabels[profileRole] ?? profileRole}. The information cannot
              be changed in the portal. However, the{" "}
              {roleLabels[profileRole] ?? profileRole} can change their contact
              phone number in their account.
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
