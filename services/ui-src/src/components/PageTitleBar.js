import React, { Component } from "react";

/**
 * PageTitleBar contains supplemental information for the user in the form of a
 * title (usually describes the page) and an optional description (see About page)
*/
export default class PageTitleBar extends Component {

  /**
   * Reference to the component instance.
   */
  static __singletonRef;

  /**
   * Constructor.
   */
  constructor() {
    super();
    if (!PageTitleBar.__singletonRef) {
      PageTitleBar.__singletonRef = this;
    } else {
      throw new Error(
        "You can only use the PageTitleBar once in your application."
      );
    }
    this.state = { isShown: true, heading: "SPA and Waiver Submission Application", text: "" };
  }

  /**
   * Displays a page header area which describes this specific page/form.
   * @param {Object} setPageTitle the alert message object with type, heading and text
   */
  static setPageTitleInfo(pageInfo) {
    if (pageInfo) {
      PageTitleBar.__singletonRef.__setPageTitleInfo(
        pageInfo.heading,
        pageInfo.text
      );
    } else {
      throw new Error("Must specify a Page Info object.");
    }
  }


  /**
   * Dismisses/hides the alert.
   */
  static dismiss() {
    PageTitleBar.__singletonRef.__dismiss();
  }

  /**
   * DO NOT CALL THIS FUNCTION DIRECTLY.  Use AlertBar.dismiss().
   * Dismisses/hides the alert.
   */
  __dismiss() {
    this.setState({ isShown: false });
  }

  /**
   * DO NOT CALL THIS FUNCTION DIRECTLY.  Use PageTitleBar.alert().
   * Displays informational text under the nav bar.
   * @param {string} heading the page title
   * @param {string} text the optional description
   */
  __setPageTitleInfo(heading, text) {
    this.setState({ isShown: true, heading, text });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {this.state.isShown && (
          <div className="page-title-bar">
            <h1>{this.state.heading}</h1>
              {this.state.text && (
                <p className="ds-c-alert__text">{this.state.text}</p>
              )}
          </div>
        )}
      </div>
    );
  }
}