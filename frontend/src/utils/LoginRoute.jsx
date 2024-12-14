import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useContext } from "react";

const LoginRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
   console.log(isLoggedIn)
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default LoginRoute;
