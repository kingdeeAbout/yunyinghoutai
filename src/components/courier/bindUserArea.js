/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import {observer, inject} from 'mobx-react'
import { Button, Checkbox } from 'antd'
import XZQ from '../../components/common/xzq'
import './bindUserArea.less'

@inject("store")
@observer
class BindUsercity extends React.Component {
  constructor(props) {
    super(props);
    this.bindUserStore = props.store.bindUserStore;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.bindUserStore.addAreaUser(this.props.sbid);
  };

  render() {
    const { allCompany, selectCompany, city, selectCity, getAreaCity, onChangeExpressAll, onChangeAreaAll, handleClickCompany, handleClickCity } = this.bindUserStore;
    const allExpress = allCompany.map((item, index) => {
      return <span className ={selectCompany.indexOf(item.number) !== -1 ? "checked choose-button mb10": "choose-button mb10"} key={index} onClick={(e) => handleClickCompany(e, item.number)}>{item.shortName}</span>
    });
    const allcity = city.map((item, index) => {
      return <span className ={selectCity.indexOf(item.code) !== -1 ? "checked choose-button mb10": "choose-button mb10"} key={index} onClick={(e) => handleClickCity(e, item.code)}>{item.name}</span>
    });

    return (
      <div  className="bind-user-area-wrapper">
        <div className="choose-express">请选择快递公司:</div>
        <Checkbox onChange={onChangeExpressAll} className="mt20">选择全部快递公司</Checkbox>
        <div className="mt20">
          {allExpress}
        </div>
        <div className="choose-city mt20">
          <span className="mr20">请选择地区:</span>
          <XZQ startLevel="2" lastLevel="2" onChange={getAreaCity} className="mt20" />
        </div>
        {
          city.length > 0 &&
          <div>
            <Checkbox onChange={onChangeAreaAll} className="mt20">选择全部城市</Checkbox>
          </div>
        }
        <div className="mt20 mb20">
          {allcity}
        </div>
        <Button
          type="primary"
          size="large"
          className="mt20 mb20"
          onClick={this.handleSubmit}
        >
          绑定快递员
        </Button>
      </div>
    )
  }
}

export default BindUsercity