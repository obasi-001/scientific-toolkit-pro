import { evaluate } from "mathjs";

export const calculate = (
    expression: string,
    isDegree: boolean
): string => {
    try {
        let exp = expression;

        // Calculator symbols
        exp = exp
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/π/g, "pi")
            .replace(/²√/g, "sqrt")
            .replace(/³√/g, "cbrt")
            .replace(/√/g, "sqrt");

        // Factorial
        exp = exp.replace(/(\d+)!/g, "factorial($1)");

        // Auto-close missing brackets
        const open = (exp.match(/\(/g) || []).length;
        const close = (exp.match(/\)/g) || []).length;

        if (open > close) {
            exp += ")".repeat(open - close);
        }

        // DEG mode conversion
        if (isDegree) {
            exp = exp
                .replace(/sin\((.*?)\)/g, "sin(($1) * pi / 180)")
                .replace(/cos\((.*?)\)/g, "cos(($1) * pi / 180)")
                .replace(/tan\((.*?)\)/g, "tan(($1) * pi / 180)");
        }
        // Natural log
        exp = exp.replace(/ln\((.*?)\)/g, "log($1)");

        // Base-10 log
        exp = exp.replace(/log\((.*?)\)/g, "log10($1)");

        if (isDegree) {
            exp = exp
                .replace(/asin\((.*?)\)/g, "(asin($1) * 180 / pi)")
                .replace(/acos\((.*?)\)/g, "(acos($1) * 180 / pi)")
                .replace(/atan\((.*?)\)/g, "(atan($1) * 180 / pi)");
        }

        const result = evaluate(exp);

        return result.toString();
    } catch {
        return "Error";
    }
};