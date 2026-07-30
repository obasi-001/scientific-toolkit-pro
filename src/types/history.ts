export interface HistoryItem {
    id: string;
    expression: string;
    result: string;
    createdAt: string;
    deleteHistory?: (id: string) => void;
}