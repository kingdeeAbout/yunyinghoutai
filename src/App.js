import React from 'react';
import './App.less';
import './assets/font/iconfont.css'
import './assets/font/iconfont'
import Routers from "./router";

class App extends React.Component {
  render() {
    return (
        <div className="app">
            <Routers/>
        </div>
    );
  }
}
export default App;
