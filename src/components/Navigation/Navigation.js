/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

//@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    var navItem = 'py1 pl0 pr0 md-no-hover-box-shadow md-no-active-box-shadow block col-12 btn btn-outline not-rounded y-group-item regular white main-nav-item'
    return (
      <nav className={classNames(this.props.className, 'Navigation')} role="navigation">
        <ul className="col-12 p0 list-reset inline-block clearfix blue">
          <li
            className={navItem}>
            <a href="" className="block" onClick={Link.handleClick}>Home</a></li>
          <li
            className={navItem}>
            <a href="about" className="block" onClick={Link.handleClick}>About</a></li>
          {/*<li
           className={navItem}>
           <a href="archive" className="block" onClick={Link.handleClick}>Archive</a></li>*/}
        </ul>
      </nav>
    );
  }

}

export default Navigation;
