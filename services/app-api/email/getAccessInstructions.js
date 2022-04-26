/**
 * Get HTML instructions for accessing submissions in the application.
 * @returns {string}
 */
export function getAccessInstructions() {
  return `
      <ul>
        <li>
          The submission can be accessed in the OneMAC application, which you can
          find at <a href="${process.env.applicationEndpoint}/dashboard">this link</a>.
        </li>
        <li>
          If you are not already logged in, please click the "Login" link at the
          top of the page and log in using your Enterprise User Administration
          (EUA) credentials.
        </li>
        <li>
          After you have logged in, you will be taken to the OneMAC application.
          The submission will be listed on the dashboard page, and you can view
          its details by clicking on its ID number.
        </li>
      </ul>
    `;
}
