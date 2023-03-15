import React, { useRef, useEffect, useState, createRef } from "react";

import { connect } from "react-redux";
import store from "../../../../../Red/store";
import {
  getActiveSymbolAction,
  getChartSymbolAction,
  getShowSymbolPopupAction,
  getShowSymbolInfoAction,
  getInfoSymbolAction,
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
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  getSpread,
  getMin,
  getMax,
  getStep,
  percentOf,
  calculateLotForMt5,
  calculateMargin,
  isTradingSessionOk,
  isImpleTrade,
  simpleTradeValue,
} from "../../../Helpers/Formulas";
import { saveToFavorites } from "../../../../../Services/Symbols/symbols";
import { requestCommand } from "../../../../../Services/Commands/commands";
import { showAlertMSG } from "../../../../../Lib/helpers";

function Symbols(props) {
  const { t } = useTranslation();
  let elementsRef = {};
  props.data.forEach((el) => {
    if (el.symbol !== null && el.symbol !== undefined) {
      elementsRef[
        "main_ask_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef[
        "main_bid_" + el.symbol.trim().replace(".", "")
      ] = createRef();

      elementsRef[
        "button_ask_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef[
        "button_bid_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef[
        "spread_div_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef[
        "lot_value_" + el.symbol.trim().replace(".", "")
      ] = createRef();
      elementsRef["sltp_" + el.symbol.trim().replace(".", "")] = createRef();
    }

    /*elementsRef[
      "button_ask_" + el.symbol.trim().replace(".", "")
    ] = createRef();
    elementsRef[
      "button_bid_" + el.symbol.trim().replace(".", "")
    ] = createRef();
    */
    //elementsRef["favorites_icon_" + el.symbol.trim().replace(".", "")] = createRef();
  });

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
      ].current.innerHTML = _data.ask;
      elementsRef[
        "main_bid_" + _data.symbol.trim().replace(".", "")
      ].current.innerHTML = _data.bid;
    }

    if (
      _data !== null &&
      _data.symbol !== null &&
      _data.symbol !== undefined &&
      elementsRef["button_ask_" + _data.symbol.trim().replace(".", "")] !==
        undefined &&
      elementsRef["button_bid_" + _data.symbol.trim().replace(".", "")] !==
        undefined &&
      elementsRef["button_ask_" + _data.symbol.trim().replace(".", "")] !==
        null &&
      elementsRef["button_bid_" + _data.symbol.trim().replace(".", "")] !==
        null &&
      elementsRef["button_ask_" + _data.symbol.trim().replace(".", "")]
        .current !== null &&
      elementsRef["button_bid_" + _data.symbol.trim().replace(".", "")]
        .current !== null
    ) {
      /*console.log(
      elementsRef[_data.symbol.trim().replace(".", "")],
      _data.symbol.trim().replace(".", "")
    );
    */

      elementsRef[
        "button_ask_" + _data.symbol.trim().replace(".", "")
      ].current.innerHTML = _data.ask;
      elementsRef[
        "button_bid_" + _data.symbol.trim().replace(".", "")
      ].current.innerHTML = _data.bid;
    }
    if (
      _data !== null &&
      _data.symbol !== null &&
      _data.symbol !== undefined &&
      elementsRef["spread_div_" + _data.symbol.trim().replace(".", "")] !==
        undefined &&
      elementsRef["spread_div_" + _data.symbol.trim().replace(".", "")] !== null
    ) {
      /*console.log(
    elementsRef[_data.symbol.trim().replace(".", "")],
    _data.symbol.trim().replace(".", "")
  );
  */
      /*
      let res = 0;
      let digit = elementsRef[
        "spread_div_" + _data.symbol.trim().replace(".", "")
      ].current.getAttribute("digit");
      var precision = (_data.ask + "").split(".")[1];
      if(digit == undefined || digit == null){
        
        if (precision !== null && precision !== undefined) {
          var p = precision.length;
          let d = Math.abs(parseFloat(_data.ask) - parseFloat(_data.bid)).toFixed(
            p
          );
          
          let dd = (d + "").split(".");
          let m = 1;
          if (dd[1] !== undefined && dd[1] !== null && dd[1].length > 0) {
            m = Math.pow(10, dd[1].length);
          }
          console.log(d, m);
          res = d * m;
        }
        else{
          res = Math.abs(parseFloat(_data.ask) - parseFloat(_data.bid));
        }
      }
      else{
        if (precision !== null && precision !== undefined) {
          res = Math.abs(parseFloat(_data.ask - _data.bid)).toFixed(digit) * Math.pow(10, digit);
        }
        else{
          res = Math.abs(parseFloat(_data.ask - _data.bid))
        }
        
      }

      elementsRef[
        "spread_div_" + _data.symbol.trim().replace(".", "")
      ].current.innerHTML = res;
      */
    }
  });

  //ticks.ticks

  useEffect(() => {
    if (props.data !== null && props.simpleTrade !== null) {
      //console.log('props.data', props.data);
      props.data.map((el, k) => {
        let input =
          elementsRef["lot_value_" + el.symbol.trim().replace(".", "")].current;
        //console.log('input ', input);
        if (input !== null) {
          //console.log('props.simpleTrade ', props.simpleTrade);
          if (props.simpleTrade == 2) {
            // console.log('simpleTradeValue ', simpleTradeValue(props.totalFigureData.MarginFree, props.simpleTradePercent, el.category, el.contractSize, el.margin_value, getMin(el.volumeMin), getMax(el.volumeMax), getStep(el.volumeStep), el.ask, el.USD, store.getState().customerAuth.customerAuth.user.user.currency));
            input.value = simpleTradeValue(
              props.totalFigureData.MarginFree,
              props.simpleTradePercent,
              el.category,
              el.contractSize,
              el.margin_value,
              getMin(el.volumeMin),
              getMax(el.volumeMax),
              getStep(el.volumeStep),
              el.ask,
              el.USD,
              store.getState().customerAuth.customerAuth.user.user.currency,
              store.getState().currency.currency
            );
            input.readOnly = true;
          } else {
            input.value = getMin(el.volumeMin);
            input.readOnly = false;
          }
        }
      });
    }
  }, [props.simpleTrade, props.simpleTradePercent]);

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
    return props.data.map((el, k) =>
      el.symbol !== undefined ? (
        <Card key={"symbols_key_" + el.id}>
          <Card.Header className="symbol_card_header">
            <FontAwesomeIcon icon={faChevronDown} />
            <Accordion.Toggle
              className="symbol_card_title"
              as={Button}
              variant="link"
              eventKey={"symbols_" + el.id}
            >
              <div className="row symbol_card_info justify-content-around">
                {props.settings.show_title == 1 && props.settings.title == 0 ? (
                  <div className="col-3  px-0">{el.symbol}</div>
                ) : props.settings.show_title == 1 &&
                  props.settings.title == 1 ? (
                  <div className="col-3  px-0">{el.short_name}</div>
                ) : props.settings.show_title == 1 &&
                  props.settings.title == 2 ? (
                  <div className="col-3  px-0">{el.description}</div>
                ) : (
                  " "
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
                  " "
                )}

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

                {props.settings.show_chart == 1 ? (
                  <div className="col-3 d-flex align-items-center">CHART</div>
                ) : (
                  " "
                )}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={"symbols_" + el.id}>
            <Card.Body className="symbol_card_body">
              <div className="row symbol_actions_toppanel">
                <div className="col-4 d-flex align-items-center">
                  {el.symbol}
                </div>
                <div
                  className="col-4 d-flex align-items-center"
                  ref={
                    elementsRef[
                      "spread_div_" + el.symbol.trim().replace(".", "")
                    ]
                  }
                  digit={el.digits}
                >
                  {el.spreadDiff}
                </div>
                <div className="col-4 d-flex align-items-center">
                  <div className="col-3 d-flex align-items-center">
                    <i>
                      <FontAwesomeIcon
                        icon={faStar}
                        ref={
                          elementsRef[
                            "favorites_icon_" +
                              el.symbol.trim().replace(".", "")
                          ]
                        }
                        style={{
                          color:
                            props.favoriteSymbols !== null &&
                            props.favoriteSymbols.length > 0 &&
                            props.favoriteSymbols.includes(el.symbol)
                              ? "#FFFF00"
                              : "#808080",
                        }}
                        onClick={() => {
                          let user = store.getState().customerAuth.customerAuth
                            .user.user;
                          let id = user.ID;
                         // console.log("user = ", user);
                          if (user.email !== undefined) {
                            id = user.email;
                          }
                          let inserted =
                            props.favoriteSymbols !== null &&
                            props.favoriteSymbols.length > 0 &&
                            props.favoriteSymbols.includes(el.symbol)
                              ? 0
                              : 1;
                          saveToFavorites(id, el.symbol, inserted);
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
                          store.dispatch(getInfoSymbolAction(el));
                          store.dispatch(getShowSymbolInfoAction(true));
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
                     
                      if (
                        store.getState().oneClickTrading.oneClickTrading == 1
                      ) {
                        if (isTradingSessionOk(el.session_data) == false) {
                          showAlertMSG("Market is closed", 3);
                          return false;
                        }
                        let marg = calculateMargin(
                          elementsRef[
                            "lot_value_" + el.symbol.trim().replace(".", "")
                          ],
                          el.contractSize,
                          el.margin_value,
                          elementsRef[
                            "main_bid_" + el.symbol.trim().replace(".", "")
                          ].current.innerHTML,
                          el.USD
                        );
                        if (
                          store.getState().totalFigureData.totalFigureData
                            .MarginFree !== null &&
                          store.getState().totalFigureData.totalFigureData
                            .MarginFree < marg
                        ) {
                          showAlertMSG("Not enough funds", 3);
                          return false;
                        }

                        let data = {
                          command: "openPosition",
                          data: {
                            main_name: store.getState().settings.settings
                              .mt5_main_name,
                            name: store.getState().customerAuth.customerAuth
                              .user.user.ID,
                            symbol: el.symbol,
                            volume: calculateLotForMt5(
                              elementsRef[
                                "lot_value_" + el.symbol.trim().replace(".", "")
                              ].current.value
                            ),
                            c_type: "OP_SELL",
                            PriceSL: 0,
                            PriceTP: 0,
                            simpleTrade: 0,
                          },
                        };
                        //console.log(props.customerAuth);
                        requestCommand(data);
                      } else {
                        store.dispatch(
                          getActiveSymbolAction({
                            data: el,
                            lot:
                              elementsRef[
                                "lot_value_" + el.symbol.trim().replace(".", "")
                              ].current.value,
                            ask:
                              elementsRef[
                                "main_ask_" + el.symbol.trim().replace(".", "")
                              ].current.innerHTML,
                            bid:
                              elementsRef[
                                "main_bid_" + el.symbol.trim().replace(".", "")
                              ].current.innerHTML,
                            sltp:
                              elementsRef[
                                "sltp_" + el.symbol.trim().replace(".", "")
                              ].current.checked,
                            isAsk: false,
                          })
                        );
                        store.dispatch(getShowSymbolPopupAction(true));
                      }
                    }}
                  >
                    {t("Sell")}
                    <div
                      className="symbol-action-number d-inline-flex align-items-center"
                      ref={
                        elementsRef[
                          "button_bid_" + el.symbol.trim().replace(".", "")
                        ]
                      }
                    >
                      {props.settings.show_price == 1 && el.bid !== null
                        ? parseFloat(el.bid)
                        : "0.0000"}
                    </div>
                  </button>
                </div>
                <div className="col-4 align-items-center input">
                  <input
                    type="number"
                    name="lot"
                    min={getMin(el.volumeMin)}
                    max={getMax(el.volumeMax)}
                    step={getStep(el.volumeStep)}
                    readOnly={
                      isImpleTrade(
                        props.simpleTrade,
                        props.simpleTradePercent,
                        props.totalFigureData
                      )
                        ? true
                        : false
                    }
                    ref={
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ]
                    }
                    defaultValue={
                      isImpleTrade(
                        props.simpleTrade,
                        props.simpleTradePercent,
                        props.totalFigureData
                      )
                        ? simpleTradeValue(
                            props.totalFigureData.MarginFree,
                            props.simpleTradePercent,
                            el.category,
                            el.contractSize,
                            el.margin_value,
                            getMin(el.volumeMin),
                            getMax(el.volumeMax),
                            getStep(el.volumeStep),
                            el.ask,
                            el.USD,
                            store.getState().customerAuth.customerAuth.user.user
                              .currency,
                              store.getState().currency.currency
                          )
                        : getMin(el.volumeMin)
                    }
                    ref={
                      elementsRef[
                        "lot_value_" + el.symbol.trim().replace(".", "")
                      ]
                    }
                    onBlur={(e) => {
                      let d = (getStep(el.volumeStep) + "").split(".");
                      let length = d[1] !== undefined ? d[1].length : 0;
                      if (length != 0) {
                        e.target.value = parseFloat(e.target.value).toFixed(
                          length
                        );
                      }
                      if (
                        parseFloat(e.target.value) <
                        parseFloat(getMin(el.volumeMin))
                      ) {
                        elementsRef[
                          "lot_value_" + el.symbol.trim().replace(".", "")
                        ].current.value = getMin(el.volumeMin);
                      }
                    }}
                    onChange={(e) => {
                      if (
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
                      if (
                        store.getState().oneClickTrading.oneClickTrading == 1
                      ) {
                        if (isTradingSessionOk(el.session_data) == false) {
                          showAlertMSG("Market is closed", 3);
                          return false;
                        }
                        let marg = calculateMargin(
                          elementsRef[
                            "lot_value_" + el.symbol.trim().replace(".", "")
                          ],
                          el.contractSize,
                          el.margin_value,
                          elementsRef[
                            "main_ask_" + el.symbol.trim().replace(".", "")
                          ].current.innerHTML,
                          el.USD
                        );
                        if (
                          store.getState().totalFigureData.totalFigureData
                            .MarginFree !== null &&
                          store.getState().totalFigureData.totalFigureData
                            .MarginFree < marg
                        ) {
                          showAlertMSG("Not enough funds", 3);
                          return false;
                        }
                        let data = {
                          command: "openPosition",
                          data: {
                            main_name: store.getState().settings.settings
                              .mt5_main_name,
                            name: store.getState().customerAuth.customerAuth
                              .user.user.ID,
                            symbol: el.symbol,
                            volume: calculateLotForMt5(
                              elementsRef[
                                "lot_value_" + el.symbol.trim().replace(".", "")
                              ].current.value
                            ),
                            c_type: "OP_BUY",
                            PriceSL: 0,
                            PriceTP: 0,
                            simpleTrade: 0,
                          },
                        };
                        //console.log(props.customerAuth);
                        requestCommand(data);
                      } else {
                        store.dispatch(
                          getActiveSymbolAction({
                            data: el,
                            lot:
                              elementsRef[
                                "lot_value_" + el.symbol.trim().replace(".", "")
                              ].current.value,
                            ask:
                              elementsRef[
                                "main_ask_" + el.symbol.trim().replace(".", "")
                              ].current.innerHTML,
                            bid:
                              elementsRef[
                                "main_bid_" + el.symbol.trim().replace(".", "")
                              ].current.innerHTML,
                            sltp:
                              elementsRef[
                                "sltp_" + el.symbol.trim().replace(".", "")
                              ].current.checked,
                            isAsk: true,
                          })
                        );
                        store.dispatch(getShowSymbolPopupAction(true));
                      }
                    }}
                  >
                    {t("Buy")}
                    <div
                      className="symbol-action-number d-inline-flex align-items-center"
                      ref={
                        elementsRef[
                          "button_ask_" + el.symbol.trim().replace(".", "")
                        ]
                      }
                    >
                      {props.settings.show_price == 1 && el.ask !== null
                        ? parseFloat(el.ask)
                        : "0.0000"}
                    </div>
                  </button>
                </div>
              </div>
              <div className="row symbol_actions_bottompanel">
                <div className="col-8 d-flex row align-items-center">
                  {props.settings.show_low == 1 &&
                  props.settings.show_high == 1 &&
                  props.settings.show_24hour == 1 ? (
                    <>
                      <div className="ml-3">{el.low}</div>
                      <div className="col-6">
                        <div
                          style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: "#c3c5ca",
                          }}
                        >
                          <div
                            style={{
                              width:
                                parseFloat(
                                  percentOf(el.high - el.ask, el.high - el.low)
                                ) + "%",
                              height: "5px",
                              backgroundColor: "#3d61cc",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="">{el.high}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-2 d-flex align-items-center">
                  {props.settings.show_24hour == 1 ? (
                    <div>
                      {el.ask != 0 &&
                      el.ask !== null &&
                      el.day_ask != 0 &&
                      el.day_ask !== null
                        ? (
                            (parseFloat(el.ask) * 100) /
                              parseFloat(el.day_ask) -
                            100
                          ).toFixed(2) + "%"
                        : "0.00" + "%"}
                      {/*parseFloat(percentOf(el.low, el.high))*/}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-2 d-flex align-items-center">
                  <div>
                    {t("SL")}/{t("TP")}
                  </div>
                  <div className="d-flex align-items-center ml-1">
                    <label className="switch">
                      <input
                        type="checkbox"
                        ref={
                          elementsRef[
                            "sltp_" + el.symbol.trim().replace(".", "")
                          ]
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
      ) : (
        <></>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSymbolPopup: state.showSymbolPopup.showSymbolPopup,
    showSymbolInfo: state.showSymbolInfo.showSymbolInfo,
    favoriteSymbols: state.favoriteSymbols.favoriteSymbols,
    simpleTrade: state.simpleTrade.simpleTrade,
    simpleTradePercent: state.simpleTradePercent.simpleTradePercent,
    totalFigureData: state.totalFigureData.totalFigureData,
  };
};

export default connect(mapStateToProps, null)(Symbols);
