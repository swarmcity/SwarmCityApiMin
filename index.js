#!/usr/bin/env nodejs
require('dotenv').config()

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
const bodyParser = require("body-parser");
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compress());
app.use(helmet());
app.use(cors())


app.post('/ipfs/', function (req, res) {
    ipfs.add(new Buffer(req.body.data, 'utf8'))
    .then((response) => {
        res.send({
            success: true, 
            hash: response[0].hash,
        });
    })
    .catch((err) => {
        res.send({
            success: false, 
            error: err
        });
    })
})



app.get('/ipfs/:data', function (req, res) {
    ipfs.files.cat(req.params.data)
    .then((response) => {
        res.send({
            success: true, 
            hash: decodeURI(Buffer(response, 'ascii').toString('utf8')),
        });
    })
    .catch((err) => {
        res.send({
            success: false, 
            error: err
        });
    })
})




io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(process.env.PORT, function(){
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

module.exports = app;
