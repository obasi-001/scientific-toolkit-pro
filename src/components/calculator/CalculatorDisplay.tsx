import type { RefObject } from "react";


interface CalculatorDisplayProps {
  expression: string;
  result: string;
  onExpressionChange: (value: string) => void;
  mode: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

const CalculatorDisplay = ({
  expression,
  result,
  onExpressionChange,
  mode,
  inputRef,
}: CalculatorDisplayProps) => {
  return (
    <div className="calculator-display shadow rounded p-4 mb-4">

      <div className="text-center mb-3">
        <h4 className="fw-bold mb-0">
          Scientific Toolkit Pro
        </h4>
      </div>

      <div className="d-flex justify-content-end mb-2">
        <span className="badge bg-primary">
          {mode}
        </span>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="previous-expression form-control text-end border-0 shadow-none"
        value={expression}
        placeholder="Enter expression..."
        onChange={(e) => onExpressionChange(e.target.value)}
      />

      <div className="current-expression text-end">
        {result}
      </div>

    </div>
  );
};

export default CalculatorDisplay;