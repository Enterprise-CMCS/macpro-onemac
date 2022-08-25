import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import { getSignInUrl } from "../libs/logoutLib";

export const AttachmentLanding = () => {
  return (
    <>
      <PageTitleBar heading="Welcome to OneMAC" />
      <div className="attachment-redirect-wrapper">
        <article className="attachment-redirect">
          <p>
            You have been directed here by a link to a document managed by
            OneMAC. We now require all users to log in before accessing
            attachments. Please follow these steps to find what you are looking
            for:
          </p>
          <ol>
            <li>
              <a href={getSignInUrl()}>Log in via Okta</a>{" "}
              <b>with your EUA ID</b> to access the OneMAC dashboard.
            </li>
            <li>
              On the dashboard, locate the submission you received an email
              about in the list.
              <aside>
                To find it more quickly, you can use the search functionality
                built into your browser. On Windows, this can be accessed with
                the keyboard shortcut <kbd>Ctrl</kbd> + <kbd>F</kbd>. On macOS,
                it can be accessed via <kbd>⌘</kbd> + <kbd>F</kbd>.
              </aside>
            </li>
            <li>Click on its ID in the first column to view its details.</li>
            <li>
              Download one or all of the documents attached to the submission to
              view them.
            </li>
          </ol>
        </article>
      </div>
    </>
  );
};
