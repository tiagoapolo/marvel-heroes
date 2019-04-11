import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HeroDetails from "../pages/HeroDetails";
import SearchPage from "../pages/SearchPage";




// const LoginRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         !isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/suppliers", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// <LoginRoute path="/" component={SearchPage} />

// <Route exact path="/login" component={() => <h1>Login</h1>} />

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={SearchPage} />
      <Route path="/heroes/:heroId" component={HeroDetails} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;