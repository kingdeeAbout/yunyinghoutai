import React from 'react'
import "./form.less"

export default class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      isActive: false
    }
  }

  onMouseEnter() {
    this.setState({
      isActive: true,
    });
  }

  onMouseLeave() {
    this.setState({
      isActive: false,
    })
  }

  render() {
    return (
      <div className={this.state.isActive ? "form-wrapper active" : "form-wrapper"} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="form-left">
          <div className="form-title">{this.props.title}</div>
          <div className="form-subtitle">{this.props.subtitle}</div>
        </div>
        <div className="form-right">
          {this.props.children}
        </div>
      </div>
    )
  }
}