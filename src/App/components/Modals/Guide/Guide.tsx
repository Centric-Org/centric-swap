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
        Centric Swap swiftly converts Centric tokens between Centric Rise{" "}
        <strong>(CNR)</strong> and Centric Cash <strong>(CNS)</strong>. It
        offers a decentralized alternative to the{" "}
        <a
          href="https://wallet.joincentic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Centric Wallet
        </a>
        .
      </p>
      <p>
        Before using Centric Swap to convert your Centric tokens please review
        the questions below; Is Centric Swap Right For Me?
      </p>
      <Divider />
      <h4>Is Centric Swap Right For Me?</h4>
      <ul className="Guide__checklist">
        <li>
          I hold Centric Rise <strong>(CNR)</strong> or Centric Cash{" "}
          <strong>(CNS)</strong> and want to convert between them?
        </li>
        <li>
          I prefer not to store my <strong>(CNR)</strong> or{" "}
          <strong>(CNS)</strong> on the{" "}
          <a
            href="https://wallet.joincentic.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Centric Wallet
          </a>
          ?
        </li>
        <li>
          I want to pay a small transaction fee, approx 0.25 - 0.5, in Tron{" "}
          <strong>(TRX)</strong>, to convert my tokens?
        </li>
        <li>
          I have Tron <strong>(TRX)</strong> to pay transaction fees or know how
          to buy <strong>(TRX)</strong> from exchanges?
        </li>
        <li>
          I rather use{" "}
          <a
            href="https://www.tronlink.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TronLink
          </a>{" "}
          or a similar Tron-enabled web wallet to store my tokens?
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
          Install a Tron-enabled web wallet. We recommend{" "}
          <a
            href="https://www.tronlink.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TronLink Wallet
          </a>
          .
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
          Activate your wallet by sending some Tron <strong>(TRX)</strong> to
          pay for Centric Swap transaction fees{" "}
          <strong>
            <i>(we recommend a minimum of 1 TRX)</i>
          </strong>{" "}
          for more information on this step, please{" "}
          <a
            href="https://steemit.com/tronlink/@ano123/simple-tronlink-guide-what-is-it-how-to-install-and-more"
            target="_blank"
            rel="noopener noreferrer"
          >
            view this guide
          </a>
          .
        </li>
        <li>
          Send <strong>CNR</strong> or <strong>CNS</strong> to your new Tron
          Wallet address created in <strong>step 2</strong>.
        </li>
        <li>
          Open{" "}
          <a
            href="https://www.centricswap.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.centricswap.com
          </a>{" "}
          ensuring you are logged in to your new Tron Wallet.
        </li>
        <li>
          Using Centric Swap, choose to convert <strong>CNR</strong> to{" "}
          <strong>CNS</strong> or <strong>CNS</strong> to <strong>CNR</strong>.
        </li>
        <li>Enter the amount to convert.</li>
        <li>Click "Swap" to start the conversion.</li>
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
