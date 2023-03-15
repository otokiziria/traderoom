import React from "react";
import { BrowserRouter , Route,Switch } from "react-router-dom";
import Auth from "./Component/Admin/Auth";
import Index from "./Component/Site/Index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/administrator" exact component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
