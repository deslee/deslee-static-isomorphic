import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import {canonical_url, disqus_shortname} from '../../config';

const SHORTNAME = disqus_shortname;
const WEBSITE_URL = canonical_url;

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://' + SHORTNAME + '.disqus.com/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({reload: true});
  }
}

class DisqusThread extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    let { path, ...other} = this.props;

    if (canUseDOM) {
      /* eslint-disable camelcase */
      window.disqus_config = function() {
        this.page.url = WEBSITE_URL + path;
        this.page.identifier = path;
      };
      /* eslint-enable camelcase */
    }

    return <div {...other} id="disqus_thread" />;
  }

}

export default DisqusThread;
