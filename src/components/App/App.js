/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import classNames from 'classnames'
import AppStore from '../../stores/AppStore'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Effects from '../Effects'


var components = {
  'handler_extraMenu': () => new Promise(resolve => require(['../ExtraMenu'], resolve))
};

@withContext
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.unsubscribe = AppStore.subscribe(() => {
      this.setState({
        isLoading: AppStore.getState().pageLoading
      })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  extraMenu(show, e) {
    (async () => {
        components.ExtraMenu = await components['handler_extraMenu']();
        this.setState({showExtraMenu: show});
      })();
    e.preventDefault();
  }

  state = {
    isLoading: false
  };

  render() {
    return (
      <div className="App-Frame">

        <div className={classNames({'loadingBar': true, 'showing': this.state.isLoading})}>
          <div className="bg-blue"></div>
        </div>


        <CSSTransitionGroup transitionName="ExtraMenu-transition" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {this.state.showExtraMenu ? <components.ExtraMenu></components.ExtraMenu> : null}
        </CSSTransitionGroup>
        <Effects />

        <div className="App-container container flex flex-column">

          <div className="cont-mt1 animate-margin-top"></div>
          <div className="clearfix flex-grow sym-shadow bg-app">
            <i className="fa fa-bars absolute p2 h1 hover-cursor"
               onClick={this.extraMenu.bind(this, !Boolean(this.state.showExtraMenu))}></i>
            <header className="px2 col col-12 md-col-3 center md-left">
              <Header />
            </header>

            <main className="px2 col col-12 md-col-9 lg-col-6">
              <CSSTransitionGroup transitionName="App-transition" transitionEnterTimeout={250}
                                  transitionLeaveTimeout={1}>
                <div key={this.props.path}>{this.props.children}</div>
              </CSSTransitionGroup>
            </main>

            <div className="col col-12 lg-col-3">
              <Sidebar />
            </div>
          </div>

          <footer className="gray left-align p2 sym-shadow bg-app">
            <Footer />
          </footer>
        </div>
      </div>
    )
  }

}

export default App;
