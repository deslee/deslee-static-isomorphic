import parser from './markdown-with-fm'

export default function(source) {
  this.cacheable();

  return parser(source);
}
