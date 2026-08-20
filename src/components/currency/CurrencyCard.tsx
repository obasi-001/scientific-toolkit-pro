import type { Currency } from "../../types/currency";

interface CurrencyCardProps {
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

const CurrencyCard = ({
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
}: CurrencyCardProps) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body p-4">

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Amount
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        min="0"
                        step="any"
                    />
                </div>

                <div className="row g-3 align-items-end">

                    <div className="col-md-5">
                        <label className="form-label fw-semibold">
                            From
                        </label>

                        <select
                            className="form-select"
                            value={from}
                            onChange={(e) => onFromChange(e.target.value)}
                            disabled={loadingCurrencies}
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} — {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2 text-center">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onSwap}
                            disabled={loadingCurrencies}
                            aria-label="Swap currencies"
                        >
                            ⇄
                        </button>
                    </div>

                    <div className="col-md-5">
                        <label className="form-label fw-semibold">
                            To
                        </label>

                        <select
                            className="form-select"
                            value={to}
                            onChange={(e) => onToChange(e.target.value)}
                            disabled={loadingCurrencies}
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} — {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <button
                    type="button"
                    className="btn btn-primary w-100 mt-4"
                    onClick={onConvert}
                    disabled={loadingCurrencies || loadingConversion}
                >
                    {loadingConversion ? "Converting..." : "Convert"}
                </button>

                {converted !== null && rate !== null && (
                    <div className="alert alert-light border text-center mt-4 mb-0">
                        <h3 className="fw-bold mb-2">
                            {Number(amount).toLocaleString()} {from}
                            {" = "}
                            {converted.toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                            })} {to}
                        </h3>

                        <p className="text-muted mb-0">
                            1 {from} = {rate} {to}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CurrencyCard;