import React from "react";
import { Spinner } from "@cmsgov/design-system";

/**
 * Display a loading message and spinner.
 * @param {Object} props - component properties
 * @returns the component
 */
export default function LoadingScreen(props) {
  if (props.isLoading) {
    return (
      <div className="loading-screen" aria-relevant="additions" aria-live="polite">
        <Spinner />
      </div>
    );
  } else return props.children
}
