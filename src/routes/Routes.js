import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeroDetails from "../pages/HeroDetails";
import SearchPage from "../pages/SearchPage";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/heroes/:id" component={HeroDetails} />
      <Route path="/" exact={true} component={SearchPage} />
      <Route path="*" component={() => <div style={{display: 'flex', alignContent:'center', height: '100vh'}}><h2 style={{ margin: 'auto' }} >Page Not Found</h2></div> } />
    </Switch>
  </BrowserRouter>
);

export default Routes;