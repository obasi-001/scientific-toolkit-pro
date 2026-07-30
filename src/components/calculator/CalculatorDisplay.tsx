import type { RefObject } from "react";


interface CalculatorDisplayProps {
  expression: string,
  result: string,
  onExpressionChange: (value: string) => void,
  mode: "DEG" | "RAD",
  inputRef: RefObject<HTMLInputElement | null>,
  hasMemory?: boolean,
}
  

const CalculatorDisplay = ({
  expression,
  result,
  onExpressionChange,
  mode,
  inputRef,
  hasMemory
}: CalculatorDisplayProps) => {
  return (
    <div className="calculator-display shadow rounded p-4 mb-4">

      <div className="text-center mb-3">
        <h4 className="fw-bold mb-0">
          Scientific Toolkit Pro
        </h4>
      </div>

      <div className="d-flex justify-content-end gap-2 mb-2">

    {hasMemory && (
        <span className="badge bg-success">
            M
        </span>
    )}

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