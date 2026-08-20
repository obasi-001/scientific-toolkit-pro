import { useState, useRef, useEffect } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorGrid from "./CalculatorGrid";
import { calculate } from "../../utils/mathEngine";
import { useHistory } from "../../contexts/HistoryContext";
import { usePreferences } from "../../contexts/PreferencesContext";


const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [memory, setMemory] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addHistory, selectedExpression, setSelectedExpression } = useHistory();
  const { preferences, setAngleMode } = usePreferences();
  // const [isDegree, setIsDegree] = useState(true);
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

  useEffect(() => {
    if (selectedExpression) {
      setExpression(selectedExpression);
      setResult("0");
      setJustCalculated(false);

      // Clear it so it doesn't reload every time
      setSelectedExpression("");
    }
  }, [selectedExpression, setSelectedExpression]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Numbers
      // Numbers
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleButtonClick(key);
        return;
      }

      // Decimal
      // Decimal
      if (key === ".") {
        e.preventDefault();
        handleButtonClick(".");
        return;
      }
      // Operators
      if (key === "+") handleButtonClick("+");
      if (key === "-") handleButtonClick("-");
      if (key === "*") handleButtonClick("×");
      if (key === "/") {
        e.preventDefault();
        handleButtonClick("÷");
      }

      // Brackets
      if (key === "(") handleButtonClick("(");
      if (key === ")") handleButtonClick(")");

      // Calculate
      if (key === "Enter") {
        e.preventDefault();
        handleButtonClick("=");
      }

      // Delete last
      if (key === "Backspace") {
        e.preventDefault();
        handleButtonClick("DEL");
      }

      // Clear
      if (key === "Escape") {
        handleButtonClick("AC");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression, result]);


  const handleButtonClick = (value: string) => {
    const operators = ["+", "-", "×", "÷"];

    if (
      expression.includes("?") &&
      /^[0-9.]$/.test(value)
    ) {
      setExpression(prev => prev.replace("?", value));
      return;
    }

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
      setJustCalculated(false);
      return;
    }

    if (value === "M+") {
      const currentExpression = justCalculated
        ? result
        : expression;

      if (!currentExpression) return;

      // const calculated = calculate(currentExpression, isDegree);
      const calculated = calculate(
        currentExpression,
        preferences.angleMode === "DEG"
      );
      const current = Number(calculated);

      if (!isNaN(current)) {
        setMemory(prev => prev + current);
      }

      return;
    }

    if (value === "M-") {
      const currentExpression = justCalculated
        ? result
        : expression;

      if (!currentExpression) return;

      // const calculated = calculate(currentExpression, isDegree);
      const calculated = calculate(
        currentExpression,
        preferences.angleMode === "DEG"
      );
      const current = Number(calculated);

      if (!isNaN(current)) {
        setMemory(prev => prev - current);
      }
      return;
    }

    if (value === "MR") {
      const mem = memory.toString();

      if (justCalculated || expression === "") {
        setExpression(mem);
        setResult(mem);
        setJustCalculated(false);
      } else {
        insertText(mem);
      }

      return;
    }

    if (value === "=") {
      let exp = expression;

      const open = (exp.match(/\(/g) || []).length;
      const close = (exp.match(/\)/g) || []).length;

      if (open > close) {
        exp += ")".repeat(open - close);
      }

      // const answer = calculate(exp, isDegree);
      const answer = calculate(
        exp,
        preferences.angleMode === "DEG"
      );

      setExpression(exp);
      setResult(answer);

      addHistory(exp, answer);

      setJustCalculated(true);

      return;
    }

    if (value === "%") {
      if (!expression) return;

      const lastCharacter = expression.slice(-1);

      // Don't allow % after an operator or another %
      if (operators.includes(lastCharacter) || lastCharacter === "%") {
        return;
      }

      setExpression(prev => prev + "%");
      setJustCalculated(false);

      return;
    }

    if (value === "±") {
      if (!expression) return;

      // If the whole expression is a single number
      if (/^-?\d+(?:\.\d+)?$/.test(expression)) {
        setExpression(
          expression.startsWith("-")
            ? expression.slice(1)
            : `-${expression}`
        );

        setJustCalculated(false);
        return;
      }

      // Toggle the last number in a larger expression
      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.lastIndexOf(number);

      const before = expression.slice(0, start);

      // If the number is already negative, remove the minus
      if (before.endsWith("-")) {
        setExpression(
          before.slice(0, -1) + number
        );
      } else {
        setExpression(
          before + `(-${number})`
        );
      }

      setJustCalculated(false);
      return;
    }
    // if (value === "Deg") {
    //   setIsDegree((prev) => !prev);
    //   return;
    // }
    if (value === "Deg") {
      setAngleMode(
        preferences.angleMode === "DEG"
          ? "RAD"
          : "DEG"
      );
      return;
    }
    if (value === "2nd") {
      setIsSecond((prev) => !prev);
      return;
    }

    // Scientific functions (Expression Mode)

    if (value === "sin") {
      if (!expression) {
        setExpression("sin(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);
      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}sin(${number})`);
      setJustCalculated(false);
      return;
    }

    if (value === "cos") {
      if (!expression) {
        setExpression("cos(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);
      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}cos(${number})`);
      setJustCalculated(false);
      return;
    }

    if (value === "tan") {
      if (!expression) {
        setExpression("tan(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);
      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}tan(${number})`);
      setJustCalculated(false);
      return;
    }

    if (value === "log") {
      if (!expression) {
        setExpression("log(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}log(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "ln") {
      if (!expression) {
        setExpression("ln(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);
      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}ln(${number})`);
      setJustCalculated(false);
      return;
    }

    if (value === "√") {
      if (!expression) {
        setExpression("√(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);
      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}√(${number})`);
      setJustCalculated(false);
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
      if (!expression) return;

      // Find the last number
      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;

      const before = expression.slice(0, start);

      setExpression(`${before}${number}²`);
      setJustCalculated(false);

      return;
    }

    if (value === "x³") {
      if (!expression) return;
      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;
      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}${number}³`);
      setJustCalculated(false);
      return;
    }

    if (value === "xʸ") {
      if (!expression) return;

      if (expression.endsWith("^")) return;

      setExpression(`${expression}^`);
      setJustCalculated(false);

      return;
    }

    if (value === "eˣ") {
      if (!expression) return;

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}e^${number}`);
      setJustCalculated(false);

      return;
    }
    if (value === "10ˣ") {
      insertText("10^(");
      return;
    }

    if (value === "1/x") {
      if (!expression) return;

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}1/(${number})`);
      setJustCalculated(false);

      return;
    }

    // if (value === "²√x") {
    //   if (!expression) return;

    //   const match = expression.match(/(\d+(?:\.\d+)?)$/);

    //   if (!match) return;

    //   const number = match[1];
    //   const start = expression.length - number.length;
    //   const before = expression.slice(0, start);

    //   setExpression(`${before}√${number}`);
    //   setJustCalculated(false);

    //   return;
    // }

    if (value === "³√x") {
      if (!expression) return;

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}∛${number}`);
      setJustCalculated(false);

      return;
    }

    if (value === "ʸ√x") {
      if (expression.trim() === "") {
        setExpression("nthRoot(,)");
      } else {
        setExpression(`nthRoot(${expression},?)`);
      }

      requestAnimationFrame(() => {
        if (!inputRef.current) return;

        // Cursor just before the closing parenthesis
        const cursor = `nthRoot(${expression},`.length;

        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursor, cursor);
      });

      return;
    }

    if (value === "x!") {
      if (!expression) return;

      // Only apply factorial to the last number
      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];

      // Factorial is only valid for whole numbers
      if (number.includes(".")) return;

      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}${number}!`);
      setJustCalculated(false);

      return;
    }

    if (value === "EE") {
      if (!expression) return;

      if (/[eE][+-]?$/.test(expression)) return;

      setExpression(prev => `${prev}e`);
      setJustCalculated(false);

      return;
    }

    if (value === "Rand") {
      const random = Math.random();

      setExpression(random.toString());
      setResult("0");
      setJustCalculated(false);

      return;
    }

    if (value === "sinh") {
      if (!expression) {
        setExpression("sinh(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}sinh(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "cosh") {
      if (!expression) {
        setExpression("cosh(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}cosh(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "tanh") {
      if (!expression) {
        setExpression("tanh(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}tanh(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "asin") {
      if (!expression) {
        setExpression("asin(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}asin(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "acos") {
      if (!expression) {
        setExpression("acos(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}acos(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "atan") {
      if (!expression) {
        setExpression("atan(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}atan(${number})`);
      setJustCalculated(false);

      return;
    }

    if (value === "exp") {
      if (!expression) {
        setExpression("exp(");
        setJustCalculated(false);
        return;
      }

      const match = expression.match(/(\d+(?:\.\d+)?)$/);

      if (!match) return;

      const number = match[1];
      const start = expression.length - number.length;
      const before = expression.slice(0, start);

      setExpression(`${before}exp(${number})`);
      setJustCalculated(false);

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
        mode={preferences.angleMode}
        inputRef={inputRef}
        hasMemory={memory !== 0}
      />

      <CalculatorGrid onButtonClick={handleButtonClick}
        isSecond={isSecond} />
    </div>
  );
};

export default Calculator;