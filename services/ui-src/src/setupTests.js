// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

window._env_ = {};
window.scroll = () => {};

// used in the Dialog component from the CMS Design System
jest.mock("focus-trap", () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

window.matchMedia = jest.fn((query) => {
  return {
    matches: query === '(max-width: 600px)', // Adjust this logic based on your needs
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated, but still mock for compatibility
    removeListener: jest.fn(), // Deprecated, but still mock for compatibility
    addEventListener: jest.fn(), // For modern browsers
    removeEventListener: jest.fn(), // For modern browsers
    dispatchEvent: jest.fn(), // For modern browsers
  };
});
console.log("Setup file loaded");