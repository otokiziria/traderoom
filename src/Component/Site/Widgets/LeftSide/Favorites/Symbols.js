import React, { useRef, useEffect, useState, createRef } from "react";

import { connect } from "react-redux";
import store from "../../../../../Red/store";
import {
  getActiveSymbolAction,
  getChartSymbolAction,
  getShowSymbolPopupAction,
} from "../../../../../Red/";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faInfoCircle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { getMin, getMax, getStep } from "../../../Helpers/Formulas";
import "../Loader.css";
function Symbols(props) {
  const { t } = useTranslation();
  let elementsRef = {};
  if(props.data !== null && props.data !== undefined){
    console.log('data = ',props.data);
    props.data.forEach((el) => {
      elementsRef["main_ask_" + el.symbol.trim().replace(".", "")] = createRef();
      elementsRef["main_bid_" + el.symbol.trim().replace(".", "")] = createRef();
      /*elementsRef[
        "button_ask_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef[
        "button_bid_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      */
      elementsRef["lot_value_" + el.symbol.trim().replace(".", "")] = createRef();
      elementsRef["sltp_" + el.symbol.trim().replace(".", "")] = createRef();
    });
  }
  
 // console.log(props.data, props.settings);
  if (props.data == null && props.settings == null) {
    return (
      <div className="leftSideLoader navLoader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>Loading...
        </div>
      </div>
    );
  } else {
    store.subscribe(() => {
      const _data = store.getState().ticks.ticks;

      if (
        _data !== null &&
        _data.symbol !== null &&
        _data.symbol !== undefined &&
        elementsRef["main_ask_" + _data.symbol.trim().replace(".", "")] !==
          undefined &&
        elementsRef["main_bid_" + _data.symbol.trim().replace(".", "")] !==
          undefined &&
        elementsRef["main_ask_" + _data.symbol.trim().replace(".", "")] !==
          null &&
        elementsRef["main_bid_" + _data.symbol.trim().replace(".", "")] !==
          null &&
        elementsRef["main_ask_" + _data.symbol.trim().replace(".", "")]
          .current !== null &&
        elementsRef["main_bid_" + _data.symbol.trim().replace(".", "")]
          .current !== null
      ) {
        /*console.log(
        elementsRef[_data.symbol.trim().replace(".", "")],
        _data.symbol.trim().replace(".", "")
      );
      */

        elementsRef[
          "main_ask_" + _data.symbol.trim().replace(".", "")
        ].current.innerHTML = _data.ask.toFixed(4);
        elementsRef[
          "main_bid_" + _data.symbol.trim().replace(".", "")
        ].current.innerHTML = _data.bid.toFixed(4);
      }
    });
    return props.data.map((el, k) => (
      <Card key={"symbols_key_" + el.id}>
        <Card.Header className="symbol_card_header">
          <Accordion.Toggle
            className="symbol_card_title"
            as={Button}
            variant="link"
            eventKey={"symbols_" + el.id}
          >
            <div className="row symbol_card_info">
              {props.settings.show_title == 1 && props.settings.title == 0 ? (
                <div className="col-3  px-0">{el.symbol}</div>
              ) : props.settings.show_title == 1 &&
                props.settings.title == 1 ? (
                <div className="col-3  px-0">{el.short_name}</div>
              ) : props.settings.show_title == 1 &&
                props.settings.title == 2 ? (
                <div className="col-3  px-0">{el.description}</div>
              ) : (
                <div className="col-3  px-0"></div>
              )}
              {props.settings.show_change == 1 ? (
                <div className="col-2  px-0">
                  {el.ask != 0 &&
                  el.ask !== null &&
                  el.day_ask != 0 &&
                  el.day_ask !== null
                    ? (
                        (parseFloat(el.ask) * 100) / parseFloat(el.day_ask) -
                        100
                      ).toFixed(2) + "%"
                    : "0.00" + "%"}
                </div>
              ) : (
                <div className="col-2  px-0"></div>
              )}

              <div
                className="col-2 d-flex align-items-center"
                ref={
                  elementsRef["main_ask_" + el.symbol.trim().replace(".", "")]
                }
              >
                {props.settings.show_price == 1 && el.ask !== null
                  ? parseFloat(el.ask).toFixed(4)
                  : "0.0000"}
              </div>

              <div
                className="col-2 d-flex align-items-center"
                ref={
                  elementsRef["main_bid_" + el.symbol.trim().replace(".", "")]
                }
              >
                {props.settings.show_price == 1 && el.bid !== null
                  ? parseFloat(el.bid).toFixed(4)
                  : "0.0000"}
              </div>

              {props.settings.show_chart == 1 ? (
                <div className="col-3 d-flex align-items-center">CHART</div>
              ) : (
                <div className="col-3 d-flex align-items-center"></div>
              )}
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"symbols_" + el.id}>
          <Card.Body className="symbol_card_body">
            <div className="row symbol_actions_toppanel">
              <div className="col-4 d-flex align-items-center">{el.symbol}</div>
              <div className="col-4 d-flex align-items-center">
                {el.spreadDiff}
              </div>
              <div className="col-4 d-flex align-items-center">
                <div className="col-3 d-flex align-items-center">
                  <i>
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={() => {
                        console.log("Favorites");
                      }}
                    />
                  </i>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <i>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      onClick={() => {
                        store.dispatch(getChartSymbolAction(el));
                      }}
                    />
                  </i>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <i>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      onClick={() => {
                        console.log("Tooltip");
                      }}
                    />
                  </i>
                </div>
              </div>
            </div>
            <div className="row symbol_actions">
              <div className="col-4 align-items-center sell">
                <button
                  value="Sell"
                  onClick={() => {
                    store.dispatch(
                      getActiveSymbolAction({
                        data: el,
                        lot:
                          elementsRef[
                            "lot_value_" + el.symbol.trim().replace(".", "")
                          ].current.value,
                        sltp:
                          elementsRef[
                            "sltp_" + el.symbol.trim().replace(".", "")
                          ].current.value,
                      })
                    );
                    store.dispatch(getShowSymbolPopupAction(true));
                  }}
                >
                  Sell
                </button>
              </div>
              <div className="col-4 align-items-center input">
                <input
                  type="number"
                  name="lot"
                  min={getMin(el.volumeMin)}
                  max={getMax(el.volumeMax)}
                  step={getStep(el.volumeStep)}
                  defaultValue={getMin(el.volumeMin)}
                  ref={
                    elementsRef[
                      "lot_value_" + el.symbol.trim().replace(".", "")
                    ]
                  }
                  onChange={(e) => {
                    if (
                      parseFloat(e.target.value) <
                      parseFloat(getMin(el.volumeMin))
                    ) {
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ].current.value = getMin(el.volumeMin);
                    } else if (
                      parseFloat(e.target.value) >
                      parseFloat(getMax(el.volumeMax))
                    ) {
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ].current.value = getMax(el.volumeMax);
                    } else if (e.target.value == "") {
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ].current.value = getMin(el.volumeMin);
                    } else {
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ].current.value = parseFloat(e.target.value);
                    }
                    //console.log('number = ', e.target.value);
                  }}
                />
              </div>
              <div className="col-4 align-items-center buy">
                <button
                  value="Buy"
                  onClick={() => {
                    store.dispatch(
                      getActiveSymbolAction({
                        data: el,
                        lot:
                          elementsRef[
                            "lot_value_" + el.symbol.trim().replace(".", "")
                          ].current.value,
                        sltp:
                          elementsRef[
                            "sltp_" + el.symbol.trim().replace(".", "")
                          ].current.value,
                      })
                    );
                    store.dispatch(getShowSymbolPopupAction(true));
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="row symbol_actions_bottompanel">
              <div className="col-9 d-flex align-items-center">
                {props.settings.show_low == 1 &&
                props.settings.show_high == 1 ? (
                  <div>
                    {el.low}-{el.high}{" "}
                    {parseFloat((el.low * 100) / el.high).toFixed(2)}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="col-3 d-flex align-items-center">
                <div>SL/TP</div>
                <div className="d-flex align-items-center ml-1">
                  <label className="switch">
                    <input
                      type="checkbox"
                      ref={
                        elementsRef["sltp_" + el.symbol.trim().replace(".", "")]
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ));
  }
}

const mapStateToProps = (state) => {
  return {
    showSymbolPopup: state.showSymbolPopup.showSymbolPopup,
  };
};

export default connect(mapStateToProps, null)(Symbols);
