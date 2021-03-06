/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ContentPage.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import {format as formatDate} from '../../utils/DateUtils'
import DisqusThread from '../DisqusThread'


export class ContentHeader extends Component {
  render() {
    return (
      <div className="ContentPage">
        <div className="ContentPage-container">
          {
            // title
            this.props.path === '/' ||  Boolean(this.props.hideTitle) ? null : <h1>{this.props.title}</h1>
          }

          {
            // date
            this.props.date ? (
              <div className="inline">
                <time dateTime={formatDate(this.props.date)}>{formatDate(this.props.date)}</time>
                &nbsp;
              </div>
            ) : null
          }

          {
            // tags
            this.props.tags ? (
              <ul className="p0 inline">
                {this.props.tags.map(
                  tag =>
                    <li className="inline" key={tag}>
                      <a href={'tag/'+tag} className="body-color bg-darken-1 px1 mr1 rounded"
                         onClick={Link.handleClick}>{tag}</a>
                    </li>
                )}
              </ul>) : null
          }

          {this.props.children}

          {this.props.blog ? <DisqusThread path={this.props.path} /> : null}
        </div>
      </div>
    )
  }
}

//@withStyles(styles)
class ContentPage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
  };

  render() {
    this.context.onSetMeta('description', this.props.preview);
    this.context.onSetTitle(this.props.title);
    return (
      <ContentHeader {...this.props}>
        <div className="mt1" dangerouslySetInnerHTML={{__html: this.props.content || ''}}/>
      </ContentHeader>
    );
  }

}

export default ContentPage;
