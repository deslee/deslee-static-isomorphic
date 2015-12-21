
import React, { Component } from 'react';
import styles from './SnowEffect.extra.css';
import withStyles from '../../decorators/withStyles';
import snowstorm from './snowstorm'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

var storm;

@withStyles(styles)
class SnowEffect extends Component {
  componentWillMount() {
    if (canUseDOM) {
      storm = new snowstorm(window, document);
      storm.followMouse = false;
      storm.start();
    }
  }
  componentWillUnmount() {
    if (storm) {
      storm.stop();
    }
  }
  render() {
    return <div className="SnowingPage"></div>
  }
}

export default SnowEffect
