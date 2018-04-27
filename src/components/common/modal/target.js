import React from 'react'
import { Modal, Form, Slider, Button } from 'antd';
import './modal.less'

const Item = Form.Item;

class TargetModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleSubmit = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    return (
      <div>
        <a onClick={this.showModal}>设置目标</a>
        <Modal
          title="本月运营目标"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form className="setting-form" layout="vertical" onSubmit={this.handleSubmit}>
            <Item className="setting-item">
              <div className="setting-title">本月新用户数指标（上月环比增长15%）</div>
              {
                getFieldDecorator('target1', {
                  initialValue: 0
                })(<Slider />)
              }
              <div className="setting-desc">目标增长{getFieldValue('target1')}%，预计月订单量25w</div>
            </Item>
            <Item className="setting-item">
              <div className="setting-title">本月新用户数指标（上月环比增长15%）</div>
              {
                getFieldDecorator('target2', {
                  initialValue: 0
                })(<Slider />)
              }
              <div className="setting-desc">目标增长{getFieldValue('target2')}%，预计月订单量25w</div>
            </Item>
            <Item className="setting-item">
              <div className="setting-title">本月新用户数指标（上月环比增长15%）</div>
              {
                getFieldDecorator('target3', {
                  initialValue: 0
                })(<Slider />)
              }
              <div className="setting-desc">目标增长{getFieldValue('target3')}%，预计月订单量25w</div>
            </Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
            >
              保存
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
const TargetModalForm = Form.create()(TargetModal);
export default TargetModalForm