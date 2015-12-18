---
title:   Static blog using React and Flux
date:    2014-11-22
draft: true
tags:
  - react
  - dev
---

I have enjoyed the simplicity of static blog generators in the past, but I have always loved creating my personal website with front-end technologies that I love. However, I always felt restricted by the framework (Jekyll) and by having to maintain the back-end (express, flask, django). 

Today, I started to remake my website again, using React. However, this time, the website will be static. I wanted this because the back-end for my site has been shrinking more and more as I started using front-end technologies like AngularJS and React, and at this point all I need is a file server.

I placed the content of my site, both pages and blog posts, under the `assets/posts` directory:

    - assets
      - posts
        - about.md
        - projects.md
        - flux-static-blog.md

The markdown/yaml format for a `post` looks like this:
  
    ---
    Title: Projects
    Page: true
    ---
    
    ## Android apps
    .....

In my GulpFile, I have task that processes all the markdown code in the `assets/posts` directory into html and metadata and serializes it into a JSON string:

    var files = fs.readdirSync('./app/assets/posts');
    var list = files.map(function(e) {
      var content = fs.readFileSync('./app/assets/posts/' + e, {encoding: 'utf8'});
      var markdown = marked(content);
      
      markdown.meta.slug = e.split('.md')[0];
      return markdown;
    });
    build_options.json = JSON.stringify(list);

Then I inject that JSON string into my main file:

    <script>
      window['app_initial_data'] = <!-- @echo json -->
    </script>

Of course, this isn't scalable when there is tons of data, so I have the ability to asynchronously inject posts into my app on the front-end:

    app_initial_data.forEach(function(post) {
      actions.receivedPost(post);
    });

Eventually, as it becomes necessary, I can use AJAX to dynamically inject posts into my app as it requests them. There are multiple ways of going about doing this. I could write a REST app that serves JSON to my front-end app, but then my front-end becomes coupled to a server implementing that API. 

Another option would be to serialize "chunks" of post data into multiple JSON files, `posts-1.json, posts-2.json, etc`, and make standard ajax calls to the JSON files as needed by convention. 

This has the advantage of being automatically cached by a good static HTTP server, as well as retaining the ability to host the static site anywhere that allows static file hosting (such as github pages, dropbox, etc).
