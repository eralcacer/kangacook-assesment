import Home from "../../pages/Home";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

export const nav = [
  { path: "/", name: "Home", element: <Home />, isMenu: true, isPrivate: true },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/signup",
    name: "SignUp",
    element: <SignUp />,
    isMenu: false,
    isPrivate: false,
  },
];
