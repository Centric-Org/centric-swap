import { useEffect, useState } from "react";
import {
  AccountStatus,
  WalletStatus,
  Currency,
  ValidationStatus,
  ValidationMessage,
  PriceStatus,
} from "../store/models";

const initalState = {
  validationStatus: ValidationStatus.IDLE,
  validationMessage: ValidationMessage.EMPTY,
};

const useValidation = ({
  form,
  prices,
  fromCurrency,
  amount,
  activeWallet,
  account,
}) => {
  const { accountStatus } = account;
  const { walletStatus } = activeWallet;
  const [validation, setValidation] = useState(initalState);

  useEffect(() => {
    const doValidation = () => {
      try {
        if (
          walletStatus === WalletStatus.IDLE ||
          walletStatus === WalletStatus.LOADING
        ) {
          return {
            validationStatus: ValidationStatus.NONE,
            validationMessage: ValidationMessage.EMPTY,
          };
        }
        if (walletStatus === WalletStatus.NOTCONNECTED) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage.WALLETCONNECT,
          };
        }
        if (walletStatus === WalletStatus.NOTLOGGEDIN) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage.WALLETLOGIN,
          };
        }
        if (
          accountStatus === AccountStatus.IDLE ||
          accountStatus === AccountStatus.LOADING
        ) {
          return {
            validationStatus: ValidationStatus.NONE,
            validationMessage: "",
          };
        }
        if (accountStatus === AccountStatus.NOTCONNECTED) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage.WALLETLOGIN,
          };
        }
        /*if (account[fromCurrency].balance === 0) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage[fromCurrency],
          };
        }*/
        if (account[Currency.TRX].balance < 1) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage.trx,
          };
        }
        if (prices.priceStatus === PriceStatus.FAILED) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage.PRICE,
          };
        }
        const amountNumber = !amount
          ? 0
          : Number(amount.toString().replace(/,/g, ""));
        if (amountNumber === 0) {
          return {
            validationStatus: ValidationStatus.NONE,
            validationMessage: ValidationMessage.EMPTY,
          };
        }
        if (amountNumber > account[fromCurrency].balance) {
          return {
            validationStatus: ValidationStatus.FAILED,
            validationMessage: ValidationMessage[fromCurrency],
          };
        } else {
          return {
            validationStatus: ValidationStatus.SUCCESS,
            validationMessage: ValidationMessage.EMPTY,
          };
        }
      } catch (e) {
        return {
          validationStatus: ValidationStatus.FAILED,
          validationMessage: ValidationMessage.INVALID,
        };
      }
    };
    const { validationStatus, validationMessage } = doValidation();
    setValidation({
      validationStatus,
      validationMessage,
    });
  }, [
    amount,
    fromCurrency,
    walletStatus,
    accountStatus,
    account,
    prices.priceStatus,
  ]);

  return validation;
};

export default useValidation;
