// # Startup

var startTime = Date.now();

eblogServer = require('./core/server');

eblogServer.start().then(function afterStart() {
  eblogServer.logger.info('eblog boot', (Date.now() - startTime) / 1000 + 's');
}).catch(function(err) {
  eblogServer.logger.error(err);
  setTimeout(() => {
    process.exit(-1);
  }, 100);
});
