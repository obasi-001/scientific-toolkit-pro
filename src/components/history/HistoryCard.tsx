interface HistoryCardProps {
  expression: string;
  result: string;
  date: string;
}

const HistoryCard = ({
  expression,
  result,
  date,
}: HistoryCardProps) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="text-muted small">
          {date}
        </div>

        <h6 className="mt-2">
          {expression}
        </h6>

        <h4 className="fw-bold text-primary">
          = {result}
        </h4>
      </div>
    </div>
  );
};

export default HistoryCard;