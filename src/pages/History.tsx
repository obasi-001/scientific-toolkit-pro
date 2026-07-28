import HistoryCard from "../components/history/HistoryCard";
import { useHistory } from "../contexts/HistoryContext";

const History = () => {
    const { history, clearHistory } = useHistory();

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                    Calculation History
                </h2>

                <button
                    className="btn btn-outline-danger"
                    onClick={clearHistory}
                >
                    Clear History
                </button>
            </div>

            {history.length === 0 ? (
                <div className="card shadow-sm">
                    <div className="card-body text-center text-muted py-5">
                        No calculations yet.
                    </div>
                </div>
            ) : (
                history.map((item) => (
                    <HistoryCard
                        key={item.id}
                        expression={item.expression}
                        result={item.result}
                        date={item.date}
                    />
                ))
            )}
        </div>
    );
};

export default History;