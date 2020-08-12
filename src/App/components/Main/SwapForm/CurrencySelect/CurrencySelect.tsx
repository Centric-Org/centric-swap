import React from "react";
import { Currency } from "../../../../store/models";
import { ShowIcon } from "../../../";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./CurrencySelect.scss";
const { Option } = Select;

const CurrencySelect = ({ currency, onCurrencyChange }) => {
  return (
    <Select
      defaultValue={currency}
      value={currency}
      onChange={onCurrencyChange}
      className="CurrencySelect"
      dropdownClassName="CurrencySelect__options"
      size="large"
      bordered={false}
      suffixIcon={<DownOutlined onClick={() => onCurrencyChange} />}
    >
      <Option value={Currency.CNR}>
        <div className="CurrencySelect__option">
          <div className="CurrencySelect__option__title">Centric Rise</div>
          <div className="CurrencySelect__option__content">
            <ShowIcon icon={Currency.CNR} />
            <div>CNR</div>
          </div>
        </div>
      </Option>
      <Option value={Currency.CNS}>
        <div className="CurrencySelect__option">
          <div className="CurrencySelect__option__title">Centric Cash</div>
          <div className="CurrencySelect__option__content">
            <ShowIcon icon={Currency.CNS} />
            <div>CNS</div>
          </div>
        </div>
      </Option>
    </Select>
  );
};

export default CurrencySelect;
