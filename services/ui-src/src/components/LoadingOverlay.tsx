import React, { ReactNode } from "react";
import { Spinner } from "@cmsgov/design-system";

/**
 * Display a loading message and spinner.
 */
const LoadingOverlay: React.FC<{
  isLoading: boolean;
  children: null | ReactNode;
}> = ({ isLoading, children = null }) => (
  <>
    <div
      className={isLoading ? "loading-screen" : "loading-screen-hidden"}
      aria-relevant="additions"
      aria-live="polite"
    >
      <Spinner />
    </div>
    <div className={isLoading ? "loading-screen-hidden" : ""}>{children}</div>
  </>
);

export default LoadingOverlay;
