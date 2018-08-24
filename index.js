#!/usr/bin/env nodejs
require('dotenv').config()
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(process.env.PORT, 'localhost');
console.log(`Server running at http://localhost:${process.env.PORT}/`);