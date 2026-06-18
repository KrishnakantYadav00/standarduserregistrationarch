import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();


export function AuthProvider({ children }) {


  const [token, setToken] = useState(
    localStorage.getItem("token")
  );


  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );


  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        return JSON.parse(atob(storedToken.split('.')[1]));
      } catch(e) {
        return null;
      }
    }
    return null;
  });

  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsAuthenticated(true);
    
    try {
      setUser(JSON.parse(atob(newToken.split('.')[1])));
    } catch(e) {
      setUser(null);
    }

  };


  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsAuthenticated(false);
    
    setUser(null);

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
        logout,
        user
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}
