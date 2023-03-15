import React, { useState, useEffect, useRef } from "react";
import { getActiveLayouts } from "../../Services/Layouts/layouts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { getCenterDivWidth } from "../../Lib/formulas";
//import 'jquery/dist/jquery.min.js'
//import 'bootstrap/dist/js/bootstrap.min.js'
import Errors from "../Errors/Errors";
import AlertMSG from "../Alerts/AlertMSG";

import store from "../../Red/store";

import NewsIndex from "./Widgets/News/Index";

import EconomicCalendarIndex from "./Widgets/EconomicCalendar/Index";
import FundamentalDataIndex from "./Widgets/FundamentalData/Index";
import MarketOverviewIndex from "./Widgets/MarketOverview/Index";
import SymbolProfileIndex from "./Widgets/SymbolProfile/Index";
import TechnicalAnalysisIndex from "./Widgets/TechnicalAnalysis/Index";
import PositionsIndex from "./Widgets/Positions/Index";
import HistoriesIndex from "./Widgets/Histories/Index";
import OrdersIndex from "./Widgets/Orders/Index";
import HeadersIndex from "./Widgets/Header/Index";
import ChartIndex from "./Widgets/Chart/Index";
import LeftSideIndex from "./Widgets/LeftSide/Index";
import TotalFiguresIndex from "./Widgets/TotalFigures/Index";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import Popup from "./Mandatory/popup";
import ChatWithBroker from "./Mandatory/chatWithBroker";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ExistingWidgets = {
  widgets_economiccalendar: EconomicCalendarIndex,
  widgets_fundamentaldata: FundamentalDataIndex,
  widgets_marketoverview: MarketOverviewIndex,
  widgets_symbolprofile: SymbolProfileIndex,
  widgets_technicalanalysis: TechnicalAnalysisIndex,
  positions: PositionsIndex,
  histories: HistoriesIndex,
  orders: OrdersIndex,
  totalfigures: TotalFiguresIndex,
  header: HeadersIndex,
  chart: ChartIndex,
  leftside: LeftSideIndex,
  news: NewsIndex,
};

const isPopup = {
  widgets_economiccalendar: 0,
  widgets_fundamentaldata: 0,
  widgets_marketoverview: 0,
  widgets_symbolprofile: 0,
  widgets_technicalanalysis: 0,
  positions: 0,
  histories: 0,
  orders: 0,
  totalfigures: 0,
  header: 0,
  chart: 1,
  news: 0,
};

