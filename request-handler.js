/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var storage = require('./node_modules/node-persist/persist')
storage.initSync();
storage.setItem('length', 0);

var handleRequest = function(request, response, headers) {
  var statusCode, retData;

  if(require('url').parse(request.url).path === '/classes/room1') {
    if(request.method === 'GET') {
      statusCode = 200;
      // TODO: allow for more than one element for storage
      retData = storage.getItem('length') === 0 ? '[]' : storage.getItem('data');
    }
    if(request.method === 'POST') {
      statusCode = 302;
      retData = "\n";
      storage.setItem('data', JSON.stringify([request._postData]));
      storage.setItem('length', 1);
    }
  } else if(require('url').parse(request.url).path === '/classes/messages') {
    if(request.method === 'GET') {
      statusCode = 200;
    }
    if(request.method === 'POST') {
      statusCode = 302;
    }
  } else {
    statusCode = 404;
  }

  response.writeHead(statusCode, headers);
  response.end(retData);
};

exports.handleRequest = handleRequest;
