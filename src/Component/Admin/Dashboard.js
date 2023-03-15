import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import './Styles/App.css';
//import { loadUser } from "../../Services/Auth/auth";
import setAuthToken from "../../Utils/setAuthToken";
import Menu from "./LeftSide/Menu";
import Header from "./Header/Header";
import Symbols from "./Content/Symbols/Symbols";
import SymbolsActive from "./Content/Symbols/SymbolsActive";
import SymbolsSettings from "./Content/Symbols/Symbols-Settings";
import Categories from "./Content/Categories/Categories";
import Charts from "./Content/Charts/Charts";
import Positions from "./Content/Positions/Positions";
import Orders from "./Content/Orders/Orders";
import Errorreports from "./Content/Errorreports/Errorreports";
import Histories from "./Content/Histories/Histories";
import Crons from "./Content/Crons/Crons";
import Totalfigures from "./Content/Totalfigures/Totalfigures";
import LangCats from "./Content/LangCats/LangCats";
import Langs from "./Content/Langs/Langs";
import MT5 from "./Content/MT5/MT5";
import Nginx from "./Content/Nginxs/Nginxs";
import Layouts from "./Content/Layouts/Layouts";
import Headers from "./Content/Headers/Headers";
import Settings from "./Content/Settings/Settings";
import Widget_technical_analysis from "./Content/Widget_technical_analysis/Widget_technical_analysis";
import Widget_symbol_profile from "./Content/Widget_symbol_profile/Widget_symbol_profile";
import Widget_market_overview from "./Content/Widget_market_overview/Widget_market_overview";
import Widget_fundamental_data from "./Content/Widget_fundamental_data/Widget_fundamental_data";
import Widget_economic_calendar from "./Content/Widget_economic_calendar/Widget_economic_calendar";

import AlertMSG from "../Alerts/AlertMSG";
if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}
const existed_components = {
  symbols: Symbols,
  categories: Categories,
  activesymbols: SymbolsActive,
  symbolssettings: SymbolsSettings,
  charts: Charts,
  positions: Positions,
  orders: Orders,
  histories: Histories,
  crons:Crons,
  totalfigures:Totalfigures,
  langcat: LangCats,
  lang: Langs,
  layouts: Layouts,
  widgettechnicalanalysis:Widget_technical_analysis,
  widgetsymbolprofile:Widget_symbol_profile,
  widgetmarketoverview:Widget_market_overview,
  widgetfundamentaldata:Widget_fundamental_data,
  widgeteconomiccalendar:Widget_economic_calendar,
  MT5:MT5,
  nginx:Nginx,
  headers:Headers,
  settings:Settings,
  errrep: Errorreports
};
let RenderedComponent = null;
function Dashboard(props) {
  if (
    props.match.params.component !== undefined &&
    existed_components[props.match.params.component]
  ) {
    console.log(props.match.params);
    RenderedComponent = existed_components[props.match.params.component];
  } else {
    RenderedComponent = MT5;
  }

  if (props.auth.isAuthenticated === false && props.auth.loaded === true) {
    return <Redirect to="/administrator" />;
  }

  return (
    <div>
    <header>
    <Header />
    </header>
    <div className="container-fluid">
      <AlertMSG />
      <div className="row mx-auto mt-5">
        <div className="col-lg-2">
          <Menu />
        </div>
        <div className="col-lg-10 main-components">
          {RenderedComponent !== null ? <RenderedComponent /> : ""}
        </div>
      </div>
    </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
