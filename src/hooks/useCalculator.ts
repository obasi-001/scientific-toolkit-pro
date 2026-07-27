import { useState } from "react";



const useCalculator = () => {
    const [previousValue, setPreviousValue] = useState("");
    const [currentValue, setCurrentValue] = useState("0");


return {
    previousValue,
    setPreviousValue,
    currentValue,
    setCurrentValue,
};
};



export default useCalculator;