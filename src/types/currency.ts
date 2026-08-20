export interface CurrencyRate {
  base: string;
  quote: string;
  rate: number;
  date: string;
}

export interface Currency {
  code: string;
  name: string;
}