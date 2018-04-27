/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import {observer, inject} from 'mobx-react'
import { Button, Form, Input} from 'antd';
import './bindUserMobile.less'

const FormItem = Form.Item;
const { TextArea } = Input;

@inject("store")
@observer
class BindUserMobile extends React.Component {
  constructor(props) {
    super(props);
    this.bindUserStore = props.store.bindUserStore;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.bindUserStore.addMobile(values.userRegMobile, this.props.sbid);
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { validMobileNum, unRegMoblie } = this.bindUserStore;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userRegMobileError = isFieldTouched('userRegMobile') && getFieldError('userRegMobile');
    const unRegMobile = unRegMoblie.map((item, index) => {
      return(
        <span key={index}>{item} </span>
      )
    });

    return (
      <div className="bind-user-mobile-wrapper">
        <div className="input-tip">请在下方添加用户注册的手机号（批量添加请用“,”隔开）：</div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userRegMobileError ? 'error' : ''}
            help={userRegMobileError || ''}
          >
            {getFieldDecorator('userRegMobile', {
              rules: [{ required: true, message: '手机号不能为空' }],
            })(
              <TextArea rows={4} placeholder="请输入要添加的手机号码" className="text-area"/>
            )}
          </FormItem>
          {
            validMobileNum > 0 &&
            <div className="valid-number mt20 mb20">已找到{validMobileNum}个有效账号</div>
          }
          {
            unRegMobile.length > 0 &&
            <div className="un-reg-list">以下手机号尚未注册：{unRegMobile}</div>
          }
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="mt20 mb20"
              disabled={this.hasErrors(getFieldsError())}
            >
              绑定快递员
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const BindUserMobileForm = Form.create()(BindUserMobile);
export default BindUserMobileForm