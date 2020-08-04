import { evaluate } from "mathjs";
const formatDecimal = (number: number) => evaluate(number / 100000000);

const formatLocal = (number, minDecimals, maxDecimals) =>
  new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(number);

const divide = (n: number, d: number) => evaluate(n / d);
const multiply = (n1: number, n2: number) => evaluate(n1 * n2);

const formatCurrency = (value: string) => {
  const parts = value.split(".");
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (parts[1] || parts[1] === "" ? "." + parts[1] : "")
  );
};

const formatTrunc = (number: number) =>
  evaluate(Math.trunc(evaluate(number * 100000000)) / 100000000);

const countDecimals = (value: string) => {
  try {
    return value.split(".")[1].length || 0;
  } catch (e) {
    return 0;
  }
};

export {
  formatDecimal,
  formatLocal,
  divide,
  multiply,
  formatCurrency,
  formatTrunc,
  countDecimals,
};
