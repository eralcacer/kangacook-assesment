import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {nav.map((route, key) => {
        if (route.isPrivate && user.isAuthenticated) {
          return (
            <Route key={key} path={route.path} element={route.element}></Route>
          );
        } else if (!route.isPrivate) {
          return (
            <Route key={key} path={route.path} element={route.element}></Route>
          );
        } else {
          return false;
        }
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData();

  const MenuItem = ({ r }) => {
    return (
      <div className="menuItem mx-4 font-semibold">
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };
  return (
    <div className="menu flex w-fit m-auto justify-between my-6 text-white uppercase">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem className="mx-4" key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem className="mx-4" key={i} r={r} />;
        } else return false;
      })}

      {user.isAuthenticated ? (
        <div className="menuItem mx-4 font-semibold">
          <Link to={"#"} onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <>
          <div className="menuItem mx-4 font-semibold">
            <Link to={"login"}>Log in</Link>
          </div>
          <div className="menuItem mx-4 font-semibold">
            <Link to={"signup"}>Sign Up</Link>
          </div>
        </>
      )}
    </div>
  );
};
