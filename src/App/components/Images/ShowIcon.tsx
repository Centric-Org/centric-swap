import React from "react";
import riseIcon from "./cnr_icon.png";
import cashIcon from "./cns_icon.png";
import tronIcon from "./trx_icon.png";
import centricLogo from "./centric_logo_white.svg";
import swapIcon from "./swap_icon.svg";
import swapLogo from "./swap_logo.svg";
import cnrText from "./cnr_text.svg";
import cnsText from "./cns_text.svg";
import summaryArrow from "./summary_arrow.svg";
import swapText from "./swap_text.svg";

const RiseIcon = () => (
  <img src={riseIcon} className="Icon Icon__tokenIcon" alt="" />
);

const CashIcon = () => (
  <img src={cashIcon} className="Icon Icon__tokenIcon" alt="" />
);

const TronIcon = () => (
  <img src={tronIcon} className="Icon Icon__tronIcon" alt="" />
);

const CentricLogo = () => (
  <img src={centricLogo} className="Icon Icon__centricLogo" alt="Centric" />
);

const SwapIcon = () => (
  <img src={swapIcon} className="Icon Icon__swapIcon" alt="Swap" />
);

const SwapLogo = () => (
  <img src={swapLogo} className="Icon Icon__swapLogo" alt="Centric Swap" />
);

const CnrText = () => (
  <img src={cnrText} className="Icon Icon__cnrText" alt="Centric Rise" />
);

const CnsText = () => (
  <img src={cnsText} className="Icon Icon__cnsText" alt="Centric Cash" />
);

const SummaryArrow = () => (
  <img src={summaryArrow} className="Icon Icon__summaryArrow" alt="" />
);

const SwapText = () => (
  <img src={swapText} className="Icon Icon__swapText" alt="Confirm Swap" />
);

const ShowIcon = ({ icon }) => {
  switch (icon) {
    case "cnr":
      return <RiseIcon />;
    case "cns":
      return <CashIcon />;
    case "tron":
      return <TronIcon />;
    case "swap":
      return <SwapIcon />;
    case "cnr_text":
      return <CnrText />;
    case "cns_text":
      return <CnsText />;
    case "logo_swap":
      return <SwapLogo />;
    case "logo_white":
      return <CentricLogo />;
    case "summary_arrow":
      return <SummaryArrow />;
    case "swap_text":
      return <SwapText />;
    default:
      return <img alt="" />;
  }
};

export default ShowIcon;
