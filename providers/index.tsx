"use client";
import React from "react";
import { ThemeProvider } from "./theme";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
  );
};

export default Providers;
