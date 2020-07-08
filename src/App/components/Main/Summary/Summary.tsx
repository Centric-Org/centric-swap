import React from "react";
import { ShowIcon } from "../../";
import { Row, Col } from "antd";
import "./Summary.scss";

const Summary = ({ displayAmount, displayValue, fromCurrency, toCurrency }) => {
  return (
    <div className="Summary">
      <div className="container__column">
        <Row
          gutter={[{ xs: 0, sm: 0, md: 16, lg: 32 }, 0]}
          className="Summary__inner"
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            className="Main__column Summary__left"
          >
            <div className="Summary__item">
              <div className="Summary__item__label">You are swapping</div>
              <div className="Summary__item__value">
                {displayAmount} {fromCurrency}
              </div>
            </div>
            <div className="Summary__item__icon">
              <ShowIcon icon={fromCurrency} />
            </div>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 2 }}
            lg={{ span: 2 }}
            className={
              displayAmount > 0 ? "Summary__icon blink" : "Summary__icon"
            }
          >
            <ShowIcon icon={"summary_arrow"} />
            <ShowIcon icon={"summary_arrow"} />
            <ShowIcon icon={"summary_arrow"} />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            className="Main__column Summary__right"
          >
            <div className="Summary__item__icon">
              <ShowIcon icon={toCurrency} />
            </div>
            <div className="Summary__item">
              <div className="Summary__item__label">You will receive</div>
              <div className="Summary__item__value">
                {displayValue} {toCurrency}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Summary;
