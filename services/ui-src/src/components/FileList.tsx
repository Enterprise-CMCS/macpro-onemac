import React, { ReactNode, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { MACCard } from "./MACCard";

type FileListProps = {
  heading: ReactNode;
  uploadList: {
    filename: string;
    title: string;
    url: string;
    virusScanStatus?: string;
  }[];
  zipId?: string;
  infoText?: string;
};

/**
 * Read only component to list the attachments.
 */
export default function FileList({
  heading,
  uploadList,
  zipId,
  infoText,
}: FileListProps) {
  const onDownloadAll = useCallback(async () => {
    const downloadList = (
      await Promise.all(
        uploadList.map(async (upload) => {
          const { filename, title, url } = upload;
          try {
            if (upload.url === null || upload.virusScanStatus !== "CLEAN") {
              return;
            }
            const resp = await fetch(url);
            if (!resp.ok) throw resp;
            return {
              filename,
              title,
              contents: await resp.blob(),
            };
          } catch (e) {
            console.error(`Failed to download file: ${filename} ${url}`, e);
          }
        })
      )
    ).filter(Boolean) as { filename: string; title: string; contents: Blob }[];
    console.log("downloadList", downloadList);
    const zip = new JSZip();
    for (const { filename, title, contents } of downloadList) {
      zip.file(filename, contents, { comment: title });
    }
    saveAs(
      await zip.generateAsync({ type: "blob" }),
      `${zipId || "onemac"}.zip`
    );
  }, [uploadList, zipId]);

  return (
    <section className="mac-fieldset-wrapper file-list-container">
      {heading && (
        <div className="mac-fieldset-legend">
          <h2>{heading}</h2>
        </div>
      )}
      {infoText && <div className="choice-info">{infoText}</div>}
      {uploadList.some((upload) => upload.url !== null) && (
        <div className="file-list-dl-button">
          <Button
            onClick={onDownloadAll}
            variation="primary"
            id={"dl_" + zipId}
          >
            <FontAwesomeIcon icon={faDownload} /> Download All
          </Button>
        </div>
      )}
      <MACCard childContainerClassName="ds-u-padding--0">
        {uploadList && (
          <ul className="mac-fieldset-options-list">
            {uploadList.map((upload, index) => (
              <li className="choice-list-item" key={index}>
                <h3>{upload.title}</h3>
                {upload.url ? (
                  <a
                    href={upload.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {upload.filename}
                  </a>
                ) : (
                  <span>
                    {upload.filename} -{" "}
                    {upload.virusScanStatus || "Pending Scan"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </MACCard>
    </section>
  );
}
