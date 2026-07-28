import { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorGrid from "./CalculatorGrid";
import { calculate } from "../../utils/mathEngine";
import { useHistory } from "../../contexts/HistoryContext";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const { addHistory } = useHistory();

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
      const answer = calculate(expression);

      setResult(answer);

      addHistory(expression, answer);

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
    if (value === "x³") {
      setExpression(prev => prev + "^3");
      return;
    }
    if (value === "xʸ") {
      setExpression(prev => prev + "^");
      return;
    }
    if (value === "eˣ") {
      setExpression(prev => prev + "exp(");
      return;
    }
    if (value === "10ˣ") {
      setExpression(prev => prev + "10^");
      return;
    }
    if (value === "1/x") {
      setExpression(prev => "1/(" + prev + ")");
      return;
    }
    if (value === "²√x") {
      setExpression(prev => prev + "sqrt(");
      return;
    }
    if (value === "³√x") {
      setExpression(prev => prev + "cbrt(");
      return;
    }
    if (value === "ʸ√x") {
      setExpression(prev => prev + "nthRoot(");
      return;
    }
    if (value === "x!") {
      setExpression(prev => prev + "!");
      return;
    }
    if (value === "EE") {
      setExpression(prev => prev + "e");
      return;
    }
    if (value === "Rand") {
      setResult(Math.random().toString());
      return;
    }
    if (value === "sinh") {
      setExpression(prev => prev + "sinh(");
      return;
    }
    if (value === "cosh") {
      setExpression(prev => prev + "cosh(");
      return;
    }
    if (value === "tanh") {
      setExpression(prev => prev + "tanh(");
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
        onExpressionChange={setExpression}
      />

      <CalculatorGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;