function Index(props) {
  const { t } = useTranslation();
  const refLayout = useRef(null);

  let chatlib = useRef(null);

  const [chatWithBroker, setchatWithBroker] = useState(0);

  const [makeCenterWidth, setmakeCenterWidth] = useState("1000px");
  const [isMakeCenter, setisMakeCenter] = useState(false);

  const [layoutBoxes, setLayoutBoxes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const [errorPageMSG, setErrorPageMSG] = useState(null);
  const [mobileClass, setmobileClass] = useState("layout-no-mobile");
  const [makecenterClass, setmakecenterClass] = useState(
    "layout-no-makecenter"
  );
  const [flexgridClass, setflexgridClass] = useState("layout-no-flexgrid");
  const [themeClass, setthemeClass] = useState("dark-theme");

  const [isrtl, setisrtl] = useState("");

  // const options = {
  //   method: 'GET',
  //   url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-full',
  //   params: {id: 'adsmi:ind,aex:ind,co1:com,gc1:com'},
  //   headers: {
  //     'x-rapidapi-key': '34d3a359a2msh4fe068d62768e93p17d171jsnb1f6018fddd9',
  //     'x-rapidapi-host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
  //   }
  // };

  // useEffect(() => {
  // axios.request(options).then(function (response) {
  // 	console.log(response.data, "aaaeee test");
  // }).catch(function (error) {
  // 	console.error(error);
  // });
  // }, []);

  const getBoxContents = (ComponentsData, comp_key) => {
    let tabs = [];
    if (ComponentsData[comp_key] !== undefined) {
      console.log(ComponentsData[comp_key]);
      if (ComponentsData[comp_key].length > 1) {
        for (let it = 0; it < ComponentsData[comp_key].length; it++) {
          let DataWidget =
            ExistingWidgets[ComponentsData[comp_key][it]] !== undefined
              ? ExistingWidgets[ComponentsData[comp_key][it]]
              : null;
          tabs.push(
            <Tab
              eventKey={comp_key + "_" + ComponentsData[comp_key][it]}
              title={t(ComponentsData[comp_key][it])}
              key={comp_key + "_" + ComponentsData[comp_key][it]}
            >
              {DataWidget !== null ? (
                isPopup[ComponentsData[comp_key][it]] ? (
                  <div style={{ height: "100%" }}>
                    <button
                      className="chartpopup"
                      onClick={() => {
                        window.open(
                          "popup/chart/" +
                            (store.getState().chartSymbol.chartSymbol !==
                              undefined &&
                            store.getState().chartSymbol.chartSymbol !== null &&
                            store.getState().chartSymbol.chartSymbol.symbol !==
                              undefined &&
                            store.getState().chartSymbol.chartSymbol.symbol !==
                              null
                              ? store.getState().chartSymbol.chartSymbol.symbol
                              : "AUDCAD"),
                          "",
                          "toolbar=0,status=0,width=548,height=325"
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> Popup
                    </button>
                    <DataWidget />
                  </div>
                ) : (
                  <DataWidget />
                )
              ) : (
                ComponentsData[comp_key][it]
              )}
            </Tab>
          );
        }
      } else {
        for (let it = 0; it < ComponentsData[comp_key].length; it++) {
          let DataWidget =
            ExistingWidgets[ComponentsData[comp_key][it]] !== undefined
              ? ExistingWidgets[ComponentsData[comp_key][it]]
              : null;
          tabs.push(
            <Tab
              style={{ height: "100%" }}
              eventKey={comp_key + "_" + ComponentsData[comp_key][it]}
              key={comp_key + "_" + ComponentsData[comp_key][it]}
            >
              {DataWidget !== null ? (
                isPopup[ComponentsData[comp_key][it]] ? (
                  <div style={{ height: "100%" }}>
                    <button
                      className="chartpopup"
                      onClick={() => {
                        window.open(
                          "popup/chart/" +
                            (store.getState().chartSymbol.chartSymbol !==
                              undefined &&
                            store.getState().chartSymbol.chartSymbol !== null &&
                            store.getState().chartSymbol.chartSymbol.symbol !==
                              undefined &&
                            store.getState().chartSymbol.chartSymbol.symbol !==
                              null
                              ? store.getState().chartSymbol.chartSymbol.symbol
                              : "AUDCAD"),
                          "",
                          "toolbar=0,status=0,width=548,height=325"
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> Popup
                    </button>
                    <DataWidget />
                  </div>
                ) : (
                  <DataWidget />
                )
              ) : (
                ComponentsData[comp_key][it]
              )}
            </Tab>
          );
        }
      }
    }
    return tabs;
  };

  const generateLayout = (retData) => {
    let boxes = [];
    let layoutData = JSON.parse(retData.layouts);
    let ComponentsData = JSON.parse(retData.components);

    for (let i = 0; i < layoutData.length; i++) {
      let comp_key = layoutData[i].i;
      let tabactiveKey = comp_key + "_" + ComponentsData[layoutData[i].i][0];
      //console.log(comp_key + "_" + ComponentsData[layoutData[i].i][0]);
      boxes.push(
        <div
          key={layoutData[i].i}
          data-grid={{
            w: layoutData[i].w,
            h: layoutData[i].h,
            x: layoutData[i].x,
            y: layoutData[i].y,
            static: true,
          }}
        >
          <div>
            <Tabs
              id="controlled-tab-example"
              className={ComponentsData[layoutData[i].i][i]}
              defaultActiveKey={tabactiveKey}
            >
              {getBoxContents(ComponentsData, comp_key)}
            </Tabs>
          </div>
        </div>
      );
    }
    //setLayouts(layoutData);
    setLayoutBoxes(boxes);

    // set classes if selected true
    if (retData.flexgrid == 1) {
      setflexgridClass("layout-flexgrid");
    }
    if (retData.makecenter == 1) {
      setmakecenterClass("layout-makecenter");
      setisMakeCenter(true);
    }
    if (retData.mobile == 1) {
      setmobileClass("layout-mobile");
    }
  };

  const checkIfMakeCenter = () => {
    let width = getCenterDivWidth(props.layoutData, 1980);
    setmakeCenterWidth(width);
  };

  useEffect(() => {
    if (props.siteTheme !== null && props.siteTheme == "light") {
      setthemeClass("light-theme");
    } else {
      setthemeClass("dark-theme");
    }
  }, [props.siteTheme]);

  useEffect(() => {
    console.log("layout data = ", props.layoutData);
    if (props.layoutData.id === undefined) {
      setErrorPage(true);
      setErrorPageMSG("Layouts not found !!!");
    } else {
      setLoaded(true);
      generateLayout(props.layoutData);
      checkIfMakeCenter();
    }
  }, [props.layoutData]);

  useEffect(() => {
    if (
      props.languages !== undefined &&
      props.languages !== null &&
      props.activeLanguage !== undefined &&
      props.activeLanguage !== null
    ) {
      props.languages.forEach((el) => {
        if (el.alias == props.activeLanguage) {
          if (el.direction == "rtl") {
            setisrtl("rtl");
          } else {
            setisrtl("");
          }
        }
      });
    }
  }, [props.languages, props.activeLanguage]);

  // useEffect(() => {
  //   if (loaded && !errorPage) {
  //     // const script = document.createElement('script');
  //     // const script2 = document.createElement('script');
  //     // const link = document.createElement('link');

  //     // script.src = "https://tgutest.com/im_livechat/external_lib.js";
  //     // script.async = true;
  //     // script.type = "text/javascript";
  //     // link.href = "https://softkohi.com/im_livechat/external_lib.css";
  //     // link.rel = "stylesheet"

  //     // script2.src = "https://softkohi.com/im_livechat/loader/2";
  //     // script2.async = true;
  //     // script2.type = "text/javascript";

  //     // chatlib.current.innerHTML = "";
  //     // document.head.appendChild(script);
  //     // document.head.appendChild(script2);
  //     // document.head.appendChild(link);

  //     var ifrm = document.createElement("iframe");
  //     ifrm.setAttribute(
  //       "src",
  //       "https://tgutest.com/chat.html#domain=softkohi.com&linkid=2"
  //     );
  //     ifrm.style.width = "640px";
  //     ifrm.style.height = "480px";
  //     document.body.appendChild(ifrm);

  //     chatlib.current.innerHTML = "";
  //     chatlib.current.appendChild = ifrm;
  //   }

  //   // return () => {
  //   // chatlib.current.removeChild(script);
  //   // chatlib.current.removeChild(script2);
  //   // chatlib.current.removeChild(link);
  //   // }
  // }, [props.siteTheme, loaded, errorPage]);


  if (loaded && errorPage) {
    return (
      <div>
        <Errors msg={errorPageMSG} />
      </div>
    );
  } else if (loaded && !errorPage) {
    return (
      <div className={themeClass + " " + isrtl}>
        <AlertMSG />
        <Popup />

        <ResponsiveReactGridLayout
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          ref={refLayout}
          rowHeight={75}
          style={{ width: isMakeCenter ? makeCenterWidth + "px" : "auto" }}
          className={`layout ${mobileClass} ${makecenterClass} ${flexgridClass}`}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          // rowHeight={30}
          // layouts={layouts}
        >
          {layoutBoxes}
        </ResponsiveReactGridLayout>
        {/* <div ref={chatlib}></div> */}
        {props.chatWithBroker !== "undefined" && props.chatWithBroker == 1 ? <ChatWithBroker /> : " "}
      </div>
    );
  } else {
    return <div className={themeClass}></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    layoutData: state.layoutData.layoutData,
    siteTheme: state.siteTheme.siteTheme,
    languages: state.languages.languages,
    activeLanguage: state.activeLanguage.activeLanguage,
    chatWithBroker: state.chatWithBroker.chatWithBroker,
  };
};

export default connect(mapStateToProps, null)(Index);
