import { useState } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorGrid from "./CalculatorGrid";

const Calculator = () => {
    const [previousValue] = useState("");
    const [currentValue, setCurrentValue] = useState("0");

    const calculateExpression = (expression: string) => {
        try {
            const formattedExpression = expression
                .replace(/×/g, "*")
                .replace(/÷/g, "/");

            return Function(`"use strict"; return (${formattedExpression})`)().toString();
        } catch {
            return "Error";
        }
    };

    const handleButtonClick = (value: string) => {
        if (value === "AC") {
            setCurrentValue("0");
            return;
        }

        if (value === "DEL") {
            if (currentValue.length === 1) {
                setCurrentValue("0");
            } else {
                setCurrentValue(currentValue.slice(0, -1));
            }
            return;
        }


        const operators = ["+", "-", "×", "÷"];

        if (value === ".") {
            const operators = ["+", "-", "×", "÷"];

            const lastNumber = currentValue
                .split(new RegExp(`[${operators.join("\\")}]`))
                .pop();

            if (lastNumber?.includes(".")) {
                return;
            }
        }

        if (value === "=") {
            setCurrentValue(
                calculateExpression(currentValue)
            );
            return;
        }

        if (operators.includes(value)) {
            const lastCharacter = currentValue.slice(-1);

            if (operators.includes(lastCharacter)) {
                return;
            }

            setCurrentValue(currentValue + value);
            return;
        }

        if (currentValue === "0") {
            setCurrentValue(value);
        } else {
            setCurrentValue(currentValue + value);
        }
    };

    return (
        <div className="calculator-container">
            <CalculatorDisplay
                previousValue={previousValue}
                currentValue={currentValue}
            />

            <CalculatorGrid onButtonClick={handleButtonClick} />
        </div>
    );
};

export default Calculator;