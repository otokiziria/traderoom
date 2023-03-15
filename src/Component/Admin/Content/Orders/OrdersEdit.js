import React, { useRef, useState, useEffect } from "react";
import {
  saveOrders,
  getOrder
} from "../../../../Services/Orders/orders";
//import { showAlertMSG } from "../../../../Lib/helpers";

function OrdersEdit(props) {
  const ref_symbol = useRef(null);
  const ref_time = useRef(null);
  const ref_ticket = useRef(null);
  const ref_type = useRef(null);
  const ref_volume = useRef(null);
  const ref_price = useRef(null);
  const ref_sl = useRef(null);
  const ref_tp = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [symbolSelected, setsymbolSelected] = useState(-1);
  const [timeSelected, settimeSelected] = useState(-1);
  const [ticketSelected, setticketSelected] = useState(-1);
  const [typeSelected, settypeSelected] = useState(-1);
  const [volumeSelected, setvolumeSelected] = useState(-1);
  const [priceSelected, setpriceSelected] = useState(-1);
  const [slSelected, setslSelected] = useState(-1);
  const [tpSelected, settpSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getOrderData = async () => {
    let retData = await getOrder(props.data);
    if (retData !== null) {
      setstatusSelected(retData.row.status);
      setsymbolSelected(retData.row.symbol);
      settimeSelected(retData.row.time);
      setticketSelected(retData.row.ticket);
      settypeSelected(retData.row.type);
      setvolumeSelected(retData.row.voume);
      setpriceSelected(retData.row.price);
      setslSelected(retData.row.sl);
      settpSelected(retData.row.tp);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getOrderData(props.data);
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
      volume: ref_volume.current.value,
      price: ref_price.current.value,
      sl: ref_sl.current.value,
      tp: ref_tp.current.value
    };
    saveOrders(data);
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
          <label htmlFor="for_volume">Volume</label>
          <select
            ref={ref_volume}
            value={volumeSelected}
            id="for_volume"
            className="form-control"
            onChange={(e)=>{
                setvolumeSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_price">Price</label>
          <select
            ref={ref_price}
            value={priceSelected}
            id="for_price"
            className="form-control"
            onChange={(e)=>{
                setpriceSelected(e.target.value);
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

export default OrdersEdit;
