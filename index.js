#!/usr/bin/env nodejs
// version 1.0
require('dotenv').config()

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'})
const bodyParser = require("body-parser");
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compress());
app.use(helmet());
app.use(cors())


app.post('/ipfs/', (req, res) => {
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

app.get('/ipfs/:data', (req, res) => {
    ipfs.files.cat(req.params.data)
    .then((response) => {
        res.send({
            success: true,
            data: Buffer(response, 'ascii').toString('utf8'),
        });
    })
    .catch((err) => {
        res.send({
            success: false,
            error: err
        });
    })
})

app.get('/img/:data', (req, res) => {
    ipfs.files.cat(req.params.data)
    .then((response) => {
        res.send(Buffer(response, 'ascii').toString('utf8'));
    })
    .catch((err) => {
        res.send({
            success: false,
            error: err
        });
    })
})

app.get('*', (req, res) => res.send('Welcome to the Swarm City API'))


io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(process.env.PORT, function(){
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

module.exports = app;
