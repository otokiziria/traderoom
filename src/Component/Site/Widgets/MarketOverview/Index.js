import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

var symbol_n = "AUDCAD";

function MarketOverviewIndex(props) {
  let widget_r = useRef(null);
  let div_ref = useRef(null);
  useEffect(() => {
    if (
      props.chartSymbol !== undefined &&
      props.chartSymbol !== null &&
      props.chartSymbol.symbol !== undefined &&
      props.chartSymbol.symbol !== null
    ) {
      symbol_n = (props.chartSymbol.ticker == null) ? props.chartSymbol.symbol : props.chartSymbol.ticker;
    }

    if (
      props.marketOverviewData !== undefined &&
      props.marketOverviewData !== null &&
      props.siteTheme !== undefined &&
      props.siteTheme !== null
    ) {
      const script = document.createElement("script");

      let jsonData = JSON.parse(props.marketOverviewData.dark_content);
      if (props.siteTheme == "light") {
        jsonData = JSON.parse(props.marketOverviewData.light_content);
      }
      if (props.marketOverviewData.my_symbols) {
        let widget_2_tab_array = [];
        if (props.allSymbols !== null) {
          let widget_2_json = {};
          props.allSymbols.forEach((row) => {
            
            if (row["symbols"].length > 0) {
              widget_2_json["title"] = row["title"];
              widget_2_json["symbols"] = [];
              if (row["symbols"] && row["symbols"].length > 0) {
                row["symbols"].forEach((assets_row) => {
                  widget_2_json["symbols"].push({
                    s: assets_row["symbol"],
                    d: assets_row["symbol"] + " - " + assets_row["description"],
                  });
                });
              }
            }
            if (row["sub_category"].length > 0) {
              row["sub_category"].forEach((children_row) => {
                if (children_row["symbols"].length > 0) {
                  widget_2_json["title"] = children_row["title"];
                  widget_2_json["symbols"] = [];
                  if (
                    children_row["symbols"] &&
                    children_row["symbols"].length > 0
                  ) {
                    children_row["symbols"].forEach((assets_row) => {
                      widget_2_json["symbols"].push({
                        s: assets_row["symbol"],
                        d:
                          assets_row["symbol"] +
                          " - " +
                          assets_row["description"],
                      });
                    });
                  }
                }

                if (children_row["sub_category"].length > 0) {
                  children_row["sub_category"].forEach((children_row2) => {
                    if (children_row2["symbols"].length > 0) {
                      widget_2_json["title"] = children_row2["title"];
                      widget_2_json["symbols"] = [];
                      if (
                        children_row2["symbols"] &&
                        children_row2["symbols"].length > 0
                      ) {
                        children_row2["symbols"].forEach((assets_row) => {
                          widget_2_json["symbols"].push({
                            s: assets_row["symbol"],
                            d:
                              assets_row["symbol"] +
                              " - " +
                              assets_row["description"],
                          });
                        });
                      }
                    }
                  });
                }
              });
            }
            
          });
          widget_2_tab_array.push(widget_2_json);
        }
        jsonData.tabs = widget_2_tab_array;
      }
      

      script.src = props.marketOverviewData.script_url;
      //"https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.async = true;
      script.innerHTML = JSON.stringify(jsonData);
      /*JSON.stringify({
          colorTheme: "dark",
          isTransparent: true,
          width: div_ref.current.offsetWidth - 6, //350,
          height: 620,
          locale: "en",
          importanceFilter: "-1,0,1",
        });*/

      widget_r.current.innerHTML = "";
      widget_r.current.appendChild(script);
    }
  }, [
    props.marketOverviewData,
    props.siteTheme,
    props.chartSymbol,
    props.allSymbols,
  ]);
  //console.log('marketOverviewData = ', props.marketOverviewData);
  return (
    <div
      className="col-lg-12 col-12 mx-0  sidebar"
      ref={div_ref}
      style={{ zIndex: "999999", height: "100%" }}
    >
      <div style={{ backgroundColor: "#0c1831", height: "100%" }}>
        <div
          className="tradingview-widget-container"
          style={{ height: "100%" }}
        >
          <div className="tradingview-widget-container__widget"></div>
          <div
            className="tradingview-widget-copyright"
            ref={widget_r}
            style={{ height: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    marketOverviewData: state.marketOverviewData.marketOverviewData,
    siteTheme: state.siteTheme.siteTheme,
    chartSymbol: state.chartSymbol.chartSymbol,
    allSymbols: state.allSymbols.allSymbols,
  };
};

export default connect(mapStateToProps, null)(MarketOverviewIndex);
