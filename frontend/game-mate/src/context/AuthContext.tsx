import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
