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

export function initialize() {

  // let history = (isServer)
  //   ? createMemoryHistory(currentLocation)
  //   : browserHistory;

  // console.log('dlklf')

  // define app routes
  const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="login" component={SignIn} />
    </Route>
  );

    return ({
       provider: <Router history={browserHistory} routes={routes}></Router>
    });
}