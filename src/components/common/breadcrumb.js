
import React from 'react'
import {Breadcrumb} from 'antd'

export default class ListBreadcrumb extends React.Component {
  handleItemClick = (sbid) => {
    this.props.selectItem(sbid.toString());
  };
  render() {
    const BreadcrumbItems = this.props.breadcrumbData.map((item, index) => {
      const last = index === this.props.breadcrumbData.length - 1;
      return last ? <Breadcrumb.Item key={index}><span>{item.name}</span></Breadcrumb.Item> : <Breadcrumb.Item key={index}><a onClick={this.handleItemClick.bind(this, item.sbid)}>{item.name}</a></Breadcrumb.Item>;
    });
    return (
      <Breadcrumb separator=">">
        {BreadcrumbItems}
      </Breadcrumb>
    )
  }
}