import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject("store")
@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.store = props.store.roleStore;
    this.pageStore = props.store.pageStore;
  }

  componentDidMount() {
    this.store.getUserData(() => {
      const menuData = this.store.menuData;
      if(menuData.length && menuData[0].menuItems && menuData[0].menuItems.length && menuData[0].menuItems[0].link) {
        this.props.history.replace(menuData[0].menuItems[0].link);
      }
    });
  }

  render() {
    return (
      <div className="p10">Loading...</div>
    );
  }
}

export default Index;
