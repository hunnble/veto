var path = require('path');
var jsonServer = require('json-server');
var conf = require('./config.js');
var server = jsonServer.create()
var router = jsonServer.router(path.resolve(__dirname, 'db.json'))
var middlewares = jsonServer.defaults()
var port = conf.port || 3000;

server.use(middlewares)
server.use('/api', router)
server.listen(port, () => {
  console.log('Mock server is running at port ' + port);
})
