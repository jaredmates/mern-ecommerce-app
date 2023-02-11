import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
