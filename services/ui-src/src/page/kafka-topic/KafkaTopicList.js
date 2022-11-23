import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { format } from "date-fns";

import { RESPONSE_CODE, ONEMAC_ROUTES } from "cmscommonlib";

import PageTitleBar from "../../components/PageTitleBar";
import PortalTable from "../../components/PortalTable";
import AlertBar from "../../components/AlertBar";
import { EmptyList } from "../../components/EmptyList";
import LoadingScreen from "../../components/LoadingScreen";
import PackageAPI from "../../utils/PackageApi";
import { useAppContext } from "../../libs/contextLib";

const renderDate = ({ value }) =>
  typeof value === "number" ? format(value, "MMM d, yyyy") : value ?? "N/A";

const TOPICS = [
  { name: "Medicaid SPA", value: "Medicaid_SPA" },
  { name: "CHIP SPA", value: "CHIP_SPA" },
  { name: "1915(b) Waivers", value: "1915b_waivers" },
  { name: "1915(c) Waivers", value: "1915c_waivers" },
  { name: "1915(c) Indep Plus", value: "1915c_Indep_Plus" },
  { name: "1115", value: "1115" },
  { name: "UPL", value: "UPL" },
];

/**
 * Component containing topic lists
 */
const KafkaTopicList = () => {
  const dashboardRef = useRef();
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useAppContext();
  const [tab, setTab] = useState(TOPICS[0].value);
  const [alertCode, setAlertCode] = useState();

  const loadTopicList = useCallback(
    async (ctrlr) => {
      setIsLoading(true);
      try {
        const data = await PackageAPI.getTopic(userProfile.email, tab);
        if (typeof data === "string") throw new Error(data);
        if (!ctrlr?.signal.aborted) setTopicList(data);
      } catch (error) {
        console.log("Error while fetching topic stream list.", error);
        if (!ctrlr?.signal.aborted) setAlertCode(error.message);
      }
      if (!ctrlr?.signal.aborted) setIsLoading(false);
    },
    [tab, userProfile.email]
  );

  // load the data from the backend for existing users.
  useEffect(() => {
    const ctrlr = new AbortController();
    if (topicList.length === 0) loadTopicList(ctrlr);
    return function cleanup() {
      ctrlr.abort();
    };
  }, [loadTopicList, topicList.length]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`${ONEMAC_ROUTES.TOPIC_DETAIL}/${value}/${row.original.STATE_PLAN.CHANGED_DATE}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: "ID",
          accessor: "STATE_PLAN.ID_NUMBER",
          Cell: renderId,
          disableGlobalFilter: false,
        },
        {
          Header: "Status",
          accessor: "SPW_STATUS[0].SPW_STATUS_DESC",
          disableGlobalFilter: false,
        },
        {
          Header: "Changed Date",
          accessor: "STATE_PLAN.CHANGED_DATE",
          Cell: renderDate,
          disableGlobalFilter: false,
        },
      ].filter(Boolean),
    [renderId]
  );

  const initialTableState = useMemo(
    () => ({
      sortBy: [{ id: "CHANGED_DATE", desc: true }],
    }),
    []
  );

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const TEMP_onReset = useCallback(() => setTopicList((d) => [...d]), []);

  function renderTopicList() {
    const topicListExists = topicList && topicList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {topicListExists ? (
          <PortalTable
            className="package-table"
            columns={columns}
            data={topicList}
            initialState={initialTableState}
            pageContentRef={dashboardRef}
            searchBarTitle="Search by ID"
            withSearchBar
            TEMP_onReset={TEMP_onReset}
          />
        ) : (
          <EmptyList message="There are no items in this topic." />
        )}
      </LoadingScreen>
    );
  }

  function switchTo(event) {
    setTab(event.currentTarget.value);
    setTopicList([]);
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="Topic Dashboard" />
      <div className="dash-and-filters" ref={dashboardRef}>
        <div className="dashboard-and-alert-bar">
          <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
          <div className="dashboard-container">
            <div className="tab-bar">
              {TOPICS.map((topic) => {
                return (
                  <Button
                    aria-label={"switch to showing" + topic.name}
                    className="tab-button tab-button-wide tab-button-tall"
                    disabled={tab === topic.value}
                    onClick={switchTo}
                    value={topic.value}
                  >
                    {topic.name}
                  </Button>
                );
              })}
            </div>
            {renderTopicList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KafkaTopicList;
