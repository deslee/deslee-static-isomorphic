/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Sidebar.css';
import withStyles from '../../decorators/withStyles';

//@withStyles(styles)
class Sidebar extends Component {

  render() {
    return (
      <div className="Feedback">
        <hr className="lg-hide" />
        <div className="px2 col col-12 md-col-4 lg-col-12"><h3>Friends</h3>
          <ul className="p0 list-reset">
            <li><a href="http://elizabethdelrosario.com/">Elizabeth Del Rosario</a></li>
            <li><a href="http://spencer-hawkins.com/">Spencer Hawkins</a></li>
          </ul>
        </div>
        <div className="px2 col col-12 md-col-4 lg-col-12"><h3>Contact me</h3>
          <ul>
            <li><a href="https://plus.google.com/+DesmondLeeC/">Google+ <i className="fa fa-google-plus-square red"></i></a>
            </li>
            <li><a href="https://twitter.com/desmond_c_lee">Twitter <i className="fa fa-twitter blue"></i></a></li>
          </ul>
        </div>

      </div>
    );
  }

}

export default Sidebar;
