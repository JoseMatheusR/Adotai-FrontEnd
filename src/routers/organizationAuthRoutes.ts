import { RouteObject } from "react-router-dom";
import { RegisterPage } from "../auth/organization/register";
import { orgAuthRoutes as orgAuthConstants } from "../auth/organization/constants/routes";
import React from "react";
import { LoginPage } from "../auth/organization/login";

export const orgAuthRoutes: RouteObject[] = [
  {
    path: orgAuthConstants.login(),
    element: React.createElement(LoginPage),
  },
  {
    path: orgAuthConstants.register(),
    element: React.createElement(RegisterPage),
  },
];
