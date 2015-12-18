/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import cp from 'child_process';
import task from './lib/task';
import watch from './lib/watch';

export default task('render', () => new Promise((resolve, reject) => {
  function start() {
    const server = cp.fork(path.join(__dirname, '../build/render.js'), {
      //env: Object.assign({ NODE_ENV: 'development' }, process.env),
    });
  }

  start();
}));
