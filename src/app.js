import React from "react";
import {Provider} from "react-redux";
import {
  Router,
  Route,
  IndexRoute,
  createMemoryHistory,
  browserHistory
} from "react-router";
import Container from "./views/partials/Container";
import Main from "./views/Main";
import SignIn from "./views/SignIn";

class App extends React.Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="login" component={SignIn} />
  </Route>
);

export function initialize() {

  // let history = (isServer)
  //   ? createMemoryHistory(currentLocation)
  //   : browserHistory;

    return ({
       provider: <Router history={browserHistory} routes={routes}></Router>
    });
}