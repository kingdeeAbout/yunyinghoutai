
import React from 'react'
import { inject } from 'mobx-react'
import { Cascader } from 'antd'
import ProjectApi from '../../../api/projectApi'

const api = new ProjectApi();

@inject('store')
export default class ProjectAreaCascader extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = this.props.store.projectStore;
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    this.mounted = true;
    api.getProjectAreaList({}).then((data) => {
      if(data.data[0].aid) this.projectStore.setMyArea(data.data[0].aid);
      else this.projectStore.setMyArea('');
      if (this.mounted) {
        this.setState({
          options: data.data.map((area) => {
            return {
              value: area.sbid,
              label: area.name,
              isLeaf: area.subCount === 0
            }
          })
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    api.getProjectAreaList({"sbid": targetOption.value}).then((data) => {
      targetOption.loading = false;
      targetOption.children = data.data.map((child) => {
        return {
          value: child.sbid,
          label: child.name,
          isLeaf: child.subCount === 0
        }
      });
      this.setState({
        options: [...this.state.options],
      });
    });
  };

  render() {
    return (
      <Cascader
        placeholder="请选择上级管理员"
        options={this.state.options}
        allowClear={false}
        loadData={this.loadData}
        onChange={this.props.onChange}
        changeOnSelect
      />
    );
  }
}