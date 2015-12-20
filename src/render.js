/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import React from 'react';
import fs from 'fs';
import mkdirp from 'mkdirp';
import ReactDOM from 'react-dom/server';
import Router, {routes, blogMeta} from './routes';
import Html from './components/Html';
import globals from './globals'
import {getHash} from './utils/CacheUtils';
import {replaceAll} from './utils/StringUtils'

var hash;
(async() => {
  hash = await getHash();
})();

var customRoutes = Router.routes.map(route => {
  return route.path; //route.path.slice(globals.publicUrl.length);
}).filter(path => path.length && path.indexOf('*') == -1 && path.indexOf(':') == -1);

Object.keys(routes).concat(customRoutes).forEach(processRoute);

// render tags
(() => {
  var tags = [];
  Object.keys(blogMeta).forEach(async slug => {
    var post = blogMeta[slug];
    if (post.tags) {
      post.tags.forEach(tag => {
        if (tags.indexOf(tag) == -1) {
          tags.push(tag);
        }
      })
    }
  });

  console.log('unique tags', tags);
  var baseTagRoute = globals.publicUrl+'/tag/'
  tags.forEach(tag => processRoute(baseTagRoute+tag))
})();


async function dispatch(route) {
  return new Promise(async (resolve, reject) => {
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => {
        css.push(value)
      },
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value
    };

    console.log("dispatching", route);

    await Router.dispatch({ path: route, context }, (state, component) => {
      try {
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        console.log("dispatched ", route);
      } catch (error) {
        console.log(error);
      }
    });

    if (globals.publicUrl == '') {
      data.base = '/'
    } else {
      data.base = globals.publicUrl + '/';
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    resolve(html);
  })
}

async function processRoute(route) {
  const writePath = path.relative(globals.publicUrl.length ? globals.publicUrl : '/', route)
  console.log('write path', writePath);
  const filePath = path.join(__dirname, 'public', writePath, 'index.html');
  console.log("writing to", filePath);
  mkdirp.sync(path.dirname(filePath));
  var html = await dispatch(route);
  html = replaceAll(html, '&lt;?= scripthash ?&gt;', hash.scriptHash);
  html = replaceAll(html, '&lt;?= stylehash ?&gt;', hash.styleHash);
  fs.writeFile(filePath, html);
}
