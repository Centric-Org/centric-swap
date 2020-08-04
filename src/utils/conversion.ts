import { Currency } from "../App/store/models";
import { divide, multiply, formatLocal } from "./number";

const calculateTokenAmount = (currency, amount, cnrPrice, cnsPrice) => {
  return currency === Currency.CNR
    ? formatLocal(divide(amount, cnrPrice), 2, 8)
    : formatLocal(divide(amount, cnsPrice), 2, 8);
};

const calculateTokenValue = (currency, amount, cnrPrice, cnsPrice) => {
  return currency === Currency.CNR
    ? formatLocal(multiply(amount, cnrPrice), 2, 2)
    : formatLocal(multiply(amount, cnsPrice), 2, 2);
};

const calculateReceiveAmount = (currency, amount, cnrPrice) => {
  return currency === Currency.CNR
    ? formatLocal(multiply(amount, cnrPrice), 2, 8)
    : formatLocal(divide(amount, cnrPrice), 2, 8);
};

export { calculateTokenAmount, calculateTokenValue, calculateReceiveAmount };
