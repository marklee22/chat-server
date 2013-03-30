/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */


var handleRequest = function(request, response, headers) {
  var statusCode, data;
  if(require('url').parse(request.url).path === '/classes/room1') {
    if(request.method === 'GET') statusCode = 200;
    if(request.method === 'POST') statusCode = 302;
  } else {
    statusCode = 404;
  }

  if(require('url').parse(request.url).path === '/classes/messages') {
    if(request.method === 'GET') {
      statusCode = 200;
      request.on('data', function(data) {
        console.log(data);
      });
      // data = JSON.parse(request.form);
    }
    if(request.method === 'POST') {
      statusCode = 302;
      request.on('data', function(data) {
        console.log(data);
      });
      data = '{}';
    }
  } else {
    statusCode = 404;
  }

  /* Response is an http.ServerRespone object containing methods for
   * writing our response to the client. Documentation for both request
   * and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html*/
  response.writeHead(statusCode, headers);
  /* .writeHead() tells our server what HTTP status code to send back
   * to the client, and what headers to include on the response. */

  response.write(data);
  response.end();
};

exports.handleRequest = handleRequest;
