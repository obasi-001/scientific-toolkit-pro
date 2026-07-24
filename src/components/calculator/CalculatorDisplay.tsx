interface CalculatorDisplayProps {
  previousValue: string;
  currentValue: string;
}

const CalculatorDisplay = ({
  previousValue,
  currentValue,
}: CalculatorDisplayProps) => {
  return (
    <div className="calculator-display">
      <div className="previous-expression">
        {previousValue}
      </div>

      <div className="current-expression">
        {currentValue}
      </div>
    </div>
  );
};

export default CalculatorDisplay;