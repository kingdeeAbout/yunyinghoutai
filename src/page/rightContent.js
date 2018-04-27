import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {Layout} from 'antd';
import './rightContent.less'
import Header from './header'
import AuthorizedRoute from '../authorizedRoute'
import DataProfiling from './operating/dataProfiling'
import UserList from './courier/userList'
import SalesBoard from './marketing/salesBoard'
import AddSales from './marketing/addSales'
import DataBoard from './marketing/dataBoard'
import Notes from './marketing/notes'
import ExpressList from './order/expressList'
import ProjectList from './cooperation/projectList'
import AddProject from './cooperation/addProject'
import AddManager from './cooperation/addManager'

const {Content} = Layout;

export default class RightContent extends Component {
  render() {
    return (
      <Content>
        <Header/>
        <Switch>
          <AuthorizedRoute path="/page/operating/dataProfiling" component={DataProfiling}/>
          <AuthorizedRoute path="/page/courier/userList" component={UserList}/>
          <AuthorizedRoute path="/page/marketing/salesBoard" component={SalesBoard}/>
          <AuthorizedRoute path="/page/marketing/addSales" component={AddSales}/>
          <AuthorizedRoute path="/page/marketing/dataBoard" component={DataBoard}/>
          <AuthorizedRoute path="/page/marketing/userList" component={UserList}/>
          <AuthorizedRoute path="/page/marketing/notes" component={Notes}/>
          <AuthorizedRoute path="/page/orderManagment/expressList" component={ExpressList}/>
          <AuthorizedRoute path="/page/cooperation/projectList" component={ProjectList}/>
          <AuthorizedRoute path="/page/cooperation/addProject" component={AddProject}/>
          <AuthorizedRoute path="/page/cooperation/addManager" component={AddManager}/>
          <Route path="/page/" render={()=><Redirect to="/page/index" />} exact></Route>
        </Switch>
      </Content>
    );
  }
}
