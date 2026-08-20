import type {
  UnitCategoryOption,
} from "../../types/unit";

export const UNIT_CATEGORIES: UnitCategoryOption[] = [
  {
    value: "length",
    label: "Length",
    units: [
      { value: "mm", label: "Millimeter", symbol: "mm" },
      { value: "cm", label: "Centimeter", symbol: "cm" },
      { value: "m", label: "Meter", symbol: "m" },
      { value: "km", label: "Kilometer", symbol: "km" },
      { value: "in", label: "Inch", symbol: "in" },
      { value: "ft", label: "Foot", symbol: "ft" },
      { value: "yd", label: "Yard", symbol: "yd" },
      { value: "mi", label: "Mile", symbol: "mi" },
    ],
  },

  {
    value: "mass",
    label: "Weight / Mass",
    units: [
      { value: "mg", label: "Milligram", symbol: "mg" },
      { value: "g", label: "Gram", symbol: "g" },
      { value: "kg", label: "Kilogram", symbol: "kg" },
      { value: "oz", label: "Ounce", symbol: "oz" },
      { value: "lb", label: "Pound", symbol: "lb" },
    ],
  },

  {
    value: "temperature",
    label: "Temperature",
    units: [
      { value: "c", label: "Celsius", symbol: "°C" },
      { value: "f", label: "Fahrenheit", symbol: "°F" },
      { value: "k", label: "Kelvin", symbol: "K" },
    ],
  },

  {
    value: "area",
    label: "Area",
    units: [
      { value: "mm2", label: "Square Millimeter", symbol: "mm²" },
      { value: "cm2", label: "Square Centimeter", symbol: "cm²" },
      { value: "m2", label: "Square Meter", symbol: "m²" },
      { value: "km2", label: "Square Kilometer", symbol: "km²" },
      { value: "ft2", label: "Square Foot", symbol: "ft²" },
      { value: "yd2", label: "Square Yard", symbol: "yd²" },
      { value: "mi2", label: "Square Mile", symbol: "mi²" },
      { value: "acre", label: "Acre", symbol: "acre" },
      { value: "hectare", label: "Hectare", symbol: "ha" },
    ],
  },

  {
    value: "volume",
    label: "Volume",
    units: [
      { value: "ml", label: "Milliliter", symbol: "mL" },
      { value: "l", label: "Liter", symbol: "L" },
      { value: "m3", label: "Cubic Meter", symbol: "m³" },
      { value: "tsp", label: "Teaspoon", symbol: "tsp" },
      { value: "tbsp", label: "Tablespoon", symbol: "tbsp" },
      { value: "cup", label: "Cup", symbol: "cup" },
      { value: "pint", label: "Pint", symbol: "pt" },
      { value: "gallon", label: "Gallon", symbol: "gal" },
    ],
  },

  {
    value: "speed",
    label: "Speed",
    units: [
      {
        value: "mps",
        label: "Meters per Second",
        symbol: "m/s",
      },
      {
        value: "kph",
        label: "Kilometers per Hour",
        symbol: "km/h",
      },
      {
        value: "mph",
        label: "Miles per Hour",
        symbol: "mph",
      },
      {
        value: "knot",
        label: "Knot",
        symbol: "kn",
      },
    ],
  },

  {
    value: "time",
    label: "Time",
    units: [
      { value: "ms", label: "Millisecond", symbol: "ms" },
      { value: "s", label: "Second", symbol: "s" },
      { value: "min", label: "Minute", symbol: "min" },
      { value: "hour", label: "Hour", symbol: "h" },
      { value: "day", label: "Day", symbol: "day" },
      { value: "week", label: "Week", symbol: "week" },
    ],
  },

  {
    value: "data",
    label: "Data",
    units: [
      { value: "bit", label: "Bit", symbol: "bit" },
      { value: "byte", label: "Byte", symbol: "B" },
      { value: "kb", label: "Kilobyte", symbol: "KB" },
      { value: "mb", label: "Megabyte", symbol: "MB" },
      { value: "gb", label: "Gigabyte", symbol: "GB" },
      { value: "tb", label: "Terabyte", symbol: "TB" },
    ],
  },
];