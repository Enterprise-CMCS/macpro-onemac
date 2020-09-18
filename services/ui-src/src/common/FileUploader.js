import React, { Component } from "react";
import PropTypes from "prop-types";
import * as s3Uploader from "../utils/s3Uploader";

/**
 * Provides a file uploader with a set of required and optional uploads.
 * @property {Array.string} requiredUploads an optional array of required upload types
 * @property {Array.string} optionalUploads an optional array of optional upload types
 * @callback readyCallback callback that returns a boolean with true when all required uploads have been set
 */
export default class FileUploader extends Component {
  static propTypes = {
    requiredUploads: PropTypes.arrayOf(PropTypes.string),
    optionalUploads: PropTypes.arrayOf(PropTypes.string),
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

    this.state = { uploaderHasFile };
  }

  /**
   * Set the provided uploader information.
   * @param {number} id the ID of the uploader
   * @param {Object} file the file information to be uploaded, or null to remove a previous file
   */
  setUploader(event, id, files = null) {
    // The state change here will result in kickin off a second empty event, so ignore it.
    if (event === 0) {
      return;
    }

    let uploader = this.uploaders[id];

    // If there is no file speficified then the state is false.
    if (files && files.length === 1) {
      uploader.isComplete = true;
      uploader.file = files[0];
    } else {
      uploader.isComplete = false;
      uploader.file = null;
    }
    let newState = this.state.uploaderHasFile;
    newState[id] = uploader.isComplete;
    this.setState({ uploaderHasFile: newState });

    let areAllComplete = true;
    this.uploaders.forEach((uploader) => {
      if (uploader.isRequired && !uploader.isComplete) {
        areAllComplete = false;
      }
    });
    this.allUploadsComplete = areAllComplete;
    if (this.readyCallback) {
      this.readyCallback(this.allUploadsComplete);
    }
  }

  /**
   * Upload all the files.
   */
  uploadFiles = () => {
    let files = [];
    this.state.uploaders.forEach((uploader) => {
      if (uploader.file) {
        let file = uploader.file;
        file.title = uploader.title;
        files.push(uploader.file);
      }
    });

    return s3Uploader.uploadFiles(files);
  };

  handleFileClear(event, id) {
    document.getElementById("uploader-input-" + id).value="";
    this.setUploader(event, id);

  }
  /**
   * Renderer
   * @returns the component view
   */
  render() {
    let reqControls = [];
    let optControls = [];
    this.uploaders.forEach((uploader) => {
      let controls = (
        <div key={uploader.id} className="uploader">
          <div className="uploader-label">
            {uploader.title}
            {uploader.isRequired && <span className="required-mark">*</span>}
          </div>
          <div className="uploader-input">
            <input
              className="uploader-input"
              type="file"
              id={"uploader-input-" + uploader.id}
              onChange={(event) => this.setUploader(event, uploader.id, event.target.files)}
            />
          </div>
          <div className="uploader-controls">
            {this.state.uploaderHasFile[uploader.id] && (
              <button onClick={(event) => this.handleFileClear(event, uploader.id)}>CLEAR</button>
            )}
          </div>
        </div>
      );
      if (uploader.isRequired) {
        reqControls.push(controls);
      } else {
        optControls.push(controls);
      }
    });

    let allControls = reqControls.concat(optControls);

    return <div>{allControls}</div>;
  }
}
