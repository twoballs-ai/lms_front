"use client";
import { createContext, useEffect, useMemo, useState } from "react";

type Role = "teacher" | "student" | "site_user" | null;

type AuthContextValue = {
  authenticated: boolean;
  role: Role;
  toggleAuthentication: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  authenticated: false,
  role: null,
  toggleAuthentication: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const syncAuth = () => {
      const storedRoles = localStorage.getItem("roles");
      const token = localStorage.getItem("access_token");

      if (!storedRoles || !token) {
        setRole(null);
        setAuthenticated(false);
        return;
      }

      try {
        const parsedRoles = JSON.parse(storedRoles) as Role[];

        if (parsedRoles.includes("teacher")) {
          setRole("teacher");
        } else if (parsedRoles.includes("student")) {
          setRole("student");
        } else if (parsedRoles.includes("site_user")) {
          setRole("site_user");
        }

        setAuthenticated(true);
      } catch {
        setRole(null);
        setAuthenticated(false);
      }
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:changed", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:changed", syncAuth);
    };
  }, []);

  const toggleAuthentication = () => {
    const token = localStorage.getItem("access_token");
    setAuthenticated(Boolean(token));
  };

  const value = useMemo(
    () => ({ authenticated, role, toggleAuthentication }),
    [authenticated, role]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};