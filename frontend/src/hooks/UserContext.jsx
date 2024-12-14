import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (Object.keys(userData).length === 0) {
      userData = null;
    }

    if (Boolean(userData) == true) {
      setUserInfo(userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("orderData");
    localStorage.removeItem("bookDetails");
    setUserInfo(null);
    setIsLoggedIn(false);
    
    return true;
  };
  console.log(isLoggedIn)
  return (
    <UserContext.Provider value={{ setUserInfo, userInfo, isLoggedIn, logout,isLoading,setIsLoading,setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
