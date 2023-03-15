import React, { useEffect, useState } from "react";
import store from "../../../../Red/store";
import { connect } from "react-redux";
import { widget } from "../../../../charting_library/charting_library.min";
import Datafeeds from "./Api/Index";
//import './chart.scss';
//import Cookies from 'universal-cookie';
//import {AccountInfo,closePosition} from '../halpers/popupFunctions';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { requestCommand } from "../../../../Services/Commands/commands";
import { isTradingSessionOk } from "../../Helpers/Formulas";
import { showAlertMSG } from "../../../../Lib/helpers";

//Global Variable Types
let symbol_n = "Symbol:AUDCAD";
let previus_symbol = null;
let tvWidget = null;
let prevUser = null;
let posChrt = {};
let isChartLoaded = false;
let defaultLanguage = i18next.language;
let renderedTime = 0;
let isLanguageChanged = 0;
let lastTheme = "";

const languageFormats = [
  "en",
  "ar",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fa",
  "fr",
  "he_IL",
  "hu_HU",
  "id_ID",
  "it",
  "ja",
  "ko",
  "ms_MY",
  "nl_NL",
  "no",
  "pl",
  "pt",
  "ro",
  "ru",
  "sk_SK",
  "sv",
  "th",
  "tr",
  "vi",
  "zh_TW",
  "zh",
];

