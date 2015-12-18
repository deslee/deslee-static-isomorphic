/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import globals from './globals'

export const routes = {}; // Auto-generated via webpack loader. See tools/lib/routes-loader.js

console.log('available dynamic routes', Object.keys(routes))

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context} error={state.error}>{component}</App>;
  });

  on(globals.publicUrl+'/contact', async () => <ContactPage />);

  on(globals.publicUrl+'/login', async () => <LoginPage />);

  on(globals.publicUrl+'/register', async () => <RegisterPage />);

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
    console.log('route path', reqPath);
    var handler = routes[reqPath];
    if (handler) {
      var result = await handler();
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

export default router;
