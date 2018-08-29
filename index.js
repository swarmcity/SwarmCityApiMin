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

app.get('/ipfs/:ipfsHash', function (req, res) {
    var ipfsHash = req.params.ipfsHash;
    ipfs.files.cat(ipfsHash)
    .then((file) => {
        res.send(file)
    })
    .catch((err) => {
        res.send(`Error: ${err}`)
    })
})

app.post('/ipfs/', function (req, res) {
    const data = req.body.data;
    res.send(`Got a POST request: ${data}`)
})


io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(process.env.PORT, function(){
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
