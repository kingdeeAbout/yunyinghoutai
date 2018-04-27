/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import {Table} from 'antd';
import "./userCards.less"

export default class UserCards extends React.Component {
  render() {
    const userListParam = {
      'status': '',
      'workerName': '姓名',
      'newbieTask': '新手任务',
      'createDays': '注册天数',
      'activeDays': '持续活跃',
      'expNum': '订单量',
      'gotRate': '取件率',
      'actions': ''
    };

    const columns = [          // 使用了render dataIndex可以不要 没使用dataIndex必须
      {title: userListParam['workerName'], key: 'workerName',
        render: (value, row) => {
          return (
            <div>
              <div className="top">{row.workerName}</div>
              <div className="bottom">{row.phone}</div>
            </div>
          );
        }},
      {title: userListParam['newbieTask'], dataIndex: 'newbieTask', key: 'newbieTask'},
      {title: userListParam['createDays'], key: 'createDays',
        render: (value, row) => {
          return (
            <div>
              <div className="top">{row.createDays}天</div>
              <div className="bottom">{row.created}</div>
            </div>
          );
        }},
      {title: userListParam['activeDays'], key: 'activeDays',
        render: (value, row) => {
          return (
            <div>
              <div className="top">{row.activeDays}天</div>
              <div className="bottom">累计{row.totalActiveDays}天</div>
            </div>
          );
        }},
      {title: userListParam['expNum'], key: 'expNum',
        render: (value, row) => {
          return (
            <div>
              <div className="top">今日{row.todayExpNum}单</div>
              <div className="bottom">昨日{row.ystdExpNum}单</div>
            </div>
          );
        }},
      {title: userListParam['gotRate'], key: 'gotRate',
        render: (value, row) => {
          return (
            <div>
              <div className="top">今日{row.todayGotRate}</div>
              <div className="bottom">昨日{row.ystdGotRate}</div>
            </div>
          );
        }
      },
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