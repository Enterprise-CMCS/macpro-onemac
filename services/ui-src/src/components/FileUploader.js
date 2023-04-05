import React, { Component } from "react";
import PropTypes from "prop-types";
import * as s3Uploader from "../utils/s3Uploader";
import config from "../utils/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/** adjust to approximately 80 MB **/
const MAX_FILE_SIZE_BYTES = 1024 * 1024 * config.MAX_ATTACHMENT_SIZE_MB;

/**
 * Provides a file uploader component with a set of required and optional uploads.
 * Usage:
 *   Define the required and optional upload titles as needed.  Note both properties are optional :
 *     const requiredUploads = ['required title 1', 'required title 2'];
 *     const optionalUploads = ['optional title 1'];
 *
 *   Define a callback function if you need to know when the required uploads have been selected:
 *     function uploadsReadyCallbackFunction(state) {
 *       // Do something with the boolean state which is true when required uploads are set.
 *     }
 *
 *   Insert the following in your renderer:
 *    <FileUploader ref={uploader} requiredUploads={requiredUploads} optionalUploads={optionalUploads}
 *                   readyCallback={uploadsReadyCallbackFunction}></FileUploader>
 *
 *   Trigger the uploads when you are ready by calling:
 *     uploader.current.uploadFiles()
 *
 * @property {Array.string} requiredUploads an array of required upload types or null if no required uploads
 * @property {Array.string} optionalUploads an array of optional upload types or null if no optional uploads
 * @callback readyCallback callback that returns a boolean with true when all required uploads have been set
 */

export const MISSING_REQUIRED_MESSAGE = "Required attachments missing";
const SIZE_TOO_LARGE_MESSAGE = `An attachment cannot be larger than ${config.MAX_ATTACHMENT_SIZE_MB}MB`;

