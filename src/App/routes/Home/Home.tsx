import React, { useState, useEffect } from "react";
import {
  Wallet as WalletInterface,
  Account as AccountInterface,
  Prices as PricesInterface,
  WalletStatus,
} from "../../store/models";
import useActiveWallet from "../../hooks/ActiveWallet.hook";
import useAccount from "../../hooks/Account.hook";
import usePrice from "../../hooks/Price.hook";
import { Header, Main } from "../../components";
import { InstallWallet, Guide } from "../../components";
import { Layout, Row, Col, Grid } from "antd";
import "./Home.scss";
const { useBreakpoint } = Grid;

const Home = () => {
  const activeWallet: WalletInterface = useActiveWallet();
  const account: AccountInterface = useAccount(activeWallet);
  const prices: PricesInterface = usePrice();
  const screens = useBreakpoint();
  const [responsiveClasses, setResponsiveClasses]: [string, any] = useState("");
  const [installVisible, toggleInstallVisible]: [boolean, any] = useState(
    false
  );
  const [guideVisible, toggleGuideVisible]: [boolean, any] = useState(false);

  useEffect(() => {
    let responsiveString = "Home";
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .forEach((screen) => {
        responsiveString += ` screen-${screen[0]}`;
      });
    setResponsiveClasses(responsiveString);
  }, [screens]);

  useEffect(() => {
    const { walletStatus } = activeWallet;
    if (walletStatus === WalletStatus.NOTCONNECTED) toggleInstallVisible(true);
  }, [activeWallet]);

  const showGuide = (isVisible) => {
    toggleInstallVisible(false);
    toggleGuideVisible(isVisible);
  };

  return (
    <Layout className={responsiveClasses}>
      <Row align="middle">
        <Col span="24">
          <Header
            activeWallet={activeWallet}
            account={account}
            toggleGuide={toggleGuideVisible}
          />
          <Main activeWallet={activeWallet} account={account} prices={prices} />
        </Col>
      </Row>
      <InstallWallet
        isVisible={installVisible}
        toggleVisible={toggleInstallVisible}
        showGuide={showGuide}
      />
      <Guide isVisible={guideVisible} toggleVisible={toggleGuideVisible} />
    </Layout>
  );
};

export default Home;
