import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {RootStore} from './stores/rootStore';

ReactDOM.render(
  <Provider store={new RootStore()}>
    <App/>
  </Provider>, document.getElementById('root'));
// 使用Provider传递store
registerServiceWorker();

// if (module.hot) {
//   module.hot.accept();
// }
