import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getShowPositionPopupAction } from "../../../../Red";
import store from "../../../../Red/store";
import { calculateLotForMt5, isTradingSessionOk } from "../../Helpers/Formulas";
import { requestCommand } from "../../../../Services/Commands/commands";
import { showAlertMSG } from "../../../../Lib/helpers";
/*
import {
  calculateLotFromMt5,
  calculateLotForMt5,
} from "../../Helpers/Formulas";
*/
function PositionPopup(props) {
  const { t } = useTranslation();
  const partialCloseInput = useRef(null);
  const priceSLref = useRef(null);
  const priceTPref = useRef(null);

  const doAction = async (data, msg = true) => {
    await requestCommand(data, msg);
  };

  return (
    <div>
      {/* popup */}
      <div className="popup-content-item popup-content-item-1">
        <div className="post-inputs">
          <div className="post-input-item">
            <div className="a">{t("Entry Price")}</div>
            <div className="b">
              {props.positionTableActiveSymbol.data.priceOpen}
            </div>
          </div>
          <div className="post-input-item">
            <div className="a">{t("Current Price")}</div>
            <div className="b">
              {props.positionTableActiveSymbol.data.priceCurrent}
            </div>
          </div>
          {/* <div className="post-input-item">
            <div className="a">{t('Type')}</div>
            <div className="b">
              {props.positionTableActiveSymbol.data.action == "POSITION_SELL"
                ? "SELL"
                : "BUY"}
            </div>
          </div> */}
          <div className="post-input-item">
            <div className="a">{t("Profit")}</div>
            <div className="b">
              {props.positionTableActiveSymbol.data.profit}
            </div>
          </div>
        </div>

        <div className="btn-check">
          <div className="inp check-content-item">
            <label className="pb-2 active">{t("Close Volume")} </label>
            <input
              type="number"
              className="check-content-item-inp form-control"
              step="0.01"
              max={props.positionTableActiveSymbol.data.volume}
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
                <label htmlFor="priceSL">{t("SL")} </label>
                <input
                  type="number"
                  className="check-content-item-inp form-control"
                  step="0.01"
                  id="priceSL"
                  ref={priceSLref}
                  defaultValue={props.positionTableActiveSymbol.data.priceSL}
                />
              </div>
              <div className="check-content-item txt">{t("Price")}</div>
              <div className="check-content-item">
                <label htmlFor="priceTP">{t("TP")} </label>
                <input
                  type="number"
                  className="check-content-item-inp form-control"
                  step="0.01"
                  id="priceTP"
                  ref={priceTPref}
                  defaultValue={props.positionTableActiveSymbol.data.priceTP}
                />
              </div>
            </div>
          </div>
          <div className="btns" style={{ padding: "0.25rem" }}>
            <div className="item w-50" style={{ padding: "0.5rem" }}>
              <button
                className="btn btn-success w-100"
                onClick={(e) => {
                  let mainSymbol = {};
                  if (
                    props.allSymbols !== null &&
                    props.allSymbols !== undefined
                  ) {
                    props.allSymbols.forEach((row) => {
                      if (row["symbols"].length > 0) {
                        row["symbols"].forEach((row_s) => {
                          if (row_s["symbol"] == props.positionTableActiveSymbol.data.symbol) {
                            mainSymbol = row_s;
                          }
                        });
                      }
                      if (row["sub_category"].length > 0) {
                        row["sub_category"].forEach((children_row) => {
                          if (children_row["symbols"].length > 0) {
                            children_row["symbols"].forEach((row_s) => {
                              if (row_s["symbol"] == props.positionTableActiveSymbol.data.symbol) {
                                mainSymbol = row_s;
                              }
                            });
                          }

                          if (children_row["sub_category"].length > 0) {
                            children_row["sub_category"].forEach(
                              (children_row2) => {
                                if (children_row2["symbols"].length > 0) {
                                  children_row2["symbols"].forEach((row_s) => {
                                    if (row_s["symbol"] == props.positionTableActiveSymbol.data.symbol) {
                                      mainSymbol = row_s;
                                    }
                                  });
                                }
                              }
                            );
                          }
                        });
                      }
                    });
                  }
                  if (
                    mainSymbol.session_data !== null &&
                    mainSymbol.session_data !== undefined
                  ) {
                    if (isTradingSessionOk(mainSymbol.session_data) == false) {
                      showAlertMSG("Market is closed", 3);
                      return false;
                    }
                  }

                  if (
                    !isNaN(parseFloat(priceSLref.current.value)) ||
                    !isNaN(parseFloat(priceTPref.current.value))
                  ) {
                    let data = {
                      command: "modifyPosition",
                      data: {
                        main_name: props.settings.mt5_main_name,
                        login: props.customerAuth.user.user.ID,
                        symbol: props.positionTableActiveSymbol.data.symbol,
                        tp: priceTPref.current.value,
                        sl: priceSLref.current.value,
                        position: props.positionTableActiveSymbol.data.position,
                      },
                    };
                    doAction(data);
                    store.dispatch(getShowPositionPopupAction(false));
                  }

                  if (
                    isNaN(parseFloat(partialCloseInput.current.value)) ||
                    partialCloseInput.current.value >
                      props.positionTableActiveSymbol.data.volume ||
                    partialCloseInput.current.value == 0
                  ) {
                    //alert(t('Invalid volume'));
                  } else {
                    let data = {
                      command: "closePosition",
                      data: {
                        main_name: props.settings.mt5_main_name,
                        login: props.customerAuth.user.user.ID,
                        symbol: props.positionTableActiveSymbol.data.symbol,
                        volume: calculateLotForMt5(
                          partialCloseInput.current.value
                        ),
                        c_type:
                          props.positionTableActiveSymbol.data.action ==
                          "POSITION_SELL"
                            ? "OP_BUY"
                            : "OP_SELL",
                        position: props.positionTableActiveSymbol.data.position,
                      },
                    };
                    doAction(data, false);
                    store.dispatch(getShowPositionPopupAction(false));
                  }
                  console.log(props.positionTableActiveSymbol);
                }}
              >
                OK
              </button>
            </div>
            <div className="item w-50" style={{ padding: "0.5rem" }}>
              <button className="btn btn-danger w-100"> {t("Cancel")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showPositionPopup: state.showPositionPopup.showPositionPopup,
    activeSymbol: state.activeSymbol.activeSymbol,
    positionSlTp: state.positionSlTp.positionSlTp,
    orderSlTp: state.orderSlTp.orderSlTp,
    customerAuth: state.customerAuth.customerAuth,
    settings: state.settings.settings,
    positionTableActiveSymbol:
    state.positionTableActiveSymbol.positionTableActiveSymbol,
    allSymbols: state.allSymbols.allSymbols,
  };
};

export default connect(mapStateToProps, null)(PositionPopup);
