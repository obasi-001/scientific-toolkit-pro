import ClockCard from "./ClockCard";
import Stopwatch from "./Stopwatch";

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
                    onToggleFormat={onToggleFormat}
                    onToggleSeconds={onToggleSeconds}
                    onTimezoneChange={onTimezoneChange}
                />

                <Stopwatch />

            </div>

        </div>
    );
};

export default ClockGrid;