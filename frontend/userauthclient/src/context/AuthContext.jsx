import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();


export function AuthProvider({ children }) {


  const [token, setToken] = useState(
    localStorage.getItem("token")
  );


  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );


  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsAuthenticated(true);

  };


  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsAuthenticated(false);

  };


  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {

      setToken(storedToken);

      setIsAuthenticated(true);

    }

  }, []);


  return (

    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}
