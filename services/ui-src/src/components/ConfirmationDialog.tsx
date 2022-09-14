import React, { ComponentProps, FC } from "react";
import { Button, Dialog } from "@cmsgov/design-system";
import cx from "classnames";

import { getApplicationNode } from "../utils";

type SelfProps = {
  className?: string;
  acceptText: string;
  cancelText?: string;
  onAccept: () => void;
  onCancel: () => void;
};

export const ConfirmationDialog: FC<
  SelfProps & ComponentProps<typeof Dialog>
> = ({
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
          variation="solid"
        >
          {acceptText}
        </Button>,
        <Button key="cancel" onClick={onCancel} variation="ghost">
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
