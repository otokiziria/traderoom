import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getMin,
  getMax,
  getStep,
  calculateMargin,
  calculatePointValue,
  calculateLotForMt5,
  getDigitStep,
  isTradingSessionOk,
  isImpleTrade,
  simpleTradeValue,
} from "../../Helpers/Formulas";
import store from "../../../../Red/store";
import {
  getActiveSymbolAction,
  getPositionSlTpAction,
  getOrderSlTpAction,
  getShowSymbolPopupAction,
} from "../../../../Red/";
import { faSortDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import { requestCommand } from "../../../../Services/Commands/commands";
import PositionSlTp from "./symbolPopup/PositionSlTp";
import OrderSlTp from "./symbolPopup/OrderSlTp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showAlertMSG } from "../../../../Lib/helpers";

let subscrStore = "";

function SymbolPopup(props) {
  const { t } = useTranslation();
  const [sltpInput, setsltpInput] = useState(false);
  const [sltpInputContent, setsltpInputContent] = useState(false);

  const [ordersltpInput, setordersltpInput] = useState(false);
  const [ordersltpInputContent, setordersltpInputContent] = useState(false);

  const [showDatePicker, setshowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [orderPrice, setorderPrice] = useState(0);
  const [expiry, setexpiry] = useState(1);

  const [margin, setmargin] = useState(0);
  const [pointValue, setpointValue] = useState(0);

  const [ordMargin, setordMargin] = useState(0);
  const [ordPointValue, setordPointValue] = useState(0);

  const [pos_lot, setpos_lot] = useState(0);
  const [ord_lot, setord_lot] = useState(0);

  const [isAsk, setisAsk] = useState(null);

  const button_ord_bid = useRef();
  const button_ord_ask = useRef();
  const button_bid = useRef();
  const button_ask = useRef();
  const spreadDiff_ord_ref = useRef();
  const spreadDiff_ref = useRef();

  const handleChangeordersltp = () => {
    setordersltpInput(!ordersltpInput);
  };

  const handleChangesltp = () => {
    setsltpInput(!sltpInput);
  };

  const calculateLocalPointValue = (data, lot = 0) => {
    if (data.data !== undefined) {
      let cur = "USD";
      if (
        props.customerAuth.user.user.currency !== undefined &&
        props.customerAuth.user.user.currency !== null
      ) {
        cur = props.customerAuth.user.user.currency;
      }
      setpointValue(
        calculatePointValue(
          lot > 0 ? lot : data.lot,
          data.data.contractSize,
          data.data.point,
          data.data.USD,
          data.data[cur]
        )
      );
    }
  };
  const calculateLocalMargin = (data, lot = 0) => {
    if (data.data !== undefined) {
      setmargin(
        calculateMargin(
          lot > 0 ? lot : data.lot,
          data.data.contractSize,
          data.data.margin_value,
          data.isAsk ? data.ask : data.bid,
          data.data.USD
        )
      );
    }
  };

  const calculateOrdLocalPointValue = (data, lot = 0) => {
    if (data.data !== undefined) {
      setordPointValue(
        calculatePointValue(
          lot > 0 ? lot : data.lot,
          data.data.contractSize,
          data.data.point,
          data.data.USD,
          data.data.USD
        )
      );
    }
  };
  const calculateOrdLocalMargin = (data, lot = 0) => {
    if (data.data !== undefined) {
      setordMargin(
        calculateMargin(
          lot > 0 ? lot : data.lot,
          data.data.contractSize,
          data.data.margin_value,
          data.isAsk ? data.ask : data.bid,
          data.data.USD
        )
      );
    }
  };

  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };

  useEffect(() => {
    if (sltpInput) {
      setsltpInputContent(true);
    } else {
      setsltpInputContent(false);
    }
  }, [sltpInput]);

  useEffect(() => {
    if (ordersltpInput) {
      setordersltpInputContent(true);
    } else {
      setordersltpInputContent(false);
    }
  }, [ordersltpInput]);

  useEffect(() => {
    if (props.activeSymbol !== null) {
      if (props.activeSymbol.sltp) {
        setsltpInput(true);
        setordersltpInput(true);
      }

      if (
        isImpleTrade(
          props.simpleTrade,
          props.simpleTradePercent,
          props.totalFigureData
        )
      ) {
        //console.log('props.activeSymbol = ',store.getState().currency);
        setpos_lot(
          simpleTradeValue(
            props.totalFigureData.MarginFree,
            props.simpleTradePercent,
            props.activeSymbol.data.category,
            props.activeSymbol.data.contractSize,
            props.activeSymbol.data.margin_value,
            getMin(props.activeSymbol.data.volumeMin),
            getMax(props.activeSymbol.data.volumeMax),
            getStep(props.activeSymbol.data.volumeStep),
            props.activeSymbol.data.ask,
            props.activeSymbol.data.USD,
            store.getState().customerAuth.customerAuth.user.user.currency,
            store.getState().currency.currency
          )
        );
        setord_lot(
          simpleTradeValue(
            props.totalFigureData.MarginFree,
            props.simpleTradePercent,
            props.activeSymbol.data.category,
            props.activeSymbol.data.contractSize,
            props.activeSymbol.data.margin_value,
            getMin(props.activeSymbol.data.volumeMin),
            getMax(props.activeSymbol.data.volumeMax),
            getStep(props.activeSymbol.data.volumeStep),
            props.activeSymbol.data.ask,
            props.activeSymbol.data.USD,
            store.getState().customerAuth.customerAuth.user.user.currency,
            store.getState().currency.currency
          )
        );
      } else {
        setpos_lot(props.activeSymbol.lot);
        setord_lot(props.activeSymbol.lot);
      }

      calculateLocalMargin(props.activeSymbol);
      calculateLocalPointValue(props.activeSymbol);
      calculateOrdLocalMargin(props.activeSymbol);
      calculateOrdLocalPointValue(props.activeSymbol);
      setisAsk(props.activeSymbol.isAsk);
    }
  }, [
    props.activeSymbol,
    props.simpleTrade,
    props.simpleTradePercent,
    props.totalFigureData,
  ]);

  useEffect(() => {
    store.dispatch(
      getPositionSlTpAction({
        sl: 0,
        tp: 0,
      })
    );
    store.dispatch(
      getOrderSlTpAction({
        sl: 0,
        tp: 0,
      })
    );

    subscrStore = store.subscribe(() => {
      const _data = store.getState().ticks.ticks;

      if (
        _data !== null &&
        _data.symbol !== null &&
        _data.symbol !== undefined &&
        props.activeSymbol.data !== undefined &&
        props.activeSymbol.data !== null &&
        props.activeSymbol.data.symbol !== undefined &&
        props.activeSymbol.data.symbol !== null &&
        props.activeSymbol.data.symbol == _data.symbol
      ) {
        /*console.log(
          elementsRef[_data.symbol.trim().replace(".", "")],
          _data.symbol.trim().replace(".", "")
        );
        */
        let fixed = 4;
        if (
          props.activeSymbol.data.digits !== undefined &&
          props.activeSymbol.data.digits !== null
        ) {
          fixed = props.activeSymbol.data.digits;
        }

        spreadDiff_ord_ref.current.innerHTML =
          Math.abs(parseFloat(_data.bid - _data.ask)).toFixed(fixed) *
          Math.pow(10, fixed);
        spreadDiff_ref.current.innerHTML = parseInt(
          Math.abs(parseFloat(_data.bid - _data.ask)).toFixed(fixed) *
            Math.pow(10, fixed)
        );
        button_ask.current.innerHTML = _data.ask.toFixed(fixed);
        button_bid.current.innerHTML = _data.bid.toFixed(fixed);
        button_ord_ask.current.innerHTML = _data.ask.toFixed(fixed);
        button_ord_bid.current.innerHTML = _data.bid.toFixed(fixed);
      }
    });
    return () => {
      subscrStore();
    };
  }, []);

  if (props.activeSymbol !== null) {
    return (
      <div>
        {/* popup */}
        <Tabs defaultActiveKey="marketEx" id="uncontrolled-tab-example">
          <Tab eventKey="marketEx" title={t("Market Execution")}>
            <div className="sell-buy d-flex justify-content-between mt-5">
              <div className="col-md-5">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    let prd = props.activeSymbol;
                    if (prd.isAsk) {
                      prd.isAsk = false;
                      setisAsk(false);
                      store.dispatch(getActiveSymbolAction(prd));
                      //console.log(prd);
                    }
                    //console.log(props.activeSymbol);
                  }}
                >
                  <div className="d-flex sell-btn justify-content-between">
                    <div>{t("Sell")}</div>
                    <div>
                      {!isAsk ? (
                        <FontAwesomeIcon
                          style={{ color: "blue" }}
                          icon={faCheck}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="text-right" ref={button_bid}>
                    {props.activeSymbol.bid}
                  </div>
                </button>
              </div>
              <div className="col-md-2">
                <div
                  className="sell-buy-number text-center"
                  ref={spreadDiff_ref}
                >
                  {parseInt(
                    (props.activeSymbol.ask - props.activeSymbol.bid).toFixed(
                      props.activeSymbol.data.digits
                    ) * Math.pow(10, props.activeSymbol.data.digits)
                  )}
                  {/* { props.activeSymbol.data.spreadDiff } */}
                </div>
              </div>
              <div className="col-md-5">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    let prd = props.activeSymbol;
                    if (!prd.isAsk) {
                      prd.isAsk = true;
                      setisAsk(true);
                      store.dispatch(getActiveSymbolAction(prd));
                      //console.log(prd);
                    }
                    //console.log(props.activeSymbol);
                  }}
                >
                  <div className="d-flex buy-btn justify-content-between">
                    <div>
                      {isAsk ? (
                        <FontAwesomeIcon
                          style={{ color: "blue" }}
                          icon={faCheck}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div>{t("Buy")}</div>
                  </div>
                  <div className="text-left" ref={button_ask}>
                    {props.activeSymbol.ask}
                  </div>
                </button>
              </div>
            </div>

            <div className="sell-buy-maininput d-flex justify-content-between mt-4">
              <div className="sell-buy-input-lefttext col-md-3 text-right">
                <div>{t("Size")}</div>
                <div>
                  <span>
                    {t("min")} {getMin(props.activeSymbol.data.volumeMin)}
                  </span>
                </div>
              </div>
              <div className="sell-buy-input col-md-6">
                <input
                  type="number"
                  className="form-control"
                  step={getStep(props.activeSymbol.data.volumeStep)}
                  value={pos_lot}
                  readOnly={
                    isImpleTrade(
                      props.simpleTrade,
                      props.simpleTradePercent,
                      props.totalFigureData
                    )
                      ? true
                      : false
                  }
                  min={getMin(props.activeSymbol.data.volumeMin)}
                  max={getMax(props.activeSymbol.data.volumeMax)}
                  onBlur={(e) => {
                    let d = (
                      getStep(props.activeSymbol.data.volumeStep) + ""
                    ).split(".");
                    let length = d[1] !== undefined ? d[1].length : 0;
                    if (length != 0) {
                      e.target.value = parseFloat(e.target.value).toFixed(
                        length
                      );
                    }
                    if (
                      e.target.value < getMin(props.activeSymbol.data.volumeMin)
                    ) {
                      setpos_lot(getMin(props.activeSymbol.data.volumeMin));
                      calculateLocalMargin(
                        props.activeSymbol,
                        getMin(props.activeSymbol.data.volumeMin)
                      );
                      calculateLocalPointValue(
                        props.activeSymbol,
                        getMin(props.activeSymbol.data.volumeMin)
                      );
                    } else {
                      calculateLocalMargin(props.activeSymbol, e.target.value);
                      calculateLocalPointValue(
                        props.activeSymbol,
                        e.target.value
                      );
                    }
                    setpos_lot(e.target.value);
                  }}
                  onChange={(e) => {
                    if (
                      e.target.value > getMax(props.activeSymbol.data.volumeMax)
                    ) {
                      setpos_lot(getMax(props.activeSymbol.data.volumeMax));
                      calculateLocalMargin(
                        props.activeSymbol,
                        getMax(props.activeSymbol.data.volumeMax)
                      );
                      calculateLocalPointValue(
                        props.activeSymbol,
                        getMax(props.activeSymbol.data.volumeMax)
                      );
                      return false;
                    }
                    if (
                      e.target.value >=
                      getMin(props.activeSymbol.data.volumeMin)
                    ) {
                      setpos_lot(e.target.value);
                      calculateLocalMargin(props.activeSymbol, e.target.value);
                      calculateLocalPointValue(
                        props.activeSymbol,
                        e.target.value
                      );
                    } else {
                      setpos_lot(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="sell-buy-input-righttext col-md-3 text-left">
                <div>{t("Contracts")}</div>
                <div>
                  <span>
                    {t("max")}. {getMax(props.activeSymbol.data.volumeMax)}
                  </span>
                </div>
              </div>
            </div>

            <div className="sell-buy-info d-flex justify-content-between mt-4">
              <div className="sell-buy-info-lefttext col-md-6">
                <span>1 {t("Point")} =</span>{" "}
                <span>
                  {t("USD")} {pointValue}
                </span>
              </div>
              <div className="sell-buy-info-righttext col-md-6 text-right">
                <span>{t("Margin")}</span>{" "}
                <span>
                  {t("USD")} {margin}
                </span>
              </div>
            </div>

            <div className="sell-buy-sltp mr-auto ml-auto mt-4 text-center form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
                onChange={handleChangesltp}
                checked={sltpInput}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                {t("Stop Loss")} / {t("Take Profit")}
              </label>
            </div>
            {sltpInputContent ? (
              <PositionSlTp
                pointValue={pointValue}
                activeSymbol={props.activeSymbol}
              />
            ) : (
              ""
            )}

            <div className="mr-auto ml-auto mt-4 text-center form-check">
              <button
                className="btn-primary btn"
                onClick={(e) => {
                  let d = isTradingSessionOk(
                    props.activeSymbol.data.session_data
                  );
                  if (d == false) {
                    showAlertMSG("Market is closed", 3);
                    return false;
                  }

                  if (
                    store.getState().totalFigureData.totalFigureData
                      .MarginFree !== null &&
                    store.getState().totalFigureData.totalFigureData
                      .MarginFree < margin
                  ) {
                    showAlertMSG("Not enough funds", 3);
                    return false;
                  }
                  let data = {
                    command: "openPosition",
                    data: {
                      main_name: props.settings.mt5_main_name,
                      name: props.customerAuth.user.user.ID,
                      symbol: props.activeSymbol.data.symbol,
                      volume: calculateLotForMt5(pos_lot),
                      c_type: props.activeSymbol.isAsk ? "OP_BUY" : "OP_SELL",
                      PriceSL: sltpInputContent ? props.positionSlTp.sl : 0,
                      PriceTP: sltpInputContent ? props.positionSlTp.tp : 0,
                      simpleTrade: 0,
                    },
                  };
                  store.dispatch(getShowSymbolPopupAction(false));
                  //console.log(props.customerAuth);
                  requestCommand(data);
                }}
              >
                {t("Open Position")}
              </button>
            </div>
          </Tab>
          <Tab eventKey="pendingOrder" title={t("Pending Order")}>
            <div className="sell-buy d-flex mt-5 justify-content-between">
              <div className="col-md-5">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    let prd = props.activeSymbol;
                    if (prd.isAsk) {
                      prd.isAsk = false;
                      setisAsk(false);
                      store.dispatch(getActiveSymbolAction(prd));
                    }
                  }}
                >
                  <div className="d-flex sell-btn justify-content-between">
                    <div>{t("Sell")}</div>
                    <div>
                      {!isAsk ? (
                        <FontAwesomeIcon
                          style={{ color: "blue" }}
                          icon={faCheck}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="text-right" ref={button_ord_bid}>
                    {props.activeSymbol.bid}
                  </div>
                </button>
              </div>
              <div className="col-md-2">
                <div
                  className="sell-buy-number text-center"
                  ref={spreadDiff_ord_ref}
                >
                  {parseInt(
                    (props.activeSymbol.ask - props.activeSymbol.bid).toFixed(
                      props.activeSymbol.data.digits
                    ) * Math.pow(10, props.activeSymbol.data.digits)
                  )}{" "}
                  {/* {props.activeSymbol.data.spreadDiff} */}
                </div>
              </div>
              <div className="col-md-5">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    let prd = props.activeSymbol;
                    if (!prd.isAsk) {
                      prd.isAsk = true;
                      setisAsk(true);
                      store.dispatch(getActiveSymbolAction(prd));
                    }
                  }}
                >
                  <div className="d-flex buy-btn justify-content-between">
                    <div>
                      {isAsk ? (
                        <FontAwesomeIcon
                          style={{ color: "blue" }}
                          icon={faCheck}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div>{t("Buy")}</div>
                  </div>
                  <div className="text-left" ref={button_ord_ask}>
                    {props.activeSymbol.ask}
                  </div>
                </button>
              </div>
            </div>

            <div className="sell-buy d-flex justify-content-between mt-4">
              <div className="col-md-6">
                <span>{t("Price")}</span>
                <span>
                  <input
                    type="number"
                    className="form-control"
                    value={orderPrice}
                    step={getDigitStep(props.activeSymbol.data.digits)}
                    min={0}
                    onChange={(e) => {
                      setorderPrice(e.target.value);
                    }}
                  />
                </span>
              </div>
              <div className="col-md-6 text-right">
                <span>{t("Expiry")}</span>
                <span>
                  <select
                    className="form-control"
                    value={expiry}
                    onChange={(e) => {
                      setexpiry(e.target.value);
                      if (e.target.value == 2) {
                        setshowDatePicker(true);
                      } else {
                        setshowDatePicker(false);
                      }
                    }}
                  >
                    <option value="1">{t("Good till canceled")}</option>
                    <option value="2">{t("Good till date")}</option>
                  </select>
                </span>
                {showDatePicker ? (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="sell-buy-maininput d-flex justify-content-between mt-5">
              <div className="sell-buy-input-lefttext col-md-3 text-right">
                <div>{t("Size")}</div>
                <div>
                  <span>
                    {t("min")} {getMin(props.activeSymbol.data.volumeMin)}
                  </span>
                </div>
              </div>
              <div className="sell-buy-input col-md-6">
                <input
                  type="number"
                  className="form-control"
                  step={getStep(props.activeSymbol.data.volumeStep)}
                  defaultValue={props.activeSymbol.lot}
                  min={getMin(props.activeSymbol.data.volumeMin)}
                  max={getMax(props.activeSymbol.data.volumeMax)}
                  readOnly={
                    isImpleTrade(
                      props.simpleTrade,
                      props.simpleTradePercent,
                      props.totalFigureData
                    )
                      ? true
                      : false
                  }
                  onBlur={(e) => {
                    let d = (
                      getStep(props.activeSymbol.data.volumeStep) + ""
                    ).split(".");
                    let length = d[1] !== undefined ? d[1].length : 0;
                    if (length != 0) {
                      e.target.value = parseFloat(e.target.value).toFixed(
                        length
                      );
                    }

                    setpos_lot(e.target.value);
                    calculateOrdLocalMargin(props.activeSymbol, e.target.value);
                    calculateOrdLocalPointValue(
                      props.activeSymbol,
                      e.target.value
                    );
                  }}
                  onChange={(e) => {
                    setord_lot(e.target.value);
                    calculateOrdLocalMargin(props.activeSymbol, e.target.value);
                    calculateOrdLocalPointValue(
                      props.activeSymbol,
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className="sell-buy-input-righttext col-md-3 text-left">
                <div>{t("Contracts")}</div>
                <div>
                  <span>
                    {t("max")}. {getMax(props.activeSymbol.data.volumeMax)}
                  </span>
                </div>
              </div>
            </div>

            <div className="sell-buy-info d-flex justify-content-between mt-4">
              <div className="sell-buy-info-lefttext col-md-6">
                <span>1 {t("Point")} =</span>{" "}
                <span>
                  {t("USD")} {ordPointValue}
                </span>
              </div>
              <div className="sell-buy-info-righttext col-md-6 text-right">
                <span>{t("Margin")}</span>{" "}
                <span>
                  {t("USD")} {ordMargin}
                </span>
              </div>
            </div>

            <div className="sell-buy-sltp mr-auto ml-auto mt-4 text-center form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
                onChange={handleChangeordersltp}
                checked={ordersltpInput}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                {t("Stop Loss")} / {t("Take Profit")}
              </label>
            </div>

            {ordersltpInputContent ? (
              <OrderSlTp
                pointValue={ordPointValue}
                activeSymbol={props.activeSymbol}
                orderPrice={orderPrice}
              />
            ) : (
              ""
            )}
            <div className="mr-auto ml-auto mt-4 text-center form-check">
              <button
                className="btn-primary btn"
                onClick={(e) => {
                  if (
                    isTradingSessionOk(props.activeSymbol.data.session_data) ==
                    false
                  ) {
                    showAlertMSG("Market is closed", 3);
                    return false;
                  }

                  let ctype = "";
                  if (props.activeSymbol.isAsk) {
                    if (props.activeSymbol.ask > orderPrice) {
                      ctype = "OP_BUY_LIMIT";
                    } else {
                      ctype = "OP_BUY_STOP";
                    }
                  } else {
                    if (props.activeSymbol.ask < orderPrice) {
                      ctype = "OP_SELL_LIMIT";
                    } else {
                      ctype = "OP_SELL_STOP";
                    }
                  }
                  let data = {
                    command: "openPendingOrder",
                    data: {
                      main_name: props.settings.mt5_main_name,
                      name: props.customerAuth.user.user.ID,
                      symbol: props.activeSymbol.data.symbol,
                      volume: calculateLotForMt5(ord_lot),
                      c_type: ctype,
                      price: orderPrice,
                      TypeTime:
                        expiry == 1
                          ? "ORDER_TIME_GTC"
                          : "ORDER_TIME_SPECIFIED_DAY",
                      TimeExpiration:
                        expiry == 1
                          ? "1608645558"
                          : new Date(startDate).getTime() / 1000,
                      TypeFill: "ORDER_FILL_RETURN",
                      PriceSL: ordersltpInputContent ? props.orderSlTp.sl : 0,
                      PriceTP: ordersltpInputContent ? props.orderSlTp.tp : 0,
                    },
                  };
                  store.dispatch(getShowSymbolPopupAction(false));
                  //console.log(props.customerAuth);
                  requestCommand(data);
                }}
              >
                {t("Submit Order")}
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  } else {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return {
    showSymbolPopup: state.showSymbolPopup.showSymbolPopup,
    activeSymbol: state.activeSymbol.activeSymbol,
    positionSlTp: state.positionSlTp.positionSlTp,
    orderSlTp: state.orderSlTp.orderSlTp,
    customerAuth: state.customerAuth.customerAuth,
    settings: state.settings.settings,
    simpleTrade: state.simpleTrade.simpleTrade,
    simpleTradePercent: state.simpleTradePercent.simpleTradePercent,
    totalFigureData: state.totalFigureData.totalFigureData,
  };
};

export default connect(mapStateToProps, null)(SymbolPopup);
