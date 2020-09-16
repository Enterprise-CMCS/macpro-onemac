import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class FileUploader extends Component {
    generateRequiredControls() {
        let body = null;
        if(this.props.required) {
            body = this.props.required.map((docTitle) =>
                <div class="uploader">
                    <div class="uploader-title">
                        {docTitle}<span class="uploader-title-required">*</span>
                    </div>
                    <div class="uploader-control-container">
                        <FormControl class="uploader-control" type="file" onChange={(e) =>this.handleFileChange(e.target.files)}/>
                    </div>
                </div>
            );
        }
        return body;
    }

    generateOptionalControls() {
        //TODO Implement
        return null;
    }

    handleFileChange(fileList) {
        console.log("FILE");
        if(fileList  && fileList.length == 1) {
            console.log(fileList[0]);
        }
    }

    render() {
        return (
            <div class="file-uploader">
                <div class="file-uploader-title">
                    Attachments
                </div>
                {this.generateRequiredControls()}
                {this.generateOptionalControls()}
            </div>
        );
    }
}

FileUploader.propTypes = {
    required:  PropTypes.arrayOf(PropTypes.string),
    optional:  PropTypes.arrayOf(PropTypes.string),
  };