import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeMode = Theme | "system";

const THEME_STORAGE_KEY = "calculator-theme";
const THEME_STORAGE_VERSION_KEY = "calculator-theme-version";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  useSystemTheme: () => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const getSystemTheme = (): Theme => {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
};

const getInitialThemeMode = (): ThemeMode => {
  const savedTheme = localStorage.getItem(
    THEME_STORAGE_KEY
  );
  const savedVersion = localStorage.getItem(
    THEME_STORAGE_VERSION_KEY
  );

  if (
    savedTheme === "system" ||
    savedTheme === "dark"
  ) {
    return savedTheme;
  }

  if (
    savedTheme === "light" &&
    savedVersion === "2"
  ) {
    return "light";
  }

  return "system";
};

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    getInitialThemeMode
  );
  const [systemTheme, setSystemTheme] =
    useState<Theme>(getSystemTheme);

  const theme =
    themeMode === "system"
      ? systemTheme
      : themeMode;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = () => {
      setSystemTheme(
        mediaQuery.matches ? "dark" : "light"
      );
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      themeMode
    );
    localStorage.setItem(
      THEME_STORAGE_VERSION_KEY,
      "2"
    );
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(() =>
      theme === "light"
        ? "dark"
        : "light"
    );
  };

  const useSystemTheme = () => {
    setThemeMode("system");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
        useSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};
