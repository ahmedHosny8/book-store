import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";


const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useContext(UserContext);

    if (isLoading) return <div></div>; 
  
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
