import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import type { HistoryItem } from "../types/history";

interface HistoryContextType {
    history: HistoryItem[];
    addHistory: (expression: string, result: string) => void;
    clearHistory: () => void;
    deleteHistory: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        const saved = localStorage.getItem("calculator-history");

        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem(
            "calculator-history",
            JSON.stringify(history)
        );
    }, [history]);


    const addHistory = (
        expression: string,
        result: string
    ) => {
        setHistory(prev => [
            {
                id: crypto.randomUUID(),
                expression,
                result,
                createdAt: new Date().toLocaleString(),
            },
            ...prev,
        ]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const deleteHistory = (id: string) => {
        setHistory(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    return (
        <HistoryContext.Provider
            value={{
                history,
                addHistory,
                clearHistory,
                deleteHistory,
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