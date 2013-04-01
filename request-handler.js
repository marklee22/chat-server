/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

// Query String library to parse JSON request parameters
var qs = require('querystring');

// Messages storage array
var messages = [];

var handleRequest = function(request, response, headers) {
  var statusCode, retData = '';

  if(require('url').parse(request.url).path === '/classes/room1') {
    if(request.method === 'GET') {
      statusCode = 200;
      // TODO: allow for more than one element for storage
      retData = messages.length === 0 ? '[]' : messages.pop();
    }
    if(request.method === 'POST') {
      statusCode = 302;
      retData = "\n";
      messages.push(JSON.stringify([request._postData]));
    }
  } else if(require('url').parse(request.url).path === '/classes/messages') {
    if(request.method === 'GET') {
      statusCode = 200;
      retData = messages.length === 0 ? '[]' : JSON.stringify(messages);
    }
    else if(request.method === 'POST') {
      statusCode = 302;
      retData = "\n";
      var data = '';

      // Buffer the post request's data
      request.on('data', function(chunk) {
        data += chunk;
      });

      // Process request now that the request has been completed
      request.on('end', function() {
        console.log('New Message: ',qs.parse(data));
        // Only maintain 20 messages
        if(messages.length > 20) {
          messages.shift();
        }
        messages.push(qs.parse(data));
        console.log(messages);
      });
    }
    else {
      statusCode = 200;
    }
  } else {
    statusCode = 404;
  }

  response.writeHead(statusCode, headers);
  response.end(retData);
};

exports.handleRequest = handleRequest;
