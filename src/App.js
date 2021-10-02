import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Main from './components/Main';
import Favorite from './components/Favorite';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";

class App extends Component {
  render() {
    return (
      <Router>
        {this.props.auth0.isAuthenticated ?
          <Header isAuthenticated={this.props.auth0.isAuthenticated}
            myPic={this.props.auth0.user.picture}
            myName={this.props.auth0.user.name}
            myEmail={this.props.auth0.user.email} />
          : <Header />
        }
        <Switch>
          <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/profile">
            <Favorite />
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default withAuth0(App);