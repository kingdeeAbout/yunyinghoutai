
import React from 'react'
import {observer, inject} from 'mobx-react'
import { Modal, Form, Input, Button } from 'antd';
import FormItem from '../common/cards/form'

const Item = Form.Item;

@inject("store")
@observer
class UpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = this.props.store.projectStore;
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.activeId;
    const modalData = this.props.modalData;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (modalData.pid) {
          this.projectStore.updateProjectArea({
            id: id,
            name: values.name,
            mNickname: values.person,
            mMobile: values.mobile,
          });
        } else {
          this.projectStore.updateProject({
            id: id,
            name: values.name,
            mNickname: values.person,
            mMobile: values.mobile,
          });
        }
      }
    });
  };

  render() {
    const modalData = this.props.modalData;
    const { updateModalVisible, showUpdateModal, hideUpdateModal } = this.projectStore;
    const {getFieldDecorator, getFieldsError} = this.props.form;

    return (
      <div>
        <a onClick={showUpdateModal}>修改资料</a>

        <Modal
          title="项目修改"
          visible={updateModalVisible}
          onCancel={hideUpdateModal}
          footer={null}
        >
          <Form className="add-form" layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem title="项目名称:">
              <Item>
                {
                  getFieldDecorator('name', {
                    initialValue: modalData.name,
                    rules: [{required: true, message: '请输入项目名称'}],
                  })(<Input
                    name="name"
                    type="text"
                    placeholder="请输入项目名称"
                  />)
                }
              </Item>
            </FormItem>
            <FormItem title="合作对接人:">
              <Item>
                {
                  getFieldDecorator('person', {
                    initialValue: modalData.manager.nickname,
                    rules: [{required: true, message: '请输入合作联系人'}],
                  })(<Input
                    name="person"
                    type="text"
                    placeholder="请输入合作联系人"
                  />)
                }
              </Item>
            </FormItem>
            <FormItem title="手机号码:">
              <Item>
                {
                  getFieldDecorator('mobile', {
                    initialValue: modalData.manager.mobile,
                    rules: [{required: true, message: '请输入手机号'}],
                  })(<Input
                    name="mobile"
                    type="text"
                    maxLength="11"
                    placeholder="请输入手机号"
                  />)
                }
              </Item>
            </FormItem>
            <FormItem title="所在区域:">
              <Item>
                {
                  getFieldDecorator('area')(<div>{modalData.fullAreaName}</div>)
                }
              </Item>
            </FormItem>
            <FormItem title="提现方案">
              <Item>
                {
                  getFieldDecorator('extract', {
                    initialValue: "1"
                  })(<div>{modalData.cashBack ? '可提现' : '不可提现'}</div>)
                }
              </Item>
            </FormItem>
            <FormItem title="提现手续费:">
              <Item>
                {
                  getFieldDecorator('extractPay', {
                    initialValue: "0.01"
                  })(<div>{modalData.cashBackCharge === 0.01 ? '1%':'2%'}</div>)
                }
              </Item>
            </FormItem>
            <FormItem title="是否允许现金支付:">
              <Item>
                {
                  getFieldDecorator('cash', {
                    initialValue: "1"
                  })(<div>{modalData.cashPay ? '允许现金支付': '不允许现金支付'}</div>)
                }
              </Item>
            </FormItem>
            <FormItem title="主管销售">
              <Item>
                {
                  getFieldDecorator('leader', {
                  })(<div>{modalData.saler ? modalData.saler.nickname: ""}</div>)
                }
              </Item>
            </FormItem>
            <FormItem title="备注:">
              <Item>
                {
                  getFieldDecorator('comment', {
                  })(<div>{modalData.note}</div>)
                }
              </Item>
            </FormItem>
            <div>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
              >
                确认
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}
const UpdateInfoForm = Form.create()(UpdateInfo);
export default UpdateInfoForm