interface ClockCardProps {
    currentTime: Date;
    use24Hour: boolean;
    showSeconds: boolean;
    timezone: string;
}

const ClockCard = ({
    currentTime,
    use24Hour,
    showSeconds,
    timezone,
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
        <div className="card shadow-sm h-100">
            <div className="card-body text-center p-5">

                <div
                    className="fw-bold mb-3"
                    style={{
                        fontSize: "clamp(2.5rem, 8vw, 5rem)",
                        letterSpacing: "0.03em",
                        whiteSpace: "nowrap",
                    }}
                >
                    {time}
                </div>

                <h5 className="fw-semibold mb-2">
                    {date}
                </h5>

                <p className="text-muted mb-0">
                    {timezone}
                </p>

            </div>
        </div>
    );
};

export default ClockCard;