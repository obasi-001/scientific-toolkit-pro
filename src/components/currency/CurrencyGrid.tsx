import CurrencyCard from "./CurrencyCard";
import type { Currency } from "../../types/currency";

interface CurrencyGridProps {
    amount: string;
    currencies: Currency[];
    from: string;
    to: string;
    rate: number | null;
    converted: number | null;
    loadingCurrencies: boolean;
    loadingConversion: boolean;
    onAmountChange: (value: string) => void;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
    onSwap: () => void;
    onConvert: () => void;
}

const CurrencyGrid = ({
    amount,
    currencies,
    from,
    to,
    rate,
    converted,
    loadingCurrencies,
    loadingConversion,
    onAmountChange,
    onFromChange,
    onToChange,
    onSwap,
    onConvert,
}: CurrencyGridProps) => {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-8 mx-auto">
                <CurrencyCard
                    amount={amount}
                    currencies={currencies}
                    from={from}
                    to={to}
                    rate={rate}
                    converted={converted}
                    loadingCurrencies={loadingCurrencies}
                    loadingConversion={loadingConversion}
                    onAmountChange={onAmountChange}
                    onFromChange={onFromChange}
                    onToChange={onToChange}
                    onSwap={onSwap}
                    onConvert={onConvert}
                />
            </div>
        </div>
    );
};

export default CurrencyGrid;