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

function Popup(props) {
  const { t } = useTranslation();
  const symbolPopupClose = (e) => {

    store.dispatch(getShowSymbolPopupAction(false));
  };

  const positionPopupClose = (e) => {

    store.dispatch(getShowPositionPopupAction(false));
  };

  const orderPopupClose = (e) => {

    store.dispatch(getShowOrderPopupAction(false));
  };

  const symbolInfoClose = () => {
    store.dispatch(getShowSymbolInfoAction(false));
  }

  console.log(props.activeSymbol.data, "oto test desc");


  if (props.showSymbolPopup) {
    return (
      <div>
        {/* popup */}

        <Modal show={props.showSymbolPopup} onHide={symbolPopupClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.activeSymbol.data.description !== null && props.activeSymbol.data.description !== undefined 
            ? props.activeSymbol.data.description : props.activeSymbol.data.path}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SymbolPopup />
          </Modal.Body>
        </Modal>
      </div>
    );

  } else if (props.showPositionPopup) {
    return (
      <div>
        {/* popup */}

        <Modal show={props.showPositionPopup} onHide={positionPopupClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {props.positionTableActiveSymbol.data.symbol}
               - 
              {props.positionTableActiveSymbol.data.position}
               - 
              {props.positionTableActiveSymbol.data.action == "POSITION_SELL"
                ? "SELL"
                : "BUY"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PositionPopup />
          </Modal.Body>
        </Modal>
      </div>
    );
  } else if (props.showOrderPopup) {
    return (
      <div>
        {/* popup */}

        <Modal show={props.showOrderPopup} onHide={orderPopupClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('Pending Order Change')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderPopup />
          </Modal.Body>
        </Modal>
      </div>
    );

  } else if (props.showSymbolInfo) {
    return (
      <div>
        {/* popup */}
        <Draggable
          handle=".handle"
          defaultPosition={{ x: 300, y: 30 }}
          position={null}
          grid={[25, 25]}
          scale={1}>
          <div>
            <i className="close-symbolinfo d-block text-right" onClick={symbolInfoClose}><FontAwesomeIcon icon={faTimes} /></i>
            <div className="handle">
              <SymbolInfo />
            </div>
          </div>
        </Draggable>
      </div>
    );
  } else {
    return <></>;
  }


}

const mapStateToProps = (state) => {
  return {
    showSymbolPopup: state.showSymbolPopup.showSymbolPopup,
    showSymbolInfo: state.showSymbolInfo.showSymbolInfo,
    showPositionPopup: state.showPositionPopup.showPositionPopup,
    showOrderPopup: state.showOrderPopup.showOrderPopup,
    activeSymbol: state.activeSymbol.activeSymbol,
    positionTableActiveSymbol:
      state.positionTableActiveSymbol.positionTableActiveSymbol,
  };
};

export default connect(mapStateToProps, null)(Popup);
