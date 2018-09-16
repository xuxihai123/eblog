var app = require('./app');
var http = require('http');

var config = require('config-light')();
var port = process.env.PORT || config.port || 3000;
app.set('port', port);
var server = http.createServer(app);
var logger = app.logger;

module.exports = {
  start: function() {
    return new Promise(function(resolve, reject) {
      app.readyPromise.then(function() {
        server.listen(port,function() {
          logger.info('start app in http://127.0.0.1:' + port);
          resolve();
        });
        server.on('error', function(err) {
          reject(err);
        });
      }).caught(function(err) {
        reject(err);
      });
    });
  },
  logger:logger
};
