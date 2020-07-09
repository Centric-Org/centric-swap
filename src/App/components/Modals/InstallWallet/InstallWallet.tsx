import React from "react";
import { ShowIcon } from "../../";
import { Modal, Card, Row, Col, Button } from "antd";
import "./InstallWallet.scss";
const { Meta } = Card;

const InstallWallet = ({ isVisible, toggleVisible, showGuide }) => {
  return (
    <Modal
      title="Please connect a Tron wallet"
      visible={isVisible}
      footer={false}
      onOk={() => toggleVisible(false)}
      onCancel={() => toggleVisible(false)}
      className="InstallWallet"
    >
      <p>
        Centric Swap recommends{" "}
        <a
          href="https://www.tronlink.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TronLink Wallet
        </a>
        <br />
        Download it for your device
      </p>
      <Row gutter={[{ xs: 0, sm: 8, md: 16, lg: 16 }, 16]}>
        <Col xs={{ span: 0 }} sm={{ span: 8 }} md={{ span: 8 }}>
          <a
            href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <div className="InstallWallet__cover">
                  <ShowIcon icon="chromeStore" />
                </div>
              }
            >
              <Meta
                className="InstallWallet__meta"
                title="PC/Mac"
                description="Chrome Web Store"
              />
            </Card>
          </a>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }}>
          <a
            href="https://apps.apple.com/us/app/tronlink-trx-btt-wallet/id1453530188"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <div className="InstallWallet__cover">
                  <ShowIcon icon="appStore" />
                </div>
              }
            >
              <Meta
                className="InstallWallet__meta"
                title="iPhone/iPad"
                description="Apple App Store"
              />
            </Card>
          </a>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.tronlinkpro.wallet&hl=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <div className="InstallWallet__cover">
                  <ShowIcon icon="playStore" />
                </div>
              }
            >
              <Meta
                className="InstallWallet__meta"
                title="Android"
                description="Google Play Store"
              />
            </Card>
          </a>
        </Col>
      </Row>
      <Button type="link" onClick={() => showGuide(true)}>
        For more info read the Centric Swap guide
      </Button>
    </Modal>
  );
};

export default InstallWallet;
