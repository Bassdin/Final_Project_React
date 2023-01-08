import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardRoute = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const [fromPage] = useState(location.pathname);
  console.log("location.pathname", location.pathname);
  return loggedIn === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ fromPage }} />
  );
};

export default AuthGuardRoute;
