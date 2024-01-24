import React from "react";
import { Timeline } from "react-ts-tradingview-widgets";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Widget = () => {
  return (
    <div className="widget_Container">

      <h1 className="title">
        <a href="./" id="titleLink">
          EquityAdvice
        </a>
      </h1>
      <Timeline
        colorTheme="light"
        feedMode="market"
        market="stock"
        height={400}
        width="100%"
        displayMode="compact"
      ></Timeline>

      <Link to="/pred" className="prediction_btn">
        Get stock prediction
      </Link>
    </div>
  );
};

export default Widget;
