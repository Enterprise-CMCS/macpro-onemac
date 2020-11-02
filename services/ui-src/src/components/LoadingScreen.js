import React from "react";
import { Spinner } from "@cmsgov/design-system";

/**
 * Display a loading message and spinner.
 * @returns the component
 */
export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Spinner />
      LOADING...
    </div>
  );
}
