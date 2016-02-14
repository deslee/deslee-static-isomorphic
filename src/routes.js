/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import BlogIndex from './components/BlogIndex'
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import globals from './globals'
import Location from './core/Location';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';


import StupidTweetySubmissionMaker from './pages/StupidTweetySubmissionMaker'

import {setLoading} from './actions'

export const routes = {}; // Auto-generated via webpack loader. See tools/lib/routes-loader.js
export const blogMeta = {};

StupidTweetySubmissionMaker.initializeMeta(blogMeta);

if (canUseDOM) {
  window.dynamicRoutes = Object.keys(routes);
}
var lastView;

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    if (canUseDOM) {
      var fitvids = require('fitvids');
      setTimeout(() => fitvids(), 1);
      var view = state.path + location.search;
      if (view != lastView) {
        lastView = view;
        console.log("pv", view);
        ga('send', 'pageview', view);
      }
    }
    /*setLoading(true);
    await fakeWait();
    setLoading(false);*/
    return component && <App context={state.context} error={state.error} path={state.path}>{component}</App>;
  });

  on(globals.publicUrl+'/', async (state) => <BlogIndex title="Desmond Lee" meta={blogMeta} />);
  on(globals.publicUrl+'/stupid-tweety-submission-maker', async (state) => <StupidTweetySubmissionMaker />);
  on(globals.publicUrl+'/archive', async (state) => <BlogIndex title="Desmond Lee" meta={blogMeta} archive="true" />);
  on(globals.publicUrl+'/tag/:tag', async (state) => <BlogIndex title="Desmond Lee" meta={blogMeta} tag={state.params.tag} />);

  on(globals.publicUrl+'/not-found', async (state) => {
    state.error = {
      code: '404'
    };

    return <NotFoundPage />
  });

  on('*', async (state) => {
    var reqPath = state.path;
    if (reqPath.length > globals.publicUrl.length+1 && reqPath.charAt(reqPath.length-1) === '/') {
      reqPath = reqPath.slice(0, reqPath.length-1);
    }
    var handler = routes[reqPath];
    if (handler) {
      setLoading(true);
      var result = await handler();
      setLoading(false);
      result.path = reqPath;
      return result && <ContentPage {...result} />;
    } else {
      state.error = {
        code: '404'
      };
      return <NotFoundPage />
    }
  });
});

async function fakeWait() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  })
}

export default router;
