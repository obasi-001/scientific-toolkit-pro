import SettingsCard from "../components/settings/SettingsCard";
import { useTheme } from "../contexts/ThemeContext";
import { usePreferences } from "../contexts/PreferencesContext";

const Settings = () => {
    const {
        theme,
        themeMode,
        toggleTheme,
        useSystemTheme,
    } = useTheme();

    const {
        preferences,
        setUse24Hour,
        setShowSeconds,
        setAngleMode,
        resetPreferences,
    } = usePreferences();

    const handleResetPreferences = () => {
        resetPreferences();
    };

    const themeLabel =
        themeMode === "system"
            ? `System (${theme === "dark" ? "Dark" : "Light"} mode)`
            : theme === "dark"
              ? "Dark mode"
              : "Light mode";

    return (
        <div className="container-fluid">

            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    Settings
                </h2>

                <p className="text-muted mb-0">
                    Customize your Scientific Toolkit Pro experience.
                </p>
            </div>

            <SettingsCard
                title="Appearance"
                description="Customize the appearance of the application."
            >
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Theme</strong>
                        <div className="text-muted">
                            {themeLabel}
                        </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={toggleTheme}
                        >
                            Switch to{" "}
                            {theme === "dark"
                                ? "Light"
                                : "Dark"}
                        </button>

                        {themeMode !== "system" && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={useSystemTheme}
                            >
                                Use System
                            </button>
                        )}
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard
                title="Clock"
                description="Configure how time is displayed."
            >
                <div className="row g-4">

                    <div className="col-md-6">
                        <label
                            htmlFor="time-format"
                            className="form-label fw-semibold"
                        >
                            Time Format
                        </label>

                        <select
                            id="time-format"
                            className="form-select"
                            value={
                                preferences.use24Hour
                                    ? "24"
                                    : "12"
                            }
                            onChange={(event) =>
                                setUse24Hour(
                                    event.target.value === "24"
                                )
                            }
                        >
                            <option value="12">
                                12-hour
                            </option>

                            <option value="24">
                                24-hour
                            </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label
                            htmlFor="seconds"
                            className="form-label fw-semibold"
                        >
                            Seconds
                        </label>

                        <select
                            id="seconds"
                            className="form-select"
                            value={
                                preferences.showSeconds
                                    ? "show"
                                    : "hide"
                            }
                            onChange={(event) =>
                                setShowSeconds(
                                    event.target.value === "show"
                                )
                            }
                        >
                            <option value="show">
                                Show seconds
                            </option>

                            <option value="hide">
                                Hide seconds
                            </option>
                        </select>
                    </div>

                </div>
            </SettingsCard>

            <SettingsCard
                title="Calculator"
                description="Configure scientific calculator preferences."
            >
                <div className="row g-4">

                    <div className="col-md-6">
                        <label
                            htmlFor="angle-mode"
                            className="form-label fw-semibold"
                        >
                            Angle Mode
                        </label>

                        <select
                            id="angle-mode"
                            className="form-select"
                            value={preferences.angleMode}
                            onChange={(event) =>
                                setAngleMode(
                                    event.target.value as "DEG" | "RAD"
                                )
                            }
                        >
                            <option value="DEG">
                                Degrees (DEG)
                            </option>

                            <option value="RAD">
                                Radians (RAD)
                            </option>
                        </select>
                    </div>

                </div>
            </SettingsCard>
            <SettingsCard
                title="Reset"
                description="Restore your clock and calculator preferences to their default values."
            >
                <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div>
                        <strong>Reset preferences</strong>

                        <div className="text-muted">
                            This will restore the default clock and calculator settings.
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleResetPreferences}
                    >
                        Reset Preferences
                    </button>
                </div>
            </SettingsCard>

        </div>
    );
};

export default Settings;
