import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";

import {
  RESPONSE_CODE,
  ONEMAC_ROUTES,
  Workflow,
  territoryMap,
} from "cmscommonlib";

import { LocationState } from "../domain-types";
import LoadingScreen from "../components/LoadingScreen";
import PackageApi from "../utils/PackageApi";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { OneMACDetail } from "../libs/detailLib";
import { DetailSection } from "./section/DetailSection";
import { temporaryExtensionTypes } from "./temporary-extension/TemporaryExtensionForm";
import { getTerritoryFromComponentId } from "./OneMACForm";

const AUTHORITY_LABELS = {
  "1915(b)": "All other 1915(b) Waivers",
  "1915(b)(4)": "1915(b)(4) FFS Selective Contracting waivers",
  "1915(c)": "1915(c) HCBS",
} as const;

type PathParams = {
  componentTimestamp: string;
  componentId: string;
};

export type ComponentDetail = {
  componentId: string;
  parentId: string;
  title: string;
  componentType: string;
  typeNice: string;
  currentStatus: string;
  attachments: any[];
  submissionTimestamp: Date;
  clockEndTimestamp: Date;
  proposedEffectiveDate: string;
  effectiveDateTimestamp: Date;
  waiverAuthority?: keyof typeof AUTHORITY_LABELS;
  waiverAuthorityNice?: string;
  territory: string;
  territoryNice: string;
  raiResponses: any[];
  waiverExtensions: any[];
  withdrawalRequests: any[];
  temporaryExtensionType: string;
  cpocName: string;
  reviewTeam: string[];
} & Record<string, any>;

/**
 * Given an id and the relevant submission type forminfo, show the detail
 */
const DetailView: React.FC<{ pageConfig: OneMACDetail }> = ({ pageConfig }) => {
  // The browser history, so we can redirect to the home page
  const history = useHistory();
  const { componentTimestamp, componentId } = useParams<PathParams>();
  const [componentType] = useState(pageConfig.componentType);
  const location = useLocation<LocationState>();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);

  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);

  // The record we are using for the form.
  const [detail, setDetail] = useState<ComponentDetail>();

  const goBackLink =
    pageConfig.whichTab === "waiver"
      ? ONEMAC_ROUTES.PACKAGE_LIST_WAIVER
      : ONEMAC_ROUTES.PACKAGE_LIST_SPA;

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }
  const loadDetail = useCallback(
    async (ctrlr?: AbortController) => {
      let fetchedDetail: ComponentDetail | undefined;
      let stillLoading = true;

      try {
        fetchedDetail = (await PackageApi.getDetail(
          componentId,
          componentType,
          componentTimestamp
        )) as ComponentDetail;
        if (!fetchedDetail.territory)
          fetchedDetail.territory = getTerritoryFromComponentId(
            fetchedDetail.componentId
          );
        fetchedDetail.territoryNice = territoryMap[fetchedDetail.territory];
        fetchedDetail.typeNice =
          Workflow.ONEMAC_LABEL[fetchedDetail.componentType];
        if (fetchedDetail.temporaryExtensionType) {
          fetchedDetail.temporaryExtensionTypeNice =
            temporaryExtensionTypes.find(
              (tempType) =>
                fetchedDetail?.temporaryExtensionType === tempType.value
            )?.label;
        }

        if (fetchedDetail.waiverAuthority) {
          fetchedDetail.waiverAuthorityNice =
            AUTHORITY_LABELS[fetchedDetail.waiverAuthority];
        }
        if (fetchedDetail.submissionTimestamp) {
          fetchedDetail.submissionDateNice = formatDate(
            fetchedDetail.submissionTimestamp
          );
        }
        if (fetchedDetail.latestRaiResponseTimestamp) {
          fetchedDetail.latestRaiResponseDateNice = formatDate(
            fetchedDetail.latestRaiResponseTimestamp
          );
        }
        if (fetchedDetail.proposedEffectiveDate) {
          if (fetchedDetail.proposedEffectiveDate === "none") {
            fetchedDetail.proposedEffectiveDateNice = "Pending";
          } else {
            const effDate = parseISO(fetchedDetail.proposedEffectiveDate);

            fetchedDetail.proposedEffectiveDateNice = format(
              effDate,
              "MMM d yyyy"
            );
          }
        }
        console.log("got the package: ", fetchedDetail);
        stillLoading = false;
      } catch (e) {
        console.log("error in getDetail call?? ", e);
        history.push({
          pathname: ONEMAC_ROUTES.PACKAGE_LIST,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      }
      if (!ctrlr?.signal.aborted) setDetail(fetchedDetail);
      if (!ctrlr?.signal.aborted) setIsLoading(stillLoading);
    },
    [history, componentId, componentType, componentTimestamp]
  );

  useEffect(() => {
    const ctrlr = new AbortController();

    loadDetail(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [componentId, componentTimestamp, loadDetail]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar
        backTo={goBackLink}
        heading={detail && detail.componentId}
        enableBackNav
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      {detail && (
        <div className="form-container">
          <div className="component-detail-wrapper">
            <article className="component-detail">
              <DetailSection
                pageConfig={pageConfig}
                detail={detail}
                loadDetail={loadDetail}
                setAlertCode={setAlertCode}
              />
            </article>
          </div>
        </div>
      )}
    </LoadingScreen>
  );
};

export default DetailView;
