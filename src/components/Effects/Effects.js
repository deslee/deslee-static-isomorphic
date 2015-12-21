import React, { Component } from 'react';
import withStyles from '../../decorators/withStyles';
import AppStore from '../../stores/AppStore'

var components = {
  'snowHandler': () => new Promise(resolve => require(['../SnowEffect'], resolve)),
  'tiltHandler': () => new Promise(resolve => require(['../TiltEffect'], resolve))
};

class Effects extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = AppStore.subscribe(() => {
      this.updateEffect('SnowEffect', 'snowHandler', 'isSnowing');
      this.updateEffect('TiltEffect', 'tiltHandler', 'isTilting');
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  updateEffect(name, handler, check) {
    if (AppStore.getState()[check]) {
      (
        async () => {
          components[name] = await components[handler]();
          var state = {};
          state[check] = true;
          this.setState(state);
        }
      )();
    } else {
      var state = {};
      state[check] = false;
      this.setState(state);
    }
  }

  state = {
    isSnowing: false
  };

  render() {
    return <span>
      {this.state.isSnowing && components.SnowEffect ? <components.SnowEffect /> : null}
      {this.state.isTilting && components.TiltEffect ? <components.TiltEffect /> : null}
    </span>
  }
}

export default Effects
