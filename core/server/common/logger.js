var config = require('config-light')();

var winston = require('winston');
var colorize = winston.config.colorize;
var dateUtils = require('../utils/dateutils');


winston.config.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green'
});


var logger = new (winston.Logger)({
  level: config.loggerLevel,
  transports: [
    new (winston.transports.Console)({
      label:'eblog',
      formatter:function(outputObj) {
        return dateUtils.format(new Date(), '[yyyy-MM-dd HH:mm:ss]')+ ' ' + colorize(outputObj.level,outputObj.level.toUpperCase()) + ' ' + outputObj.message;
      }
    })
  ]
});
logger.stream = {
  write: function(message, encoding){
    logger.info(message.slice(0, -1));
  }
};

module.exports = logger;
