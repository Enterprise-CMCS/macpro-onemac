import React, { Component } from "react";
import PropTypes from "prop-types";
import * as s3Uploader from "../utils/s3Uploader";
import config from "../utils/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MAX_FILE_SIZE_BYTES = config.MAX_ATTACHMENT_SIZE_MB * 1024 * 1024;

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

const MISSING_REQUIRED_MESSAGE = "Required attachments missing";
const SIZE_TOO_LARGE_MESSAGE = `An attachment cannot be larger than ${config.MAX_ATTACHMENT_SIZE_MB}MB`;

export default class FileUploader extends Component {
  static propTypes = {
    requiredUploads: PropTypes.arrayOf(PropTypes.string),
    optionalUploads: PropTypes.arrayOf(PropTypes.string),
    showErrors: PropTypes.bool,
  };

  /**
   * Constructor
   * @param {Onject} props the properties
   */
  constructor(props) {
    super();
    this.allUploadsComplete = false;
    this.readyCallback = props.readyCallback;

    //Generate an array to keep track of the state of the file uploaders.
    //This method allows for duplicate titles.
    this.uploaders = [];
    let uploaderHasFile = [];
    let id = 0;
    if (props.requiredUploads) {
      props.requiredUploads.forEach((title) => {
        this.uploaders[id] = {
          id,
          title,
          isRequired: true,
          isComplete: false,
        };
        uploaderHasFile.push(false);
        id++;
      });
    }
    if (props.optionalUploads) {
      props.optionalUploads.forEach((title) => {
        this.uploaders[id] = {
          id,
          title,
          isRequired: false,
          isComplete: false,
        };
        uploaderHasFile.push(false);
        id++;
      });
    }

    // This state is used to be able to update the form when a change occurs.
    this.state = { uploaderHasFile,
      errorMessages: [],
    };
  }

  /**
   * Track updates to the showErrors property.
   * @param {*} prevProps the previous property state
   */
  componentDidUpdate(prevProps) {
    // Make sure we only continue if the property has changed value to stop cascading calls.
    // If the showErrors flag is true then show a missing required field error if needed.
    if (this.props.showErrors !== prevProps.showErrors && this.state.errorMessages.length === 0) {
      let areAllComplete = true;
      this.uploaders.forEach((uploader) => {
        if (uploader.isRequired && !uploader.isComplete) {
          areAllComplete = false;
        }
      });

      if(!areAllComplete) {
        this.setState({errorMessages: [MISSING_REQUIRED_MESSAGE]});
      }
    }
}

  /**
   * Set the provided uploader information.
   * @param {Object} event the event that triggered this action.
   * @param {number} id the ID of the uploader
   * @param {Object} files the list of files provided by the input field
   */
  handleFileChange(event, id, files = null) {
    // The state change here will result in kickin off a second empty event, so ignore it.
    if (event === 0) {
      return;
    }

    let uploader = this.uploaders[id];
    let errorMessages = [];

    // If there is a file speficified then
    if (files && files.length === 1) {
      // First check if the upload is larger than what is allowed
      if (files[0].size > MAX_FILE_SIZE_BYTES) {
        this.handleFileClear(event, id);
        errorMessages.push(SIZE_TOO_LARGE_MESSAGE);
        uploader.isComplete = false;
        uploader.file = null;
      } else {
        uploader.isComplete = true;
        uploader.file = files[0];
      }
    }
    // Else there is no file selected (e.g. clear the selected file). 
    else {
      uploader.isComplete = false;
      uploader.file = null;
    }

    //Update the state, so the form is updated.
    let newState = this.state.uploaderHasFile;
    newState[id] = uploader.isComplete;
    this.setState({ uploaderHasFile: newState });

    // Set the overall completeness of the input, so the overall form knows the required files are selected.
    let areAllComplete = true;
    this.uploaders.forEach((uploader) => {
      if (uploader.isRequired && !uploader.isComplete) {
        areAllComplete = false;
      }
    });

    // Clear any error messages if everything is ready.
    if(!areAllComplete && this.props.showErrors) {
      errorMessages.push(MISSING_REQUIRED_MESSAGE);
    } 

    this.allUploadsComplete = areAllComplete;
    if (this.readyCallback) {
      this.readyCallback(this.allUploadsComplete);
    }

    this.setState({errorMessages: errorMessages});
  }

  /**
   * Clear the file selection for the provided uploader.
   * @param {Object} event the event that triggered this action.
   * @param {number} id the ID of the uploader
   */
  handleFileClear(event, id) {
    document.getElementById("uploader-input-" + id).value = "";
    this.handleFileChange(event, id);
  }

  /**
   * Upload all the files.
   */
  uploadFiles = () => {
    let files = [];
    this.uploaders.forEach((uploader) => {
      if (uploader.file) {
        let file = uploader.file;
        file.title = uploader.title;
        files.push(uploader.file);
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
    this.uploaders.forEach((uploader) => {
      //Note that we hide the file input field, so we can have controls we can style.
      let controls = (
        <tr key={uploader.id}>
          <td className="uploader-type-cell">
            <div className="uploader-type-label">
              {uploader.title}
              {uploader.isRequired && <span className="required-mark">*</span>}
            </div>
          </td>
          <td className="uploader-input-cell">
            <label className="uploader-input-label">
              Choose File
              <input
                type="file"
                id={"uploader-input-" + uploader.id}
                name={"uploader-input-" + uploader.id}
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1",
                }}
                onChange={(event) =>
                  this.handleFileChange(event, uploader.id, event.target.files)
                }
              />
            </label>
            </td>
            <td className="uploaded-filename-cell">
            <span className="uploader-input-text">
              {this.state.uploaderHasFile[uploader.id]
                ? uploader.file.name
                : "No file chosen"}
            </span>
          </td>
          <td className="uploader-controls-cell">
            {this.state.uploaderHasFile[uploader.id] && (
              <button
                className="uploader-clear-button"
                title="Remove file"
                onClick={(event) => this.handleFileClear(event, uploader.id)}
              >
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </button>
            )}
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
      <div>
        <p className="req-message">Maximum file size of 50MB.</p>
        <p className="req-message">
          <span className="required-mark">*</span> indicates required
          attachment.
        </p>
        <div className="ds-u-color--error">
          {this.state.errorMessages.map((message, index) => 
           <div key={index}>{message}</div>
          )}
        </div>
        <div className="upload-card">
          <div className="uploader">
            <table>
              <tbody>{allControls}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
