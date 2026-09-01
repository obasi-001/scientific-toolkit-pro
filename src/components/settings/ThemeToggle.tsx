import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<
    ThemeContextType | undefined
>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

const getSystemTheme = (): "light" | "dark" => {
    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
        ? "dark"
        : "light";
};

export const ThemeProvider = ({
    children,
}: ThemeProviderProps) => {

    const [theme, setTheme] = useState<Theme>(() => {

        const savedTheme =
            localStorage.getItem("calculator-theme");

        if (
            savedTheme === "light" ||
            savedTheme === "dark" ||
            savedTheme === "system"
        ) {
            return savedTheme;
        }

        return "system";
    });

    useEffect(() => {

        const root = document.documentElement;

        if (theme === "system") {
            root.setAttribute(
                "data-theme",
                getSystemTheme()
            );

            localStorage.removeItem(
                "calculator-theme"
            );

            return;
        }

        root.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "calculator-theme",
            theme
        );

    }, [theme]);

    useEffect(() => {

        if (theme !== "system") {
            return;
        }

        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        const handleSystemThemeChange = () => {

            document.documentElement.setAttribute(
                "data-theme",
                getSystemTheme()
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

    }, [theme]);

    const toggleTheme = () => {

        setTheme((currentTheme) => {

            if (currentTheme === "light") {
                return "dark";
            }

            if (currentTheme === "dark") {
                return "system";
            }

            return "light";
        });
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
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