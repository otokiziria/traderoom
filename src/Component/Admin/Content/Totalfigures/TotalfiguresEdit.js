import React, { useRef, useState, useEffect } from "react";
import {
  saveTotalfigures,
  getTotalfigure
} from "../../../../Services/Totalfigures/totalfigures";
//import { showAlertMSG } from "../../../../Lib/helpers";

function TotalfiguresEdit(props) {
  const ref_balance = useRef(null);
  const ref_margin = useRef(null);
  const ref_profit = useRef(null);
  const ref_free_margin = useRef(null);
  const ref_equity = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [balanceSelected, setbalanceSelected] = useState(-1);
  const [marginSelected, setmarginSelected] = useState(-1);
  const [profitSelected, setprofitSelected] = useState(-1);
  const [equitySelected, setequitySelected] = useState(-1);
  const [free_marginSelected, setfree_marginSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getTotalfigureData = async () => {
    let retData = await getTotalfigure(props.data);
    if (retData !== null) {
      setstatusSelected(retData.row.status);
      setbalanceSelected(retData.row.balance);
      setmarginSelected(retData.row.margin);
      setprofitSelected(retData.row.profit);
      setequitySelected(retData.row.equity);
      setfree_marginSelected(retData.row.free_margin);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getTotalfigureData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      balance: ref_balance.current.value,
      margin: ref_margin.current.value,
      status: ref_status.current.value,
      profit: ref_profit.current.value,
      free_margin: ref_free_margin.current.value,
      equity: ref_equity.current.value,
    };
    saveTotalfigures(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_balance">Balance</label>
          <select
            ref={ref_balance}
            value={balanceSelected}
            id="for_balance"
            className="form-control"
            onChange={(e)=>{
                setbalanceSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_margin">Margin</label>
          <select
            ref={ref_margin}
            value={marginSelected}
            id="for_margin"
            className="form-control"
            onChange={(e)=>{
                setmarginSelected(e.target.value);
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
          <label htmlFor="for_free_margin">Free Margin</label>
          <select
            ref={ref_free_margin}
            value={free_marginSelected}
            id="for_free_margin"
            className="form-control"
            onChange={(e)=>{
                setfree_marginSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_equity">Equity</label>
          <select
            ref={ref_equity}
            value={equitySelected}
            id="for_equity"
            className="form-control"
            onChange={(e)=>{
                setequitySelected(e.target.value);
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

export default TotalfiguresEdit;
