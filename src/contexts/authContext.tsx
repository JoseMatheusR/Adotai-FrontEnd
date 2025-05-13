import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(
    Cookies.get("token") || null
  );

  useEffect(() => {
    if (authToken) {
      Cookies.set("token", authToken, {
        expires: 2,
        secure: true,
        sameSite: "strict",
      });
    } else {
      Cookies.remove("token");
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, isAuthenticated: !!authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
