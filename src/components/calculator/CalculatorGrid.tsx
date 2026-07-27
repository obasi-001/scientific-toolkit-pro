import CalculatorButton from "./CalculatorButton";

interface CalculatorGridProps {
  onButtonClick: (value: string) => void;
}

const buttons = [
  "AC", "(", ")", "DEL", "±",
  "sin", "cos", "tan", "√", "x²",
  "7", "8", "9", "÷", "log",
  "4", "5", "6", "×", "ln",
  "1", "2", "3", "-", "π",
  "0", ".", "=", "+", "e",
];

const CalculatorGrid = ({
  onButtonClick,
}: CalculatorGridProps) => {
  return (
    <div className="calculator-grid">
      {buttons.map((button) => (
        <CalculatorButton
          key={button}
          label={button}
          onClick={() => onButtonClick(button)}
        />
      ))}
    </div>
  );
};

export default CalculatorGrid;