import type { Currency, CurrencyRate } from "../types/currency";

const BASE_URL = "https://api.frankfurter.dev/v2";

export const getCurrencies = async (): Promise<Currency[]> => {
  const response = await fetch(`${BASE_URL}/currencies`);

  if (!response.ok) {
    throw new Error("Unable to fetch currencies.");
  }

  const data = await response.json();

  return data
    .map((currency: {
      iso_code: string;
      name: string;
    }) => ({
      code: currency.iso_code,
      name: currency.name,
    }))
    .sort((a: Currency, b: Currency) =>
      a.code.localeCompare(b.code)
    );
};

export const getExchangeRate = async (
  base: string,
  quote: string
): Promise<CurrencyRate> => {
  if (base === quote) {
    return {
      base,
      quote,
      rate: 1,
      date: new Date().toISOString().split("T")[0],
    };
  }

  const response = await fetch(
    `${BASE_URL}/rate/${encodeURIComponent(base)}/${encodeURIComponent(quote)}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch exchange rate.");
  }

  const data = await response.json();

  if (typeof data.rate !== "number") {
    throw new Error("Exchange rate is unavailable.");
  }

  return {
    base: data.base,
    quote: data.quote,
    rate: data.rate,
    date: data.date,
  };
};