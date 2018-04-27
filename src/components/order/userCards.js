/**
 * Created by Administrator on 2018/4/19.
 */
import React from 'react'
import {Table} from 'antd';
import "../courier/userCards.less"

export default class UserCards extends React.Component {
  render() {
    const userListParam = {
      'status': '',
      'sendName': '寄件人',
      'sentUnit': '寄件类型',
      'mktName': '所属门店',
      'kuaidiCom': '快递公司',
      'gotAddr': '取件地址',
      'created': '寄件时间',
      'actions': ''
    };

    const columns = [
      {title: userListParam['sendName'], key: 'sendName',
        render: (value, row) => {
          return (
            <div>
              <div className="top">{row.sendName} -> {row.recName}</div>
              <div className="bottom">{row.sendMobile}</div>
            </div>
          );
        }},
      {title: userListParam['sentUnit'], key: 'sentUnit',
        render: (value, row) => {
          return (
            <div>
              <div className="top">{row.sentUnit === "PERSONAL" ? "个人件" : "公司件"}</div>
              <div className="bottom">{(row.tabId === 'PRINTWAIT' ? "待打印": "") || (row.tabId === 'GOTWAIT' ? "待取件": "") ||(row.tabId === 'SENTGOT' ? "已取件": "") ||(row.tabId === 'CANCEL' ? "已取消": "")}</div>
            </div>
          );
        }},
      {title: userListParam['mktName'], dataIndex: 'mktName', key: 'mktName'},
      {title: userListParam['kuaidiCom'], key: 'kuaidiCom',
        render: (value, row) => {
          return (
            <div>
              <div className="top"><img src={"http://cdn.kuaidi100.com/images/all/56/" + row.kuaidiCom +".png"}/>{row.kuaidiComName}</div>
              {/*<div className="bottom">累计{row.totalActiveDays}天</div>*/}
            </div>
          );
        }},
      {title: userListParam['gotAddr'], dataIndex: 'gotAddr', key: 'gotAddr'},
      {title: userListParam['created'], dataIndex: 'created', key: 'created'},
      // {
      //   title: userListParam['actions'],
      //   dataIndex: 'actions',
      //   key: 'actions',
      //   render: () => {
      //     return (
      //       <span className="box-item detail">详情</span>
      //     );
      //   }
      // }
    ];
    return (
      <Table
        className="re-ant-table-wrapper"
        columns={columns}
        dataSource={this.props.tableData}
        onRow={(record) => {
          return {
            onClick: () => {
              this.props.onSelectItem(record.id)
            }
          }
        }}
        rowClassName={(record) => {
          if(record.id === this.props.activeId) return 'active';
          return '';
        }}
        loading={this.props.loading}
        locale={{emptyText: '暂无数据'}}
        pagination={{
          current: this.props.currentPage,
          total: this.props.total,
          defaultPageSize: this.props.defaultPageSize,
          onChange: this.props.onSetPage
        }}
      />
    )
  }
}