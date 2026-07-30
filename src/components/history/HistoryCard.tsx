import "../../styles/History.css";


interface HistoryCardProps {
  id: string;
  expression: string;
  result: string;
  createdAt: string;
  onReuse: (expression: string) => void;
  onDelete: (id: string) => void;
}

const HistoryCard = ({
  id,
  expression,
  result,
  createdAt,
  onReuse,
  onDelete
}: HistoryCardProps) => {
  return (
    <div
      className="card shadow-sm mb-3 history-card"
      role="button"
      onClick={() => onReuse(expression)}
    >
      <div className="card-body">

        <div className="d-flex justify-content-between">

          <small className="text-muted">
            {createdAt}
          </small>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title="Delete History"
          >
            🗑
          </button>

        </div>

        <h6 className="mt-2">
          {expression}
        </h6>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <h4 className="fw-bold text-primary mb-0">
            = {result}
          </h4>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(result);
            }}
            title="Copy Result"
          >
            📋
          </button>

        </div>

      </div>
    </div>
  );
};

export default HistoryCard;