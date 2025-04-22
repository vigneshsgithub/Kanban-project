"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return <>{children}</>;
}
