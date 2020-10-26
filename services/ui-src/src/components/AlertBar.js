import React, { Component } from "react";
import { Alert } from "@cmsgov/design-system";

/**
 * Alert types
 */
export const ALERT_TYPES = {
  INFO: null, // Per CMS Design System
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
};

/**
 * Singleton Alert bar to display notifications to the user.  Note you can only add this
 * component once as it is a singleton.  Example usage:
 *   AlertBar.alert(ALERTS_MSG.MY_ALERT)
 */
export default class AlertBar extends Component {
  /**
   * Reference to the component instance.
   */
  static __singletonRef;

  /**
   * Constructor.
   */
  constructor() {
    super();
    if (!AlertBar.__singletonRef) {
      AlertBar.__singletonRef = this;
    } else {
      throw new Error(
        "You can only use the AlertBar once in your application."
      );
    }
    this.state = { isShown: false, heading: "", text: "", type: "" };
  }

  /**
   * Displays an alert.
   * @param {Object} alertMsg the alert message object with type, heading and text
   */
  static alert(alertMsg) {
    if (alertMsg) {
      AlertBar.__singletonRef.__alert(
        alertMsg.type,
        alertMsg.heading,
        alertMsg.text
      );
    } else {
      throw new Error("Must specify an alert message object.");
    }
  }

  /**
   * Dismisses/hides the alert.
   */
  static dismiss() {
    AlertBar.__singletonRef.__dismiss();
  }

  /**
   * DO NOT CALL THIS FUNCTION DIRECTLY.  Use AlertBar.dismiss().
   * Dismisses/hides the alert.
   */
  __dismiss() {
    this.setState({ isShown: false });
  }

  /**
   * DO NOT CALL THIS FUNCTION DIRECTLY.  Use AlertBar.alert().
   * Displays an informational alert.
   * @param {string} type the type of alert
   * @param {string} heading the alert heading
   * @param {string} text the alert text
   */
  __alert(type, heading, text) {
    this.setState({ isShown: true, type, heading, text });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {this.state.isShown && (
          <div className="alert-bar">
            <Alert variation={this.state.type} heading={this.state.heading}>
              <p className="ds-c-alert__text">{this.state.text}</p>
            </Alert>
          </div>
        )}
      </div>
    );
  }
}
