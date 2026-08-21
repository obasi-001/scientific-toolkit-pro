interface ClockCardProps {
    currentTime: Date;
    use24Hour: boolean;
    showSeconds: boolean;
    timezone: string;
    onToggleFormat: () => void;
    onToggleSeconds: () => void;
    onTimezoneChange: (timezone: string) => void;
}

const ClockCard = ({
    currentTime,
    use24Hour,
    showSeconds,
    timezone,
    onToggleFormat,
    onToggleSeconds,
    onTimezoneChange,
}: ClockCardProps) => {

    const time = currentTime.toLocaleTimeString([], {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: !use24Hour,
    });

    const date = currentTime.toLocaleDateString([], {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="card shadow-sm">

            <div className="card-body text-center p-4 p-md-5">

                <h4 className="fw-bold mb-3">
                    Clock
                </h4>

                <div
                    className="fw-bold mb-2"
                    style={{
                        fontSize: "clamp(2rem, 7vw, 4rem)",
                        letterSpacing: "0.03em",
                        whiteSpace: "nowrap",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {time}
                </div>

                <h6 className="fw-semibold mb-1">
                    {date}
                </h6>

                <p className="text-muted mb-4">
                    {timezone}
                </p>

                <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">

                    <select
                        className="form-select"
                        style={{
                            width: "auto",
                            minWidth: "180px",
                        }}
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

                        <option value="Asia/Kolkata">
                            India
                        </option>

                        <option value="Asia/Shanghai">
                            Shanghai
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
                            ? "12-hour"
                            : "24-hour"}
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

export default ClockCard;