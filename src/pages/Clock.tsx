import { useState } from "react";
import ClockGrid from "../components/clock/ClockGrid";
import useClock from "../hooks/useClock";

const Clock = () => {
  const currentTime = useClock();

  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [timezone, setTimezone] = useState("Africa/Lagos");

  const handleToggleFormat = () => {
    setUse24Hour((previous) => !previous);
  };

  const handleToggleSeconds = () => {
    setShowSeconds((previous) => !previous);
  };

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
        use24Hour={use24Hour}
        showSeconds={showSeconds}
        onToggleFormat={handleToggleFormat}
        onToggleSeconds={handleToggleSeconds}
        timezone={timezone}
        onTimezoneChange={setTimezone}
      />

    </div>
  );
};

export default Clock;