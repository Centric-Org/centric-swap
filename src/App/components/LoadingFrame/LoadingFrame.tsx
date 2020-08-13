import React from "react";
import swapIcon from "../Images/swap_logo.svg";
import "./LoadingFrame.scss";

const LoadingFrame = () => {
  return (
    <div className="LoadingFrame">
      <img src={swapIcon} className="LoadingFrame__spinner" alt="" />
    </div>
  );
};

export default LoadingFrame;
