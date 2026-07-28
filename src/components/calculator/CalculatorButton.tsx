interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
}

const CalculatorButton = ({
  label,
  onClick,
}: CalculatorButtonProps) => {
  const operators = ["+", "-", "×", "÷", "="];

  const scientific = [
    "sin",
    "cos",
    "tan",
    "sinh",
    "cosh",
    "tanh",
    "log",
    "ln",
    "√",
    "²√x",
    "³√x",
    "ʸ√x",
    "x²",
    "x³",
    "xʸ",
    "10ˣ",
    "eˣ",
    "x!",
    "1/x",
    "2nd",
  ];

  const memory = [
    "MC",
    "MR",
    "M+",
    "M-",
    "π",
    "e",
    "EE",
    "Deg",
    "Rand",
  ];

  const editing = [
    "AC",
    "DEL",
    "%",
    "(",
    ")",
    "±",
  ];

  let buttonClass = "btn btn-light";

  if (operators.includes(label)) {
    buttonClass = "btn btn-warning text-white";
  } else if (scientific.includes(label)) {
    buttonClass = "btn btn-primary";
  } else if (memory.includes(label)) {
    buttonClass = "btn btn-secondary";
  } else if (editing.includes(label)) {
    buttonClass = "btn btn-dark";
  }

  return (
    <button
      className={`${buttonClass} calculator-btn`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;