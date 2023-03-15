import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOrderSlTpAction } from "../../../../../Red";
import store from "../../../../../Red/store";
import {
  getStep,
  calculatePointAway,
  calculateBalancePercent,
  calculateProfitFromBalancePercent,
  calculateProfitFromPrice,
  calculatePrice,
  calculateProfit,
} from "../../../Helpers/Formulas";
import { useTranslation } from "react-i18next";

function OrderSlTp(props) {
    const { t } = useTranslation();
    const ord_sl_profit = useRef(0);
    const ord_sl_point_away = useRef(0);
    const ord_sl_perc_balance = useRef(0);
    const ord_sl_price = useRef(0);
    const ord_tp_profit = useRef(0);
    const ord_tp_point_away = useRef(0);
    const ord_tp_perc_balance = useRef(0);
    const ord_tp_price = useRef(0);
  
    const [st_ord_sl_profit, setst_ord_sl_profit] = useState(0);
    const [st_ord_sl_point_away, setst_ord_sl_point_away] = useState(0);
    const [st_ord_sl_perc_balance, setst_ord_sl_perc_balance] = useState(0);
    const [st_ord_sl_price, setst_ord_sl_price] = useState(0);
    const [st_ord_tp_profit, setst_ord_tp_profit] = useState(0);
    const [st_ord_tp_point_away, setst_ord_tp_point_away] = useState(0);
    const [st_ord_tp_perc_balance, setst_ord_tp_perc_balance] = useState(0);
    const [st_ord_tp_price, setst_ord_tp_price] = useState(0);

    useEffect(() => {
        if(st_ord_sl_price !== null){
            store.dispatch(getOrderSlTpAction({sl: st_ord_sl_price, tp: store.getState().orderSlTp.orderSlTp.tp}))
        }
        if(st_ord_tp_price !== null){
            store.dispatch(getOrderSlTpAction({tp: st_ord_tp_price, sl: store.getState().orderSlTp.orderSlTp.sl}))
        }
    }, [st_ord_sl_price, st_ord_tp_price])

    useEffect(() => {
      let pointAwaySl = -1;
      let pointAwayTp = -1;
      let priceSl = 0;
      let priceTp = 0;
      let notInsertSl = 0;
      let notInsertTp = 0;
      if (!isNaN(props.pointValue) && props.pointValue !== null) {
        pointAwaySl = calculatePointAway(
          props.isAsk,
          1,
          st_ord_sl_profit,
          props.pointValue
        );
    
        pointAwayTp = calculatePointAway(
          props.isAsk,
          0,
          st_ord_tp_profit,
          props.pointValue
        );
      }
  
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null &&
        pointAwaySl > 0
      ) {
        priceSl = parseFloat(calculatePrice(
          props.isAsk,
          1,
          props.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
            pointAwaySl,
          props.activeSymbol.digits
        ));
  
        if (props.isAsk) {
          if ((priceSl > parseFloat(props.orderPrice)) || priceSl < 0) {
            notInsertSl = 1;
          }
        } else {
          if ((priceSl < parseFloat(props.orderPrice)) || priceSl < 0) {
            notInsertSl = 1;
          }
          
        }
  
      }
  
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null &&
        pointAwayTp > 0
      ) {
        priceTp = parseFloat(calculatePrice(
          props.isAsk,
          0,
          props.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
            pointAwayTp,
          props.activeSymbol.digits
        ));
  
        if (props.isAsk) {
          
          if (
            (priceTp < parseFloat(props.orderPrice)) ||
            priceTp < 0
          ) {
            notInsertTp = 1;
          }
        } else {
          
          if (
            (priceTp > parseFloat(props.orderPrice)) ||
            priceTp < 0
          ) {
            notInsertTp = 1;
          }
        }
  
      }
      
       
      if (pointAwaySl > 0 && !notInsertSl) {
        setst_ord_sl_point_away(pointAwaySl);
        setst_ord_sl_price(priceSl);
      }
      if (pointAwayTp > 0 && !notInsertTp) {
        setst_ord_tp_point_away(pointAwayTp);
        setst_ord_tp_price(priceTp);
      }
  
    }, [props.pointValue]);

    const onProfitChange = (e, isSl) => {
      let price = 0;
      let pointAway = 0;
      let perc_balance = 0;

      console.log(props.pointValue, "aashiu");
  
      if(isSl && e.target.value > 0){
        return false;
      }
  
      if (!isNaN(props.pointValue) && props.pointValue !== null) {
        pointAway = calculatePointAway(
          props.isAsk,
          isSl,
          e.target.value,
          props.pointValue
        );
        console.log("aaaaa", 1/0);
          console.log('PROFIT point awayy = ', pointAway);
        if (pointAway < 0) {
          return false;
        }
      }
  
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
        price = parseFloat(calculatePrice(
          props.isAsk,
          isSl,
          props.orderPrice,
          pointAway,
          props.activeSymbol.digits
        ));
        console.log('PROFIT price = ', price);
        if (props.isAsk) {
          if ((isSl && price > parseFloat(props.orderPrice)) || price < 0) {
            return false;
          }
          if (
            (!isSl && price < parseFloat(props.orderPrice)) ||
            price < 0
          ) {
            return false;
          }
        } else {
          if ((isSl && price < parseFloat(props.orderPrice)) || price < 0) {
            return false;
          }
          if (
            (!isSl && price > parseFloat(props.orderPrice)) ||
            price < 0
          ) {
            return false;
          }
        }
      }
  
      
      if (
        props.totalFigureData !== null &&
        props.totalFigureData.Balance !== undefined
      ) {
        perc_balance = calculateBalancePercent(
          props.isAsk,
          isSl,
          e.target.value,
          props.totalFigureData.Balance
        );
        if (perc_balance < 0) {
          return false;
        }
      }
      if (isSl) {
        setst_ord_sl_price(price);
        setst_ord_sl_point_away(pointAway);
        setst_ord_sl_perc_balance(perc_balance);
        setst_ord_sl_profit(e.target.value);
      } else {
        setst_ord_tp_price(price);
        setst_ord_tp_point_away(pointAway);
        setst_ord_tp_perc_balance(perc_balance);
        setst_ord_tp_profit(e.target.value);
      }
    };
  
    const onPriceChange = (e, isSl) => {
      // Calculating Price
      let price = 0;
      if (
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
        if (isSl) {
          if (props.isAsk) {
            if (parseFloat(e.target.value) > parseFloat(props.orderPrice)) {
              price = parseFloat(props.orderPrice) -
              getStep(props.activeSymbol.volumeStep);
            } else {
              price = e.target.value;
            }
          } else {
            if (parseFloat(e.target.value) < parseFloat(props.orderPrice)) {
              price = parseFloat(props.orderPrice) +
              getStep(props.activeSymbol.volumeStep);
            } else {
              price = e.target.value;
            }
          }
        } else {
          if (props.isAsk) {
            if (parseFloat(e.target.value) < parseFloat(props.orderPrice)) {
              price = parseFloat(props.orderPrice) +
                getStep(props.activeSymbol.volumeStep);
            } else {
              price = e.target.value;
            }
          } else {
            if (parseFloat(e.target.value) > parseFloat(props.orderPrice)) {
              price = parseFloat(props.orderPrice) -
              getStep(props.activeSymbol.volumeStep);
            } else {
              price = e.target.value;
            }
          }
        }
      }
      // Calculateing Profit
      let profit = 0;
      let pointAway = 0;
      let perc_balance = 0;
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.pointValue != 0 &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
  
  
        profit = parseFloat(calculateProfitFromPrice(
          props.isAsk,
          isSl,
          price,
          props.orderPrice,
          props.pointValue,
          props.activeSymbol.digits
        ));
          console.log('PRICE profit = ', profit);
        if (isSl && profit > 0) {
          return false;
        } 
      }
  
      // Calculate points away
  
      if (!isNaN(props.pointValue) && props.pointValue !== null) {
        pointAway = calculatePointAway(
          props.isAsk,
          isSl,
          profit,
          props.pointValue
        );
        if (pointAway < 0) {
          return false;
        }
      }
  
      // Calculate Percernt of balan ce
      if (
        props.totalFigureData !== null &&
        props.totalFigureData.Balance !== undefined
      ) {
        perc_balance = calculateBalancePercent(
          props.isAsk,
          isSl,
          profit,
          props.totalFigureData.Balance
        );
        if (perc_balance < 0) {
          return false;
        }
      }
  
      if (isSl) {
        setst_ord_sl_price(price);
        setst_ord_sl_profit(profit);
        setst_ord_sl_point_away(pointAway);
        setst_ord_sl_perc_balance(perc_balance);
      } else {
        setst_ord_tp_price(price);
        setst_ord_tp_point_away(pointAway);
        setst_ord_tp_profit(profit);
        setst_ord_tp_perc_balance(perc_balance);
      }
    };
  
    const onPointAwayChange = (e, isSl) => {
  
      // Calculate price
      let price = 0;
      let profit = 0;
      let perc_balance = 0;
  
      if(e.target.value < 0){
        return false;
      }
  
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
  
        price = parseFloat(calculatePrice(
          props.isAsk,
          isSl,
          props.orderPrice,
          e.target.value,
          props.activeSymbol.digits
        ));
          console.log("POINT AWAY price = ", price);
        if (isSl) {
          if (props.isAsk) {
            if (price > parseFloat(props.orderPrice) || price < 0) {
              return false;
            }
          } else {
            if (price < parseFloat(props.orderPrice) || price < 0) {
              return false;
            }
          }
        } else {
          
          if (props.isAsk) {
            if (price < parseFloat(props.orderPrice) || price < 0) {
              return false;
            }
          } else {
            if (price < parseFloat(props.orderPrice) || price < 0) {
              return false;
            }
          }
        }
      }
      
  
      // Calculateing Profit
      
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.pointValue != 0 &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
        profit = calculateProfit(
          isSl,
          e.target.value,
          props.pointValue,
          props.activeSymbol.digits
        );
        if(isSl && profit > 0){
          return false
        }
      }
  
      // Calculate Percernt of balan ce
      if (
        props.totalFigureData !== null &&
        props.totalFigureData.Balance !== undefined
      ) {
        perc_balance = calculateBalancePercent(
          props.isAsk,
          isSl,
          profit,
          props.totalFigureData.Balance
        );
        if (perc_balance < 0) {
          return false;
        }
        //if (perc_balance < 0) {
        //  return false;
        //}
        
      }
  
      if (isSl) {
        setst_ord_sl_perc_balance(perc_balance);
        setst_ord_sl_profit(profit);
        setst_ord_sl_price(price);
        setst_ord_sl_point_away(e.target.value);
      } else {
        setst_ord_tp_perc_balance(perc_balance);
        setst_ord_tp_profit(profit);
        setst_ord_tp_price(price);
        setst_ord_tp_point_away(e.target.value);
      }
     
      
    };
  
    const onPercenOfBalanveChange = (e, isSl) => {
      let profit = 0;
      let price = 0;
      let pointAway = 0;
  
      if(e.target.value < 0){
        return false;
      }
      // calcluate profit
      if (
        props.totalFigureData !== null &&
        props.totalFigureData.Balance !== undefined
      ) {
        
        profit = calculateProfitFromBalancePercent(
            isSl,
            props.totalFigureData.Balance,
            e.target.value,
            props.activeSymbol.digits
          )
          if(isSl && profit > 0){
            return false;
          }
      }
      // Calculate points away
  
      if (!isNaN(props.pointValue) && props.pointValue !== null) {
        pointAway = calculatePointAway(
         props.isAsk,
         isSl,
         profit,
         props.pointValue
       );
  
       if (pointAway < 0) {
        return false;
      }
  
     }
  
      // Calculate price
      if (
        !isNaN(props.pointValue) &&
        props.pointValue !== null &&
        props.isAsk !== null &&
        props.activeSymbol.bid !== null &&
        props.activeSymbol.ask !== null
      ) {
        price = parseFloat(calculatePrice(
          props.isAsk,
          isSl,
          props.orderPrice,
          pointAway,
          props.activeSymbol.digits
        ));
  
        if (props.isAsk) {
          if ((isSl && price > parseFloat(props.orderPrice)) || price < 0) {
            return false;
          }
          if (
            (!isSl && price < parseFloat(props.orderPrice)) ||
            price < 0
          ) {
            return false;
          }
        } else {
          if ((isSl && price < parseFloat(props.orderPrice)) || price < 0) {
            return false;
          }
          if (
            (!isSl && price < parseFloat(props.orderPrice)) ||
            price < 0
          ) {
            return false;
          }
        }
      }
  
      
  
  
      if (isSl) {
        setst_ord_sl_price(price);
        setst_ord_sl_profit(profit);
        setst_ord_sl_perc_balance(e.target.value);
        setst_ord_sl_point_away(pointAway);
      } else {
        setst_ord_tp_price(price);
        setst_ord_tp_profit(profit);
        setst_ord_tp_perc_balance(e.target.value);
        setst_ord_tp_point_away(pointAway);
      }
      
    }
  
    return (
      <div className="sell-buy-sltp-input d-flex flex-wrap justify-content-between mt-5">
        <div className="col-md-4 text-center mb-1">
          <span>{t("Stop Loss")}</span>
        </div>
        <div className="col-md-4 mb-1"></div>
        <div className="col-md-4 mb-1 text-center">
          <span>{t("Take Profit")}</span>
        </div>
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_sl_profit}
            onChange={(e) => {
              onProfitChange(e, true);
            }}
            className="form-control"
            value={st_ord_sl_profit}
          />
        </div>
        <div className="col-md-4 mt-2 text-center">
          <span>{t("Profit")}</span>
        </div>
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_tp_profit}
            onChange={(e) => {
              onProfitChange(e, false);
            }}
            className="form-control"
            value={st_ord_tp_profit}
          />
        </div>
  
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_sl_point_away}
            min="0"
            onChange={(e) => {
              onPointAwayChange(e, true);
            }}
            className="form-control"
            value={st_ord_sl_point_away}
          />
        </div>
        <div className="col-md-4 mt-2 text-center">
          <span>{t("Points Away")}</span>
        </div>
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_tp_point_away}
            min="0"
            onChange={(e) => {
              onPointAwayChange(e, false);
            }}
            className="form-control"
            value={st_ord_tp_point_away}
          />
        </div>
  
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_sl_perc_balance}
            min="0"
            onChange={(e) => {
              onPercenOfBalanveChange(e, true);
              
            }}
            className="form-control"
            value={st_ord_sl_perc_balance}
          />
        </div>
        <div className="col-md-4 mt-2 text-center">
          <span>{t("% of Balance")}</span>
        </div>
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_tp_perc_balance}
            min="0"
            onChange={(e) => {
              onPercenOfBalanveChange(e, false);
            }}
            className="form-control"
            value={st_ord_tp_perc_balance}
          />
        </div>
  
        <div className="col-md-4 mt-2">
          <input
            type="number"
            ref={ord_sl_price}
            min="0"
            step={(props.activeSymbol.digits !== null && props.activeSymbol.digits !== undefined) ? 1/Math.pow(10, props.activeSymbol.digits) : 0.01 }
            onChange={(e) => {
              onPriceChange(e, true);
            }}
            className="form-control"
            value={st_ord_sl_price}
          />
        </div>
        <div className="col-md-4 mt-2 text-center">
          <span>{t("Price")}</span>
        </div>
        <div className="col-md-4 mt-2 ">
          <input
            type="number"
            ref={ord_tp_price}
            min="0"
            step={(props.activeSymbol.digits !== null && props.activeSymbol.digits !== undefined) ? 1/Math.pow(10, props.activeSymbol.digits) : 0.01 }
            onChange={(e) => {
              onPriceChange(e, false);
            }}
            className="form-control"
            value={st_ord_tp_price}
          />
        </div>
      </div>
    );
  
}
const mapStateToProps = (state) => {
  return {
    totalFigureData: state.totalFigureData.totalFigureData
  };
};

export default connect(mapStateToProps, null)(OrderSlTp);
