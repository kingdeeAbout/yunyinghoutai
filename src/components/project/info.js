
import React from 'react'
import InfoCard from '../common/cards/info'

export default class ProjectInfoCard extends React.Component {
  render() {
    const information = this.props.basicData;
    const { type, size, needEdit } = this.props;

    return (
      <InfoCard
        name={information.name ? information.name : ''}
        subname={information.mNickname ? ('(' + information.mNickname + ')') : ''}
        tel={information.manager ? (information.manager.nickname + ' ' + information.manager.mobile) : '-'}
        desc={information.address ? information.address : '-'}
        usersCount={information.markets ? information.markets : '0'}
        noteNum={information.noteNum ? information.noteNum : '0'}
        activeId={information.id}
        sbid={information.sbid}
        size={size}
        type={type}
        modalData={information}
        needEdit={needEdit}
      />
    )
  }
}