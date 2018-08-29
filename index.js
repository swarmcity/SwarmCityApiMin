#!/usr/bin/env nodejs
require('dotenv').config()

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

app.get('/', function (req, res) {
    res.send('Hello World!')
})
app.post('/', function (req, res) {
    res.send('Got a POST request')
})
app.put('/', function (req, res) {
    res.send('Got a PUT request')
})
app.delete('/', function (req, res) {
    res.send('Got a DELETE request')
})

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(process.env.PORT, function(){
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
