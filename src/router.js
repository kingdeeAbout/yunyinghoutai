/**
 * Created by dadawang on 2018/2/1.
 */
import React from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import history from './history';
import AuthorizedRoute from './authorizedRoute'
import Home from './page/home'
import Index from './page/index'
import Login from './page/login'

export default class Routers extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/page/login" component={Login}/>
          <Route path="/page/index" component={Index}/>
          <Route path="/" render={() => <Redirect to="/page/index"/>} exact></Route>
          <AuthorizedRoute path="/page/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}