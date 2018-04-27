/**
 * Created by Administrator on 2018/3/13.
 */
import React from 'react'
import './fullScreen.less'
import fullOpen from '../../../assets/img/open.png'
import fullClose from '../../../assets/img/close.png'

export default class FullScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      screenTag: true
    }
  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }


  // Find the right method, call on correct element
  launchIntoFullscreen = (e, element) => {
    // console.log("element", element);
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    this.setState({
      screenTag: false
    });
  }

  // launchIntoFullscreen(document.documentElement) // the whole page
  // launchIntoFullscreen(document.getElementById("videoElement")) // any individual element

  // Whack fullscreen
  exitFullscreen = () => {
    this.setState({
      screenTag: true
    });
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  // Cancel fullscreen for browsers that support it!
  // exitFullscreen();

  render() {
    const fullDom = this.props.fullDom;

    return (
      <span className="screen-tag">
        {this.state.screenTag ? <img src={fullOpen} onClick={(e) => this.launchIntoFullscreen(e, fullDom)} alt="打开全屏" ></img> : <img src={fullClose} alt="关闭全屏" onClick={this.exitFullscreen}></img>}
      </span>
    )
  }
}
