import React from "react";
import { Modal, Card, Row, Col, Divider } from "antd";
import "./Guide.scss";
const { Meta } = Card;

const Guide = ({ isVisible, toggleVisible }) => {
  return (
    <Modal
      title="Centric Swap guide"
      visible={isVisible}
      footer={false}
      onOk={() => toggleVisible(false)}
      onCancel={() => toggleVisible(false)}
      className="Guide"
      style={{ top: 20 }}
    >
      <h4>About Centric Swap</h4>
      <p>
        Centric Swap converts Centric tokens from one type to the other. It
        offers a decentralized alternative to Centric Rise and Centric Cash
        holders who do not wish to store their Centric tokens at the{" "}
        <a
          href="https://wallet.joincentic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Centric Wallet
        </a>
      </p>
      <p>
        Before using Centric Swap to convert your Centric tokens please review
        the below should I use Centric Swap checklist.
      </p>
      <Divider />
      <h4>Should I use Centric Swap checklist</h4>
      <ul className="Guide__checklist">
        <li>
          I hold Centric Rise (CNR) or Centric Cash (CNS) and want to convert
          between them
        </li>
        <li>
          I store my Centric Rise (CNR) or Centric Cash (CNS) at the{" "}
          <a
            href="https://wallet.joincentic.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Centric Wallet
          </a>
        </li>
        <li>
          I’m happy to pay a small transaction fee in TRX (Tron) to convert my
          tokens (approx. 0.25 - 0.5 TRX)
        </li>
        <li>
          I have TRX (Tron) to pay transaction fees or I know how to buy it from
          exchanges
        </li>
        <li>
          I'm happy to use TronLink or similar Tron-enabled web wallet to store
          my tokens.
        </li>
      </ul>
      <p>
        If you answered no to any of these questions we recommend you use the{" "}
        <a
          href="https://wallet.joincentic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Centric Wallet
        </a>
        .
      </p>
      <Divider />
      <h4>How to use Centric Swap</h4>
      <ol className="Guide__steps">
        <li>
          Install a Tron-enabled web wallet for your device. Centric Swap
          recommends{" "}
          <a
            href="https://www.tronlink.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TronLink Wallet
          </a>
          . Download it for your device.
          <br />
          <br />
          <Row gutter={[{ xs: 0, sm: 8, md: 16, lg: 16 }, 16]}>
            <Col xs={{ span: 0 }} sm={{ span: 8 }} md={{ span: 8 }}>
              <a
                href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card hoverable>
                  <Meta
                    className="Guide__meta"
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
                <Card hoverable style={{ width: "100%" }}>
                  <Meta
                    className="Guide__meta"
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
                <Card hoverable style={{ width: "100%" }}>
                  <Meta
                    className="Guide__meta"
                    title="Android"
                    description="Google Play Store"
                  />
                </Card>
              </a>
            </Col>
          </Row>
        </li>
        <li>
          Activate your wallet by sending it some TRX (Tron) to pay for Centric
          Swap transaction fees (we recommend a minimum of 1 TRX) for more
          information on this step,{" "}
          <a
            href="https://steemit.com/tronlink/@ano123/simple-tronlink-guide-what-is-it-how-to-install-and-more"
            target="_blank"
            rel="noopener noreferrer"
          >
            view this guide
          </a>
        </li>
        <li>
          Send the CNR or CNS you want to convert on Centric Swap from your
          existing wallet which holds your tokens to your new Tron Wallet
          address created in step 2.
        </li>
        <li>
          Open www.centricswap.com with your wallet installed and ensure you are
          logged in to your Tron-enabled web wallet
        </li>
        <li>Using Centric Swap, choose to convert CNR to CNS or CNS to CNR.</li>
        <li>Using Centric Swap, enter the amount to convert.</li>
        <li>Using Centric Swap, click "Swap" to start the conversion.</li>
        <li>
          You will be shown a dialog from your Tron Wallet, click “Approve” to
          confirm the transaction.
        </li>
        <li>Your conversion will now take place.</li>
      </ol>
    </Modal>
  );
};

export default Guide;
