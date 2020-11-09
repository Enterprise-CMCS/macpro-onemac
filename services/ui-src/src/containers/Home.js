import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import serviceTypes from "../libs/serviceTypes.json";
import StepCard from "../components/StepCard";

/**
 * Displays information about the usage of the webform
 */
export default function Home() {
  /**
   * Chunks/divides items in an array into multiple arrays of the specified chunkSize length.
   * The last array contains the remainder of the items if it's less than the chunkSize.
   * @param {Array} items the data to be split into multiple arrays
   * @param {Number} chunkSize the length of the arrays for chunked data
   * @returns an array containing the multiple arrays of chunked data
   */
  function chunkItems(items, chunkSize) {
    let chunkedItems = [];

    let i;
    for (i = 0; i < items.length; i += chunkSize) {
      items.slice(i, i + chunkSize);
      chunkedItems.push(items.slice(i, i + chunkSize));
    }
    return chunkedItems;
  }

  /**
   * Takes a list of items and renders it into a column-formatted unordered list.
   * @param {Array} columnData data items for the list
   * @param {Number} index the index of the column, used as a key attribute on the div element
   * @returns a column with an unordered list of data items
   */
  function renderColumn(columnData, index) {
    const columnList = columnData.map((dataItem, index) => (
      <li key={index}>{dataItem}</li>
    ));

    return (
      <div className="column" key={index}>
        <ul>{columnList}</ul>
      </div>
    );
  }

  /**
   * Takes a list of items and renders it into a series of columns
   * @param {Array} itemsToColumnize the items to render into columns
   * @returns columns of data
   */
  function renderColumns(itemsToColumnize) {
    const numItemsPerCol = Math.ceil(itemsToColumnize.length / 4);
    const columnsData = chunkItems(itemsToColumnize, numItemsPerCol);

    return columnsData.map((columnData, index) =>
      renderColumn(columnData, index)
    );
  }

  return (
    <div className="about">
      <div className="section section-how-it-works">
        <div className="section-title black-text">How it Works</div>
        <div className="container-step-cards">
          <StepCard
            stepNumber="1"
            content="Login with MACPro credentials."
          />
          <StepCard
            stepNumber="2"
            content="Fill out and attach required forms for your SPA and/or Waiver submission to submit to CMS through the platform."
          />
          <StepCard
            stepNumber="3"
            content="After you submit, you will receive an email confirmation that your submission was received, marking the start of the 90-day review process."
          />
        </div>
      </div>
      <div className="section section-service-types extra-side-margin">
        <div className="section-title black-text">
          In this system, you can submit
        </div>
        <div className="section-subtitle">
          Amendments to your Medicaid State Plans (including related RAIs) for the following service types:
        </div>
        <div className="four-column-content">{renderColumns(serviceTypes)}</div>
        <div className="section-subtitle">
          Section 1915(b) waiver submissions and related formal Requests for Additional Information (RAIs)
        </div>
        <div className="section-subtitle">
          Section 1915(c) Appendix K amendments and related formal Requests for Additional Information (RAIs)
        </div>
        <div className="section-subtitle">
          State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers
        </div>
      </div>
      <div className="section section-support">
        <div className="section-title white-text">
          {"Do you have questions or need support? "}
          <Link to={ROUTES.FAQ}>Please read the FAQ page.</Link>
        </div>
      </div>
    </div>
  );
}
