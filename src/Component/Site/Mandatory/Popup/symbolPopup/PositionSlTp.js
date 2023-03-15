import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPositionSlTpAction,
  getTotalFigureSettingsAction,
} from "../../../../../Red";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function PositionsSlTp(props) {
  const { t } = useTranslation();
  const pos_sl_profit = useRef(0);
  const pos_sl_point_away = useRef(0);
  const pos_sl_perc_balance = useRef(0);
  const pos_sl_price = useRef(0);
  const pos_tp_profit = useRef(0);
  const pos_tp_point_away = useRef(0);
  const pos_tp_perc_balance = useRef(0);
  const pos_tp_price = useRef(0);

  const [st_pos_sl_profit, setst_pos_sl_profit] = useState(0);
  const [st_pos_sl_point_away, setst_pos_sl_point_away] = useState(0);
  const [st_pos_sl_perc_balance, setst_pos_sl_perc_balance] = useState(0);
  const [st_pos_sl_price, setst_pos_sl_price] = useState(0);
  const [st_pos_tp_profit, setst_pos_tp_profit] = useState(0);
  const [st_pos_tp_point_away, setst_pos_tp_point_away] = useState(0);
  const [st_pos_tp_perc_balance, setst_pos_tp_perc_balance] = useState(0);
  const [st_pos_tp_price, setst_pos_tp_price] = useState(0);

  const [lockedInput, setlockedInput] = useState(1);

  useEffect(() => {
    if (st_pos_sl_price !== null) {
      store.dispatch(
        getPositionSlTpAction({
          sl: st_pos_sl_price,
          tp: store.getState().positionSlTp.positionSlTp.tp,
        })
      );
    }
    if (st_pos_tp_price !== null) {
      store.dispatch(
        getPositionSlTpAction({
          tp: st_pos_tp_price,
          sl: store.getState().positionSlTp.positionSlTp.sl,
        })
      );
    }
  }, [st_pos_sl_price, st_pos_tp_price]);

  useEffect(() => {
    if (lockedInput == 2 || lockedInput == 4) {
      pointValueChangedPointAway();
    } else {
      pointValueChangedProfit();
    }
  }, [props.pointValue]);

  function pointValueChangedProfit() {
    let pointAwaySl = -1;
    let pointAwayTp = -1;
    let priceSl = 0;
    let priceTp = 0;
    let notInsertSl = 0;
    let notInsertTp = 0;

    if (!isNaN(props.pointValue) && props.pointValue !== null) {
      pointAwaySl = calculatePointAway(
        props.activeSymbol.isAsk,
        1,
        st_pos_sl_profit,
        props.pointValue
      );

      pointAwayTp = calculatePointAway(
        props.activeSymbol.isAsk,
        0,
        st_pos_tp_profit,
        props.pointValue
      );
    }

    if (
      !isNaN(props.pointValue) &&
      props.pointValue !== null &&
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null &&
      pointAwaySl > 0
    ) {
      priceSl = parseFloat(
        calculatePrice(
          props.activeSymbol.isAsk,
          1,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          pointAwaySl,
          props.activeSymbol.data.digits
        )
      );

      if (props.activeSymbol.isAsk) {
        if (priceSl > parseFloat(props.activeSymbol.ask) || priceSl < 0) {
          notInsertSl = 1;
        }
      } else {
        if (priceSl < parseFloat(props.activeSymbol.ask) || priceSl < 0) {
          notInsertSl = 1;
        }
      }
    }

    if (
      !isNaN(props.pointValue) &&
      props.pointValue !== null &&
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null &&
      pointAwayTp > 0
    ) {
      priceTp = parseFloat(
        calculatePrice(
          props.activeSymbol.isAsk,
          0,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          pointAwayTp,
          props.activeSymbol.data.digits
        )
      );

      if (props.activeSymbol.isAsk) {
        if (priceTp < parseFloat(props.activeSymbol.ask) || priceTp < 0) {
          notInsertTp = 1;
        }
      } else {
        if (priceTp > parseFloat(props.activeSymbol.ask) || priceTp < 0) {
          notInsertTp = 1;
        }
      }
    }

    if (pointAwaySl > 0 && !notInsertSl) {
      setst_pos_sl_point_away(pointAwaySl);
      setst_pos_sl_price(priceSl);
    }
    if (pointAwayTp > 0 && !notInsertTp) {
      setst_pos_tp_point_away(pointAwayTp);
      setst_pos_tp_price(priceTp);
    }
  }

  function pointValueChangedPointAway() {
    let profitSl = -1;
    let profitTp = -1;
    let perc_balanceSl = 0;
    let perc_balanceTp = 0;
    let notInsertSl = 0;
    let notInsertTp = 0;

    if (
      !isNaN(props.pointValue) &&
      props.pointValue !== null &&
      props.pointValue != 0
    ) {
      profitSl = calculateProfit(
        1,
        st_pos_sl_point_away,
        props.pointValue,
        props.activeSymbol.data.digits
      );
      profitTp = calculateProfit(
        0,
        st_pos_tp_point_away,
        props.pointValue,
        props.activeSymbol.data.digits
      );
      if (profitSl > 0) {
        notInsertSl = 1;
      }

      if (profitTp < 0) {
        notInsertTp = 1;
      }
    }

    if (
      props.totalFigureData !== null &&
      props.totalFigureData.Balance !== undefined &&
      props.activeSymbol !== null &&
      props.activeSymbol.isAsk !== undefined
    ) {
      perc_balanceSl = calculateBalancePercent(
        props.activeSymbol.isAsk,
        1,
        profitSl,
        props.totalFigureData.Balance
      );
      if (perc_balanceSl < 0) {
        notInsertSl = 1;
      }

      perc_balanceTp = calculateBalancePercent(
        props.activeSymbol.isAsk,
        1,
        profitTp,
        props.totalFigureData.Balance
      );
      if (perc_balanceTp < 0) {
        notInsertTp = 1;
      }
    }

    if (!notInsertSl) {
      setst_pos_sl_profit(profitSl);
      setst_pos_sl_perc_balance(perc_balanceSl);
    }
    if (!notInsertTp) {
      setst_pos_tp_profit(profitTp);
      setst_pos_tp_perc_balance(perc_balanceTp);
    }
  }

  const onProfitChange = (e, isSl) => {
    let price = 0;
    let pointAway = 0;
    let perc_balance = 0;

    if (isSl && e.target.value > 0) {
      e.target.value = 0;
      setst_pos_sl_profit(e.target.value);
    }
    if (!isSl && e.target.value < 0) {
      e.target.value = 0;
      setst_pos_tp_profit(e.target.value);
    }

    if (!isNaN(props.pointValue) && props.pointValue !== null) {
      pointAway = calculatePointAway(
        props.activeSymbol.isAsk,
        isSl,
        e.target.value,
        props.pointValue
      );
      //  console.log('PROFIT point away = ', pointAway);
      if (pointAway < 0) {
        return false;
      }
    }

    if (
      !isNaN(props.pointValue) &&
      props.pointValue !== null &&
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      price = parseFloat(
        calculatePrice(
          props.activeSymbol.isAsk,
          isSl,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          pointAway,
          props.activeSymbol.data.digits
        )
      );
      console.log("PROFIT price = ", price);
      if (props.activeSymbol.isAsk) {
        if ((isSl && price > parseFloat(props.activeSymbol.ask)) || price < 0) {
          return false;
        }
        if (
          (!isSl && price < parseFloat(props.activeSymbol.ask)) ||
          price < 0
        ) {
          return false;
        }
      } else {
        if ((isSl && price < parseFloat(props.activeSymbol.ask)) || price < 0) {
          return false;
        }
        if (
          (!isSl && price > parseFloat(props.activeSymbol.ask)) ||
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
        props.activeSymbol.isAsk,
        isSl,
        e.target.value,
        props.totalFigureData.Balance
      );
      if (perc_balance < 0) {
        return false;
      }
    }
    if (isSl) {
      setst_pos_sl_price(price);
      setst_pos_sl_point_away(pointAway);
      setst_pos_sl_perc_balance(perc_balance);
      setst_pos_sl_profit(e.target.value);
    } else {
      setst_pos_tp_price(price);
      setst_pos_tp_point_away(pointAway);
      setst_pos_tp_perc_balance(perc_balance);
      setst_pos_tp_profit(e.target.value);
    }
  };

  const onPriceChange = (e, isSl) => {
    // Calculating Price
    let price = 0;
    if (
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      if (isSl) {
        if (props.activeSymbol.isAsk) {
          if (parseFloat(e.target.value) > parseFloat(props.activeSymbol.ask)) {
            price =
              parseFloat(props.activeSymbol.ask) -
              getStep(props.activeSymbol.data.volumeStep);
          } else {
            price = e.target.value;
          }
        } else {
          if (parseFloat(e.target.value) < parseFloat(props.activeSymbol.bid)) {
            price =
              parseFloat(props.activeSymbol.bid) +
              getStep(props.activeSymbol.data.volumeStep);
          } else {
            price = e.target.value;
          }
        }
      } else {
        if (props.activeSymbol.isAsk) {
          if (parseFloat(e.target.value) < parseFloat(props.activeSymbol.ask)) {
            price =
              parseFloat(props.activeSymbol.ask) +
              getStep(props.activeSymbol.data.volumeStep);
          } else {
            price = e.target.value;
          }
        } else {
          if (parseFloat(e.target.value) > parseFloat(props.activeSymbol.bid)) {
            price =
              parseFloat(props.activeSymbol.bid) -
              getStep(props.activeSymbol.data.volumeStep);
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
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      profit = parseFloat(
        calculateProfitFromPrice(
          props.activeSymbol.isAsk,
          isSl,
          price,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          props.pointValue,
          props.activeSymbol.data.digits
        )
      );
      console.log("PRICE profit = ", profit);
      if (isSl && profit > 0) {
        return false;
      }
    }

    // Calculate points away

    if (!isNaN(props.pointValue) && props.pointValue !== null) {
      pointAway = calculatePointAway(
        props.activeSymbol.isAsk,
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
        props.activeSymbol.isAsk,
        isSl,
        profit,
        props.totalFigureData.Balance
      );
      if (perc_balance < 0) {
        return false;
      }
    }

    if (isSl) {
      setst_pos_sl_price(price);
      setst_pos_sl_profit(profit);
      setst_pos_sl_point_away(pointAway);
      setst_pos_sl_perc_balance(perc_balance);
    } else {
      setst_pos_tp_price(price);
      setst_pos_tp_point_away(pointAway);
      setst_pos_tp_profit(profit);
      setst_pos_tp_perc_balance(perc_balance);
    }
  };

  const onPointAwayChange = (e, isSl) => {
    // Calculate price
    let price = 0;
    let profit = 0;
    let perc_balance = 0;

    if (e.target.value < 0) {
      e.target.value = 0;
    }

    if (
      !isNaN(props.pointValue) &&
      props.pointValue !== null &&
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      price = parseFloat(
        calculatePrice(
          props.activeSymbol.isAsk,
          isSl,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          e.target.value,
          props.activeSymbol.data.digits
        )
      );
      console.log("POINT AWAY price = ", price);
      if (isSl) {
        if (props.activeSymbol.isAsk) {
          if (price > parseFloat(props.activeSymbol.ask) || price < 0) {
            return false;
          }
        } else {
          if (price < parseFloat(props.activeSymbol.ask) || price < 0) {
            return false;
          }
        }
      } else {
        if (props.activeSymbol.isAsk) {
          if (price < parseFloat(props.activeSymbol.ask) || price < 0) {
            return false;
          }
        } else {
          if (price < parseFloat(props.activeSymbol.ask) || price < 0) {
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
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      profit = calculateProfit(
        isSl,
        e.target.value,
        props.pointValue,
        props.activeSymbol.data.digits
      );
      if (isSl && profit > 0) {
        return false;
      }
    }

    // Calculate Percernt of balan ce
    if (
      props.totalFigureData !== null &&
      props.totalFigureData.Balance !== undefined
    ) {
      perc_balance = calculateBalancePercent(
        props.activeSymbol.isAsk,
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
      setst_pos_sl_perc_balance(perc_balance);
      setst_pos_sl_profit(profit);
      setst_pos_sl_price(price);
      setst_pos_sl_point_away(e.target.value);
    } else {
      setst_pos_tp_perc_balance(perc_balance);
      setst_pos_tp_profit(profit);
      setst_pos_tp_price(price);
      setst_pos_tp_point_away(e.target.value);
    }
  };

  const onPercenOfBalanveChange = (e, isSl) => {
    let profit = 0;
    let price = 0;
    let pointAway = 0;

    if (e.target.value < 0) {
      e.target.value = 0;
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
        props.activeSymbol.data.digits
      );
      if (isSl && profit > 0) {
        return false;
      }
    }
    // Calculate points away

    if (!isNaN(props.pointValue) && props.pointValue !== null) {
      pointAway = calculatePointAway(
        props.activeSymbol.isAsk,
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
      props.activeSymbol.isAsk !== null &&
      props.activeSymbol.bid !== null &&
      props.activeSymbol.ask !== null
    ) {
      price = parseFloat(
        calculatePrice(
          props.activeSymbol.isAsk,
          isSl,
          props.activeSymbol.isAsk
            ? props.activeSymbol.ask
            : props.activeSymbol.bid,
          pointAway,
          props.activeSymbol.data.digits
        )
      );

      if (props.activeSymbol.isAsk) {
        if ((isSl && price > parseFloat(props.activeSymbol.ask)) || price < 0) {
          return false;
        }
        if (
          (!isSl && price < parseFloat(props.activeSymbol.ask)) ||
          price < 0
        ) {
          return false;
        }
      } else {
        if ((isSl && price < parseFloat(props.activeSymbol.ask)) || price < 0) {
          return false;
        }
        if (
          (!isSl && price < parseFloat(props.activeSymbol.ask)) ||
          price < 0
        ) {
          return false;
        }
      }
    }

    if (isSl) {
      setst_pos_sl_price(price);
      setst_pos_sl_profit(profit);
      setst_pos_sl_perc_balance(e.target.value);
      setst_pos_sl_point_away(pointAway);
    } else {
      setst_pos_tp_price(price);
      setst_pos_tp_profit(profit);
      setst_pos_tp_perc_balance(e.target.value);
      setst_pos_tp_point_away(pointAway);
    }
  };

  return (
    <div className="sell-buy-sltp-input d-flex flex-wrap justify-content-between mt-5">
      <div className="col-4 text-center mb-1">
        <span>{t("Stop Loss")}</span>
      </div>
      <div className="col-4 mb-1"></div>
      <div className="col-4 mb-1 text-center">
        <span>{t("Take Profit")}</span>
      </div>
      <div className="col-4 mt-2 d-flex">
        <input
          type="number"
          ref={pos_sl_profit}
          onBlur={(e) => {
            onProfitChange(e, true);
          }}
          onChange={(e) => {
            setst_pos_sl_profit(e.target.value);
          }}
          className="form-control"
          value={st_pos_sl_profit}
        />
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 0px 2px",
              opacity: lockedInput == 1 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(1);
            }}
          />
        }
      </div>
      <div className="col-4 mt-2 text-center">
        <span>{t("Profit")}</span>
      </div>
      <div className="col-4 mt-2 d-flex">
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 2px 0px",
              opacity: lockedInput == 1 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(1);
            }}
          />
        }
        <input
          type="number"
          ref={pos_tp_profit}
          onBlur={(e) => {
            onProfitChange(e, false);
          }}
          onChange={(e) => {
            setst_pos_tp_profit(e.target.value);
          }}
          className="form-control"
          value={st_pos_tp_profit}
        />
      </div>

      <div className="col-4 mt-2 d-flex">
        <input
          type="number"
          ref={pos_sl_point_away}
          min="0"
          onBlur={(e) => {
            onPointAwayChange(e, true);
          }}
          onChange={(e) => {
            setst_pos_sl_point_away(e.target.value);
          }}
          className="form-control"
          value={st_pos_sl_point_away}
        />
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 0px 2px",
              opacity: lockedInput == 2 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(2);
            }}
          />
        }
      </div>
      <div className="col-4 mt-2 text-center">
        <span>{t("Points Away")}</span>
      </div>
      <div className="col-4 mt-2 d-flex">
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 2px 0px",
              opacity: lockedInput == 2 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(2);
            }}
          />
        }
        <input
          type="number"
          ref={pos_tp_point_away}
          min="0"
          onBlur={(e) => {
            onPointAwayChange(e, false);
          }}
          onChange={(e) => {
            setst_pos_tp_point_away(e.target.value);
          }}
          className="form-control"
          value={st_pos_tp_point_away}
        />
      </div>

      <div className="col-4 mt-2 d-flex">
        <input
          type="number"
          ref={pos_sl_perc_balance}
          min="0"
          onBlur={(e) => {
            onPercenOfBalanveChange(e, true);
          }}
          onChange={(e) => {
            setst_pos_sl_perc_balance(e.target.value);
          }}
          className="form-control"
          value={st_pos_sl_perc_balance}
        />
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 0px 2px",
              opacity: lockedInput == 3 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(3);
            }}
          />
        }
      </div>
      <div className="col-4 mt-2 text-center">
        <span>{t("% of Balance")}</span>
      </div>
      <div className="col-4 mt-2 d-flex">
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 2px 0px",
              opacity: lockedInput == 3 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(3);
            }}
          />
        }
        <input
          type="number"
          ref={pos_tp_perc_balance}
          min="0"
          onBlur={(e) => {
            onPercenOfBalanveChange(e, false);
          }}
          onChange={(e) => {
            setst_pos_tp_perc_balance(e.target.value);
          }}
          className="form-control"
          value={st_pos_tp_perc_balance}
        />
      </div>

      <div className="col-4 mt-2 d-flex">
        <input
          type="number"
          ref={pos_sl_price}
          min="0"
          step={
            props.activeSymbol.data.digits !== null &&
            props.activeSymbol.data.digits !== undefined
              ? 1 / Math.pow(10, props.activeSymbol.data.digits)
              : 0.01
          }
          onBlur={(e) => {
            onPriceChange(e, true);
          }}
          onChange={(e) => {
            setst_pos_sl_price(e.target.value);
          }}
          className="form-control"
          value={st_pos_sl_price}
        />
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 0px 2px",
              opacity: lockedInput == 4 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(4);
            }}
          />
        }
      </div>
      <div className="col-4 mt-2 text-center">
        <span>{t("Price")}</span>
      </div>
      <div className="col-4 mt-2 d-flex">
        {
          <FontAwesomeIcon
            icon={faLock}
            style={{
              margin: "9px 0px 2px 0px",
              opacity: lockedInput == 4 ? "1" : "0.5",
              cursor: "pointer",
            }}
            onClick={() => {
              setlockedInput(4);
            }}
          />
        }
        <input
          type="number"
          ref={pos_tp_price}
          min="0"
          step={
            props.activeSymbol.data.digits !== null &&
            props.activeSymbol.data.digits !== undefined
              ? 1 / Math.pow(10, props.activeSymbol.data.digits)
              : 0.01
          }
          onBlur={(e) => {
            onPriceChange(e, false);
          }}
          onChange={(e) => {
            setst_pos_tp_price(e.target.value);
          }}
          className="form-control"
          value={st_pos_tp_price}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    totalFigureData: state.totalFigureData.totalFigureData,
  };
};

export default connect(mapStateToProps, null)(PositionsSlTp);
