/**
 * Created by dadawang on 2018/2/7.
 */
import React from 'react'
import "./cards.less"

class Card extends React.Component {
  render() {
    const activeId = this.props.activeId;
    const item = this.props.data;
    return (
      <div className={item.id === activeId ? "card-wrapper active" : "card-wrapper"} onClick={item.selectItem}>
        <span className={item.status === 1 ? "circle blue" : (item.status === 0 ? "circle red" : "circle")}></span>
        <div className="card-top">
          <div className="card-line-1">
            <span className="card-name">{item.title}</span>
            <span className="card-desc">{item.data1}</span>
          </div>
          <div className="card-line-2">
            <span className="card-name">{item.subtitle}</span>
            <span className="card-desc">{item.data2}</span>
          </div>
        </div>
        {
          item.action &&
          <div className="card-bottom border-top">
            <span className="card-desc"><a onClick={item.openItem}>{item.action}</a></span>
          </div>
        }
      </div>
    )
  }
}

export default class Cards extends React.Component {
  render() {
    const activeId = this.props.activeId;
    const listData = this.props.listData;
    const listItems = listData.map((item, index) => {
      return (
        <Card data={item} activeId={activeId} key={index} />
      )
    });
    return (
      <div>{listItems}</div>
    )
  }
}