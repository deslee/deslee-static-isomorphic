import React, { Component } from 'react';
import styles from './TiltEffect.extra.css';
import withStyles from '../../decorators/withStyles';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import fulltilt from './fulltilt'
import GyroNorm from 'gyronorm';

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


function logger(data) {
  console.log(data);
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

    if (canUseDOM) {
      console.log("loading fulltilt")
      fulltilt(window);
      console.log("loading gyronorm")
      var gn = this.gn = new GyroNorm();
      console.log('initializing');
      gn.init({
        logger: logger
      }).then(() => {
        console.log("initialized");
        var smoothing = 6;
        gn.start(data => {
          if (data.do.gamma != 0 && data.do.beta != 0) {
            this.setState({
              'do': data.do,
              xDeg: -data.do.gamma / smoothing,
              yDeg: data.do.beta / smoothing
            });
          }
        })
      });
    }

    if (containers.length >= 1) {
      var container = containers[0];
      container.addEventListener('mousemove', this.listener);
    }
  }

  componentWillUnmount() {
    var containers = document.getElementsByClassName('App-container');

    if (this.gn) {
      this.gn.end();
    }

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
