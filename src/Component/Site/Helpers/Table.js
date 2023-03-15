import React, { useState } from "react";
//import { closePosition } from '../halpers/popupFunctions';
//import ShortPopup from './ShortPopup';
import { connect } from "react-redux";
import store from "../../../Red/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getShowPositionPopupAction, getShowOrderPopupAction, getPositionTableActiveSymbolAction, getOrderTableActiveSymbolAction, getOrderAdtnlDataAction } from "../../../Red";
import { requestCommand } from "../../../Services/Commands/commands";

import {
  calculateLotFromMt5,
  isTradingSessionOk
} from "./Formulas";

import { showAlertMSG } from "../../../Lib/helpers";

function Table(props) {
  const { t } = useTranslation();

  //const [partial,setPartial]=useState(false);
  let clicFunction = (data) => {
    //    setPartial(data);
  };


  function getAllSymbols(data){
    for (const [key, value] of Object.entries(props.allSymbols)) {
      if(value.symbols !== null && value.symbols !== undefined && value.symbols.length > 0){
          for(let i = 0; i < value.symbols.length; i++){
                if(value.symbols[i].symbol == data){
                  store.dispatch(
                    getOrderAdtnlDataAction({
                      data: value.symbols[i],
                    })
                  );
                    console.log(value.symbols[i], "redux import");
                    break;
                }
            }
      }
    }
}





  if ((props.type == "positions")) {
    return (
      <React.Fragment>
        <tr
          onDoubleClick={() => {
            clicFunction(true);
            store.dispatch(
              getPositionTableActiveSymbolAction({
                data: props.data,
              })
            );
            store.dispatch(getShowPositionPopupAction(true));
          }}
        >
          {props.settings.symbol ? (
            <td>{props.data.symbol}</td>
          ) : (
            <td></td>
          )}
          {props.settings.time ? (
            <td>{getDate(props.data.timeCreate)}</td>
          ) : (
            <td></td>
          )}
          {props.settings.ticket ? (
            <td>{props.data.position}</td>
          ) : (
            <td></td>
          )}
          {props.settings.type ? (
            <td>
              {props.data.action == "POSITION_SELL"
                ? t("POSITION_SELL")
                : t("POSITION_BUY")}
            </td>
          ) : (
            <td></td>
          )}
          {props.settings.lot ? (
            <td>{calculateLotFromMt5(
              props.data.volume
            )}</td>
          ) : (
            <td></td>
          )}
          {props.settings.entry_price ? (
            <td>{parseFloat(props.data.priceOpen).toFixed(5)}</td>
          ) : (
            <td></td>
          )}
          {props.settings.sl ? (
            <td>{props.data.priceSL}</td>
          ) : (
            <td></td>
          )}
          {props.settings.tp ? (
            <td>{props.data.priceTP}</td>
          ) : (
            <td></td>
          )}
          {props.settings.cur_price ? (
            <td>{parseFloat(props.data.priceCurrent).toFixed(5)}</td>
          ) : (
            <td></td>
          )}
          {props.settings.swap ? (
            <td>{props.data.storage}</td>
          ) : (
            <td></td>
          )}
          {props.settings.profit ? (
            <td>{props.data.profit}</td>
          ) : (
            <td></td>
          )}

          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              /* closePosition(props.symbol,props.volume,props.action,props.ticker) */
              //console.log(props.allSymbols, props.data.symbol);
              let mainSymbol = {};
              if(props.allSymbols !== null && props.allSymbols !== undefined){
                props.allSymbols.forEach((row) => {
            
                  if (row["symbols"].length > 0) {
                    row["symbols"].forEach((row_s) => {
                      if(row_s["symbol"] == props.data.symbol){
                        mainSymbol = row_s;
                      }
                    })
                    
                  }
                  if (row["sub_category"].length > 0) {
                    row["sub_category"].forEach((children_row) => {
                      if (children_row["symbols"].length > 0) {
                        children_row["symbols"].forEach((row_s) => {
                          if(row_s["symbol"] == props.data.symbol){
                            mainSymbol = row_s;
                          }
                        })
                        
                      }
      
                      if (children_row["sub_category"].length > 0) {
                        children_row["sub_category"].forEach((children_row2) => {
                          if (children_row2["symbols"].length > 0) {
                            children_row2["symbols"].forEach((row_s) => {
                              if(row_s["symbol"] == props.data.symbol){
                                mainSymbol = row_s;
                              }
                            })
                          }
                        });
                      }
                    });
                  }
                  
                });
              }
              if(mainSymbol.session_data !== null && mainSymbol.session_data !== undefined){
                if (
                  isTradingSessionOk(mainSymbol.session_data) == false
                ) {
                  showAlertMSG("Market is closed", 3);
                  return false;
                }
              }
              
              let data = {
                command: "closePosition",
                data: {
                  main_name: props.setting.mt5_main_name,
                  login: props.customerAuth.user.user.ID,
                  symbol: props.data.symbol,
                  volume: props.data.volume,
                  c_type:
                    props.data.action ==
                    "POSITION_SELL"
                      ? "OP_BUY"
                      : "OP_SELL",
                  position: props.data.position,
                },
              };
               requestCommand(data);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />
          </td>
        </tr>
        <tr>
          {/* partial&&<ShortPopup 
                 text='Ok'
                 closeFunc={clicFunction}
                 volume={props.volume}
                 symbol={props.symbol}
                 type={t(props.action)}
                 oID={props.ticker}
                 priceSL={props.priceSL}
                 priceTP={props.priceTP}
                 priceCurrent={props.priceCurrent}
                 priceOpen={props.priceOpen}
                 profit={props.profit}
               /> */}
        </tr>
      </React.Fragment>
    );
  } else if ((props.type == "histories")) {
    return (
      
        <React.Fragment>
          <tr
            onDoubleClick={() => {
              //clicFunction(true);
            }}
          >
            {props.settings.symbol ? (
              <td>{props.data.Symbol}</td>
            ) : (
              <td></td>
            )}
            {props.settings.time ? (
              <td>{props.data['Open Time']}</td>
            ) : (
              <td></td>
            )}
            {props.settings.ticket ? (
              <td>{props.data.Ticket}</td>
            ) : (
              <td></td>
            )}
            {props.settings.type ? (
              <td>
                {props.data.Type == "POSITION_SELL"
                  ? t("POSITION_SELL")
                  : t("POSITION_BUY")}
              </td>
            ) : (
              <td></td>
            )}
            {props.settings.lot ? (
              <td>{props.data.Volume}</td>
            ) : (
              <td></td>
            )}
            {props.settings.entry_price ? (
              <td>{props.data['Entry Price']}</td>
            ) : (
              <td></td>
            )}
            {props.settings.sl ? (
              <td>{props.data.SL}</td>
            ) : (
              <td></td>
            )}
            {props.settings.tp ? (
              <td>{props.data.TP}</td>
            ) : (
              <td></td>
            )}
            {props.settings.close_time ? (
              <td>{props.data['Close Time']}</td>
            ) : (
              <td></td>
            )}
            {props.settings.close_price ? (
              <td>{props.data['Close Price']}</td>
            ) : (
              <td></td>
            )}
            {props.settings.swap ? (
              <td>{props.data.Swap}</td>
            ) : (
              <td></td>
            )}
            {props.settings.profit ? (
              <td>{props.data.Profit}</td>
            ) : (
              <td></td>
            )}
  
          </tr>
          <tr>
            {/* partial&&<ShortPopup 
                   text='Ok'
                   closeFunc={clicFunction}
                   volume={props.volume}
                   symbol={props.symbol}
                   type={t(props.action)}
                   oID={props.ticker}
                   priceSL={props.priceSL}
                   priceTP={props.priceTP}
                   priceCurrent={props.priceCurrent}
                   priceOpen={props.priceOpen}
                   profit={props.profit}
                 /> */}
          </tr>
        </React.Fragment>
      );
  } else if ((props.type == "orders")) {
    return (
        <React.Fragment>
          <tr
            onDoubleClick={() => {
              clicFunction(true);
              store.dispatch(
                getOrderTableActiveSymbolAction({
                  data: props.data,
                })
              );
              
              getAllSymbols(props.data.symbol);
              store.dispatch(getShowOrderPopupAction(true));
              console.log(props.data, "order double click");
              
            }}
          >
            {props.settings.symbol ? (
              <td>{props.data.symbol}</td>
            ) : (
              <td></td>
            )}
            {props.settings.time ? (
              <td>{getDate(props.data.timeSetup)}</td>
            ) : (
              <td></td>
            )}
            {props.settings.ticket ? (
              <td>{props.data.order}</td>
            ) : (
              <td></td>
            )}
            {props.settings.type ? (
              <td>
                {t(props.data.action)}
              </td>
            ) : (
              <td></td>
            )}
            {props.settings.volume ? (
              <td>{calculateLotFromMt5(
                props.data.volumeInitial
              )}</td>
            ) : (
              <td></td>
            )}
            {props.settings.price ? (
              <td>{parseFloat(props.data.priceOrder).toFixed(5)}</td>
            ) : (
              <td></td>
            )}
            {props.settings.sl ? (
              <td>{props.data.priceSL}</td>
            ) : (
              <td></td>
            )}
            {props.settings.tp ? (
              <td>{props.data.priceTP}</td>
            ) : (
              <td></td>
            )}
            
            {props.settings.cur_price ? (
              <td>{parseFloat(props.data.priceCurrent).toFixed(5)}</td>
            ) : (
              <td></td>
            )}
           
  
           <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              /* closePosition(props.symbol,props.volume,props.action,props.ticker) */
              console.log();
              let data = {
                command: "deletePendingOrder",
                data: {
                  main_name: props.settings.mt5_main_name,
                  name: props.customerAuth.user.user.ID,
                  symbol: props.data.symbol,
                  c_type: props.data.action,
                  order: props.data.order,
                },
              };
              
               requestCommand(data);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />
          </td>
        
          </tr>
          <tr>
            {/* partial&&<ShortPopup 
                   text='Ok'
                   closeFunc={clicFunction}
                   volume={props.volume}
                   symbol={props.symbol}
                   type={t(props.action)}
                   oID={props.ticker}
                   priceSL={props.priceSL}
                   priceTP={props.priceTP}
                   priceCurrent={props.priceCurrent}
                   priceOpen={props.priceOpen}
                   profit={props.profit}
                 /> */}
          </tr>
        </React.Fragment>
      );
  } else {
    return (
      <React.Fragment>
        <tr
          onDoubleClick={() => {
            clicFunction(true);
          }}
        >
          {/* <td>{props.symbol}</td>
                <td>{getDate(props.time)  }</td>
                <td>{props.ticker}</td>
                <td>{props.action=='POSITION_SELL' ? t('POSITION_SELL') : t('POSITION_BUY')}</td>
                <td>{props.volume}</td>
                <td>{parseFloat(props.priceOpen).toFixed(4)}</td>
                <td>{props.priceSL}</td>
                <td>{props.priceTP}</td>
                <td>{parseFloat(props.priceCurrent).toFixed(4)}</td>
                <td>{props.swap}</td>
                <td>{parseFloat(props.profit)}</td>
                <td style={{cursor:'pointer'}} onClick={()=>{ /* closePosition(props.symbol,props.volume,props.action,props.ticker) }}> <i 
                className="fa fa-times"></i></td>
            */}
        </tr>
        <tr>
          {/* partial&&<ShortPopup 
                 text='Ok'
                 closeFunc={clicFunction}
                 volume={props.volume}
                 symbol={props.symbol}
                 type={t(props.action)}
                 oID={props.ticker}
                 priceSL={props.priceSL}
                 priceTP={props.priceTP}
                 priceCurrent={props.priceCurrent}
                 priceOpen={props.priceOpen}
                 profit={props.profit}
               /> */}
        </tr>
      </React.Fragment>
    );
  }
}

function getDate(data) {
  // console.log(data);

  var date = new Date(data * 1000);
  // console.log(date.toISOString().split('Z'))
  // let y=date.toISOString().split('T')[0];
  // let b=y.split('Z')
  //console.log(date);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  // console.log(date,'<===date',day,"<====",mon);

  var formatteddate =
    year +
    "-" +
    month.substr(-2) +
    "-" +
    day.substr(-2) +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);
  return formatteddate;
}
const mapStateToProps = (state) => {
    return {
        positionTableActiveSymbol: state.positionTableActiveSymbol.positionTableActiveSymbol,
        orderTableActiveSymbol: state.orderTableActiveSymbol.orderTableActiveSymbol,
        showOrderPopup: state.showOrderPopup.showOrderPopup,
        setting: state.settings.settings,
        customerAuth: state.customerAuth.customerAuth,
        allSymbols: state.allSymbols.allSymbols,
    };
};


export default connect(mapStateToProps, null)(Table);
