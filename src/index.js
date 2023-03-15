import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Red/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import i18n from "./Languages/i18n";

import Auth from "./Component/Admin/Auth";
import SiteLoader from "./Component/Site/SiteLoader";
import PopupPage from "./Component/Site/Popup";
import CustomerAuth from "./Component/Site/Auth";
import Dashboard from "./Component/Admin/Dashboard";

if(i18next.language === undefined || i18next.language === null){
  i18n.changeLanguage('en');
}

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SiteLoader} />
          <Route path="/popup/:component/:data?" exact component={PopupPage} />
          <Route path="/auth/:token/:ID/:isLead/:lang?" exact  component={CustomerAuth} />
          <Route path="/administrator" exact component={Auth} />
          <Route path="/administrator/dashboard" exact component={Dashboard} />
          <Route path="/administrator/dashboard/:component" exact component={Dashboard} />
          <Route path="/administrator/dashboard/:component/:dataId"  exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
