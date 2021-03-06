import React, { PropTypes, Component } from 'react';
import styles from './StupidTweetySubmissionMaker.css';
import withStyles from '../../decorators/withStyles';
import {ContentHeader} from '../../components/ContentPage';
var tweetySrc = require("./tweety.png");
if (tweetySrc[0] === '/') {
  tweetySrc = tweetySrc.slice(1);
}

var dependencyLoader = () => new Promise(resolve => require(['./StupidTweetySubmissionMaker-dependencies'], resolve));
var deps;

var postProps = {
  title: "AWS Cloud Facial Recognition",
  slug: "aws-cloud-facial-recognition",
  date: "2016-02-14",
  preview: "I wrote a web application that detects faces in a picture and draws over the region.",
  tags: ["dev", "aws"]
};

withStyles(styles)
class StupidTweetySubmissionMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      status: "Waiting for Picture",
			content: ""
    };
    console.log(this.state.loaded, "const")
  }

  async loadDependencies() {
    deps = await dependencyLoader();
    this.setState({
      loaded: true
    });
    deps("StupidTweetySubmissionMaker-DropHere", "StupidTweetySubmissionMaker-Canvas", "StupidTweetySubmissionMaker-Tweety", this.statusUpdate.bind(this), this.onContent.bind(this))
  }

	onContent(data) {
		var content = data.content;
		this.setState({
			content: content
		});
	}

  statusUpdate(status) {
    this.setState({
      status: status
    })
  }

  componentWillMount() {
    if (typeof(window) !== "undefined") {
      this.loadDependencies();
    }
  }

  render() {
    if (!this.state.loaded) {
      console.log("loadingggg")
      return (
        <ContentHeader {...postProps}>
          Loading
        </ContentHeader>
      )
    }

    console.log("loadedddd")

    return (
      <ContentHeader {...postProps}>
        <div className="mt1">

        	<div className="mt1" dangerouslySetInnerHTML={{__html: this.state.content || ''}}/>

					<p>Status: <code>{this.state.status}</code></p>
          

          <div className="clearfix">
            <button className="btn col-12 p2 bg-yellow black" id="StupidTweetySubmissionMaker-DropHere">
              <p>
                Browse your computer for a file
              </p>
              <p>
                or
              </p>
              <p className="p0">
                Drop a file into this spot
              </p>
            </button>
          </div>

          <canvas className="col-12" height="500" id="StupidTweetySubmissionMaker-Canvas"></canvas>
          <img className="hide" src={tweetySrc} alt="" id="StupidTweetySubmissionMaker-Tweety" />

        </div>
      </ContentHeader>
    )
  }

  static initializeMeta(blogMeta) {
    blogMeta['stupid-tweety-submission-maker'] = postProps;
  }
}

export default StupidTweetySubmissionMaker;
