import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AngleMode = "DEG" | "RAD";

interface Preferences {
  use24Hour: boolean;
  showSeconds: boolean;
  angleMode: AngleMode;
}

interface PreferencesContextType {
  preferences: Preferences;
  setUse24Hour: (value: boolean) => void;
  setShowSeconds: (value: boolean) => void;
  setAngleMode: (value: AngleMode) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<
  PreferencesContextType | undefined
>(undefined);

const defaultPreferences: Preferences = {
  use24Hour: false,
  showSeconds: true,
  angleMode: "DEG",
};

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider = ({
  children,
}: PreferencesProviderProps) => {

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };
  
  const [preferences, setPreferences] =
    useState<Preferences>(() => {
      const saved = localStorage.getItem(
        "calculator-preferences"
      );

      if (!saved) {
        return defaultPreferences;
      }

      try {
        return {
          ...defaultPreferences,
          ...JSON.parse(saved),
        };
      } catch {
        return defaultPreferences;
      }
    });

  useEffect(() => {
    localStorage.setItem(
      "calculator-preferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  const setUse24Hour = (value: boolean) => {
    setPreferences((previous) => ({
      ...previous,
      use24Hour: value,
    }));
  };

  const setShowSeconds = (value: boolean) => {
    setPreferences((previous) => ({
      ...previous,
      showSeconds: value,
    }));
  };

  const setAngleMode = (value: AngleMode) => {
    setPreferences((previous) => ({
      ...previous,
      angleMode: value,
    }));
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setUse24Hour,
        setShowSeconds,
        setAngleMode,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      "usePreferences must be used inside PreferencesProvider"
    );
  }

  return context;
};