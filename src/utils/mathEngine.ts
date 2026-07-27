import { evaluate } from "mathjs";

export const calculate = (expression: string): string => {
    try {
        const formattedExpression = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/π/g, "pi")
            .replace(/√/g, "sqrt");

        const result = evaluate(formattedExpression);

        return result.toString();
    } catch {
        return "Error";
    }
};