import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import * as s3Uploader from "../libs/s3Uploader";

export default class FileUploader extends Component {
  constructor(props) {
    super();
    this.allUploadsComplete = false;
    this.completedCallback = props.completedCallback;

    //Generate a map to keep track of the state of the file uploaders.
    //This method allows for duplicate titles.
    this.uploaders = [];
    let id = 0;
    if (props.required) {
      props.required.forEach((title) => {
        this.uploaders[id] = {
          id,
          title,
          isRequired: true,
          isComplete: false,
        };
        id++;
      });
    }
    if (props.optional) {
      props.optional.forEach((title) => {
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

  generateRequiredControls() {
    let retval = [];
    this.uploaders.forEach((uploader) => {
        if(uploader.isRequired) {
            let body = (
                <div key={uploader.id} className="uploader">
                    <div className="uploader-title">
                    {uploader.title}
                    <span className="uploader-title-required">*</span>
                    </div>
                    <div className="uploader-control-container">
                    <FormControl
                        className="uploader-control"
                        type="file"
                        onChange={(e) => this.handleFileChange(uploader.id, e.target.files)}
                    />
                    </div>
                </div>
            );
            retval.push(body);
        }
    });
    return retval;
  }

  generateOptionalControls() {
    //TODO Implement
    return null;
  }

  async handleFileChange(id, fileList) {
    if (fileList && fileList.length === 1) {
      console.log(fileList[0]);
      const file = fileList[0];
      this.setUploaderState(id, true, file);
      
    } else {
        this.setUploaderState(id, false);
    }
  }

  setUploaderState(id, state, file = null) {
    this.uploaders[id].isComplete = state;
    this.uploaders[id].file = file;
    // If there is no file speficified then the state is false.
    if(!file) {
        this.uploaders[id].isComplete = false;
    } 

    let areAllComplete = true;
    this.uploaders.forEach(uploader => {
        if(uploader.isRequired && !uploader.isComplete) {
            areAllComplete = false;
        }
    });
    this.allUploadsComplete = areAllComplete;
    if(this.completedCallback) {
        this.completedCallback(this.allUploadsComplete);
    }
    console.log("COMPLETE", this.allUploadsComplete);
    console.log("Updated uploader", this.uploaders[id])
  }

  uploadFiles = () =>  {
    this.uploaders.forEach(uploader => {
        if(uploader.file ) {
            console.log("File to Upload", uploader.file);
        }
    });
  }

  render() {
    return (
      <div className="file-uploader">
        <div className="file-uploader-title">Attachments</div>
        {this.generateRequiredControls()}
        {this.generateOptionalControls()}
        <button onClick={this.uploadFiles}>Go!</button>
      </div> 
    );
  }
}

FileUploader.propTypes = {
  required: PropTypes.arrayOf(PropTypes.string),
  optional: PropTypes.arrayOf(PropTypes.string),
};
