import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
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
    let id = 0;
    if (props.requiredUploads) {
      props.requiredUploads.forEach((title) => {
        this.uploaders[id] = {
          id,
          title,
          isRequired: true,
          isComplete: false,
        };
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
        id++;
      });
    }
  }

  /**
   * Generate the required upload controls.
   * @returns the upload controls
   */
  generateRequiredControls() {
    let retval = [];
    this.uploaders.forEach((uploader) => {
      if (uploader.isRequired) {
        let body = (
          <div key={uploader.id} className="uploader">
            <div className="uploader-title">
              {uploader.title}
              <span className="required-mark">*</span>
            </div>
            <div className="uploader-control-container">
              <FormControl
                className="uploader-control"
                type="file"
                onChange={(e) =>
                  this.handleFileChange(uploader.id, e.target.files)
                }
              />
            </div>
          </div>
        );
        retval.push(body);
      }
    });
    return retval;
  }

  /**
   * Generate the optional upload controls.
   * @returns the upload controls
   */
  generateOptionalControls() {
    //TODO Implement
    return null;
  }

  /**
   * Handle when a file input changes.
   * @param {number} id the ID of the uploader
   * @param {Object} fileList the list of files provided by the file input
   */
  async handleFileChange(id, fileList) {
    if (fileList && fileList.length === 1) {
      // We will only allow one file per file input.
      this.setUploader(id, fileList[0]);
    } else {
      this.setUploader(id);
    }
  }

  /**
   * Set the provided uploader information.
   * @param {number} id the ID of the uploader
   * @param {Object} file the file information to be uploaded, or null to remove a previous file
   */
  setUploader(id, file = null) {
    this.uploaders[id].file = file;
    // If there is no file speficified then the state is false.
    if (!file) {
      this.uploaders[id].isComplete = false;
    } else {
      this.uploaders[id].isComplete = true;
    }

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
    return (
      <div>
        {this.generateRequiredControls()}
        {this.generateOptionalControls()}
      </div>
    );
  }
}
