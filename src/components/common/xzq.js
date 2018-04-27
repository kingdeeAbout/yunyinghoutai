
import React from 'react'
import { Cascader } from 'antd'
import CommonApi from '../../api/commonApi'

const api = new CommonApi();

export default class XZQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentWillMount() {
    this.mounted = true;
    const { startArea } = this.props;
    const startCode = startArea ? startArea.code : '';
    const startLevel = (startArea && startArea.level) ? startArea.level : (this.props.startLevel ? this.props.startLevel : 1);
    const lastLevel = this.props.lastLevel ? this.props.lastLevel : 4;

    if(startArea && startLevel === 4) {
      if (this.mounted) {
        this.setState({
          options: [{
            value: startArea.code,
            label: startArea.name,
            isLeaf: true
          }]
        });
      }
    } else if(startCode) {
      api.getChilds(startCode).then((data) => {
        if (this.mounted) {
          this.setState({
            options: data.data.map((area) => {
              return {
                value: area.code,
                label: area.name,
                isLeaf: area.level >= lastLevel
              }
            })
          });
        }
      });
    } else {
      api.getArea(startLevel).then((data) => {
        if (this.mounted) {
          this.setState({
            options: data.data.map((area) => {
              return {
                value: area.code,
                label: area.name,
                isLeaf: area.level >= lastLevel
              }
            })
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadData = (selectedOptions) => {
    const lastLevel = this.props.lastLevel ? this.props.lastLevel : 4;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    api.getChilds(targetOption.value).then((data) => {
      targetOption.loading = false;
      targetOption.children = data.data.map((child) => {
        return {
          value: child.code,
          label: child.name,
          isLeaf: child.level >= lastLevel
        }
      });
      this.setState({
        options: [...this.state.options],
      });
    });
  };

  render() {
    if(this.state.options.length > 0)
      return (
        <Cascader
          placeholder="请选择行政区"
          options={this.state.options}
          allowClear={false}
          loadData={this.loadData}
          onChange={this.props.onChange}
          changeOnSelect
        />
      );
    else return ''
  }
}