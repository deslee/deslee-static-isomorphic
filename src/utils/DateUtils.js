import moment from 'moment'

export function format(date) {
  var d = moment(date, 'YYYY MM DD');
  return d.format('YYYY MMM DD');
}
