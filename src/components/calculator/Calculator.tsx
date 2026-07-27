import { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorGrid from "./CalculatorGrid";
import { calculate } from "../../utils/mathengine";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const handleButtonClick = (value: string) => {
    const operators = ["+", "-", "×", "÷"];
    

    if (value === "AC") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      setResult(calculate(expression));
      return;
    }

    if (value === "%") {
      const percentage = Number(expression) / 100;
      setResult(percentage.toString());
      return;
    }

    if (value === "±") {
      if (expression.startsWith("-")) {
        setExpression(expression.substring(1));
      } else {
        setExpression("-" + expression);
      }
      return;
    }

    // Scientific functions (Expression Mode)

    if (value === "sin") {
      setExpression((prev) => prev + "sin(");
      return;
    }

    if (value === "cos") {
      setExpression((prev) => prev + "cos(");
      return;
    }

    if (value === "tan") {
      setExpression((prev) => prev + "tan(");
      return;
    }

    if (value === "log") {
      setExpression((prev) => prev + "log(");
      return;
    }

    if (value === "ln") {
      setExpression((prev) => prev + "ln(");
      return;
    }

    if (value === "√") {
      setExpression((prev) => prev + "√(");
      return;
    }

    if (value === "π") {
      setExpression((prev) => prev + "π");
      return;
    }

    if (value === "e") {
      setExpression((prev) => prev + "e");
      return;
    }

    if (value === "x²") {
      setExpression((prev) => prev + "^2");
      return;
    }

    if (operators.includes(value)) {
      const lastCharacter = expression.slice(-1);

      if (operators.includes(lastCharacter)) {
        return;
      }

      setExpression(expression + value);
      return;
    }

    if (value === ".") {
      const lastNumber = expression
        .split(new RegExp(`[${operators.join("\\")}]`))
        .pop();

      if (lastNumber?.includes(".")) {
        return;
      }
    }

    setExpression((prev) => prev + value);
  };

  return (
    <div className="calculator-container">
      <CalculatorDisplay
        expression={expression}
        result={result}
      />

      <CalculatorGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;