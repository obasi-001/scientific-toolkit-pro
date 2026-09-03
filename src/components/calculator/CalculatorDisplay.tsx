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
    <div className="calculator-display">
      <div className="display-indicators">
        {hasMemory && (
          <span className="memory-indicator">
            M
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="previous-expression"
        value={expression}
        placeholder=""
        onChange={(e) => onExpressionChange(e.target.value)}
      />

      <div className="current-expression text-end">
        {result}
      </div>

      <div className="angle-indicator">
        {mode === "DEG" ? "Deg" : "Rad"}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
