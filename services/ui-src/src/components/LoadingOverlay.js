import React from "react";
import { Spinner } from "@cmsgov/design-system";

/**
 * Display a loading message and spinner.
 * @param {Object} props - component properties
 * @returns the component
 */
export default function LoadingOverlay(props) {
  return (
    <>
      <div
        className={props.isLoading ? "loading-screen" : "loading-screen-hidden"}
        aria-relevant="additions"
        aria-live="polite"
      >
        <Spinner />
      </div>
      <div className={props.isLoading ? "loading-screen-hidden" : ""}>
        {props.children}
      </div>
    </>
  );
}
