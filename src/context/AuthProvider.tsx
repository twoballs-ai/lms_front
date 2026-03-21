"use client";
import { createContext, useEffect, useMemo, useState } from "react";

type Role = "teacher_model" | "student_model" | null;

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
      const storedRole = localStorage.getItem("role");

      if (!storedRole) {
        setRole(null);
        setAuthenticated(false);
        return;
      }

      try {
        const parsedRole = JSON.parse(storedRole) as Role;

        if (parsedRole === "teacher_model" || parsedRole === "student_model") {
          setRole(parsedRole);
          setAuthenticated(true);
          return;
        }
      } catch {
        if (storedRole === "teacher_model" || storedRole === "student_model") {
          setRole(storedRole);
          setAuthenticated(true);
          return;
        }
      }

      setRole(null);
      setAuthenticated(false);
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
    const currentRole = localStorage.getItem("role");

    if (!currentRole) {
      setAuthenticated(false);
      setRole(null);
      return;
    }

    try {
      const parsedRole = JSON.parse(currentRole) as Role;
      if (parsedRole === "teacher_model" || parsedRole === "student_model") {
        setRole(parsedRole);
        setAuthenticated((prev) => !prev);
      }
    } catch {
      if (currentRole === "teacher_model" || currentRole === "student_model") {
        setRole(currentRole);
        setAuthenticated((prev) => !prev);
      }
    }
  };

  const value = useMemo(
    () => ({ authenticated, role, toggleAuthentication }),
    [authenticated, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
