import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftMenu from './leftMenu'
import RightContent from './rightContent'

class Home extends Component {

    render() {
        return (
          <Layout className="app">
            <LeftMenu pathname={this.props.location.pathname}/>
            <RightContent/>
          </Layout>
        );
    }
}

export default Home;
