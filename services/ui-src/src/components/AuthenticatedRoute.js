import React from "react";
import { Route } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();

  return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
}
