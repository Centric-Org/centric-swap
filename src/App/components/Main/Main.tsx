import React, { useState, useEffect } from "react";
import {
  Currency,
  Validation as ValidationInterface,
  PriceStatus,
  SwapStatus,
} from "../../store/models";
import useValidation from "../../hooks/Validation.hook";
import useSwap from "../../hooks/Swap.hook";
import {
  formatLocal,
  formatCurrency,
  countDecimals,
} from "../../../utils/number";
import {
  calculateTokenAmount,
  calculateTokenValue,
  calculateReceiveAmount,
} from "../../../utils/conversion";
import { SwapForm, Confirm, Validation } from "./";
import { ShowIcon } from "../";
import { Layout, Form, Row, Col, Button } from "antd";
import { QuestionCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import "./Main.scss";
const { Content } = Layout;

const Main = ({ activeWallet, account, prices, toggleGuide }) => {
  const { cnr: cnrPrice, cns: cnsPrice, priceStatus } = prices;

  const [form] = Form.useForm();
  const [fromCurrency, setFromCurrency]: [Currency, any] = useState(
    Currency.CNR
  );
  const [toCurrency, setToCurrency]: [Currency, any] = useState(Currency.CNS);
  const [amount, amountChange]: [string | null, any] = useState(null); //swap amount
  const [value, valueChange]: [string | null, any] = useState(null); //swap usd value
  const [displayAmount, setDisplayAmount]: [string, any] = useState("0.00");
  const [displayValue, setDisplayValue]: [string, any] = useState("0.00");
  const validation: ValidationInterface = useValidation({
    form,
    prices,
    amount,
    fromCurrency,
    activeWallet,
    account,
  });
  const { swapStatus, triggerSwap } = useSwap();

  const changeFromCurrency = (currency: Currency) => {
    setFromCurrency(currency === Currency.CNR ? Currency.CNR : Currency.CNS);
    setToCurrency(currency === Currency.CNR ? Currency.CNS : Currency.CNR);
  };

  const changeToCurrency = (currency: Currency) => {
    setToCurrency(currency === Currency.CNR ? Currency.CNR : Currency.CNS);
    setFromCurrency(currency === Currency.CNR ? Currency.CNS : Currency.CNR);
  };

  const changeAmount = (input) => {
    // calculates value and pretties value and amount on amount change
    const inputText = input.replace(/,/g, "");
    const inputAmount = Number(inputText);
    const decimals = !isNaN(inputAmount) ? countDecimals(inputText) : 0;
    if (!isNaN(inputAmount) && decimals <= 8) {
      const newAmount = formatCurrency(`${inputText}`);
      const newValue = calculateTokenValue(
        fromCurrency,
        inputAmount,
        cnrPrice,
        cnsPrice
      );
      form.setFieldsValue({
        amount: newAmount,
        value: newValue === "0" ? null : newValue,
      });
      amountChange(
        ["", "0.", "0", "0.0"].includes(newAmount) ? null : newAmount
      );
      valueChange(newValue);
    } else {
      //restrict input if exceed decimals or invalid char
      form.setFieldsValue({
        amount: amount === "0" ? null : amount,
        value: value === "0" ? null : value,
      });
    }
  };

  const blurInput = (field, fieldValue) => {
    // pretty amount and value on form field blur
    const inputText = fieldValue.replace(/,/g, "");
    if (field === "amount") {
      const inputAmount = Number(inputText);
      const decimals = !isNaN(inputAmount) ? countDecimals(inputText) : 2;
      form.setFieldsValue({
        amount: ["", "0.", "0", "0.0", "0.00"].includes(inputText)
          ? null
          : formatLocal(inputText, 2, decimals < 2 ? 2 : decimals),
      });
      amountChange(
        ["", "0.", "0", "0.0", "0.00"].includes(inputText)
          ? null
          : formatLocal(inputText, 2, decimals < 2 ? 2 : decimals)
      );
    }
  };

  useEffect(() => {
    // pretty fromCurrency amount for display in summary
    const inputText = amount ? amount : "0";
    const inputAmount = Number(inputText.replace(/,/g, ""));
    const decimals = !isNaN(inputAmount)
      ? countDecimals(inputText.toString())
      : 2;
    setDisplayAmount(
      isNaN(inputAmount)
        ? "0.00"
        : formatLocal(inputAmount.toString(), 2, decimals < 2 ? 2 : decimals)
    );

    const receiveAmount =
      isNaN(inputAmount) || priceStatus !== PriceStatus.SUCCESS
        ? "0.00"
        : calculateReceiveAmount(fromCurrency, inputAmount, cnrPrice);

    setDisplayValue(receiveAmount);
  }, [amount, cnrPrice, fromCurrency, priceStatus]);

  useEffect(() => {
    // reset values on currency change
    amountChange(null);
    valueChange(null);
    form.setFieldsValue({
      amountSelect: undefined,
      amount: null,
      value: null,
    });
  }, [form, fromCurrency]);

  useEffect(() => {
    // reset values on success swap
    if (swapStatus === SwapStatus.SUCCESS) {
      amountChange(null);
      valueChange(null);
      form.setFieldsValue({
        amountSelect: undefined,
        amount: null,
        value: null,
      });
    }
  }, [form, swapStatus]);

  return (
    <Content className="Main">
      <Row align="middle" className="Main__vertical__container">
        <Col flex="auto">
          <div className="Main__content">
            <ShowIcon icon="logo_swap" />
            <h1 className="Main__content__logoText">
              Centric <span>Swap</span>
            </h1>
            <p className="Main__content__text">
              Easily convert between CNR and CNS.
            </p>
            <ul className="Main__content__features">
              <li>
                <CheckCircleFilled /> Decentralized
              </li>
              <li>
                <CheckCircleFilled /> Censorship Resistant
              </li>
            </ul>
            <Button
              className="Main__content__action"
              type="link"
              icon={<QuestionCircleFilled />}
              onClick={() => toggleGuide(true)}
            >
              Centric Swap Guide
            </Button>
          </div>
        </Col>
        <Col flex="450px">
          <div className="Main__form__container">
            <Form
              className="Form"
              name="swap-form"
              form={form}
              onFinish={(values) =>
                triggerSwap(values, fromCurrency, toCurrency, displayValue)
              }
              layout="vertical"
            >
              <SwapForm
                form={form}
                account={account}
                fromCurrency={fromCurrency}
                changeFromCurrency={changeFromCurrency}
                toCurrency={toCurrency}
                changeToCurrency={changeToCurrency}
                changeAmount={changeAmount}
                displayValue={displayValue}
                amount={amount}
                usdValue={value}
                blurInput={blurInput}
                prices={prices}
              />
              <Validation validation={validation} />
              <Confirm
                validationStatus={validation.validationStatus}
                fromCurrency={fromCurrency}
                prices={prices}
                swapStatus={swapStatus}
              />
            </Form>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default Main;