function ChartIndex(props) {
  const { t } = useTranslation();

  let prevPosition = null;

  useEffect(() => {
    //console.log(props.positionData);
    if (
      props.positionData !== null &&
      isChartLoaded &&
      tvWidget !== null &&
      tvWidget !== undefined
    ) {
      //prevPosition = props.positionData;
      generatePositions(props.positionData);
    }
  }, [props.positionData]);

  let generatePositions = (position) => {
    let isChartReady = 0;
    try {
      tvWidget.chart();
      isChartReady = 1;
    } catch (err) {
      //console.log(err);
      isChartReady = 0;
    }

    if (position != null && isChartReady) {
      let positionChart = [];

      if (typeof posChrt != undefined && typeof posChrt != null) {
        Object.keys(posChrt).forEach(function (item) {
          let NotInPos = true;
          position.map((el) => {
            if (item == el.position) {
              NotInPos = false;
            }
          });
          if (NotInPos) {
            if (posChrt[item] !== undefined && posChrt[item] !== null) {
              try {
                posChrt[item].remove();
              } catch (e) {
                console.log(e);
              }
            }
          }
        });
      }

      try {
        position.map((el) => {
          let activeStymbol = "AUDCAD";
          if (
            props.chartSymbol !== null &&
            props.chartSymbol.symbol !== undefined &&
            props.chartSymbol.symbol !== null
          ) {
            activeStymbol = props.chartSymbol.symbol;
          }
          if (el.symbol == activeStymbol) {
            //store.getState().active_symbol.active_symbol.symbol

            if (typeof posChrt[el.position] != "undefined") {
              posChrt[el.position].remove();
            }

            //console.log("2 ",posChrt);
            if (isChartLoaded && tvWidget !== undefined && tvWidget !== null) {
              //console.log(el.action, el.priceOpen);
              posChrt[el.position] = tvWidget
                .chart()
                .createPositionLine()
                .setText(
                  el.action == "POSITION_SELL"
                    ? t("POSITION_SELL")
                    : t("POSITION_BUY")
                )
                .setQuantity(parseFloat(el.profit).toFixed(4))
                .onClose(() => {
                  // this.bugoClose(22, 33, 44,'Audcad', bet)
                  try {
                    let mainSymbol = {};
                    if (
                      props.allSymbols !== null &&
                      props.allSymbols !== undefined
                    ) {
                      props.allSymbols.forEach((row) => {
                        if (row["symbols"].length > 0) {
                          row["symbols"].forEach((row_s) => {
                            if (row_s["symbol"] == el.symbol) {
                              mainSymbol = row_s;
                            }
                          });
                        }
                        if (row["sub_category"].length > 0) {
                          row["sub_category"].forEach((children_row) => {
                            if (children_row["symbols"].length > 0) {
                              children_row["symbols"].forEach((row_s) => {
                                if (row_s["symbol"] == el.symbol) {
                                  mainSymbol = row_s;
                                }
                              });
                            }

                            if (children_row["sub_category"].length > 0) {
                              children_row["sub_category"].forEach(
                                (children_row2) => {
                                  if (children_row2["symbols"].length > 0) {
                                    children_row2["symbols"].forEach(
                                      (row_s) => {
                                        if (row_s["symbol"] == el.symbol) {
                                          mainSymbol = row_s;
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          });
                        }
                      });
                    }
                    console.log(mainSymbol);
                    if (
                      mainSymbol.session_data !== null &&
                      mainSymbol.session_data !== undefined
                    ) {
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
                        main_name: store.getState().settings.settings
                          .mt5_main_name,
                        login: store.getState().customerAuth.customerAuth.user
                          .user.ID,
                        symbol: el.symbol,
                        volume: el.volume,
                        c_type:
                          el.action == "POSITION_SELL" ? "OP_BUY" : "OP_SELL",
                        position: el.position,
                      },
                    };
                    requestCommand(data);
                  } catch (e) {
                    //  console.log(e);
                  }
                  //losePosition(el.symbol,parseFloat(el.volume)/10000,el.action,el.position)
                });
              posChrt[el.position].setPrice(el.priceOpen);
            }
          }
        });
        if (positionChart.length > 0) {
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const defaultValues = (symbol_n) => {
    console.log("props.siteTheme = ", props.siteTheme);
    return {
      symbol: symbol_n,
      datafeed: Datafeeds,
      hidevolume: true,
      container_id: "tv_chart_container",
      library_path:
        props.settings.traderoom_url !== null
          ? props.settings.traderoom_url + "/charting_library/"
          : "/charting_library/",
      interval: "1",
      allow_symbol_change: true,
      withdateranges: true,
      disabled_features: [
        ,
        "use_localstorage_for_settings",
        "header_saveload",
        "header_symbol_search",
        "create_volume_indicator_by_default",
        "compare_symbol",
        "header_compare",
      ],
      enabled_features: ["show_logo_on_all_charts"],
      locale:
        i18next.language !== null && i18next.language != ""
          ? languageFormats.includes(i18next.language)
            ? i18next.language
            : "en"
          : "en", //i18next.language,
      charts_storage_url: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      data_status: "Streaming",
      studies_overrides: {},
      theme: props.siteTheme,
      Overlay: {
        style: 3,
        "lineStyle.styleType": 0,
      },
      /*
overrides: {
        "mainSeriesProperties.style": 3,
        "mainSeriesProperties.showCountdown": true,
        "paneProperties.background": "#0c1831",
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#cc0000",
        "watchlist_settings.pane-legend": false,
        "mainSeriesProperties.areaStyle.color1": "#f9f9f9",
        "mainSeriesProperties.areaStyle.color2": "#444a59",
        "mainSeriesProperties.areaStyle.linecolor": "#c9c9c9",
        // "mainSeriesProperties.areaStyle.linestyle": "CanvasEx.LINESTYLE_SOLID",
        // "paneProperties.topMargin": 1,
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "paneProperties.axisProperties.isInverted": false,
        "scalesProperties.backgroundColor": "#ffffff",
        "paneProperties.crossHairProperties.color": "#ffffff",
        "mainSeriesProperties.areaStyle.priceSource": "close",
      },
      */
      widgetbar: {
        details: true,
        watchlist: true,
        watchlist_settings: {
          default_symbols: ["NYSE:AA", "NYSE:AAL", "NASDAQ:AAPL"],
          readonly: false,
        },
      },
    };
  };

  useEffect(() => {
    console.log(props.siteTheme);
    if (
      props.chartSymbol === null ||
      props.chartSymbol.symbol === undefined ||
      props.chartSymbol.symbol === null
    ) {
      if (
        props.isPopup !== null &&
        props.isPopup !== undefined &&
        props.popupSymbol !== null &&
        props.popupSymbol !== undefined &&
        props.isPopup == true
      ) {
        generateChart(
          "Symbol:" + props.popupSymbol,
          defaultValues("Symbol:" + props.popupSymbol),
          props.siteTheme
        );
      } else {
        generateChart(symbol_n, defaultValues(symbol_n), props.siteTheme);
      }
    } else {
      generateChart(
        "Symbol:" + props.chartSymbol.symbol,
        defaultValues("Symbol:" + props.chartSymbol.symbol),
        props.siteTheme
      );
    }
  }, [props.chartSymbol, props.siteTheme]);

  return (
    <div
      className="col-12 TVChartContainer p-0"
      style={{ width: "100%", height: "calc(100% - 25px)" }}
      id={"tv_chart_container"}
    >
      <img className="w-100 h-100" src="images/img.jpg" />
      <div id={defaultValues.containerId} className={"TVChartContainer"} />
    </div>
  );
}

function setChartLanguage(lang, symbol) {
  if (renderedTime > 1 && tvWidget !== null) {
    isLanguageChanged = 1;
    tvWidget.setLanguage(lang);
    let inter = setInterval(() => {
      try {
        tvWidget.setSymbol(symbol, 1);
        clearInterval(inter);
        console.log("symbol changed");
      } catch (err) {
        console.log("symbol tring to change");
      }
    }, 1500);

    //setTimeout(function(){
    //    isLanguageChanged = 0;
    // },20000);
  }
}

function generateChart(symbol, x, theme) {
  if (theme != lastTheme) {
    tvWidget = new widget(x);
    tvWidget.onChartReady(() => {
      tvWidget.onContextMenu(function (time, price) {
        return [
          {
            position: "top",
            text: "Open Trade",
            click: function () {
              console.log("Custom context menu item clicked");
              try {
                // showPop(true)
              } catch (e) {}
            },
          },

          { text: "-", position: "top" },
          { text: "-Objects Tree..." },
          { text: "-Change Symbol..." },
        ];
      });
      isChartLoaded = true;
    });
  } else {
    if (tvWidget !== null && tvWidget !== undefined) {
      tvWidget.setSymbol(symbol, 1);
      tvWidget.onContextMenu(function (time, price) {
        return [
          {
            position: "top",
            text: "Open Trade",
            click: function () {
              console.log("Custom context menu item clicked");
              try {
                // showPop(true)
              } catch (e) {}
            },
          },

          { text: "-", position: "top" },
          { text: "-Objects Tree..." },
          { text: "-Change Symbol..." },
        ];
      });
    }

    if (tvWidget === null || tvWidget === undefined) {
      tvWidget = new widget(x);
      tvWidget.onChartReady(() => {
        tvWidget.onContextMenu(function (time, price) {
          return [
            {
              position: "top",
              text: "Open Trade",
              click: function () {
                console.log("Custom context menu item clicked");
                try {
                  // showPop(true)
                } catch (e) {}
              },
            },

            { text: "-", position: "top" },
            { text: "-Objects Tree..." },
            { text: "-Change Symbol..." },
          ];
        });
        isChartLoaded = true;
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    positionData: state.positionData.positionData,
    chartSymbol: state.chartSymbol.chartSymbol,
    siteTheme: state.siteTheme.siteTheme,
    settings: state.settings.settings,
    allSymbols: state.allSymbols.allSymbols,
  };
};

export default connect(mapStateToProps, null)(ChartIndex);
