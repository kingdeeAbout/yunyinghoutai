import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col} from 'antd'
import {Form, Input, Button} from 'antd'
import FormItem from '../../components/common/cards/form'
import XZQ from '../../components/common/xzq'
import history from '../../history'

const Item = Form.Item;

@inject("store")
@observer
class AddSales extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store.marketingStore;
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.store.addSales({
          nickname: values.name,
          mobile: values.mobile,
          aid: values.area[values.area.length - 1],
          note: values.comment
        }, () => {
          history.push('/page/marketing/salesBoard');
        });
      }
    });
  }

  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;

    return (
      <div className="mt35 container-fluid">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form className="add-form" layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem title="负责人" subtitle="与经销挂钩，每人只能添加一次">
                <Item>
                  {
                    getFieldDecorator('name', {
                      rules: [{required: true, message: '请输入负责人名称'}],
                    })(<Input
                      name="name"
                      type="text"
                      placeholder="请输入负责人名称"
                    />)
                  }
                </Item>
              </FormItem>
              <FormItem title="手机号码" subtitle="非常重要，用作登录">
                <Item>
                  {
                    getFieldDecorator('mobile', {
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
              <FormItem title="区域名称" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('area', {
                      rules: [{required: true, message: '请选择区域'}],
                    })(<XZQ />)
                  }
                </Item>
              </FormItem>
              <FormItem title="备注" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('comment', {
                      rules: [{required: false, message: '请输入备注'}],
                    })(<Input
                      name="comment"
                      type="text"
                      placeholder="请输入备注"
                    />)
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
                  添加
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
const AddSalesForm = Form.create()(AddSales);
export default AddSalesForm