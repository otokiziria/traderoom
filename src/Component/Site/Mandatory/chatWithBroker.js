import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import SymbolPopup from "./Popup/symbolPopup";
import PositionPopup from "./Popup/positionPopup";
import OrderPopup from "./Popup/orderPopup";
import SymbolInfo from "./Popup/symbolInfo";
import { getShowSymbolPopupAction, getShowOrderPopupAction, getShowSymbolInfoAction, getShowPositionPopupAction } from "../../../Red";
import store from "../../../Red/store";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ChatWithBroker(props) {
  const { t } = useTranslation();

  let chatlib = useRef(null);

  useEffect(() => {
    console.log("chatwithbroker", props.chatWithBroker);
      // const script = document.createElement('script');
      // const script2 = document.createElement('script');
      // const link = document.createElement('link');

      // script.src = "https://tgutest.com/im_livechat/external_lib.js";
      // script.async = true;
      // script.type = "text/javascript";
      // link.href = "https://softkohi.com/im_livechat/external_lib.css";
      // link.rel = "stylesheet"

      // script2.src = "https://softkohi.com/im_livechat/loader/2";
      // script2.async = true;
      // script2.type = "text/javascript";

      // chatlib.current.innerHTML = "";
      // document.head.appendChild(script);
      // document.head.appendChild(script2);
      // document.head.appendChild(link);

      var ifrm = document.createElement("iframe");
      ifrm.setAttribute(
        "src",
        "https://tgutest.com/chat.html#domain=softkohi.com&linkid=2"
      );
      ifrm.style.width = "640px";
      ifrm.style.height = "480px";
      document.body.appendChild(ifrm);

      chatlib.current.innerHTML = "";
      chatlib.current.appendChild = ifrm;

    // return () => {
    // chatlib.current.removeChild(script);
    // chatlib.current.removeChild(script2);
    // chatlib.current.removeChild(link);
    // }
  }, [props.chatWithBroker]);

  return(
    <div>
    <div ref={chatlib}></div>
    </div>
  );

}
const mapStateToProps = (state) => {
    return {
      chatWithBroker:
        state.chatWithBroker.chatWithBroker,
    };
  };
  
  export default connect(mapStateToProps, null)(ChatWithBroker);