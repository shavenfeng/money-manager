'use strict'

const DayJS = require('dayjs')

module.exports = {
  formatTime(value) {
    return DayJS(value).format('YYYY-MM-DD HH:mm:ss')
  },
  formatDate(value) {
    return DayJS(value).format('YYYY-MM-DD')
  },
  formatYear(value) {
    return DayJS(value).format('YYYY-MM')
  },
}
