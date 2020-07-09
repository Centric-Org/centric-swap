import React from "react";
import { WalletStatus } from "../../store/models";
import { TruncateAddress } from "../../../utils/text";
import { ShowIcon } from "../";
import AccountMenu from "./AccountMenu/AccountMenu";
import { Dropdown, Button, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Header.scss";

export enum StatusText {
  IDLE = "Idle",
  LOADING = "Loading",
  NOTCONNECTED = "Not Connected",
  NOTLOGGEDIN = "Not Logged In",
  CONNECTED = "Connected",
}

const renderStatus = (status) => {
  switch (status) {
    case WalletStatus.IDLE:
    case WalletStatus.LOADING:
      return "processing";
    case WalletStatus.CONNECTED:
      return "success";
    default:
      return "error";
  }
};

const Header = ({ activeWallet, account, toggleGuide }) => {
  const { walletStatus, address } = activeWallet;
  return (
    <header className="Header">
      <div>
        <ShowIcon icon="logo_swap" />
      </div>
      <div>
        <Dropdown
          className="Header__dropdown"
          placement="bottomRight"
          overlay={
            <AccountMenu
              balances={account}
              walletStatus={walletStatus}
              address={address}
              toggleGuide={toggleGuide}
            />
          }
        >
          <Button type="link" className="Header__dropdown__button">
            <Badge status={renderStatus(walletStatus)} />
            {walletStatus === WalletStatus.CONNECTED && address.length ? (
              <TruncateAddress children={address} address={true} />
            ) : (
              StatusText[walletStatus]
            )}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
