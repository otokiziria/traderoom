import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { requestCommand } from "../../../../Services/Commands/commands";

import store from "../../../../Red/store";
import { getShowOrderPopupAction } from "../../../../Red/";
import OrderSlTp from "./orderPopup/OrderSlTp"
import DatePicker from "react-datepicker";
import { showAlertMSG } from "../../../../Lib/helpers";

import {
  getMin,
  getMax,
  getStep,
  calculateMargin,
  calculatePointValue,
  calculateLotForMt5,
  calculateLotFromMt5,
  getDigitStep,
  isTradingSessionOk,
  isImpleTrade,
  simpleTradeValue,
} from "../../Helpers/Formulas";

function OrderPopup(props) {
  const { t } = useTranslation();

  const [showDatePicker, setshowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [orderPrice, setorderPrice] = useState(props.orderTableActiveSymbol.data.priceOrder);
  const [expiry, setexpiry] = useState(1);

  const [pos_lot, setpos_lot] = useState(0);
  const [ord_lot, setord_lot] = useState(0);

  const [margin, setmargin] = useState(0);
  const [pointValue, setpointValue] = useState(0);

  const [ordMargin, setordMargin] = useState(0);
  const [ordPointValue, setordPointValue] = useState(0);

  const [ordersltpInput, setordersltpInput] = useState(false);
  const [ordersltpInputContent, setordersltpInputContent] = useState(false);

  const [isask, setisask] = useState(props.orderTableActiveSymbol.data.action == "OP_BUY_LIMIT" || props.orderTableActiveSymbol.data.action == "OP_BUY_STOP" ? true : false);
  const [yle, setyle] = useState(null);

  const partialCloseInput = useRef(null);
  const priceSLref = useRef(null);
  const priceTPref = useRef(null);
  const price = useRef(null);

  const handleChangeordersltp = () => {
    setordersltpInput(!ordersltpInput);
    console.log(ordersltpInput, "test");
  };

  // useEffect(() => {
  //   if (props.orderTableActiveSymbol.data.action == "OP_BUY_LIMIT" || props.orderTableActiveSymbol.data.action == "OP_BUY_STOP") {
  //     setisask(true);
  //     console.log("22")
  //   } else {
  //     setisask(false);
  //     console.log("33")
  //   }
  // });

  const calculateLocalMargin = (data, lot = 0) => {
    if (data.data !== undefined) {
      setmargin(
        calculateMargin(
          lot > 0 ? lot : calculateLotFromMt5(
            props.orderTableActiveSymbol.data.volumeInitial
          ),
          data.data.contractSize,
          data.data.margin_value,
          isask ? data.ask : data.bid,
          data.data.USD
        )
      );
    }
  };


  const calculateOrdLocalPointValue = (data, lot = 0) => {
    if (data.data !== undefined) {
      setordPointValue(
        calculatePointValue(
          lot > 0 ? lot : calculateLotFromMt5(
            props.orderTableActiveSymbol.data.volumeInitial
          ),
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
          lot > 0 ? lot : calculateLotFromMt5(
            props.orderTableActiveSymbol.data.volumeInitial
          ),
          data.data.contractSize,
          data.data.margin_value,
          isask ? data.data.ask : data.data.bid,
          data.data.USD
        )
      );
    }

    console.log("vax chemi kai to" + " " + lot + " - " + calculateLotFromMt5(
        props.orderTableActiveSymbol.data.volumeInitial
      ) + " - " + data.data.contractSize + " - " + data.data.margin_value + " - " + isask + " - " + data.data.ask + " - " + data.data.bid + " - " + data.data.USD);
  };
  useEffect(() => {
    if (ordersltpInput) {
      setordersltpInputContent(true);
    } else {
      setordersltpInputContent(false);
    }
  }, [ordersltpInput]);


  useEffect(() => {

    if (props.orderAdtnlData !== null) {

      // if(isImpleTrade(props.simpleTrade, props.simpleTradePercent, props.totalFigureData)){
      //   setpos_lot(simpleTradeValue(props.totalFigureData.MarginFree, props.simpleTradePercent));
      //   setord_lot(simpleTradeValue(props.totalFigureData.MarginFree, props.simpleTradePercent));
      // }
      // else{
      //   setpos_lot(props.activeSymbol.lot);
      //   setord_lot(props.activeSymbol.lot);
      // }


      setpos_lot(calculateLotFromMt5(
        props.orderTableActiveSymbol.data.volumeInitial
      ));
      setord_lot(calculateLotFromMt5(
        props.orderTableActiveSymbol.data.volumeInitial
      ));
      calculateLocalMargin(props.orderAdtnlData);
      // calculateLocalPointValue(props.orderAdtnlData);
      calculateOrdLocalMargin(props.orderAdtnlData);
      calculateOrdLocalPointValue(props.orderAdtnlData);
    }
  }, [props.orderAdtnlData, props.orderTableActiveSymbol, props.simpleTrade, props.simpleTradePercent, props.totalFigureData]);

  console.log(props.orderTableActiveSymbol, "active symbol");
  console.log(props.orderAdtnlData, "active order");
  // useEffect(() => {
  //   setorderPrice(price);
  // });

  return (
    <div>
      <div className="popup-content-item popup-content-item-1">
        <div className="post-inputs">
          {/* <div className="post-input-item">
            <div className="a">{t('Entry Price')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.priceOpen}
            </div>
          </div> */}
          <div className="post-input-item">
            <div className="a">{t('Current Price')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.priceCurrent}
            </div>
          </div>
          <div className="post-input-item">
            <div className="a">{t('Type')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.action}
            </div>
          </div>
          {/* <div className="post-input-item">
            <div className="a">{t('Profit')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.profit}
            </div>
          </div> */}
        </div>
      </div>

      <div className="sell-buy d-flex justify-content-between mt-4">
        <div className="col-md-6">
          <span>{t("Price")}</span>
          <span>
            <input
              ref={price}
              type="number"
              className="form-control"
              value={orderPrice}
              step={getDigitStep(props.orderTableActiveSymbol.data.digits)}
              min={0}
              onChange={(e) => {
                if (props.orderTableActiveSymbol.data.action == "OP_BUY_LIMIT" && e.target.value > props.orderTableActiveSymbol.data.priceCurrent) {
                  e.target.value = props.orderTableActiveSymbol.data.priceCurrent - 1;
                  console.log(e.target.value + " - " + props.orderTableActiveSymbol.data.priceCurrent + "aa2");
                } else {
                  setorderPrice(e.target.value);
                }

                if (props.orderTableActiveSymbol.data.action == "OP_BUY_STOP" && e.target.value < props.orderTableActiveSymbol.data.priceCurrent) {
                  e.target.value = props.orderTableActiveSymbol.data.priceCurrent + 1;
                  console.log(e.target.value + " - " + props.orderTableActiveSymbol.data.priceCurrent + "aa2");
                } else {
                  setorderPrice(e.target.value);
                }

                if (props.orderTableActiveSymbol.data.action == "OP_SELL_LIMIT" && e.target.value < props.orderTableActiveSymbol.data.priceCurrent) {
                  e.target.value = props.orderTableActiveSymbol.data.priceCurrent + 1;
                  console.log(e.target.value + " - " + props.orderTableActiveSymbol.data.priceCurrent + "aa2");
                } else {
                  setorderPrice(e.target.value);
                }

                if (props.orderTableActiveSymbol.data.action == "OP_SELL_STOP" && e.target.value > props.orderTableActiveSymbol.data.priceCurrent) {
                  e.target.value = props.orderTableActiveSymbol.data.priceCurrent - 1;
                  console.log(e.target.value + " - " + props.orderTableActiveSymbol.data.priceCurrent + "aa2");
                } else {
                  setorderPrice(e.target.value);
                }
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
              {t("min")} {getMin(props.orderAdtnlData.data.volumeMin)}
            </span>
          </div>
        </div>
        <div className="sell-buy-input col-md-6">
          <input
            type="number"
            className="form-control"
            step={getStep(props.orderAdtnlData.data.volumeStep)}
            defaultValue={calculateLotFromMt5(props.orderTableActiveSymbol.data.volumeInitial)}
            min={getMin(props.orderAdtnlData.data.volumeMin)}
            max={getMax(props.orderAdtnlData.data.volumeMax)}
            readOnly={
              isImpleTrade(props.simpleTrade, props.simpleTradePercent, props.totalFigureData)
                ? true
                : false
            }
            onBlur={(e) => {
              let d = (
                getStep(props.orderAdtnlData.data.volumeStep) + ""
              ).split(".");
              let length = d[1] !== undefined ? d[1].length : 0;
              if (length != 0) {
                e.target.value = parseFloat(e.target.value).toFixed(
                  length
                );
              }

              setpos_lot(e.target.value);
              calculateOrdLocalMargin(props.orderAdtnlData, e.target.value);
              calculateOrdLocalPointValue(
                props.orderAdtnlData,
                e.target.value
              );
            }}
            onChange={(e) => {

              setord_lot(e.target.value);
              calculateOrdLocalMargin(props.orderAdtnlData, e.target.value);
              calculateOrdLocalPointValue(
                props.orderAdtnlData,
                e.target.value
              );
            }}
          />
        </div>
        <div className="sell-buy-input-righttext col-md-3 text-left">
          <div>{t("Contracts")}</div>
          <div>
            <span>
              {t("max")}. {getMax(props.orderAdtnlData.data.volumeMax)}
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
            {/* axali */}
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
          activeSymbol={props.orderAdtnlData.data}
          orderPrice={orderPrice}
          activeOrder={props.orderTableActiveSymbol.data}
          isAsk={isask}
        />
      ) : (
          ""
        )}
      { <div className="mr-auto ml-auto mt-4 text-center form-check">
        <button
          className="btn-primary btn"
          onClick={(e) => {
            if (
              isTradingSessionOk(props.orderAdtnlData.data.session_data) == false
            ) {
              showAlertMSG("Market is closed", 3);
              return false;
            }

            let ctype = props.orderTableActiveSymbol.data.action;
  
            let data = {
              command: "openPendingOrder",
              data: {
                main_name: props.settings.mt5_main_name,
                name: props.customerAuth.user.user.ID,
                symbol: props.orderAdtnlData.data.symbol,
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
            store.dispatch(getShowOrderPopupAction(false));
            requestCommand(data);
          }}
        >
          {t("Submit Order")}
        </button>
      </div>}
    </div>
  )


  /*return (
    <div>
      <div className="popup-content-item popup-content-item-1">
        <div className="post-inputs">
          <div className="post-input-item">
            <div className="a">{t('Entry Price')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.priceOpen}
            </div>
          </div>
          <div className="post-input-item">
            <div className="a">{t('Current Price')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.priceCurrent}
            </div>
          </div>
          <div className="post-input-item">
            <div className="a">{t('Type')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.action}
            </div>
          </div>
          <div className="post-input-item">
            <div className="a">{t('Profit')}</div>
            <div className="b">
              {props.orderTableActiveSymbol.data.profit}
            </div>
          </div>
        </div>

        <div className="btn-check">
          <div className="inp check-content-item">
            <label className="pb-2 active">{t('Close Volume')} </label>
            <input
              type="number"
              className="check-content-item-inp form-control"
              step="0.01"
              max={props.orderTableActiveSymbol.data.volume}
              min="0"
              ref={partialCloseInput}
              defaultValue="0"
            />
          </div>
          <div
            className="check-content"
            style={{ display: "block", paddingBottom: "0.25rem" }}
          >
            <div className="check-content-item-row">
              <div className="check-content-item">
                <label htmlFor="priceSL">{t('SL')} </label>
                <input
                  type="number"
                  className="check-content-item-inp form-control"
                  step="0.01"
                  id="priceSL"
                  ref={priceSLref}
                  defaultValue={props.orderTableActiveSymbol.data.priceSL}
                />
              </div>
              <div className="check-content-item txt">{t('Price')}</div>
              <div className="check-content-item">
                <label htmlFor="priceTP">{t('TP')} </label>
                <input
                  type="number"
                  className="check-content-item-inp form-control"
                  step="0.01"
                  id="priceTP"
                  ref={priceTPref}
                  defaultValue={props.orderTableActiveSymbol.data.priceTP}
                />
              </div>
            </div>
          </div>
          <div className="btns" style={{ padding: "0.25rem" }}>
            <div className="item w-50" style={{ padding: "0.5rem" }}>
              <button
                className="btn btn-success w-100"
                onClick={(e) => {
                  if (
                    !isNaN(parseFloat(priceSLref.current.value)) ||
                    !isNaN(parseFloat(priceTPref.current.value))
                  ) {
                    console.log("modify");
                    let data = {
                      command: "modifyPendingOrder",
                      data: {
                        main_name: props.settings.mt5_main_name,
                        name: props.customerAuth.user.user.ID,
                        symbol: props.orderTableActiveSymbol.data.symbol,
                        tp: parseFloat(priceTPref.current.value),
                        sl: parseFloat(priceSLref.current.value),
                        order: props.orderTableActiveSymbol.data.order,
                      },
                    };
                    console.log(data);
                   //requestCommand(data);
                  }

                  if (
                    isNaN(parseFloat(partialCloseInput.current.value)) ||
                    partialCloseInput.current.value >
                      props.orderTableActiveSymbol.data.volume ||
                      props.positionTableActiveSymbol.data.volume == 0
                  ) {
                    console.log("Invalid volume");
                    //alert(t('Invalid volume'));
                  } else {
                    console.log("delete");
                    let data = {
                      command: "deletePendingOrder",
                      data: {
                        main_name: props.settings.mt5_main_name,
                        name: props.customerAuth.user.user.ID,
                        symbol: props.orderTableActiveSymbol.data.symbol,
                        c_type: props.orderTableActiveSymbol.data.action,
                        order: props.orderTableActiveSymbol.data.order,
                      },
                    };
                  //  requestCommand(data);
                  console.log(data, "2");
                  }
                  
                  console.log(props.orderTableActiveSymbol);
                }}
              >
                OK
              </button>
            </div>
            <div className="item w-50" style={{ padding: "0.5rem" }}>
              <button className="btn btn-danger w-100" onClick={(e)=> {
                store.dispatch(getShowOrderPopupAction(false));
              }}> {t('Cancel')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  */
}

const mapStateToProps = (state) => {
  return {
    showOrderPopup: state.showOrderPopup.showOrderPopup,
    activeSymbol: state.activeSymbol.activeSymbol,
    orderSlTp: state.orderSlTp.orderSlTp,
    orderSlTp: state.orderSlTp.orderSlTp,
    customerAuth: state.customerAuth.customerAuth,
    settings: state.settings.settings,
    orderTableActiveSymbol:
      state.orderTableActiveSymbol.orderTableActiveSymbol,
      orderAdtnlData: state.orderAdtnlData.orderAdtnlData,
      simpleTrade: state.simpleTrade.simpleTrade,
      simpleTradePercent: state.simpleTradePercent.simpleTradePercent,
      totalFigureData: state.totalFigureData.totalFigureData,
  };
};

export default connect(mapStateToProps, null)(OrderPopup);
