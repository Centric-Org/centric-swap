import { TronWebService } from "./TronWeb.service";
import { Currency, ValidationMessage } from "../store/models";
import { RISE_CONTRACT_ADDRESS, CASH_CONTRACT_ADDRESS } from "../../config";
import { formatDecimal } from "../../utils/number";

class TronService {
  public tronWeb: any;
  public tronGrid: any;
  public riseContract: any;
  public cashContract: any;

  public getSendConfig = (callValueInSun: number) => {
    return {
      feeLimit: 1000000000,
      callValue: callValueInSun,
    };
  };

  public getBalanceInSun = (address?: string): Promise<number> => {
    return this.tronWeb.trx.getUnconfirmedBalance(address);
  };

  public async getAccount(address: string) {
    try {
      if (
        !this.tronWeb ||
        !this.tronWeb.defaultAddress.base58 ||
        !this.riseContract ||
        !this.cashContract
      )
        throw new Error(ValidationMessage.PRICE);

      const unconfirmedBalance = await this.getBalanceInSun(address);
      const trxBalance = TronWebService.fromSun(unconfirmedBalance);

      const riseBalancePromise = this.riseContract.balanceOf(address).call();
      const cashBalancePromise = this.cashContract.balanceOf(address).call();

      const [riseBalance, cashBalance] = await Promise.all([
        riseBalancePromise,
        cashBalancePromise,
      ]);

      return {
        riseBalance: formatDecimal(riseBalance),
        cashBalance: formatDecimal(cashBalance),
        trxBalance,
      };
    } catch (e) {
      throw e;
    }
  }

  private getAccountInfo = (address, options) => {
    return this.tronGrid.account.get(address, options);
  };

  public onAccountAddressChanged = (callback: any): void => {
    if (this.tronWeb) {
      this.tronWeb.on("addressChanged", callback);
    }
  };

  public getAccountAddressHex = () => {
    if (this.tronWeb) {
      return this.tronWeb.defaultAddress.hex;
    }
    return "";
  };

  public toSun = (...args: any[]) => this.tronWeb.toSun(...args);
  public fromSun = (...args: any[]) => this.tronWeb.fromSun(...args);
  public toDecimal = (...args: any[]) => this.tronWeb.toDecimal(...args);
  public toUtf8 = (...args: any[]) => this.tronWeb.toUtf8(...args);

  public getRiseContract = async () => {
    if (this.tronWeb) {
      return this.tronWeb.contract().at(RISE_CONTRACT_ADDRESS);
    }
  };

  public getCashContract = async () => {
    if (this.tronWeb) {
      return this.tronWeb.contract().at(CASH_CONTRACT_ADDRESS);
    }
  };

  public getTransaction = (transactionId, numOfRetries: number = 50) => {
    console.info("Waiting for transaction result...");
    return new Promise((resolve, reject) => {
      const checkTransaction = async () => {
        try {
          if (numOfRetries > 0) {
            if (!this.tronWeb || !this.tronWeb.defaultAddress.base58)
              reject(ValidationMessage.WALLETCONNECT);
            const transaction = await this.tronWeb.trx.getTransaction(
              transactionId
            );
            if (
              Object.prototype.hasOwnProperty.call(transaction, "ret") &&
              transaction.ret.length
            ) {
              const { contractRet: transactionResult } = transaction.ret[0];
              if (transactionResult === "SUCCESS") resolve(transactionId);
              reject(
                new Error(
                  `Transaction ${transactionId} failed. Reason: ${transactionResult}`
                )
              );
            } else {
              numOfRetries--;
              setTimeout(function () {
                checkTransaction();
              }, 1000);
            }
          } else {
            if (!this.tronWeb || !this.tronWeb.defaultAddress.base58)
              reject(ValidationMessage.WALLETCONNECT);
            reject(new Error(`Transaction error: ${transactionId} not found`));
          }
        } catch (e) {
          numOfRetries--;
          setTimeout(function () {
            checkTransaction();
          }, 1000);
        }
      };
      checkTransaction();
    });
  };

  public doCentricConvert = async (currency, convertAmount) => {
    try {
      if (
        !this.tronWeb ||
        !this.tronWeb.defaultAddress.base58 ||
        !this.riseContract ||
        !this.cashContract
      )
        throw new Error(ValidationMessage.PRICE);

      const amount = parseInt((convertAmount / 100000000).toString(), 10);
      const hexAmount = this.tronWeb.toHex(
        (convertAmount * 100000000).toFixed()
      );

      const address = this.tronWeb.defaultAddress.base58;
      const tokenBalance =
        currency === Currency.CNR
          ? await this.riseContract.balanceOf(address).call()
          : await this.cashContract.balanceOf(address).call();

      // ensure sufficient token balance
      if (tokenBalance < amount)
        throw new Error(
          currency === Currency.CNR
            ? ValidationMessage.cnr
            : ValidationMessage.cns
        );

      // ensure sufficient trx balance
      const unconfirmedBalance = await this.getBalanceInSun(address);
      if (TronWebService.fromSun(unconfirmedBalance) < 1)
        throw new Error(ValidationMessage.trx);

      //TODO: check CNR price hasnt changed

      let transactionId;
      if (currency === Currency.CNR) {
        transactionId = await this.riseContract.convertToCash(hexAmount).send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      } else if (currency === Currency.CNS) {
        transactionId = await this.riseContract.convertToRise(hexAmount).send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      } else {
        throw new Error("Invalid token");
      }
      return transactionId;
    } catch (e) {
      if (Object.prototype.hasOwnProperty.call(e, "message")) {
        throw e;
      }
      throw new Error(e);
    }
  };
}

const tronService = new TronService();

export default tronService;
