
import React, { Component } from 'react';
import styles from './ExtraMenu.extra.css';
import withStyles from '../../decorators/withStyles';
import {toggleSnowing, toggleTilting} from '../../actions';

@withStyles(styles)
class ExtraMenu extends Component {
  toggleFunction(func, e) {
    func();
    e.preventDefault();
  };

  render() {
    return <div className="ExtraMenu bg-app p1 clearfix border-bottom">

      <div className="col col-12 md-col-4 px1">
        <h2>Extras</h2>
        <p>A collection of experimental functionality for the site!</p>
      </div>

      <div className="col col-12 md-col-4 px1">
        <h3>Effects</h3>
        <p><a href="" onClick={this.toggleFunction.bind(this, toggleSnowing)}>Toggle Snow</a></p>
        <p><a href="" onClick={this.toggleFunction.bind(this, toggleTilting)}>Toggle Tilt</a></p>
      </div>

    </div>
  }
}

export default ExtraMenu
