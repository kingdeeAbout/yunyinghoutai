/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import InfoCard from '../common/cards/info'

export default class SaleManageBasicInfor extends React.Component {
  render() {
    const information = this.props.basicData;
    const { type, size } = this.props;
    return (
      <InfoCard
        name={information.nickname ? information.nickname : ''}
        subname={information.orgName ? ('(' + information.orgName + ')') : ''}
        tel={information.mobile ? information.mobile : '-'}
        desc={information.address ? information.address : '-'}
        usersCount={information.markets ? information.markets : '0'}
        noteNum={information.noteNum ? information.noteNum : '0'}
        activeId={information.id}
        sbid={information.sbid}
        size={size}
        type={type}
        modelTag={false}
      />
    )
  }
}