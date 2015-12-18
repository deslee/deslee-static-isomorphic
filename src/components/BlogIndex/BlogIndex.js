/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './BlogIndex.css';
import withStyles from '../../decorators/withStyles';

//@withStyles(styles)
class BlogIndex extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="BlogIndex">
        <div className="BlogIndex-container">
          bloggy
        </div>
      </div>
    );
  }

}

export default BlogIndex;
