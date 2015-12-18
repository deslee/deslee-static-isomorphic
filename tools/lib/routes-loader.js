import glob from 'glob';
import { join, basename, extname } from 'path';
import globals from '../../src/globals';
import fs from 'fs';
import fm from 'front-matter';
import {default as mark} from './markdown-with-fm'

export default function(source) {
  this.cacheable();
  const target = this.target;
  const callback = this.async();
  (async () => {
    var routeData = await getRoutes();
    if (routeData.length) {
      source = source.replace(' routes = {', ' routes = {\n' + routeData)
    }

    var blogMeta = await getBlogMeta();
    if (blogMeta.length) {
      source = source.replace('export const blogMeta = {', 'export const blogMeta = {\n' + blogMeta);
    }
    callback(null, source);
  })()

};

async function getRoutes() {
  return new Promise((resolve, reject) => {
    glob('./*',{cwd: join(__dirname, '../../src/content')}, (err, files) => {
      if (err) {
        reject();
      }
      const lines = files.map(file => {
        let path = '/' + basename(file, extname(file));

        if (path === '/index') {
          path = '/'
        }

        if (globals.publicUrl.length) {
          path = globals.publicUrl + path;
        }

        return `  '${path}': () => new Promise(resolve => require(['./content/${file}'], resolve)),`;
      });

      resolve(lines.join(''));
    })
  })
}

async function getBlogMeta() {
  return new Promise((resolve, reject) => {
    glob('./src/content/*.*',{cwd: join(__dirname, '../..')}, (err, files) => {

      if (err) {
        reject();
      }
      var blogPosts = []
      for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        try {
          var fileContent = fs.readFileSync(file, 'utf-8');

          var extension = extname(file);
          var post = parseMeta(fileContent, extension);

          if (post.blog && !post.draft) {
            blogPosts.push(Object.assign({}, post, {slug: basename(file, extname(file))}));
          }

        } catch(err) {
          console.log('err while parsing file', err);
          continue;
        }
      }

      var postsJson = blogPosts.map(function(post) {
        var toJson = {
          title: post.title,
          slug: post.slug,
          date: post.date,
          preview: post.preview,
          tags: post.tags
        };

        return `  '${post.slug}': ${JSON.stringify(toJson)}\n ,`;
      }).join('');

      resolve(postsJson);
    });
  });
}

function parseMeta(fileContent, extension) {
  switch(extension) {
    case '.md':
      return mark(fileContent);
          break;
    default:
          return {};
  }
}
