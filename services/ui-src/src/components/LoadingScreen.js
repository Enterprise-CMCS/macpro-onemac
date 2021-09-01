import React from "react";
import { Spinner } from "@cmsgov/design-system";

/**
 * Display a loading message and spinner.
 * @param {Object} props - component properties
 * @returns the component
 */

export const LOADER_TEST_ID = "loading-screen";

export default function LoadingScreen(props) {
  if (props.isLoading) {
    return (
      <div
        data-testid={LOADER_TEST_ID}
        className="loading-screen"
        aria-relevant="additions"
        aria-live="polite"
      >
        <Spinner />
      </div>
    );
  } else return props.children;
}
