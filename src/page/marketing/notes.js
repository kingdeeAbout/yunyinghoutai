/**
 * Created by dadawang on 2018/3/7.
 */
import React from 'react'
import {observer, inject} from 'mobx-react'
import history from '../../history'
import './notes.less'
import { Row, Col, Input, Button , message} from 'antd'
import NotesApi from '../../api/notesApi'

const { TextArea } = Input;
const api = new NotesApi();

/*注入 stores 的方法*/
@inject("store")
@observer
export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remarks: "",
      records: [],
    }
  }

  componentDidMount() {
    this.getRecords();
  }

  componentWillUnmount() {

  }

  getRecords = () => {
    const id = history.location.state.activeId;
    const type = history.location.state.type;    // type（必须）：备忘录的类型。1销售人员备忘录，2店铺，3项目,4下级网点
    api.getRecordsData({type: type, relateId: id}).then((data) => {
      if (data.status === "200") {
        this.setState({records: data.data})
      } else {
        message.error(data.message);
      }
    })
  };

  handleChangeRemarks = (event) => {
    this.setState({remarks: event.target.value});
  };

  addRecordsData = () => {
    const id = history.location.state.activeId;
    const type = history.location.state.type;
    api.addRecordsData({type: type, relateId: id, content: this.state.remarks}).then((data) => {
      if (data.status === "200") {
        this.getRecords();
        this.setState({
          remarks: ''
        });
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    })
  };
  submit = () => {
    this.addRecordsData();
  };

  render() {
    const listData = this.state.records;
    const recordList = listData.map((item, index) => {
      return (
        <div className="bind-content-panel panel mt20"  key={index}>
          <div className="bind-content-panel-text">
            {item.content}
          </div>
          <div className="clearfloat mt30">
            <div className="bind-content-panel-infor">
              <span className="bind-content-panel-name">{item.nickname}</span>
              <span className="bind-content-panel-time"> {item.createTime}</span>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="mt35 container-fluid notes">
        <Row>
          <Col xs={24} sm={24} md={24} lg={10}>
            <div className="bind-users">
              <div className="bind-title">添加备忘录</div>
              <div className="bind-content">
                <div className="bind-content-operate panel">
                  <TextArea rows={4} name="remarks" className="text-area" placeholder="显示用" value={this.state.remarks} onChange={this.handleChangeRemarks}/>
                  <div className="add-record clearfloat">
                    <Button type="primary" onClick={this.submit} className="add-record-button mb20 mt20">添加记录</Button>
                  </div>
                </div>
                {recordList}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}