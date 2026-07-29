import { useState, useRef } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorGrid from "./CalculatorGrid";
import { calculate } from "../../utils/mathEngine";
import { useHistory } from "../../contexts/HistoryContext";


const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [memory, setMemory] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addHistory } = useHistory();
  const [isDegree, setIsDegree] = useState(true);
  const [isSecond, setIsSecond] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const insertText = (text: string) => {
    if (!inputRef.current) {
      setExpression(prev => prev + text);
      return;
    }

    const start = inputRef.current.selectionStart ?? expression.length;
    const end = inputRef.current.selectionEnd ?? expression.length;

    const newExpression =
      expression.slice(0, start) +
      text +
      expression.slice(end);

    setExpression(newExpression);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        start + text.length,
        start + text.length
      );
    });
  };

  const handleButtonClick = (value: string) => {
    const operators = ["+", "-", "×", "÷"];

    if (justCalculated) {
      if (/^[0-9.]$/.test(value)) {
        setExpression(value);
        setResult("0");
        setJustCalculated(false);
        return;
      }

      if (operators.includes(value)) {
        setExpression(result + value);
        setJustCalculated(false);
        return;
      }
    }


    if (value === "AC") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }
    if (value === "MC") {
      setMemory(0);
      return;
    }
    if (value === "M+") {
      const current = Number(result);

      if (!isNaN(current)) {
        setMemory((prev) => prev + current);
      }
      return;
    }
    if (value === "M-") {
      const current = Number(result);
      if (!isNaN(current)) {
        setMemory((prev) => prev - current);
      }
      return;
    }
    if (value === "MR") {
      setExpression((prev) => prev + memory.toString());
      return;
    }

    if (value === "=") {
      let exp = expression;
      const open = (exp.match(/\(/g) || []).length;
      const close = (exp.match(/\)/g) || []).length;

      if (open > close) {
        exp += ")".repeat(open - close);
      }
      const answer = calculate(exp, isDegree);
      setResult(answer);
      addHistory(exp, answer);
      setJustCalculated(true);

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
    if (value === "Deg") {
      setIsDegree((prev) => !prev);
      return;
    }
    if (value === "2nd") {
      setIsSecond((prev) => !prev);
      return;
    }

    // Scientific functions (Expression Mode)

    if (value === "sin") {
      insertText("sin(");
      return;
    }

    if (value === "cos") {
      insertText("cos(");
      return;
    }

    if (value === "tan") {
      insertText("tan(");
      return;
    }

    if (value === "log") {
      insertText("log(");
      return;
    }

    if (value === "ln") {
      insertText("ln(");
      return;
    }

    if (value === "√") {
      insertText("√(");
      return;
    }

    if (value === "π") {
      insertText("π");
      return;
    }

    if (value === "e") {
      insertText("e");
      return;
    }

    if (value === "x²") {
      insertText("^2");
      return;
    }
    if (value === "x³") {
      insertText("^3");
      return;
    }
    if (value === "xʸ") {
      insertText("^");
      return;
    }
    if (value === "eˣ") {
      insertText("exp(");
      return;
    }
    if (value === "10ˣ") {
      insertText("10^");
      return;
    }
    if (value === "1/x") {
      insertText(`1/(${expression})`);
      return;
    }
    if (value === "²√x") {
      insertText("sqrt(");
      return;
    }
    if (value === "³√x") {
      insertText("nthroot(");
      return;
    }
    if (value === "ʸ√x") {
      insertText("nthRoot(,)");
      return;
    }
    if (value === "x!") {
      insertText("!");
      return;
    }
    if (value === "EE") {
      insertText("e");
      return;
    }
    if (value === "Rand") {
      setResult(Math.random().toString());
      return;
    }
    if (value === "sinh") {
      insertText("sinh(");
      return;
    }
    if (value === "cosh") {
      insertText("cosh(");
      return;
    }
    if (value === "tanh") {
      insertText("tanh(");
      return;
    }
    if (value === "asin") {
      insertText("asin(");
      return;
    }
    if (value === "acos") {
      insertText("acos(");
      return;
    }
    if (value === "atan") {
      insertText("atan(");
      return;
    }
    if (value === "exp") {
      insertText("exp(");
      return;
    }

    if (operators.includes(value)) {
      if (justCalculated) {
        setExpression(result + value);
      } else {
        const last = expression.slice(-1);

        if (operators.includes(last)) return;

        setExpression(expression + value);
      }

      setJustCalculated(false);
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

    if (justCalculated) {
      setExpression(value);
    } else {
      setExpression(prev => prev + value);
    }

    setJustCalculated(false);
  };

  return (
    <div className="calculator-container">
      <CalculatorDisplay
        expression={expression}
        result={result}
        onExpressionChange={setExpression}
        mode={isDegree ? "DEG" : "RAD"}
        inputRef={inputRef}
      />

      <CalculatorGrid onButtonClick={handleButtonClick}
        isSecond={isSecond} />
    </div>
  );
};

export default Calculator;