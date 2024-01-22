import React from "react";
import { useUser } from "../../context/CurrentUserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { user } = useUser()

  return user.token ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
