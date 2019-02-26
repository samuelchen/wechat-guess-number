const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const logger = wx.getLogManager({
  level: 0
})
const log = {
  log: function() {
    logger.log(arguments);
    for (var i = 0; i < arguments.length; i++) console.log(arguments[i]);
  },
  debug: function () {
    logger.log(arguments);
    for (var i = 0; i < arguments.length; i++) console.debug(arguments[i]);
  },
  info: function () {
    logger.log(arguments);
    for (var i = 0; i < arguments.length; i++) console.info(arguments[i]);
  },
  warn: function () {
    logger.log(arguments);
    for (var i = 0; i < arguments.length; i++) console.warn(arguments[i]);
  },
  error: function () {
    logger.log(arguments);
    for (var i = 0; i < arguments.length; i++) console.error(arguments[i]);
  },
}
log.debug('Logger initialized.')

module.exports = {
  formatTime: formatTime,
  log: log
}