interface LandingPageConfig {
  pageTitle: string;
  // logo passed as <img /> element
  logoJSX: JSX.Element;
  // TriageExternalLandingPage component handles positioning, but use
  // <p> tags to handle spacing in the descriptionJSX element
  descriptionJSX: JSX.Element;
  buttonLabel: string;
}
