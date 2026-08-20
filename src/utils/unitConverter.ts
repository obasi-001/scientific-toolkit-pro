import type { UnitCategory } from "../types/unit";

const lengthToMeter: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const massToGram: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.349523125,
  lb: 453.59237,
};

const areaToSquareMeter: Record<string, number> = {
  mm2: 0.000001,
  cm2: 0.0001,
  m2: 1,
  km2: 1000000,
  ft2: 0.09290304,
  yd2: 0.83612736,
  mi2: 2589988.110336,
  acre: 4046.8564224,
  hectare: 10000,
};

const volumeToLiter: Record<string, number> = {
  ml: 0.001,
  l: 1,
  m3: 1000,
  tsp: 0.00492892,
  tbsp: 0.0147868,
  cup: 0.236588,
  pint: 0.473176,
  gallon: 3.78541,
};

const speedToMeterPerSecond: Record<string, number> = {
  mps: 1,
  kph: 0.2777777778,
  mph: 0.44704,
  knot: 0.514444,
};

const timeToSecond: Record<string, number> = {
  ms: 0.001,
  s: 1,
  min: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
};

const dataToByte: Record<string, number> = {
  bit: 0.125,
  byte: 1,
  kb: 1024,
  mb: 1024 ** 2,
  gb: 1024 ** 3,
  tb: 1024 ** 4,
};

const convertTemperature = (
  value: number,
  from: string,
  to: string
): number => {
  let celsius: number;

  if (from === "c") {
    celsius = value;
  } else if (from === "f") {
    celsius = (value - 32) * (5 / 9);
  } else {
    celsius = value - 273.15;
  }

  if (to === "c") {
    return celsius;
  }

  if (to === "f") {
    return (celsius * 9) / 5 + 32;
  }

  return celsius + 273.15;
};

const convertUsingBaseUnit = (
  value: number,
  from: string,
  to: string,
  units: Record<string, number>
): number => {
  const baseValue = value * units[from];

  return baseValue / units[to];
};

export const convertUnit = (
  value: number,
  category: UnitCategory,
  from: string,
  to: string
): number => {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  if (from === to) {
    return value;
  }

  switch (category) {
    case "length":
      return convertUsingBaseUnit(value, from, to, lengthToMeter);

    case "mass":
      return convertUsingBaseUnit(value, from, to, massToGram);

    case "temperature":
      return convertTemperature(value, from, to);

    case "area":
      return convertUsingBaseUnit(
        value,
        from,
        to,
        areaToSquareMeter
      );

    case "volume":
      return convertUsingBaseUnit(
        value,
        from,
        to,
        volumeToLiter
      );

    case "speed":
      return convertUsingBaseUnit(
        value,
        from,
        to,
        speedToMeterPerSecond
      );

    case "time":
      return convertUsingBaseUnit(
        value,
        from,
        to,
        timeToSecond
      );

    case "data":
      return convertUsingBaseUnit(
        value,
        from,
        to,
        dataToByte
      );

    default:
      return NaN;
  }
};