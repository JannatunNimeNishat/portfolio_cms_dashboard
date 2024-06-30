/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { isLoggedIn } from "../utils/authServices";

const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = isLoggedIn();

  if (isUserLoggedIn) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
