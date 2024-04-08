import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loadable from "../components/loadable/Loadable.tsx";

/* ***Layouts**** */
const ProtectedAuth = Loadable(
  lazy(() => import("../components/auth/ProtectedAuth"))
);
const ProtectedNoAuth = Loadable(
  lazy(() => import("../components/auth/ProtectedNoAuth"))
);
/* ****Pages***** */
const Login = Loadable(lazy(() => import("../views/auth/Login.tsx")));
const Users = Loadable(lazy(() => import("../views/users/users.tsx")));
const CreateUser = Loadable(lazy(() => import("../modules/users/components/createUser.tsx")));
const Error = Loadable(lazy(() => import("../components/notfound/Error.tsx")));

const Router = [
  {
    path: "/",
    element: (
      <ProtectedAuth>
        <Outlet />
      </ProtectedAuth>
    ),
    children: [
      { path: "/", element: <Navigate to='/Home' /> },
      { path: "/Home", exact: true, element: <Users /> },
      
      { path: "*", element: <Error /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <ProtectedNoAuth>
        <Outlet />
      </ProtectedNoAuth>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "Create-user", exact: true, element: <CreateUser /> },
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to='/auth/404' /> },
    ],
  },
];

export default Router;
