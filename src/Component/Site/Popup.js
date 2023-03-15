import React, { useState, useEffect, useRef } from "react";
//import { useTranslation } from "react-i18next";
import ChartIndex from "./Widgets/Chart/Index"

function PopupPage(props) {

  return (
    <div style={{ width: "100%", backgroundColor: "#000", height: "100vh" }}>
        <ChartIndex />
     </div>
  );
}


export default PopupPage;
