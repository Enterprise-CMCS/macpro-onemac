import { ONEMAC_ROUTES, RESPONSE_CODE } from "cmscommonlib";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import AlertBar from "../components/AlertBar";
import LoadingScreen from "../components/LoadingScreen";

import PageTitleBar from "../components/PageTitleBar";
import { LocationState } from "../domain-types";
import PackageApi from "../utils/PackageApi";

type PathParams = {
  changeDate: string;
  id: string;
};

const KafkaTopicDetail: React.FC = () => {
  console.log("im here");
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  // so we show the spinner during the data load
  const [isLoading, setIsLoading] = useState(true);
  // The record we are using for the page
  const [detail, setDetail] = useState<String>();
  const { changeDate, id } = useParams<PathParams>();
  console.log(changeDate, id);
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
          changeDate
        )) as String;
        console.log("got the record: ", fetchedDetail);
        stillLoading = false;
      } catch (e) {
        console.log("error in getDetail call?? ", e);
        history.push({
          pathname: ONEMAC_ROUTES.TOPIC_LIST,
          state: {
            passCode: RESPONSE_CODE.SYSTEM_ERROR,
          },
        });
      }
      if (!ctrlr?.signal.aborted) setDetail(fetchedDetail);
      if (!ctrlr?.signal.aborted) setIsLoading(stillLoading);
    },
    [changeDate, history, id]
  );

  useEffect(() => {
    const ctrlr = new AbortController();

    loadDetail(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [id, changeDate, loadDetail]);

  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar
        backTo="/topic-list"
        heading={`${id} Detail`}
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

export default KafkaTopicDetail;
