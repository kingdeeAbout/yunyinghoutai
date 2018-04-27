/**
 * Created by Administrator on 2018/2/7.
 */
import React from 'react'
import './cardtabs.less'


export default class CardTabs extends React.Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const activeId = this.props.activeId;
    const listData = this.props.listData;
    const listItems = listData.map((item, index) => {
      return (
        <li className={item.id === activeId ? "tab-item active" : "tab-item"}
            key={index}
            onClick={() => this.props.selectTab(item.id)}>
          <div className="item-num">{item.number === null ? '-': item.number}</div>
          <div className="item-title">{item.title === null ? '-': item.title}</div>
          <div className="item-vs">
            <span className={item.status === 1 ? "item-vs red" : "item-vs green"}>{item.percent === null ? '-': item.percent}</span>
            <span>VS上个月</span></div>
        </li>
      )
    })
    return (
      <ul className="tab-box">
        {listItems}
      </ul>
    )
  }
}