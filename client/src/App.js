import React, { Component } from 'react';
import { Router, Route, Redirect,Switch } from 'react-router-dom';
import { Col, Navbar } from 'react-bootstrap'
import { history } from './helpers/history'
import Add from './screens/add';
import Search from './screens/search'

class App extends Component {
  render() {
    return (

      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/search">Dictionary</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Router history={history}>
          <Col md={6} mdOffset={3}>
            <Switch>
              <Route exact path='/search' component={Search}>
              </Route>
              <Route exact path='/add' component={Add}>
              </Route>
              <Route path="*" render={() => (<Redirect to="/search" />)} />

            </Switch>
          </Col>
        </Router>
      </div>
    );
  }
}

export default App;
