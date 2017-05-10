import React from "react";
import { Grid, Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from "react-router";

class Container extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <Navbar className="main-nav">
          <Link to="/">
            <Navbar.Brand>Redux Auth</Navbar.Brand>
          </Link>
          <Nav>
            <Link to="/" onlyActiveOnIndex>
              <NavItem eventKey={1}>Home</NavItem>
            </Link>
            <Link to="/account">
              <NavItem eventKey={2}>Account</NavItem>
            </Link>
          </Nav>
        </Navbar>

        <Grid className="content">
          {this.props.children}
        </Grid>

        <a href="https://github.com/lynndylanhurley/redux-auth">
          <img
            style={{position: "absolute", top: 0, right: 0, border: 0}}
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" />
        </a>
      </div>
    );
  }
}

export default Container;