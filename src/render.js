/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import React from 'react';
import fs from 'fs';
import mkdirp from 'mkdirp';
import ReactDOM from 'react-dom/server';
import Router, {routes} from './routes';
import Html from './components/Html';
import globals from './globals'

var customRoutes = Router.routes.map(route => {
  return route.path //route.path.slice(globals.publicUrl.length);
}).filter(path => path.length && path.indexOf('*') == -1);

Object.keys(routes).concat(customRoutes).forEach(async route => {

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
  const writePath = path.relative(globals.publicUrl.length ? globals.publicUrl : '/', route)
  console.log('write path', writePath);

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
  const filePath = path.join(__dirname, 'public', writePath, 'index.html');

  console.log("writing to", filePath);

  mkdirp.sync(path.dirname(filePath));
  fs.writeFile(filePath, html);
});
