import React from "react";
import { Currency } from "../../../../store/models";
import { ShowIcon } from "../../../";
import { Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./CurrencySelect.scss";
const { Option } = Select;

const CurrencySelect = ({
  type,
  currency,
  onCurrencyChange,
  riseBalance,
  cashBalance,
  riseUsd,
  cnsUsd,
  cnrConvert,
  cnsConvert,
}) => {
  return (
    <Select
      defaultValue={currency}
      value={currency}
      onChange={onCurrencyChange}
      className="CurrencySelect"
      dropdownClassName="CurrencySelect__options"
      size="large"
      bordered={false}
      suffixIcon={<CaretDownOutlined onClick={() => onCurrencyChange} />}
    >
      <Option value={Currency.CNR}>
        <div className="CurrencySelect__option">
          <div className="CurrencySelect__option__leftSide">
            <ShowIcon icon={Currency.CNR} />
          </div>
          <div className="CurrencySelect__option__rightSide">
            <div>
              <ShowIcon icon="cnr_text" />
            </div>
            <div className="CurrencySelect__option__data">
              {type === "swap" ? (
                <>
                  <span className="CurrencySelect__option__balance">
                    {riseBalance} CNR
                  </span>
                  <span className="CurrencySelect__option__value">
                    ${riseUsd}
                  </span>
                </>
              ) : (
                <span className="CurrencySelect__option__balance">
                  1 CNS = {cnsConvert} CNR
                </span>
              )}
            </div>
          </div>
        </div>
      </Option>
      <Option value={Currency.CNS}>
        <div className="CurrencySelect__option">
          <div className="CurrencySelect__option__leftSide">
            <ShowIcon icon={Currency.CNS} />
          </div>
          <div className="CurrencySelect__option__rightSide">
            <div>
              <ShowIcon icon="cns_text" />
            </div>
            <div className="CurrencySelect__option__data">
              {type === "swap" ? (
                <>
                  <span className="CurrencySelect__option__balance">
                    {cashBalance} CNS
                  </span>
                  <span className="CurrencySelect__option__value">
                    ${cnsUsd}
                  </span>
                </>
              ) : (
                <span className="CurrencySelect__option__balance">
                  1 CNR = {cnrConvert} CNS
                </span>
              )}
            </div>
          </div>
        </div>
      </Option>
    </Select>
  );
};

export default CurrencySelect;
