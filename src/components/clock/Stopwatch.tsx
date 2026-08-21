import { useEffect, useRef, useState } from "react";

interface Lap {
    id: number;
    time: number;
}

const Stopwatch = () => {
    const [elapsed, setElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<Lap[]>([]);

    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        startTimeRef.current =
            Date.now() - elapsedRef.current;

        intervalRef.current = window.setInterval(() => {
            if (startTimeRef.current === null) {
                return;
            }

            const currentElapsed =
                Date.now() - startTimeRef.current;

            elapsedRef.current = currentElapsed;
            setElapsed(currentElapsed);
        }, 10);

        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        elapsedRef.current = elapsed;
        setIsRunning(false);
    };

    const handleStop = () => {
        elapsedRef.current = elapsed;
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsed(0);
        elapsedRef.current = 0;
        startTimeRef.current = null;
        setLaps([]);
    };

    const handleLap = () => {
        if (elapsed === 0) {
            return;
        }

        setLaps((prev) => [
            ...prev,
            {
                id: Date.now(),
                time: elapsed,
            },
        ]);
    };

    const formatTime = (milliseconds: number) => {
        const minutes = Math.floor(
            milliseconds / 60000
        );

        const seconds = Math.floor(
            (milliseconds % 60000) / 1000
        );

        const centiseconds = Math.floor(
            (milliseconds % 1000) / 10
        );

        return (
            `${minutes.toString().padStart(2, "0")}:` +
            `${seconds.toString().padStart(2, "0")}:` +
            `${centiseconds.toString().padStart(2, "0")}`
        );
    };

    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body text-center p-4">

                <h4 className="fw-bold mb-3">
                    Stopwatch
                </h4>

                <div
                    className="fw-bold mb-4"
                    style={{
                        fontSize: "clamp(2rem, 7vw, 4rem)",
                        letterSpacing: "0.04em",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {formatTime(elapsed)}
                </div>

                <div className="d-flex justify-content-center gap-2 flex-wrap">

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleStart}
                        disabled={isRunning}
                    >
                        Start
                    </button>

                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={handlePause}
                        disabled={!isRunning}
                    >
                        Pause
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleStop}
                        disabled={!isRunning}
                    >
                        Stop
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleLap}
                        disabled={elapsed === 0}
                    >
                        Lap
                    </button>

                </div>

                {laps.length > 0 && (
                    <div className="mt-4 text-start">

                        <h6 className="fw-bold mb-3">
                            Laps
                        </h6>

                        <div className="list-group">

                            {laps.map((lap, index) => (
                                <div
                                    key={lap.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>
                                        Lap {index + 1}
                                    </span>

                                    <span className="fw-semibold">
                                        {formatTime(lap.time)}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Stopwatch;