import { createBrowserRouter, RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import Providers from "../providers";
import AuthProtectedRoute from "../auth/AuthProtectedRoutes";
import HomePage from "../pages/home";
import { userAuthRoutes } from "./userAuthRoutes";
import { orgAuthRoutes } from "./organizationAuthRoutes";
import { orgRoutes } from "./organizationRouters";

const protectedRoutes: RouteObject[] = [...orgRoutes];

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"home"} replace />,
  },
  ...userAuthRoutes,
  ...orgAuthRoutes,
  {
    path: "home",
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Rotas públicas
      ...publicRoutes,

      // Rotas protegidas
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: protectedRoutes,
      },
    ],
  },
  //{
  //  path: "*",
  //  element: <NotFoundPage />,
  //},
]);

export default router;
