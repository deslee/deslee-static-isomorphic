import 'babel-core/polyfill';

(async () => new Promise(resolve => require(['./app'], resolve)))();
