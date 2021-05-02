
var HTTP = require('http'); 
var FS   = require('fs');

var server = HTTP.createServer( 
  (request, response) => { 
    FS.readFile(
      ('public' + request.url),
      function(err, data) {
        if (!err) {
          response.writeHead(
            200, 
            { 'Content-Type': 'text/html',
              'Content-Length': data.length
            }
          ); 
          response.end(data);
        }
        else { response.end('error'); };
      }
    );
  }
)
server.listen(8080);



