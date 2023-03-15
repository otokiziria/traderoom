import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

var symbol_n = "AUDCAD";

function SymbolProfileIndex(props) {
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
      if(props.symbolProfileData !== undefined && props.symbolProfileData !== null&&
        props.siteTheme !== undefined &&
        props.siteTheme !== null){
        const script = document.createElement("script");

        let jsonData = JSON.parse(props.symbolProfileData.dark_content);
      if (props.siteTheme == "light") {
        jsonData = JSON.parse(props.symbolProfileData.light_content);
      }
      if(props.symbolProfileData.current_symbol){
        jsonData.symbol = symbol_n;
      }

        script.src = props.symbolProfileData.script_url;
    //"https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        script.async = true;
        script.innerHTML = JSON.stringify(jsonData)
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
    
  }, [props.symbolProfileData, props.siteTheme, props.chartSymbol]);
  //console.log('symbolProfileData = ', props.symbolProfileData);
  return (
    <div
      className="col-lg-12 col-12 mx-0  sidebar"
      ref={div_ref}
      style={{ zIndex: "999999",height: "100%" }}
    >
      <div style={{ backgroundColor: "#0c1831",height: "100%" }}>
        <div className="tradingview-widget-container" style={{height: "100%"}}>
          <div className="tradingview-widget-container__widget" ></div>
          <div className="tradingview-widget-copyright" ref={widget_r} style={{height: "100%"}}></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    symbolProfileData: state.symbolProfileData.symbolProfileData,
    siteTheme: state.siteTheme.siteTheme,
    chartSymbol: state.chartSymbol.chartSymbol,
  };
};

export default connect(mapStateToProps, null)(SymbolProfileIndex);
