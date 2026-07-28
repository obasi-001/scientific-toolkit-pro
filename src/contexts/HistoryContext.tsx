import { createContext, useContext, useState, ReactNode } from "react";
import type { HistoryItem } from "../types/history";

interface HistoryContextType {
    history: HistoryItem[];
    addHistory: (expression: string, result: string) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const addHistory = (expression: string, result: string) => {
        setHistory((prev) => [
            {
                id: Date.now(),
                expression,
                result,
                date: new Date().toLocaleString(),
            },
            ...prev,
        ]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <HistoryContext.Provider
            value={{
                history,
                addHistory,
                clearHistory,
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);

    if (!context) {
        throw new Error("useHistory must be used inside HistoryProvider");
    }

    return context;
};