import React, { useRef, useState, useEffect } from "react";
import _ from 'lodash';
import axios from 'axios';
import {
  saveCharts,
  getChart,
} from "../../../../Services/Charts/charts";
import { showAlertMSG } from "../../../../Lib/helpers";
import { json } from "body-parser";
import { getSymbols } from "../../../../Services/Symbols/symbols";

function ChartsEdit(props) {
  const ref_title = useRef(null);
  const ref_hidevolume = useRef(null);
  const ref_container_id = useRef(null);
  const ref_library_path = useRef(null);
  const ref_interval = useRef(null);
  const ref_allow_symbol_change = useRef(null);
  const ref_withdateranges = useRef(null);
  const ref_disabled_features = useRef(null);
  const ref_enabled_features = useRef(null);
  const ref_locale = useRef(null);
  const ref_charts_storage_url = useRef(null);
  const ref_chartsStorageApiVersion = useRef(null);
  const ref_clientId = useRef(null);
  const ref_fullscreen = useRef(null);
  const ref_autosize = useRef(null);
  const ref_data_status = useRef(null);
  const ref_studies_overrides = useRef(null);
  const ref_Overlay = useRef(null);
  const ref_userId = useRef(null);
  const ref_overrides = useRef(null);
  const ref_widgetbar = useRef(null);
  const ref_status = useRef(null);
  const ref_mainSeriesProperties_showCountdown = useRef(null);

//   Overlay json
  const ref_style = useRef(null);
  const ref_lineStyle_styleType = useRef(null);

//  overrides json
  const ref_mainSeriesProperties_style = useRef(null);
  const [mainSeriesProperties_showCountdownSelected, setmainSeriesProperties_showCountdownSelected] = useState(-1);
  const ref_paneProperties_background = useRef(null);
  const ref_paneProperties_vertGridProperties_color = useRef(null);
  const ref_paneProperties_horzGridProperties_color = useRef(null);
  const ref_symbolWatermarkProperties_transparency = useRef(null);
  const ref_scalesProperties_textColor = useRef(null);
  const ref_mainSeriesProperties_candleStyle_wickUpColor = useRef(null);
  const ref_mainSeriesProperties_candleStyle_wickDownColor = useRef(null);
  const ref_watchlist_settings_pane_legend = useRef(null);
  const [watchlist_settings_pane_legendSelected, setwatchlist_settings_pane_legendSelected] = useState(-1);
  const ref_mainSeriesProperties_areaStyle_color1 = useRef(null);
  const ref_mainSeriesProperties_areaStyle_color2 = useRef(null);
  const ref_mainSeriesProperties_areaStyle_linecolor = useRef(null);
  const ref_mainSeriesProperties_areaStyle_linewidth = useRef(null);
  const ref_paneProperties_axisProperties_isInverted = useRef(null);
  const [paneProperties_axisProperties_isInvertedSelected, setpaneProperties_axisProperties_isInvertedSelected] = useState(-1);
  const ref_scalesProperties_backgroundColor = useRef(null);
  const ref_paneProperties_crossHairProperties_color = useRef(null);
  const ref_mainSeriesProperties_areaStyle_priceSource = useRef(null);

  // widgetbar
  const ref_details = useRef(null);
  const [detailsSelected, setdetailsSelected] = useState(-1);
  const ref_watchlist = useRef(null);
  const [watchlistSelected, setwatchlistSelected] = useState(-1);

  // watchlist_settings
  const ref_default_symbols = useRef([]);
  const [default_symbolsSelected, setdefault_symbolsSelected] = useState([]);
  const ref_readonly = useRef(null);
  const [readonlySelected, setreadonlySelected] = useState(-1);

//   const [sortedOptions, setsortedOptions] = useState([]);
   const [statusSelected, setstatusSelected] = useState(-1);
   const [hidevolumeSelected, sethidevolumeSelected] = useState(-1);
   const [allow_symbol_changeSelected, setallow_symbol_changeSelected] = useState(-1);
   const [withdaterangesSelected, setwithdaterangesSelected] = useState(-1);
   const [fullscreenSelected, setfullscreenSelected] = useState(-1);
   const [autosizeSelected, setautosizeSelected] = useState(-1);
//   const [parentSelected, setparentSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

//   const generateSelectOptions = (sortedcategory) => {
//     if (sortedcategory.length > 0) {
//       let nsortedCategory = [];

//       for (let i = 0; i < sortedcategory.length; i++) {
//         let sub = "";
//         if (sortedcategory[i].level > 0) {
//           for (let a = 0; a < sortedcategory[i].level; a++) {
//             sub += "!_";
//           }
//         }
//         nsortedCategory.push(
//           <option key={i} value={sortedcategory[i].id}>
//             {sub + sortedcategory[i].title}
//           </option>
//         );
//       }
//       setsortedOptions(nsortedCategory);
//     }
//   };

  const getChartData = async () => {
    let retData = await getChart(props.data);
    if (retData !== null) {
      console.log(retData.row.Overlay, "test getdata");
      ref_title.current.value = retData.row.title;
      sethidevolumeSelected(retData.row.hidevolume);
      ref_container_id.current.value = retData.row.container_id;
      ref_library_path.current.value = retData.row.library_path;
      ref_interval.current.value = retData.row.interval;
      setallow_symbol_changeSelected(retData.row.allow_symbol_change);
      setwithdaterangesSelected(retData.row.withdateranges);
      ref_disabled_features.current.value = retData.row.disabled_features;
      ref_enabled_features.current.value = retData.row.enabled_features;
      ref_locale.current.value = retData.row.locale;
      ref_charts_storage_url.current.value = retData.row.charts_storage_url;
      ref_chartsStorageApiVersion.current.value = retData.row.chartsStorageApiVersion;
      ref_clientId.current.value = retData.row.clientId;
      setfullscreenSelected(retData.row.fullscreen);
      setautosizeSelected(retData.row.autosize);
      ref_data_status.current.value = retData.row.data_status;
      ref_studies_overrides.current.value = retData.row.studies_overrides;
      // ref_Overlay.current.value = retData.row.Overlay;
      ref_userId.current.value = retData.row.userId;

      // ref_overrides.current.value = retData.row.overrides;
      // ref_widgetbar.current.value = retData.row.widgetbar;
// Overlay
      ref_style.current.value = retData.row.Overlay.style;           
      ref_lineStyle_styleType.current.value = retData.row.Overlay.lineStyle_styleType; 


      console.log(retData.row.overrides, "oto overrides");
      ref_mainSeriesProperties_style.current.value = retData.row.overrides.mainSeriesProperties_style;
      ref_mainSeriesProperties_showCountdown.current.value = retData.row.overrides.mainSeriesProperties_stylemainSeriesProperties_showCountdown;
      ref_paneProperties_background.current.value = retData.row.overrides.paneProperties_background;
      ref_paneProperties_vertGridProperties_color.current.value = retData.row.overrides.paneProperties_vertGridProperties_color;
      ref_paneProperties_horzGridProperties_color.current.value = retData.row.overrides.paneProperties_horzGridProperties_color;
      ref_symbolWatermarkProperties_transparency.current.value = retData.row.overrides.symbolWatermarkProperties_transparency;
      ref_scalesProperties_textColor.current.value = retData.row.overrides.scalesProperties_textColor;
      ref_mainSeriesProperties_candleStyle_wickUpColor.current.value = retData.row.overrides.mainSeriesProperties_candleStyle_wickUpColor;
      ref_mainSeriesProperties_candleStyle_wickDownColor.current.value = retData.row.overrides.mainSeriesProperties_candleStyle_wickDownColor;
      ref_watchlist_settings_pane_legend.current.value = retData.row.overrides.watchlist_settings_pane_legend;
      ref_mainSeriesProperties_areaStyle_color1.current.value = retData.row.overrides.mainSeriesProperties_areaStyle_color1;
      ref_mainSeriesProperties_areaStyle_color2.current.value = retData.row.overrides.mainSeriesProperties_areaStyle_color2;
      ref_mainSeriesProperties_areaStyle_linecolor.current.value = retData.row.overrides.mainSeriesProperties_areaStyle_linecolor;
      ref_mainSeriesProperties_areaStyle_linewidth.current.value = retData.row.overrides.mainSeriesProperties_areaStyle_linewidth;
      ref_paneProperties_axisProperties_isInverted.current.value = retData.row.overrides.paneProperties_axisProperties_isInverted;
      ref_scalesProperties_backgroundColor.current.value = retData.row.overrides.scalesProperties_backgroundColor;
      ref_paneProperties_crossHairProperties_color.current.value = retData.row.overrides.paneProperties_crossHairProperties_color;
      ref_mainSeriesProperties_areaStyle_priceSource.current.value = retData.row.overrides.mainSeriesProperties_areaStyle_priceSource;

      // widgetbar
      ref_details.current.value = retData.row.widgetbar.details;
      ref_watchlist.current.value = retData.row.widgetbar.watchlist;

      ref_default_symbols.current.value = retData.row.widgetbar.default_symbols;
      ref_readonly.current.value = retData.row.widgetbar.readonly;


      setstatusSelected(retData.row.status);
    //   setparentSelected(retData.row.parent_id);
      // generateSelectOptions();
    }
  };

//   const getSortedCategoriesData = async () => {
//     let sortedCategoryData = await getSortedCategories();
    //setsortedcategory(sortedCategoryData.row);
    //console.log(sortedCategoryData.row, sortedcategory);
//     generateSelectOptions(sortedCategoryData.row);
//   };

  useEffect(() => {
    if (props.data !== 0) {
      getChartData(props.data);
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
      hidevolume: ref_hidevolume.current.value,
      container_id: ref_container_id.current.value,
      library_path: ref_library_path.current.value,
      interval: ref_interval.current.value,
      allow_symbol_change: ref_allow_symbol_change.current.value,
      withdateranges: ref_withdateranges.current.value,
      disabled_features: ref_disabled_features.current.value,
      enabled_features: ref_enabled_features.current.value,
      locale: ref_locale.current.value,
      charts_storage_url: ref_charts_storage_url.current.value,
      chartsStorageApiVersion: ref_chartsStorageApiVersion.current.value,
      clientId: ref_clientId.current.value,
      fullscreen: ref_fullscreen.current.value,
      autosize: ref_autosize.current.value,
      data_status: ref_data_status.current.value,
      studies_overrides: ref_studies_overrides.current.value,
      userId: ref_userId.current.value,
      // overrides: ref_overrides.current.value,
      // widgetbar: ref_widgetbar.current.value,
      status: ref_status.current.value,

      Overlay: { 
        style: ref_style.current.value,           
        lineStyle_styleType: ref_lineStyle_styleType.current.value 
              },      
      overrides:
          {
            mainSeriesProperties_style: ref_mainSeriesProperties_style.current.value,
            mainSeriesProperties_showCountdown: ref_mainSeriesProperties_showCountdown.current.value,
            paneProperties_background: ref_paneProperties_background.current.value,
            paneProperties_vertGridProperties_color: ref_paneProperties_vertGridProperties_color.current.value,
            paneProperties_horzGridProperties_color: ref_paneProperties_horzGridProperties_color.current.value,
            symbolWatermarkProperties_transparency: ref_symbolWatermarkProperties_transparency.current.value,
            scalesProperties_textColor: ref_scalesProperties_textColor.current.value,
            mainSeriesProperties_candleStyle_wickUpColor: ref_mainSeriesProperties_candleStyle_wickUpColor.current.value,
            mainSeriesProperties_candleStyle_wickDownColor: ref_mainSeriesProperties_candleStyle_wickDownColor.current.value,
            watchlist_settings_pane_legend: ref_watchlist_settings_pane_legend.current.value,
            mainSeriesProperties_areaStyle_color1: ref_mainSeriesProperties_areaStyle_color1.current.value,
            mainSeriesProperties_areaStyle_color2: ref_mainSeriesProperties_areaStyle_color2.current.value,
            mainSeriesProperties_areaStyle_linecolor: ref_mainSeriesProperties_areaStyle_linecolor.current.value,
            mainSeriesProperties_areaStyle_linewidth: ref_mainSeriesProperties_areaStyle_linewidth.current.value,
            paneProperties_axisProperties_isInverted: ref_paneProperties_axisProperties_isInverted.current.value,
            scalesProperties_backgroundColor: ref_scalesProperties_backgroundColor.current.value,
            paneProperties_crossHairProperties_color: ref_paneProperties_crossHairProperties_color.current.value,
            mainSeriesProperties_areaStyle_priceSource: ref_mainSeriesProperties_areaStyle_priceSource.current.value,
          },
      widgetbar:
          {
            details: ref_details.current.value,
            watchlist: ref_watchlist.current.value,

            default_symbols: ref_default_symbols.current.value,
            readonly: ref_readonly.current.value 
        }
    };
    saveCharts(data);
  };



  const [symbolsforwl, setSymbolsforwl] = useState(null);

  const getSymbolData = async () => {
    let res = await axios.get("/api/symbols/");
    if (res.data !== null) {
    setSymbolsforwl(res.data);
    }
  };

  useEffect(() => {
    getSymbolData();
  }, []);
  console.log(symbolsforwl, "oto2");
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_title">Title</label>
          <input
            ref={ref_title}
            type="text"
            className="form-control"
            id="for_title"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_hidevolume">Hidevolume</label>
          <select
            ref={ref_hidevolume}
            value={hidevolumeSelected}
            id="for_hidevolume"
            className="form-control"
            onChange={(e)=>{
                sethidevolumeSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_container_id">Container Id</label>
          <input
            ref={ref_container_id}
            defaultValue = "tv_chart_container"
            type="text"
            className="form-control"
            id="for_container_id"
            placeholder="Enter container_id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_library_path">Library Path</label>
          <input
            ref={ref_library_path}
            defaultValue="/charting_library/" 
            type="text"
            className="form-control"
            id="for_library_path"
            placeholder="Enter library_path"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_interval">Interval</label>
          <input
            ref={ref_interval}
            defaultValue="1"
            type="number"
            className="form-control"
            id="for_interval"
            placeholder="Enter interval"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_allow_symbol_change">Allow Symbol Change</label>
          <select
            ref={ref_allow_symbol_change}
            value={allow_symbol_changeSelected}
            id="for_allow_symbol_change"
            className="form-control"
            onChange={(e)=>{
                setallow_symbol_changeSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_withdateranges">Withdateranges</label>
          <select
            ref={ref_withdateranges}
            value={withdaterangesSelected}
            id="for_withdateranges"
            className="form-control"
            onChange={(e)=>{
                setwithdaterangesSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_disabled_features">Disabled Features</label>
          <textarea
            ref={ref_disabled_features}
            defaultValue=" "
            className="form-control"
            id="for_disabled_features"
            placeholder="Enter disabled_features"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="for_enabled_features">Enabled Features</label>
          <textarea
            ref={ref_enabled_features}
            defaultValue=" "
            className="form-control"
            id="for_enabled_features"
            placeholder="Enter enabled_features"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="for_locale">Locale</label>
          <input
            ref={ref_locale}
            defaultValue=" i18next.language"
            type="text"
            className="form-control"
            id="for_locale"
            placeholder="Enter locale"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_charts_storage_url">Charts Storage Url</label>
          <input
            ref={ref_charts_storage_url}
            defaultValue="https://saveload.tradingview.com"
            type="text"
            className="form-control"
            id="for_charts_storage_url"
            placeholder="Enter charts_storage_url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_chartsStorageApiVersion">ChartsStorageApiVersion</label>
          <input
            ref={ref_chartsStorageApiVersion}
            defaultValue="1.1"
            type="text"
            className="form-control"
            id="for_chartsStorageApiVersion"
            placeholder="Enter chartsStorageApiVersion"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_clientId">ClientId</label>
          <input
            ref={ref_clientId}
            defaultValue="tradingview.com"
            type="text"
            className="form-control"
            id="for_clientId"
            placeholder="Enter clientId"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_userId">UserId</label>
          <input
            ref={ref_userId}
            type="text"
            defaultValue="public_user_id"
            className="form-control"
            id="for_userId"
            placeholder="Enter userId"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_fullscreen">Fullscreen</label>
          <select
            ref={ref_fullscreen}
            value={fullscreenSelected}
            id="for_fullscreen"
            className="form-control"
            onChange={(e)=>{
                setfullscreenSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_autosize">Autosize</label>
          <select
            ref={ref_autosize}
            value={autosizeSelected}
            id="for_autosize"
            className="form-control"
            onChange={(e)=>{
                setautosizeSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_data_status">Data Status</label>
          <input
            ref={ref_data_status}
            type="text"
            defaultValue="Streaming"
            className="form-control"
            id="for_data_status"
            placeholder="Enter data_status"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_studies_overrides">Studies Overrides</label>
          <textarea
            ref={ref_studies_overrides}
            defaultValue=" "
            className="form-control"
            id="for_studies_overrides"
            placeholder="Enter studies_overrides"
          ></textarea>
        </div>
        {/* <div className="form-group">
          <label htmlFor="for_Overlay">Overlay</label>
          <textarea
            ref={ref_Overlay}
            className="form-control"
            id="for_Overlay"
            placeholder="Enter Overlay"
          ></textarea>
        </div> */}
        <h2>Overlay</h2>
        <div className="form-group">
          <label htmlFor="for_data_status">Style</label>
          <input
            ref={ref_style}
            defaultValue="3"
            type="text"
            className="form-control"
            id="for_style"
            placeholder="Enter style"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_lineStyle_styleType">LineStyle.StyleType</label>
          <input
            ref={ref_lineStyle_styleType}
            defaultValue="0"
            type="text"
            className="form-control"
            id="for_lineStyle_styleType"
            placeholder="Enter lineStyle.styleType"
          />
        </div>

        <h2>overrides</h2>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_style">mainSeriesProperties.style</label>
          <input
            ref={ref_mainSeriesProperties_style}
            defaultValue="3"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_style"
            placeholder="Enter mainSeriesProperties_style"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_showCountdownSelected">mainSeriesProperties.showCountdown</label>
          <select
            ref={ref_mainSeriesProperties_showCountdown}
            value={mainSeriesProperties_showCountdownSelected}
            id="for_mainSeriesProperties_showCountdownSelected"
            className="form-control"
            onChange={(e)=>{
                setmainSeriesProperties_showCountdownSelected(e.target.value);
            }}
          >
            <option value="0">true</option>
            <option value="1">false</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_paneProperties_background">paneProperties.background</label>
          <input
            ref={ref_paneProperties_background}
            defaultValue="#000"
            type="text"
            className="form-control"
            id="for_paneProperties_background"
            placeholder="Enter paneProperties_background"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_paneProperties_background">paneProperties.vertGridProperties.color</label>
          <input
            ref={ref_paneProperties_vertGridProperties_color}
            defaultValue="#000"
            type="text"
            className="form-control"
            id="for_paneProperties_vertGridProperties_color"
            placeholder="Enter paneProperties_vertGridProperties_color"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_paneProperties_horzGridProperties_color">paneProperties.horzGridProperties.color</label>
          <input
            ref={ref_paneProperties_horzGridProperties_color}
            defaultValue="#000"
            type="text"
            className="form-control"
            id="for_paneProperties_horzGridProperties_color"
            placeholder="Enter paneProperties_horzGridProperties_color"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_symbolWatermarkProperties_transparency">symbolWatermarkProperties.transparency</label>
          <input
            ref={ref_symbolWatermarkProperties_transparency}
            defaultValue="90"
            type="number"
            className="form-control"
            id="for_symbolWatermarkProperties_transparency"
            placeholder="Enter symbolWatermarkProperties_transparency"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_scalesProperties_textColor">scalesProperties.textColor</label>
          <input
            ref={ref_scalesProperties_textColor}
            defaultValue="#AAA"
            type="text"
            className="form-control"
            id="for_scalesProperties_textColor"
            placeholder="Enter scalesProperties_textColor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_candleStyle_wickUpColor">mainSeriesProperties.candleStyle.wickUpColor</label>
          <input
            ref={ref_mainSeriesProperties_candleStyle_wickUpColor}
            defaultValue="#336854"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_candleStyle_wickUpColor"
            placeholder="Enter mainSeriesProperties_candleStyle_wickUpColor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_candleStyle_wickDownColor">mainSeriesProperties.candleStyle.wickDownColor</label>
          <input
            ref={ref_mainSeriesProperties_candleStyle_wickDownColor}
            defaultValue="#336854"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_candleStyle_wickDownColor"
            placeholder="Enter mainSeriesProperties_candleStyle_wickDownColor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_watchlist_settings_pane_legend">watchlist_settings.pane-legend</label>
          <select
            ref={ref_watchlist_settings_pane_legend}
            value={watchlist_settings_pane_legendSelected}
            id="for_watchlist_settings_pane_legend"
            className="form-control"
            onChange={(e)=>{
                setwatchlist_settings_pane_legendSelected(e.target.value);
            }}
          >
            <option value="0">true</option>
            <option value="1">false</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_areaStyle_color1">mainSeriesProperties.areaStyle.color1</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_color1}
            defaultValue="#f9f9f9"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_color1"
            placeholder="Enter mainSeriesProperties_areaStyle_color1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_areaStyle_color2">mainSeriesProperties.areaStyle.color2</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_color2}
            defaultValue="#444a59"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_color2"
            placeholder="Enter mainSeriesProperties_areaStyle_color2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_areaStyle_linecolor">mainSeriesProperties.areaStyle.linecolor</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_linecolor}
            defaultValue="#444a59"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_linecolor"
            placeholder="Enter mainSeriesProperties_areaStyle_linecolor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_areaStyle_linecolor">mainSeriesProperties.areaStyle.linecolor</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_linecolor}
            defaultValue="#c9c9c9"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_linecolor"
            placeholder="Enter mainSeriesProperties_areaStyle_linecolor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mainSeriesProperties_areaStyle_linewidth">mainSeriesProperties.areaStyle.linewidth</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_linewidth}
            defaultValue="1"
            type="number"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_linewidth"
            placeholder="Enter mainSeriesProperties_areaStyle_linewidth"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_paneProperties_axisProperties_isInverted">paneProperties.axisProperties.isInverted</label>
          <select
            ref={ref_paneProperties_axisProperties_isInverted}
            value={paneProperties_axisProperties_isInvertedSelected}
            id="for_paneProperties_axisProperties_isInverted"
            className="form-control"
            onChange={(e)=>{
                setpaneProperties_axisProperties_isInvertedSelected(e.target.value);
            }}
          >
            <option value="0">true</option>
            <option value="1">false</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_scalesProperties_backgroundColor">scalesProperties.backgroundColor</label>
          <input
            ref={ref_scalesProperties_backgroundColor}
            defaultValue="#ffffff"
            type="text"
            className="form-control"
            id="for_scalesProperties_backgroundColor"
            placeholder="Enter scalesProperties_backgroundColor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paneProperties_crossHairProperties_color">paneProperties.crossHairProperties.color</label>
          <input
            ref={ref_paneProperties_crossHairProperties_color}
            defaultValue="#ffffff"
            type="text"
            className="form-control"
            id="for_paneProperties_crossHairProperties_color"
            placeholder="Enter paneProperties_crossHairProperties_color"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mainSeriesProperties_areaStyle_priceSource">mainSeriesProperties.areaStyle.priceSource</label>
          <input
            ref={ref_mainSeriesProperties_areaStyle_priceSource}
            defaultValue="close"
            type="text"
            className="form-control"
            id="for_mainSeriesProperties_areaStyle_priceSource"
            placeholder="Enter mainSeriesProperties_areaStyle_priceSource"
          />
        </div>
        

        <h2>Widgetbar</h2>    
        <div className="form-group">
          <label htmlFor="for_details">details</label>
          <select
            ref={ref_details}
            value={detailsSelected}
            id="for_details"
            className="form-control"
            onChange={(e)=>{
                setdetailsSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_watchlist">watchlist</label>
          <select
            ref={ref_watchlist}
            value={watchlistSelected}
            id="for_watchlist"
            className="form-control"
            onChange={(e)=>{
                setwatchlistSelected(e.target.value);
            }}
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
        </div>

        <h3>Watchlist Settings</h3>
        { symbolsforwl !== null ? (
        <div className="form-group">
          <label htmlFor="for_default_symbols">Default Symbols</label>
          <select
            multiple="multiple"
            ref={ref_default_symbols}
            value={default_symbolsSelected}
            id="for_default_symbols"
            className="form-control"
            onChange={(e)=>{
              // e.preventDefault();
                setdefault_symbolsSelected([e.target.value]);
            }}
          >
      {
        
      symbolsforwl.map((value, index) => {
        return <option value={value.symbol} key={index}>{value.symbol}</option>
      })
      }
      {/* <option>test</option> */}
          </select>
        </div>
        ) : (<div>Loading ..</div>)
}

        <div className="form-group">
          <label htmlFor="for_readonly">readonly</label>
          <select
            ref={ref_readonly}
            value={readonlySelected}
            id="for_readonly"
            className="form-control"
            onChange={(e)=>{
                setreadonlySelected(e.target.value);
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

export default ChartsEdit;
