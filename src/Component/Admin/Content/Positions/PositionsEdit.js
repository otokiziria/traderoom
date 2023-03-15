import React, { useRef, useState, useEffect } from "react";
import {
  savePositions,
  getPosition
} from "../../../../Services/Positions/positions";
//import { showAlertMSG } from "../../../../Lib/helpers";

function PositionsEdit(props) {
  const ref_symbol = useRef(null);
  const ref_time = useRef(null);
  const ref_ticket = useRef(null);
  const ref_type = useRef(null);
  const ref_lot = useRef(null);
  const ref_entry_price = useRef(null);
  const ref_sl = useRef(null);
  const ref_tp = useRef(null);
  const ref_cur_price = useRef(null);
  const ref_swap = useRef(null);
  const ref_profit = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [symbolSelected, setsymbolSelected] = useState(-1);
  const [timeSelected, settimeSelected] = useState(-1);
  const [ticketSelected, setticketSelected] = useState(-1);
  const [typeSelected, settypeSelected] = useState(-1);
  const [lotSelected, setlotSelected] = useState(-1);
  const [entry_priceSelected, setentry_priceSelected] = useState(-1);
  const [slSelected, setslSelected] = useState(-1);
  const [tpSelected, settpSelected] = useState(-1);
  const [cur_priceSelected, setcur_priceSelected] = useState(-1);
  const [swapSelected, setswapSelected] = useState(-1);
  const [profitSelected, setprofitSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getPositionData = async () => {
    let retData = await getPosition(props.data);
    if (retData !== null) {
      setstatusSelected(retData.row.status);
      setsymbolSelected(retData.row.symbol);
      settimeSelected(retData.row.time);
      setticketSelected(retData.row.ticket);
      settypeSelected(retData.row.type);
      setlotSelected(retData.row.lot);
      setentry_priceSelected(retData.row.entry_price);
      setslSelected(retData.row.sl);
      settpSelected(retData.row.tp);
      setcur_priceSelected(retData.row.cur_price);
      setswapSelected(retData.row.swap);
      setprofitSelected(retData.row.profit);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getPositionData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      symbol: ref_symbol.current.value,
      time: ref_time.current.value,
      status: ref_status.current.value,
      ticket: ref_ticket.current.value,
      type: ref_type.current.value,
      lot: ref_lot.current.value,
      entry_price: ref_entry_price.current.value,
      sl: ref_sl.current.value,
      tp: ref_tp.current.value,
      cur_price: ref_cur_price.current.value,
      swap: ref_swap.current.value,
      profit: ref_profit.current.value,
    };
    savePositions(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_state">Symbol</label>
          <select
            ref={ref_symbol}
            value={symbolSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setsymbolSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Time</label>
          <select
            ref={ref_time}
            value={timeSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                settimeSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Type</label>
          <select
            ref={ref_type}
            value={typeSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                settypeSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Ticket</label>
          <select
            ref={ref_ticket}
            value={ticketSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setticketSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Lot</label>
          <select
            ref={ref_lot}
            value={lotSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setlotSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Entry Price</label>
          <select
            ref={ref_entry_price}
            value={entry_priceSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setentry_priceSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">SL</label>
          <select
            ref={ref_sl}
            value={slSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setslSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">TP</label>
          <select
            ref={ref_tp}
            value={tpSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                settpSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Current Price</label>
          <select
            ref={ref_cur_price}
            value={cur_priceSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setcur_priceSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Swap</label>
          <select
            ref={ref_swap}
            value={swapSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setswapSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_profit">Profit</label>
          <select
            ref={ref_profit}
            value={profitSelected}
            id="for_profit"
            className="form-control"
            onChange={(e)=>{
                setprofitSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        
        
        
        
        <div className="form-group">
          <label htmlFor="for_state">State</label>
          <select
            ref={ref_status}
            value={statusSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setstatusSelected(e.target.value);
            }}
          >
            <option value="0">Unpublished</option>
            <option value="1">Published</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            saveData();
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default PositionsEdit;
