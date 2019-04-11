import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HeroDetails from "../pages/HeroDetails";
import SearchPage from "../pages/SearchPage";


const hellothere = (data) => {
  console.log('log',data)

  return true
}

const CustomRoute = ({ component: Component, ...rest }) => (
    <Route  {...rest} render={props =>
        hellothere(props) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/suppliers", state: { from: props.location } }} />
        )
      }
    />
);

// <Route exact path="/login" component={() => <h1>Login</h1>} />

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