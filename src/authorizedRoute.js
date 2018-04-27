import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

export default class AuthorizedRoute extends React.Component {
  render() {
    const TOKEN = Cookies.get('CRMTOKEN');
    const { component: Component } = this.props
    return (
      <Route render={props => {
        return TOKEN
          ? <Component {...props} />
          : <Redirect to="/page/login" />
      }} />
    )
  }
}

