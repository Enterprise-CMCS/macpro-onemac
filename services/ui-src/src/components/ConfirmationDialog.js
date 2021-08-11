import React from "react";
import { Button, Dialog } from "@cmsgov/design-system";
import cx from "classnames";

import { getApplicationNode } from "../utils";

export const ConfirmationDialog = ({
  acceptText,
  className,
  onAccept,
  cancelText = "Cancel",
  onCancel,
  ...rest
}) => {
  return (
    <Dialog
      actions={[
        <Button
          className="ds-u-margin-right--1"
          key="ok"
          onClick={onAccept}
          variation="primary"
        >
          {acceptText}
        </Button>,
        <Button key="cancel" onClick={onCancel} variation="transparent">
          {cancelText}
        </Button>,
      ]}
      className={cx("confirmation-dialog", className)}
      getApplicationNode={getApplicationNode}
      onExit={onCancel}
      underlayClickExits
      {...rest}
    />
  );
};
