/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';


//@withStyles(styles)
class Header extends Component {

  constructor(props) {
    super(props);
    var headerImg = require('./face-sm.jpg');
    if (headerImg[0] === '/') {
      headerImg = headerImg.slice(1);
    }
    this.headerImg = headerImg;
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={this.headerImg} className="circle Header-img" alt="" />
          </a>
          <h1>Desmond Lee</h1>
          <Navigation className="Header-nav" />
          <p>I'm a Software Engineer from Dallas. This is my website and blog.</p>
        </div>
      </div>
    );
  }

}

export default Header;
