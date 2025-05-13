import { RouteObject } from "react-router-dom";
import { animalManagmentRouter } from "../pages/animalManagement/constants/router";
import React from "react";
import { AnimalManagementPage } from "../pages/animalManagement";

export const orgRoutes: RouteObject[] = [
  {
    path: animalManagmentRouter.root(),
    element: React.createElement(AnimalManagementPage),
  },
];
