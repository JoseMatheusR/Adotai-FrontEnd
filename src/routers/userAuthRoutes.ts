import { RouteObject } from "react-router-dom";
import { LoginPage } from "../auth/user/login";
import { RegisterPage } from "../auth/user/register";
import { userAuthRoutes as userAuthConstants } from "../auth/user/constants/routes";
import React from "react";

export const userAuthRoutes: RouteObject[] = [
  {
    path: userAuthConstants.login(),
    element: React.createElement(LoginPage),
  },
  {
    path: userAuthConstants.register(),
    element: React.createElement(RegisterPage),
  },
];
