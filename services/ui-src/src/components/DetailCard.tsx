import React, { PropsWithChildren } from "react";

export const DetailCard = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="detail-card-container">
      <div className="detail-card-top"></div>
      <div className="detail-card">{children}</div>
    </div>
  );
};
