/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import GitRepo from 'git-repository';
import task from './lib/task';
import fetch from './lib/fetch';
import AWS from 'aws-sdk';
import fs from 'fs';
import glob from 'glob';
import mime from 'mime';
import path from 'path';
import zlib from 'zlib';
var s3 = new AWS.S3();

var bucketName = !process.argv.includes('prod') ? 'deslee-stage' : 'deslee'

export default task('deploy', async () => {
  global.deploy = true;
  var deleted = await emptyBucket();
  console.log(`Emptied bucket ${bucketName} of ${deleted} objects`);

  var fileNames = await getFileNames();
  for (var i = 0; i < fileNames.length; ++i) {
    var fileName = fileNames[i];
    await uploadFile(fileName);
  }
})

function listBuckets() {
  return new Promise((resolve, reject) => {
    s3.listBuckets((err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

function listObjects() {
  return new Promise((resolve, reject) => {
    s3.listObjects({Bucket: bucketName}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

function emptyBucket() {
  return new Promise(async (resolve, reject) => {
    var data = await listObjects();

    if (data.Contents.length == 0) {
      resolve(0);
    }

    var keys = data.Contents.map(function(content) {
      return {Key: content.Key}
    });

    s3.deleteObjects({
      Bucket: bucketName,
      Delete: {Objects: keys}
    }, (err, data) => {
      if (err) return reject(err);
      resolve(data.Deleted.length);
    });
  })
}

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    var stream = fs.createReadStream(path.join(__dirname, '../build/public', file));
    var mimeType = mime.lookup(file);

    var params = {
      Bucket: bucketName,
      Key: file,
      ContentType: mimeType,
    };


    if (mimeType.indexOf('text/') == 0 || mimeType.indexOf('/javascript') !== -1) {
      params.ContentEncoding = 'gzip'
      stream = stream.pipe(zlib.createGzip());
    }

    console.log(`Uploading ${file} of type ${mimeType} ${params.ContentEncoding == 'gzip' ? 'gzipped' : ''}`)

    params.Body = stream;

    s3.upload(params)
    .send((err, data) => {
      if (err) return reject(err);
      return resolve(data);
    })
  });
}

function getFileNames() {
  return new Promise((resolve, reject) => {
    glob('**/*',{cwd: path.join(__dirname, '../build/public'), mark: true}, (err, files) => {
      if (err) return reject(err);
      resolve(files.filter(file => file.charAt(file.length-1) !== '/'));
    });
  })
}

/*

// For more information visit http://gitolite.com/deploy.html
const getRemote = (slot) => ({
  name: slot ? slot : 'production',
  url: `https://example${slot ? '-' + slot : ''}.scm.azurewebsites.net:443/example.git`,
  website: `http://example${slot ? '-' + slot : ''}.azurewebsites.net`,
});

/!**
 * Deploy the contents of the `/build` folder to a remote
 * server via Git. Example: `npm run deploy -- production`
 *!/
export default task('deploy', async () => {
  // By default deploy to the staging deployment slot
  const remote = getRemote(process.argv.includes('production') ? null : 'staging');

  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, 'master'))) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/master`, { hard: true });
    await repo.clean({ force: true });
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('release');
  await require('./build')();

  // Push the contents of the build folder to the remote server via Git
  await repo.add('--all .');
  await repo.commit('Update');
  await repo.push(remote.name, 'master');

  // Check if the site was successfully deployed
  const response = await fetch(remote.website);
  console.log(`${remote.website} -> ${response.statusCode}`);
});
*/
