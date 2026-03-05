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
    const storedRole = localStorage.getItem("role");
    if (storedRole === "teacher_model" || storedRole === "student_model") {
      setRole(storedRole);
      setAuthenticated(true);
    }
  }, []);

  const toggleAuthentication = () => {
    const currentRole = localStorage.getItem("role");
    if (currentRole === "teacher_model" || currentRole === "student_model") {
      setAuthenticated((prev) => !prev);
    }
  };

  const value = useMemo(
    () => ({ authenticated, role, toggleAuthentication }),
    [authenticated, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