export default class FileUploader extends Component {
  static propTypes = {
    requiredUploads: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          allowMultiple: PropTypes.bool,
        }),
      ])
    ),
    optionalUploads: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          allowMultiple: PropTypes.bool,
        }),
      ])
    ),
    showRequiredFieldErrors: PropTypes.bool,
    withdrawIntro: PropTypes.bool,
  };

  /**
   * Constructor
   * @param {Onject} props the properties
   */
  constructor(props) {
    super();
    this.allUploadsComplete = false;
    this.readyCallback = props.readyCallback;

    function initializeUploader(uploadDetails, isRequired) {
      let uploadCriteria = {
        isRequired,
        hasFile: false,
        allowMultiple: true,
        title: "",
      };

      // Most 'uploadDetails' are strings which map to the uploadCriteria 'title'
      // but this also handles when 'uploadDetails' is an object with 'title' and 'allowMultiple' keys
      // for additional customization in restricting multiple files
      if (typeof uploadDetails === "string") {
        uploadCriteria.title = uploadDetails;
      } else if (typeof uploadDetails === "object") {
        uploadCriteria.title = uploadDetails.title;
        if (typeof uploadDetails.allowMultiple === "boolean") {
          uploadCriteria.allowMultiple = uploadDetails.allowMultiple;
        }
      }

      return uploadCriteria;
    }

    let uploaders = [];

    if (props.requiredUploads) {
      const requiredUploaders = props.requiredUploads.map((uploadDetails) =>
        initializeUploader(uploadDetails, true)
      );
      uploaders = uploaders.concat(requiredUploaders);
    }

    if (props.optionalUploads) {
      const optionalUploaders = props.optionalUploads.map((uploadDetails) =>
        initializeUploader(uploadDetails, false)
      );
      uploaders = uploaders.concat(optionalUploaders);
    }

    this.state = {
      errorMessages: [MISSING_REQUIRED_MESSAGE],
      uploaders: uploaders,
    };
  }

  componentDidUpdate(prevprops) {
    if (
      this.props.showRequiredFieldErrors &&
      !prevprops.showRequiredFieldErrors
    ) {
      this.filesUpdated();
    }
  }

  /**
   * Track updates to the file list and set flags and errors accordingly
   */
  filesUpdated() {
    // Checks if all required uploaders have a file
    let areAllComplete = true;
    let hasAtLeastOne = false;

    this.state.uploaders.forEach((uploader) => {
      if (uploader.hasFile) hasAtLeastOne = true;
      if (uploader.isRequired && !uploader.hasFile) {
        areAllComplete = false;
      }
    });

    if (this.props.requiredUploads.length === 0) {
      areAllComplete = hasAtLeastOne;
    }
    this.allUploadsComplete = areAllComplete;

    if (this.readyCallback) {
      this.readyCallback(this.allUploadsComplete);
    }

    if (areAllComplete) {
      this.setState({ errorMessages: [] });
    } else {
      this.setState({ errorMessages: [MISSING_REQUIRED_MESSAGE] });
    }
  }

  /**
   * Set the provided uploader information.
   * @param {Object} event the event that triggered this action.
   * @param {Object} uploader the uploader that the files are associated with
   * @param {Object} files the list of files provided by the input field
   */
  handleAddFiles(event, uploader, files = null) {
    // The state change here will result in kickin off a second empty event, so ignore it.
    if (event === 0 || !files || files.length === 0) {
      return;
    }

    let filesToUpload = [];
    let errorMessages = [];

    // Adds files to uploader
    for (let file of files) {
      // Adds error message if any of the files are too large
      if (file.size > MAX_FILE_SIZE_BYTES) {
        window.alert(SIZE_TOO_LARGE_MESSAGE);
        errorMessages.push(SIZE_TOO_LARGE_MESSAGE);
        continue;
      }

      filesToUpload.push(file);
      uploader.hasFile = true;
    }

    if (Array.isArray(uploader.files)) {
      uploader.files = uploader.files.concat(filesToUpload);
    } else {
      uploader.files = filesToUpload;
    }

    // remove the file list from the input so you can choose the same file again
    event.target.value = null;

    this.filesUpdated();
  }

  /**
   * Remove the file selection from the provided uploader
   * @param {Object} uploader the uploader that the file is associated with
   * @param {Object} file the event that triggered this action
   */
  handleRemoveFile(uploader, file) {
    const fileIndex = uploader.files.indexOf(file);
    uploader.files.splice(fileIndex, 1);

    this.setState({ uploaders: this.state.uploaders });

    if (!uploader.files || uploader.files.length === 0) {
      uploader.hasFile = false;
    }

    this.filesUpdated();
  }

  /**
   * Upload all the files.
   */
  uploadFiles = () => {
    let files = [];
    this.state.uploaders.forEach((uploader) => {
      if (uploader.files) {
        uploader.files.forEach((file) => {
          file.title = uploader.title;
        });
        files = files.concat(uploader.files);
      }
    });

    return s3Uploader.uploadFiles(files);
  };

  /**
   * Renderer
   * @returns the component view
   */
  render() {
    // Generate each file input control first.
    let reqControls = [];
    let optControls = [];
    const singleFileControls = [];
    this.state.uploaders.forEach((uploader, index) => {
      // disabled flag for types that only allow a single file for upload and a file is already selected
      let isDisabled = uploader.allowMultiple === false && uploader.hasFile;

      if (uploader.allowMultiple === false)
        singleFileControls.push(uploader.title);

      //Note that we hide the file input field, so we can have controls we can style.
      let controls = (
        <tr key={index}>
          <td className="uploader-type-cell">
            <div className="uploader-type-label">
              {uploader.title}
              {uploader.isRequired && <span className="required-mark">*</span>}
            </div>
          </td>
          <td className="uploader-input-cell">
            <label
              aria-label={`Add file${
                uploader.allowMultiple ? "s" : ""
              } of type ${uploader.title}`}
              className={
                isDisabled
                  ? "uploader-input-label-disabled"
                  : "uploader-input-label-active"
              }
            >
              Add File
              <input
                type="file"
                id={"uploader-input-" + index}
                data-testid={"uploader-input-" + index}
                name={"uploader-input-" + index}
                accept=".bmp,.csv,.doc,.docx,.gif,.jpg,.jpeg,.odp,.ods,.odt,.png,.pdf,.ppt,.pptx,.rtf,.tif,.tiff,.txt,.xls,.xlsx"
                multiple={uploader.allowMultiple}
                disabled={isDisabled}
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1",
                }}
                onChange={(event) =>
                  this.handleAddFiles(event, uploader, event.target.files)
                }
              />
            </label>
          </td>
          <td>
            {uploader.hasFile
              ? uploader.files.map((file, index) => {
                  return (
                    <div key={index} className="uploader-file-items">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="uploader-clear-button"
                        title="Remove file"
                        onClick={() => this.handleRemoveFile(uploader, file)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  );
                })
              : "No file chosen"}
          </td>
        </tr>
      );
      if (uploader.isRequired) {
        reqControls.push(controls);
      } else {
        optControls.push(controls);
      }
    });

    //This results in an array with all the required fields first, in the order specified in the property array.
    let allControls = reqControls.concat(optControls);

    return (
      <>
        <div className="ds-u-color--error">
          {this.props.showRequiredFieldErrors &&
            this.state.errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
        </div>
        <div className="upload-card">
          <div className="uploader">
            <table>
              <tbody>{allControls}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
