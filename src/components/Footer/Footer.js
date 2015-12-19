/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import moment from 'moment'

//@withViewport
//@withStyles()
class Footer extends Component {

  static propTypes = {
    /*viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,*/
  };

  render() {
    // This is just an example how one can render CSS
    //const { width, height } = this.props.viewport;
    //this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);

    return (
      <div className="Footer">
        <div className="left">Desmond Lee © {moment().format("YYYY")}</div>
        <div className="right"><a href="https://github.com/deslee/deslee-static-isomorphic" style={{color:'inherit'}}>Source</a></div>
      </div>
    );
  }

}

export default Footer;
