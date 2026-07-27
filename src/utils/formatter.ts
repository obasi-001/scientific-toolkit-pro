export const formatResult = (value: number): string => {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Number.isInteger(value)) {
    return value.toString();
  }

  return parseFloat(value.toFixed(10)).toString();
};