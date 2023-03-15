import React, { useRef, useState, useEffect } from "react";
import _ from 'lodash';
import axios from 'axios';
import {
  saveSymbolsSettings,
  getSymbolsSetting,
} from "../../../../Services/Symbols-Settings/symbols-settings";
import { showAlertMSG } from "../../../../Lib/helpers";
import { json } from "body-parser";
import { getSymbols } from "../../../../Services/Symbols/symbols";

function SymbolsSettingsEdit(props) {
  const ref_title = useRef(null);
  const ref_show_title = useRef(null);
  const ref_show_change = useRef(null);
  const ref_show_high = useRef(null);
  const ref_show_low = useRef(null);
  const ref_show_24hour = useRef(null);
  const ref_show_price = useRef(null);
  const ref_show_time = useRef(null);
  const ref_show_chart = useRef(null);
  const ref_status = useRef(null);

   const [titleSelected, settitleSelected] = useState(-1); 
   const [statusSelected, setstatusSelected] = useState(-1);
   const [showtitleSelected, setshowtitleSelected] = useState(-1);
   const [showchangeSelected, setshowchangeSelected] = useState(-1);
   const [showhighSelected, setshowhighSelected] = useState(-1);
   const [showlowSelected, setshowlowSelected] = useState(-1);
   const [show24hourSelected, setshow24hourSelected] = useState(-1);
   const [showpriceSelected, setshowpriceSelected] = useState(-1);
   const [showtimeSelected, setshowtimeSelected] = useState(-1);
   const [showchartSelected, setshowchartSelected] = useState(-1);


  const getSymbolsSettingData = async () => {
    let retData = await getSymbolsSetting(props.data);
    if (retData !== null) {
      settitleSelected(retData.row.title);
      setshowtitleSelected(retData.row.show_title);
      setshowchangeSelected(retData.row.show_change);
      setshowhighSelected(retData.row.show_high);
      setshowlowSelected(retData.row.show_low);
      setshow24hourSelected(retData.row.show_24hour);
      setshowpriceSelected(retData.row.show_price);
      setshowtimeSelected(retData.row.show_time);
      setshowchartSelected(retData.row.show_chart);  
      setstatusSelected(retData.row.status);
    }
  };


  useEffect(() => {
    if (props.data !== 0) {
      getSymbolsSettingData(props.data);
    }
    // getSortedCategoriesData();
  }, []);

  const saveData = () => {
    if (
      ref_title.current.value === undefined ||
      ref_title.current.value.length == 0
    ) {
      showAlertMSG("Title is empty", 3);
      return false;
    }
    let data = {
      id: props.data,
      title: ref_title.current.value,
      show_title: ref_show_title.current.value,
      show_change: ref_show_change.current.value,
      show_high: ref_show_high.current.value,
      show_low: ref_show_low.current.value,
      show_24hour: ref_show_24hour.current.value,
      show_price: ref_show_price.current.value,
      show_time: ref_show_time.current.value,
      show_chart: ref_show_chart.current.value,
      status: ref_status.current.value,
    };
    saveSymbolsSettings(data);
  };


  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
      <div className="form-group">
          <label htmlFor="for_title">Title</label>
          <select
            ref={ref_title}
            value={titleSelected}
            id="for_title"
            className="form-control"
            onChange={(e)=>{
                settitleSelected(e.target.value);
            }}
          >
            <option value="0">symbol</option>
            <option value="1">short name</option>
            <option value="2">description</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_show_title">Show Title</label>
          <select
            ref={ref_show_title}
            value={showtitleSelected}
            id="for_show_title"
            className="form-control"
            onChange={(e)=>{
                setshowtitleSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_change">Show Change</label>
          <select
            ref={ref_show_change}
            value={showchangeSelected}
            id="for_show_change"
            className="form-control"
            onChange={(e)=>{
                setshowchangeSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_high">Show High</label>
          <select
            ref={ref_show_high}
            value={showhighSelected}
            id="for_show_high"
            className="form-control"
            onChange={(e)=>{
                setshowhighSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_low">Show Low</label>
          <select
            ref={ref_show_low}
            value={showlowSelected}
            id="for_show_low"
            className="form-control"
            onChange={(e)=>{
                setshowlowSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_24hour">Show 24 Hour</label>
          <select
            ref={ref_show_24hour}
            value={show24hourSelected}
            id="for_show_24hour"
            className="form-control"
            onChange={(e)=>{
                setshow24hourSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_price">Show Price</label>
          <select
            ref={ref_show_price}
            value={showpriceSelected}
            id="for_show_price"
            className="form-control"
            onChange={(e)=>{
                setshowpriceSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_time">Show Time</label>
          <select
            ref={ref_show_time}
            value={showtimeSelected}
            id="for_show_time"
            className="form-control"
            onChange={(e)=>{
                setshowtimeSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="for_show_chart">Show Chart</label>
          <select
            ref={ref_show_chart}
            value={showchartSelected}
            id="for_show_chart"
            className="form-control"
            onChange={(e)=>{
                setshowchartSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
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

export default SymbolsSettingsEdit;
