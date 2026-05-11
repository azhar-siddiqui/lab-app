"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { DEFAULT_THEME } from "./theme.config";

const COOKIE_NAME = "active_theme";

function setThemeCookie(theme: string) {
  if ((globalThis as any).window === undefined) return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${globalThis.location.protocol === "https:" ? "Secure;" : ""}`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  readonly children: ReactNode;
  readonly initialTheme?: string;
}) {
  const themeToUse = initialTheme || DEFAULT_THEME;
  const [activeTheme, setActiveTheme] = useState<string>(themeToUse);

  useEffect(() => {
    // Only update if theme has changed
    const currentTheme = document.documentElement.dataset.theme;

    if (currentTheme === activeTheme) {
      // Still update cookie in case it's missing
      setThemeCookie(activeTheme);
    } else {
      setThemeCookie(activeTheme);

      // Remove existing data-theme attribute
      delete document.documentElement.dataset.theme;

      // Remove any theme classes from body (cleanup)
      Array.from(document.body.classList)
        .filter((className) => className.startsWith("theme-"))
        .forEach((className) => {
          document.body.classList.remove(className);
        });

      // Set data-theme on html element
      if (activeTheme) {
        document.documentElement.dataset.theme = activeTheme;
      }
    }
  }, [activeTheme]);

  const contextValue = React.useMemo(() => {
    return { activeTheme, setActiveTheme };
  }, [activeTheme, setActiveTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider",
    );
  }
  return context;
}
