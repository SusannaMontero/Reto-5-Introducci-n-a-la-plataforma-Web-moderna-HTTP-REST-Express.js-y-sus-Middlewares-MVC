
// Usage:  "node 90-Servidor_Web_TCP <port>"

let net = require('net');
let fs   = require('fs');
let mime = require('mime-types');
let port = (process.argv[2] || 8080);

function response (code, mime, file) {
    let body = (file) ? file : Buffer.from(`<html><body><h1>Error: ${code}<h1></body></html>`);
    let head = `HTTP/1.0 ${code}\nContent-type: ${mime}\nContent-length: ${body.length}\n\n`;
    return Buffer.concat([Buffer.from(head), body]);
}
       // Create server socket with TCP connection handler
let server = net.createServer( (socket) => {

    socket.on('data', function (data) {             // HTTP request handler
        let [method, path] = data.toString().split('\n')[0].trim().split(' ');
        path = 'public' + path;
        if (method.toLowerCase() === 'get') {
            fs.readFile(path, function (err, file) {
                if (err) {                 // Web page does not exist
                    socket.write(response(`404 Not Found <p>${err}`, 'text/html'));
                } else { 
                  let f_mime = mime.lookup(path) || 'text/html'; 
                  socket.write(response(`200 OK`, f_mime, file));
                }                         // Sends requested page
            });
        } else {                       // Unsupported HTTP method
            socket.write(response(`400 Bad Request: ${method}`, 'text/html'));
        }
	});
});

server.listen(port);
console.log(`Static Web server at port: ${port}`);

 