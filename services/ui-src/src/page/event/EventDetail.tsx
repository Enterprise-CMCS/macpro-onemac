import { ONEMAC_ROUTES, RESPONSE_CODE } from "cmscommonlib";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import AlertBar from "../../components/AlertBar";
import LoadingScreen from "../../components/LoadingScreen";

import PageTitleBar from "../../components/PageTitleBar";
import { LocationState } from "../../domain-types";
import PackageApi from "../../utils/PackageApi";

type PathParams = {
  changedDate: string;
  id: string;
};

const EventDetail: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);
  // The record we are using for the page
  const [detail, setDetail] = useState<String>();
  const { changedDate, id } = useParams<PathParams>();

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const loadDetail = useCallback(
    async (ctrlr?: AbortController) => {
      let fetchedDetail: String | undefined;
      let stillLoading = true;

      try {
        fetchedDetail = (await PackageApi.getTopicDetail(
          id,
          changedDate
        )) as String;
        console.log("got the record: ", fetchedDetail);
        stillLoading = false;
      } catch (e) {
        console.log("error in getDetail call?? ", e);
        history.push({
          pathname: ONEMAC_ROUTES.EVENT,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      }
      if (!ctrlr?.signal.aborted) setDetail(fetchedDetail);
      if (!ctrlr?.signal.aborted) setIsLoading(stillLoading);
    },
    [changedDate, history, id]
  );

  useEffect(() => {
    const ctrlr = new AbortController();

    loadDetail(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [id, changedDate, loadDetail]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar
        backTo={ONEMAC_ROUTES.EVENT}
        heading={`${id} - ${format(+changedDate, "MMM d, yyyy hh:mm:ss a")}`}
        enableBackNav
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      {detail && (
        <div className="form-container">
          <div className="component-detail-wrapper">
            <article className="component-detail">
              <pre>{JSON.stringify(detail, null, 2)}</pre>
            </article>
          </div>
        </div>
      )}
    </LoadingScreen>
  );
};

export default EventDetail;
