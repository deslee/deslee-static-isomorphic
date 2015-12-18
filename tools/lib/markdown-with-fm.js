import marked from 'marked';
import fm from 'front-matter';
import globals from '../../src/globals'


export default function(source) {
  const fmContent = fm(source);
  const htmlContent = marked(fmContent.body);

  var chunks = htmlContent.replace(/(<([^>]+)>)/ig, '').split(" ");
  var preview = chunks.slice(0, Math.min(chunks.length-1, globals.CONTENT_SUMMARY_COUNT)).join(' ');

  var result = Object.assign({content: htmlContent, preview}, fmContent.attributes);
  return result;
}
