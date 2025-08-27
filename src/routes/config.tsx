import { Navigate, type RouteObject } from "react-router-dom";
import { paths } from "./paths";
import { UsersPage } from "../features";

export const routes: RouteObject[] = [
  {
    path: paths.root,
    element: <Navigate to={paths.users} />,
  },
  {
    path: paths.users,
    element: <UsersPage />,
  },
  {
    path: paths.profiles,
    element: <UsersPage />,
  },
];