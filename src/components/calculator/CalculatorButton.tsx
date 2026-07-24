interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
}

const CalculatorButton = ({
  label,
  onClick,
}: CalculatorButtonProps) => {
  return (
    <button
      className="calculator-btn"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;