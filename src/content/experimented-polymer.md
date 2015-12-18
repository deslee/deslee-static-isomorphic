---
title:   Experimented with Polymer
date:    2014-11-17
summary_count: 16
blog: true
tags:
  - polymer
  - dev
---

I recently checked out [Polymer][1]. It's pretty cool. Polymer is a library for building [web components][2]. Web components are reusable "chunks" of HTML markup, CSS style, and Javascript. As of this time, the specifications for web components is still under revision, but Polymer provides some powerful wrappers for creating web components in modern browsers, as well as helper functions and syntactic sugar.

The beauty of web components, to me, is that everything can be expressed declaratively as an XML element. You can even create an AJAX call by including Polymer's `<core-ajax>` tag in the page, and specifying the variable for the response to bind to. In the future, we hope that the functionality of these components will be supported natively in browsers. As native browser implementations are added, performance will progressively increase.

Here is a cool catalog for web components: [Component Kitchen][3]. It has a pretty cool domain name as well.

[1]: https://www.polymer-project.org/
[2]: http://customelements.io/
[3]: http://component.kitchen/
