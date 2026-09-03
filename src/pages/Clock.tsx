import { useState } from "react";
import ClockGrid from "../components/clock/ClockGrid";
import useClock from "../hooks/useClock";
import { usePreferences } from "../contexts/PreferencesContext";

const Clock = () => {
  const currentTime = useClock();

  const [timezone, setTimezone] = useState("Africa/Lagos");

  const {
    preferences,
    setUse24Hour,
    setShowSeconds,
  } = usePreferences();

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Clock
        </h2>

        <p className="text-muted mb-0">
          View your current local time and date.
        </p>
      </div>

      <ClockGrid
        currentTime={currentTime}
        use24Hour={preferences.use24Hour}
        showSeconds={preferences.showSeconds}
        onToggleFormat={() =>
          setUse24Hour(!preferences.use24Hour)
        }
        onToggleSeconds={() =>
          setShowSeconds(!preferences.showSeconds)
        }
        timezone={timezone}
        onTimezoneChange={setTimezone}
      />

    </div>
  );
};

export default Clock;
