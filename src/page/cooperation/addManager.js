import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col} from 'antd'
import {Form, Input, Button} from 'antd'
import FormItem from '../../components/common/cards/form'
import XZQ from '../../components/common/xzq'
import ProjectAreaCascader from '../../components/common/cascader/projectarea'
import history from '../../history'

const Item = Form.Item;

@inject("store")
@observer
class AddManager extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = props.store.projectStore;
  }

  componentWillMount() {
    this.projectStore.clear();
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.projectStore.addManager({
          name: values.name,
          mMobile: values.mobile,
          mNickname: values.person,
          aid: values.area[values.area.length - 1],
          psbid: values.psbid[values.psbid.length - 1],
          note: values.comment
        }, () => {
          history.push('/page/cooperation/projectList');
        });
      }
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;
    const { myArea } = this.projectStore;

    return (
      <div className="mt35 container-fluid">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form className="add-form" layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem title="管辖分部" subtitle="用作区分数据统计">
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
              <FormItem title="管理员名称" subtitle="用作合作联系人">
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
              <FormItem title="上级管理员" subtitle="用于关联上级区域">
                <Item>
                  {
                    getFieldDecorator('psbid', {
                      rules: [{required: true, message: '请选择上级管理员'}],
                    })(<ProjectAreaCascader />)
                  }
                </Item>
              </FormItem>
              {/*<FormItem title="管辖范围" subtitle="显示用">*/}
                {/*<Item>*/}
                  {/*{*/}
                    {/*getFieldDecorator('areaType', {*/}
                      {/*initialValue: "1"*/}
                    {/*})(<Select>*/}
                      {/*<Option value="1">按行政区划分</Option>*/}
                    {/*</Select>)*/}
                  {/*}*/}
                {/*</Item>*/}
              {/*</FormItem>*/}
              <FormItem title="选择管辖地区" subtitle="显示用">
                {
                  myArea &&
                  <Item>
                    {
                      getFieldDecorator('area', {
                        rules: [{required: true, message: '请选择管辖地区'}],
                      })(<XZQ startArea={myArea} />)
                    }
                  </Item>
                }
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
const AddManagerForm = Form.create()(AddManager);
export default AddManagerForm