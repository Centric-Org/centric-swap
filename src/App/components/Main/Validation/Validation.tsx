import React from "react";
import { ValidationStatus } from "../../../store/models";
import { Row, Col } from "antd";
import "./Validation.scss";

const Validation = ({ validation }) => {
  const { validationStatus, validationMessage } = validation;
  return (
    <Row justify="center" className="Validation container">
      <Col className="container__column">
        {validationStatus === ValidationStatus.FAILED ? (
          <p className="Validation__error">{validationMessage}</p>
        ) : null}
      </Col>
    </Row>
  );
};
export default Validation;
