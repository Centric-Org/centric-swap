import React, { useState, useEffect } from "react";
import { Currency, PriceStatus, AccountStatus } from "../../../store/models";
import { formatLocal } from "../../../../utils/number";
import {
  calculateTokenValue,
  calculateReceiveAmount,
} from "../../../../utils/conversion";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import SwapButton from "./SwapButton/SwapButton";
import AmountSelect from "./AmountSelect/AmountSelect";
import { Row, Col, Form, Input, Divider } from "antd";
import "./SwapForm.scss";

const SwapForm = ({
  form,
  account,
  fromCurrency,
  changeFromCurrency,
  toCurrency,
  changeToCurrency,
  changeAmount,
  changeValue,
  blurInput,
  prices,
}) => {
  const { priceStatus, cnr: cnrPrice, cns: cnsPrice } = prices;
  const [cnrUsd, setCnrUsd]: [string, any] = useState("0.00");
  const [cnsUsd, setCnsUsd]: [string, any] = useState("0.00");
  const [cnrConvert, setCnrConvert]: [string, any] = useState("0");
  const [cnsConvert, setCnsConvert]: [string, any] = useState("0");

  useEffect(() => {
    if (
      account.accountStatus === AccountStatus.ACTIVE &&
      priceStatus === PriceStatus.SUCCESS
    ) {
      const cnrUsdAmount = calculateTokenValue(
        Currency.CNR,
        account[Currency.CNR].balance,
        cnrPrice,
        cnsPrice
      );
      setCnrUsd(cnrUsdAmount);
    }
  }, [account, cnrPrice, cnsPrice, priceStatus]);

  useEffect(() => {
    if (
      account.accountStatus === AccountStatus.ACTIVE &&
      priceStatus === PriceStatus.SUCCESS
    ) {
      const cnsUsdAmount = calculateTokenValue(
        Currency.CNS,
        account[Currency.CNS].balance,
        cnrPrice,
        cnsPrice
      );
      setCnsUsd(cnsUsdAmount);
    }
  }, [account, cnrPrice, cnsPrice, priceStatus]);

  useEffect(() => {
    if (priceStatus === PriceStatus.SUCCESS) {
      const cnrConvertAmount = calculateReceiveAmount(
        Currency.CNR,
        1,
        cnrPrice
      );
      setCnrConvert(cnrConvertAmount);
    }
  }, [cnrPrice, cnsPrice, priceStatus]);

  useEffect(() => {
    if (priceStatus === PriceStatus.SUCCESS) {
      const cnsConvertAmount = calculateReceiveAmount(
        Currency.CNS,
        1,
        cnrPrice
      );
      setCnsConvert(cnsConvertAmount);
    }
  }, [cnrPrice, cnsPrice, priceStatus]);

  return (
    <Row justify="center" className="SwapForm container">
      <Col className="container__column">
        <Row gutter={[{ xs: 0, sm: 0, md: 16, lg: 32 }, 0]}>
          <Col span={24} className="Main__column">
            <AmountSelect
              form={form}
              disabled={priceStatus !== PriceStatus.SUCCESS}
              fromCurrency={fromCurrency}
              account={account}
              changeAmount={changeAmount}
            />
            <Form.Item label="Swap">
              <CurrencySelect
                type="swap"
                currency={fromCurrency}
                onCurrencyChange={changeFromCurrency}
                riseBalance={formatLocal(account[Currency.CNR].balance, 2, 8)}
                cashBalance={formatLocal(account[Currency.CNS].balance, 2, 8)}
                riseUsd={cnrUsd}
                cnsUsd={cnsUsd}
                cnrConvert={cnrConvert}
                cnsConvert={cnsConvert}
              />
            </Form.Item>

            <Form.Item className="SwapForm__input" name="amount">
              <Input
                disabled={priceStatus !== PriceStatus.SUCCESS}
                placeholder={"0.00"}
                suffix={fromCurrency}
                size="large"
                autoComplete="off"
                pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                onPaste={(e: any) => {
                  form.setFieldsValue({
                    amountSelect: undefined,
                  });
                  changeAmount(e.target.value);
                }}
                onChange={(e: any) => {
                  form.setFieldsValue({
                    amountSelect: undefined,
                  });
                  changeAmount(e.target.value);
                }}
                onBlur={(e: any) => {
                  blurInput("amount", e.target.value);
                }}
              />
            </Form.Item>
            <Divider className="SwapForm__divider" />
            <Form.Item className="SwapForm__input" name="value">
              <Input
                disabled={priceStatus !== PriceStatus.SUCCESS}
                placeholder={"0.00"}
                suffix={"USD"}
                size="large"
                autoComplete="off"
                pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                onPaste={(e: any) => {
                  form.setFieldsValue({
                    amountSelect: undefined,
                  });
                  changeValue(e.target.value);
                }}
                onChange={(e: any) => {
                  form.setFieldsValue({
                    amountSelect: undefined,
                  });
                  changeValue(e.target.value);
                }}
                onBlur={(e: any) => {
                  blurInput("value", e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} className="Main__column__swap">
            <SwapButton
              fromCurrency={fromCurrency}
              changeFromCurrency={changeFromCurrency}
            />
          </Col>
          <Col span={24} className="Main__column Main__column--receive">
            <Form.Item label="Receive">
              <CurrencySelect
                type="receive"
                currency={toCurrency}
                onCurrencyChange={changeToCurrency}
                riseBalance={formatLocal(account[Currency.CNR].balance, 2, 8)}
                cashBalance={formatLocal(account[Currency.CNS].balance, 2, 8)}
                riseUsd={cnrUsd}
                cnsUsd={cnsUsd}
                cnrConvert={cnrConvert}
                cnsConvert={cnsConvert}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default SwapForm;
