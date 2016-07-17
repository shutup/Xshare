/**
 * Created by shutup on 16/7/17.
 */
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket_io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

socket_io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('Xshare Message',function (msg) {
        console.log(msg);
        if (msg.lastIndexOf('openUrl://',0) === 0){
            socket.broadcast.emit('url message',msg);
        }else{
            socket.emit('Xshare Message',msg);
        }
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
