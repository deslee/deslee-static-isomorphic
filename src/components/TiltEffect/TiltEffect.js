import React, { Component } from 'react';
import styles from './TiltEffect.extra.css';
import withStyles from '../../decorators/withStyles';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';



function mouseMove(e) {
  var containers = document.getElementsByClassName('App-container');

  if (containers.length >= 1) {
    var container = containers[0];
    var centerX = container.clientWidth/2;
    var centerY = container.clientHeight/2;
    var posX = e.clientX;
    var posY = e.clientY;

    var offX = centerX - posX;
    var offY = centerY - posY;

    var smoothing = 400;
    this.setState({
      xDeg: offX/smoothing,
      yDeg: -offY/smoothing
    })
  }
}

@withStyles(styles)
class TiltEffect extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    xDeg: 0,
    yDeg: 0
  };

  componentWillMount() {
    var containers = document.getElementsByClassName('App-container');

    this.listener = mouseMove.bind(this);

    if (containers.length >= 1) {
      var container = containers[0];
      container.addEventListener('mousemove', this.listener);
    }
  }

  componentWillUnmount() {
    var containers = document.getElementsByClassName('App-container');

    if (containers.length >= 1 && this.listener) {
      var container = containers[0];
      container.removeEventListener('mousemove', this.listener);
    }
  }

  render() {
    this.renderCss(`.App-container {transform: rotateY(${this.state.xDeg}deg) rotateX(${this.state.yDeg}deg);}`);
    return <span></span>
  }
}

export default TiltEffect
