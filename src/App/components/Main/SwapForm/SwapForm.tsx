import React, { useState, useEffect } from "react";
import { Currency, PriceStatus } from "../../../store/models";
import { calculateReceiveAmount } from "../../../../utils/conversion";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import SwapButton from "./SwapButton/SwapButton";
import AmountSelect from "./AmountSelect/AmountSelect";
import { Row, Col, Form, Input } from "antd";
import "./SwapForm.scss";

const SwapForm = ({
  form,
  account,
  fromCurrency,
  changeFromCurrency,
  toCurrency,
  changeToCurrency,
  changeAmount,
  amount,
  displayValue,
  usdValue,
  blurInput,
  prices,
}) => {
  const { priceStatus, cnr: cnrPrice } = prices;

  const [converRate, setConverRate]: [string | null, any] = useState(null);

  useEffect(() => {
    if (priceStatus === PriceStatus.SUCCESS) {
      const rate = calculateReceiveAmount(fromCurrency, 1, cnrPrice);
      setConverRate(rate);
    }
  }, [cnrPrice, fromCurrency, priceStatus]);

  useEffect(() => {
    form.setFieldsValue({
      receive: displayValue,
    });
  }, [displayValue, form]);

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
            <div className="SwapForm__item">
              <Form.Item className="SwapForm__input" label="Swap" name="amount">
                <Input
                  disabled={priceStatus !== PriceStatus.SUCCESS}
                  placeholder={"0.00"}
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
              <Form.Item>
                <CurrencySelect
                  currency={fromCurrency}
                  onCurrencyChange={changeFromCurrency}
                />
              </Form.Item>
            </div>
            <div className="SwapForm__info">
              <div>
                {priceStatus === PriceStatus.SUCCESS &&
                  (fromCurrency === Currency.CNR ? (
                    <span>
                      {amount ? amount : 0} CNR = ${usdValue ? usdValue : 0} USD
                    </span>
                  ) : (
                    <span>
                      {amount ? amount : 0} CNS = ${usdValue ? usdValue : 0} USD
                    </span>
                  ))}
              </div>
              <SwapButton
                fromCurrency={fromCurrency}
                changeFromCurrency={changeFromCurrency}
              />
            </div>
          </Col>

          <Col span={24} className="Main__column Main__column--receive">
            <div className="SwapForm__item">
              <Form.Item
                className="SwapForm__input SwapForm__input--disabled"
                label="Receive"
                name="receive"
              >
                <Input
                  disabled={true}
                  placeholder={"0.00"}
                  size="large"
                  autoComplete="off"
                  pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                />
              </Form.Item>
              <Form.Item>
                <CurrencySelect
                  currency={toCurrency}
                  onCurrencyChange={changeToCurrency}
                />
              </Form.Item>
            </div>
            <div className="SwapForm__info">
              <div>
                {priceStatus === PriceStatus.SUCCESS &&
                  (fromCurrency === Currency.CNR ? (
                    <span>1 CNR = {converRate} CNS</span>
                  ) : (
                    <span>1 CNS = {converRate} CNR</span>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default SwapForm;
