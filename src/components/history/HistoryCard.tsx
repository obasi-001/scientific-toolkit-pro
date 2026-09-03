import "../../styles/history.css";
import { useToast } from "../../contexts/ToastContext";

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

  const { showToast } = useToast();
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
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={async (e) => {
              e.stopPropagation();

              try {
                await navigator.clipboard.writeText(result);

                showToast("Copied to clipboard", "success");
              } catch {
                showToast("Unable to copy result", "error");
              }
            }}
            title="Copy result"
          >
            📋
          </button>

        </div>

      </div>
    </div>
  );
};

export default HistoryCard;