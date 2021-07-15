import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * Read only component to list the attachments.
 * @param {Object} props component properties
 * @returns the component
 */
export default function FileList(props) {
  const uploadList = props.uploadList;

  return (
    <div>
      {uploadList && (
        <div>
          {uploadList.map((upload, index) => (
            <div key={index}>
              {upload.title}:{" "}
              <a href={upload.url} target="_blank" rel="noopener noreferrer">
                {upload.filename}
              </a>{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
