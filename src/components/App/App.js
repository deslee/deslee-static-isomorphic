/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import classNames from 'classnames'
import AppStore from '../../stores/AppStore'

@withContext
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);
    AppStore.subscribe(() => {
      this.setState({
        isLoading: AppStore.getState().pageLoading
      })
    })
  }

  state = {
    isLoading: false
  };

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
        <div className={classNames({'loadingScreen': true, 'isLoading': this.state.isLoading})}>
          Loading...
        </div>
      </div>
    ) : this.props.children;
  }

}

export default App;
