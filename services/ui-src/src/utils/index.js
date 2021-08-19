/**
 * Format an array of printable values as text that fits in a paragraph.
 * @param {any[]} a list of values that can be converted into strings
 * @param {boolean} [oxford] allows you to disable Oxford comma
 * @returns {string}
 */
export const formatList = (arr, oxford = true) => {
  return arr.reduce((s, c, i) => {
    switch (i) {
      case 0:
        return `${c}`;
      case arr.length - 1:
        if (oxford && i !== 1) s += ",";
        return `${s} and ${c}`;
      default:
        return `${s}, ${c}`;
    }
  }, "");
};

/**
 * Get the root node for the app to render into. Also useful for the CMS Design
 * System Dialog component.
 */
export const getApplicationNode = () => document.getElementById("root");
