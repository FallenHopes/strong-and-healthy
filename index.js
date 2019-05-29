var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
    });
    socket.on('send', (data) => {
        io.sockets.emit('add', {mess: data.mess, nick: data.nick});
    });
});

