export const squareRoot = (value: number): number => {
  return Math.sqrt(value);
};

export const square = (value: number): number => {
  return value * value;
};

export const sine = (degrees: number): number => {
  return Math.sin(degrees * (Math.PI / 180));
};

export const cosine = (degrees: number): number => {
  return Math.cos(degrees * (Math.PI / 180));
};

export const tangent = (degrees: number): number => {
  return Math.tan(degrees * (Math.PI / 180));
};

export const logarithm = (value: number): number => {
  return Math.log10(value);
};

export const naturalLog = (value: number): number => {
  return Math.log(value);
};