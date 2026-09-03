interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
}

const CalculatorButton = ({
  label,
  onClick,
}: CalculatorButtonProps) => {
  const operators = ["+", "-", "×", "÷", "="];
  const controls = ["AC", "DEL", "%"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "±"];

  const displayLabel: Record<string, string> = {
    DEL: "⌫",
    "√": "²√x",
    log: "log₁₀",
  };

  let tone = "scientific";

  if (operators.includes(label)) {
    tone = "operator";
  } else if (controls.includes(label)) {
    tone = "control";
  } else if (numbers.includes(label)) {
    tone = "number";
  }

  return (
    <button
      type="button"
      className={`calculator-btn calculator-btn-${tone}`}
      onClick={onClick}
      aria-label={label === "DEL" ? "Delete" : label}
    >
      {label === "DEL" ? (
        <i className="bi bi-backspace" aria-hidden="true" />
      ) : (
        displayLabel[label] ?? label
      )}
    </button>
  );
};

export default CalculatorButton;
