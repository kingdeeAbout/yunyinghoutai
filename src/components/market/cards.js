
import React from 'react'
import Cards from "../common/cards/cards"

export default class MarketingCards extends React.Component {
  render() {
    const activeId = this.props.activeId;
    const selectItem = this.props.selectItem;
    const listData = this.props.listData.map((item) => {
      return {
        id: item.id,
        title: item.nickname,
        subtitle: item.roles && item.roles.id === 2 ? '销售主管' : '销售人员',
        // data1: (item.finishRate ? item.finishRate : 0) + '%',
        // data2: item.saleTarget.newMarkets + ","+ item.saleTarget.activeMarkets + "," + item.saleTarget.perExpCount + ' ' + item.saleTarget.lossMarkets + '%',
        data1: '',
        data2: '',
        selectItem: () => selectItem(item.id)
      }
    });
    return (
      <Cards listData={listData} activeId={activeId} />
    )
  }
}