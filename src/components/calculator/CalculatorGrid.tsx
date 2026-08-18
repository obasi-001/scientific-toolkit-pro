import CalculatorButton from "./CalculatorButton";

interface CalculatorGridProps {
  onButtonClick: (value: string) => void;
  isSecond: boolean;
}

const mainButtons = [
  "AC", "DEL", "%", "÷",
  "7", "8", "9", "×",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "±", "0", ".", "=",
];

const CalculatorGrid = ({
  onButtonClick,
  isSecond,
}: CalculatorGridProps) => {

  const scientificButtons = [
    "(", ")", "MC", "M+", "M-", "MR",

    "2nd",

    isSecond ? "√x" : "x²",
    isSecond ? "∛x" : "x³",
    "xʸ",
    "eˣ",
    "10ˣ",

    "1/x",
    // "²√x",
    "√",
    "³√x",
    "ʸ√x",

    isSecond ? "exp" : "ln",
    isSecond ? "10^" : "log",

    "x!",

    isSecond ? "asin" : "sin",
    isSecond ? "acos" : "cos",
    isSecond ? "atan" : "tan",

    "e",
    "EE",

    "Rand",
    "sinh",
    "cosh",
    "tanh",
    "π",
    "Deg",
  ];

  return (
    <>
      <div className="scientific-grid">
        {scientificButtons.map((button) => (
          <CalculatorButton
            key={button}
            label={button}
            onClick={() => onButtonClick(button)}
          />
        ))}
      </div>

      <div className="main-grid">
        {mainButtons.map((button) => (
          <CalculatorButton
            key={button}
            label={button}
            onClick={() => onButtonClick(button)}
          />
        ))}
      </div>
    </>
  );
};

export default CalculatorGrid;