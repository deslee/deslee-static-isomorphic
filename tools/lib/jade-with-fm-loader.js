import parser from './jade-with-fm'

export default function(source) {
  this.cacheable();

  return parser(source);
}
