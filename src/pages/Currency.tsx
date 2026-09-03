import { useEffect, useState } from "react";
import CurrencyGrid from "../components/currency/CurrencyGrid";
import {
  getCurrencies,
  getExchangeRate,
} from "../services/currencyApi";
import type { Currency as CurrencyType } from "../types/currency";

const Currency = () => {
  const [amount, setAmount] = useState("1");
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");

  const [rate, setRate] = useState<number | null>(null);
  const [converted, setConverted] = useState<number | null>(null);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingConversion, setLoadingConversion] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setLoadingCurrencies(true);
        setError("");

        const data = await getCurrencies();

        setCurrencies(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load currencies."
        );
      } finally {
        setLoadingCurrencies(false);
      }
    };

    loadCurrencies();
  }, []);

  const handleConvert = async () => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setLoadingConversion(true);
      setError("");

      const data = await getExchangeRate(from, to);

      setRate(data.rate);
      setConverted(numericAmount * data.rate);
    } catch (err) {
      setRate(null);
      setConverted(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to convert currency."
      );
    } finally {
      setLoadingConversion(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);

    setRate(null);
    setConverted(null);
  };

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Currency Converter
        </h2>

        <p className="text-muted mb-0">
          Convert between currencies using current exchange rates.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <CurrencyGrid
        amount={amount}
        currencies={currencies}
        from={from}
        to={to}
        rate={rate}
        converted={converted}
        loadingCurrencies={loadingCurrencies}
        loadingConversion={loadingConversion}
        onAmountChange={setAmount}
        onFromChange={(value) => {
          setFrom(value);
          setRate(null);
          setConverted(null);
        }}
        onToChange={(value) => {
          setTo(value);
          setRate(null);
          setConverted(null);
        }}
        onSwap={handleSwap}
        onConvert={handleConvert}
      />

    </div>
  );
};

export default Currency;
