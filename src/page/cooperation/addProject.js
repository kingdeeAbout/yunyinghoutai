import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col} from 'antd'
import {Form, Input, Select, Button} from 'antd'
import FormItem from '../../components/common/cards/form'
import XZQ from '../../components/common/xzq'
import history from '../../history'

const Option = Select.Option;
const Item = Form.Item;

@inject("store")
@observer
class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = props.store.projectStore;
    this.marketingStore = props.store.marketingStore;
  }

  componentDidMount() {
    this.marketingStore.getAllSalesList();
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.projectStore.addProject({
          name: values.name,
          mMobile: values.mobile,
          mNickname: values.person,
          aid: values.area ? values.area[values.area.length - 1] : '',
          flag: (values.cash === '1' ? 0 : 2) + (values.extract === '1' ? 0 : 1),
          cashBackCharge: values.extractPay,
          sstid: values.leader,
          note: values.comment
        }, () => {
          history.push('/page/cooperation/projectList');
        });
      }
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;
    const { allSalesData } = this.marketingStore;
    const salesOption = allSalesData.map((item) => {
      return (
        <Option value={item.id} key={item.id}>{item.nickname}</Option>
      )
    });

    return (
      <div className="mt35 container-fluid">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form className="add-form" layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem title="项目名称" subtitle="用作区分数据统计">
                <Item>
                  {
                    getFieldDecorator('name', {
                      rules: [{required: true, message: '请输入项目名称'}],
                    })(<Input
                      name="name"
                      type="text"
                      placeholder="请输入项目名称"
                    />)
                  }
                </Item>
              </FormItem>
              <FormItem title="合作对接人" subtitle="用作合作联系人">
                <Item>
                  {
                    getFieldDecorator('person', {
                      rules: [{required: true, message: '请输入合作联系人'}],
                    })(<Input
                      name="person"
                      type="text"
                      placeholder="请输入合作联系人"
                    />)
                  }
                </Item>
              </FormItem>
              <FormItem title="手机号码" subtitle="用作登录项目主管账号">
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
              <FormItem title="所在区域" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('area')(<XZQ />)
                  }
                </Item>
              </FormItem>
              <FormItem title="提现方案" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('extract', {
                      initialValue: "1"
                    })(<Select>
                      <Option value="1">可提现</Option>
                      <Option value="0">不可提现</Option>
                    </Select>)
                  }
                </Item>
              </FormItem>
              <FormItem title="提现手续费" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('extractPay', {
                      initialValue: "0.01"
                    })(<Select>
                      <Option value="0.01">1%</Option>
                      <Option value="0.02">2%</Option>
                    </Select>)
                  }
                </Item>
              </FormItem>
              <FormItem title="是否允许现金支付" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('cash', {
                      initialValue: "1"
                    })(<Select>
                      <Option value="1">允许现金支付</Option>
                      <Option value="0">不允许现金支付</Option>
                    </Select>)
                  }
                </Item>
              </FormItem>
              <FormItem title="主管销售" subtitle="显示用">
                <Item>
                  {
                    getFieldDecorator('leader', {
                      initialValue: allSalesData.length ? allSalesData[0].id : ''
                    })(<Select>
                      {salesOption}
                    </Select>)
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
const AddProjectForm = Form.create()(AddProject);
export default AddProjectForm