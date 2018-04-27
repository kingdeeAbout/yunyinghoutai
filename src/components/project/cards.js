
import React from 'react'
import Cards from "../common/cards/cards"

export default class ProjectCards extends React.Component {
  render() {
    const activeId = this.props.activeId;
    const selectItem = this.props.selectItem;
    const openItem = this.props.openItem;
    const listData = this.props.listData.map((item) => {
      return {
        id: item.id,
        title: item.name,
        subtitle: item.manager.nickname,
        data1: '今日' + item.todayExpNum + '单',
        data2: '昨日' + item.yesterdayExpNum + '单，累计' + item.totalExpNum + '单',
        action: item.subCount ? ('下级网点（' + item.subCount + '）') : '',
        status: -1,
        selectItem: () => selectItem(item.id),
        openItem: (e) => openItem(e, item.sbid, item.name)
      }
    });
    return (
      <Cards listData={listData} activeId={activeId} />
    )
  }
}