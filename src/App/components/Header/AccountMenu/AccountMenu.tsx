import React from "react";
import { EXPLORER_ADDRESS } from "../../../../config";
import { WalletStatus } from "../../../store/models";
import { ShowIcon } from "../../";
import { formatLocal } from "../../../../utils/number";
import { Menu, Button } from "antd";
import "./AccountMenu.scss";
const { Divider } = Menu;

const AccountMenu = ({ balances, walletStatus, address, toggleGuide }) => {
  const { trx, cnr, cns } = balances;
  return (
    <Menu theme={"dark"} className="AccountMenu">
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="tron" /> {formatLocal(trx.balance, 6, 6)}
      </Menu.Item>
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="cnr" /> {formatLocal(cnr.balance, 6, 6)}
      </Menu.Item>
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="cns" /> {formatLocal(cns.balance, 6, 6)}
      </Menu.Item>
      <Divider />
      {walletStatus === WalletStatus.CONNECTED && address.length && (
        <Menu.Item className="AccountMenu__item">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${EXPLORER_ADDRESS}/account/${address}`}
          >
            Transaction History
          </a>
        </Menu.Item>
      )}
      <Menu.Item className="AccountMenu__item">
        <a target="_blank" rel="noopener noreferrer" href={EXPLORER_ADDRESS}>
          Explorer
        </a>
      </Menu.Item>
      <Menu.Item className="AccountMenu__item">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://v1.centricswap.com"
        >
          Switch to V1
        </a>
      </Menu.Item>
      <Menu.Item className="AccountMenu__guideTrigger">
        <Button type="link" onClick={() => toggleGuide(true)}>
          About Centric Swap
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default AccountMenu;
