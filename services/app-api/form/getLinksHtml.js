/**
 * Get HTML containing links representing the attached documents.
 * @param {Object} uploads data describing the uploaded file, with title, url, and filename
 * @returns {String} HTML with the document links.
 */
export function getLinksHtml(uploads) {
  if (!Array.isArray(uploads) || uploads.length === 0) return "";

  return (
    "<ul>" +
    uploads
      .filter((u) => u && u.title && u.filename)
      .map(({ title, filename }) => `<li>${title}: ${filename}</li>`)
      .join("") +
    "</ul>"
  );
}
