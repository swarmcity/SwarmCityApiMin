#!/usr/bin/env nodejs
require('dotenv').config()

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(`Hello World! ${id}`)
})
app.post('/', function (req, res) {
    const account_name = req.body.account_name;
    res.send(`Got a POST request: ${account_name}`)
})


io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(process.env.PORT, function(){
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
