/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './BlogIndex.css';
import withStyles from '../../decorators/withStyles';
import {format as formatDate} from '../../utils/DateUtils'
import Link from '../Link';

//@withStyles(styles)
class BlogIndex extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <section className="BlogIndex">
        {Object.keys(this.props.meta)
          .sort((k1, k2) => new Date(this.props.meta[k1].date) - new Date(this.props.meta[k2].date))
          .reverse()
          .filter(slug => {
            var post = this.props.meta[slug];
            if (this.props.tag) {
              return post.tags.indexOf(this.props.tag) !== -1;
            }
            return true;
          })
          .map(slug => {
          var post = this.props.meta[slug];
          var date = formatDate(post.date)
          return (<div className="post border-bottom pb1" key={slug}>
            <h2><a href={slug} onClick={Link.handleClick}>{post.title}</a></h2>
            <time dateTime={date}>{date}</time>
            &nbsp;
            <ul className="p0 inline">
              {post.tags.map(
                tag =>
                  <li className="inline" key={tag}>
                    <a href={'tag/'+tag} className="body-color bg-darken-1 px1 mr1 rounded" onClick={Link.handleClick}>{tag}</a>
                  </li>
              )}
            </ul>
            {this.props.archive ? null : (
              <p className="mt1"><span className="mt1" dangerouslySetInnerHTML={{__html: post.preview || ''}}></span><a href={post.slug} onClick={Link.handleClick}>... »</a></p>
            )}
          </div>);
        })}
      </section>
    );
  }

}

export default BlogIndex;
