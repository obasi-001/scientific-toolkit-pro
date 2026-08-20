import ClockCard from "./ClockCard";

interface ClockGridProps {
    currentTime: Date;
    use24Hour: boolean;
    showSeconds: boolean;
    timezone: string;
    onToggleFormat: () => void;
    onToggleSeconds: () => void;
    onTimezoneChange: (timezone: string) => void;
}

const ClockGrid = ({
    currentTime,
    use24Hour,
    showSeconds,
    timezone,
    onToggleFormat,
    onToggleSeconds,
    onTimezoneChange,
}: ClockGridProps) => {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-10 mx-auto">

                <ClockCard
                    currentTime={currentTime}
                    use24Hour={use24Hour}
                    showSeconds={showSeconds}
                    timezone={timezone}
                />

                <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">

                    <select
                        className="form-select"
                        style={{ maxWidth: "280px", minWidth: "200px" }}
                        value={timezone}
                        onChange={(e) =>
                            onTimezoneChange(e.target.value)
                        }
                    >
                        <option value="Africa/Lagos">
                            Lagos
                        </option>

                        <option value="Europe/London">
                            London
                        </option>
                        <option value="Europe/Madrid">
                            Spain
                        </option>

                        <option value="America/New_York">
                            New York
                        </option>
                        <option value="America/Washington">
                            Washington D.C.
                        </option>

                        <option value="America/Chicago">
                            Chicago
                        </option>

                        <option value="America/Los_Angeles">
                            Los Angeles
                        </option>

                        <option value="America/Toronto">
                            Toronto
                        </option>

                        <option value="Asia/Dubai">
                            Dubai
                        </option>

                        <option value="Africa/Johannesburg">
                            Johannesburg
                        </option>

                        <option value="Africa/Cairo">
                            Cairo
                        </option>

                        <option value="Europe/Paris">
                            Paris
                        </option>

                        <option value="Europe/Berlin">
                            Berlin
                        </option>

                        <option value="Asia/Shanghai">
                            Shanghai
                        </option>

                        <option value="Asia/Kolkata">
                            India
                        </option>

                        <option value="Asia/Tokyo">
                            Tokyo
                        </option>

                        <option value="Asia/Singapore">
                            Singapore
                        </option>

                        <option value="Australia/Sydney">
                            Sydney
                        </option>

                        <option value="UTC">
                            UTC
                        </option>
                    </select>

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={onToggleFormat}
                    >
                        {use24Hour
                            ? "Switch to 12-hour"
                            : "Switch to 24-hour"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onToggleSeconds}
                    >
                        {showSeconds
                            ? "Hide Seconds"
                            : "Show Seconds"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ClockGrid;