/**
 * Created by dadawang on 2018/2/1.
 */
import React from 'react'
import {observer, inject} from 'mobx-react';
import {Layout, Row, Col, Form, Icon, Input, Button, Checkbox} from 'antd';
import './login.less'
import Logo from '../assets/img/logo_160x50.png'

const {Header, Content} = Layout;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/*注入 stores 的方法*/
@inject("store")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store.loginStore;
  }

  componentDidMount() {
    this.props.form.validateFields();
    this.store.clear();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.store.getLoginData(values.validCode, () => {
          this.props.history.push('/page/index');
        });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
    const { validGap, getValidCodeData } = this.store;

    const mobileError = isFieldTouched('mobile') && getFieldError('mobile');
    const validCodeError = isFieldTouched('validCode') && getFieldError('validCode');
    const mobile = getFieldValue('mobile');
    return (
      <Layout className="login">
        <Header className="header">
          <img src={Logo} alt="快递100" /><span className="title">寄件运营后台</span>
        </Header>
        <Content>
          <Form className="login-form" layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={mobileError ? 'error' : ''}
              help={mobileError || ''}
            >
              {getFieldDecorator('mobile', {
                rules: [{required: true, message: '请输入手机号!'}],
              })(
                <Input
                  prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  size="large"
                  type="tel"
                  maxLength="11"
                  placeholder="手机号"
                />
              )}
            </FormItem>
            <FormItem
              validateStatus={validCodeError ? 'error' : ''}
              help={validCodeError || ''}
            >
              {getFieldDecorator('validCode', {
                rules: [{required: true, message: '请输入验证码!'}],
              })(
                <Row gutter={15}>
                  <Col span={14}>
                    <Input
                      prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      size="large"
                      type="number"
                      placeholder="验证码"
                    />
                  </Col>
                  <Col span={10}>
                    <Button
                      size="large"
                      className="valid-button"
                      disabled={validGap > 0}
                      onClick={() => getValidCodeData(mobile)}
                    >
                      {validGap > 0 ? (validGap + '秒后重新发送') : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>自动登录</Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={hasErrors(getFieldsError())}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}
const LoginForm = Form.create()(Login);
export default LoginForm
