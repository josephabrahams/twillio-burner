/* jshint node: true */

'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

function addPhoneNumber() {
  console.log('adding phone number');
  return {
    phoneNumber: '+1' + Math.floor(Math.random()*10000000000),
    sid: Math.random().toString(36).substring(7),
    status: 'ok'
  };
}

function removePhoneNumber(data) {
  return {
    sid: data.sid,
    status: 'ok'
  };
}

io.on('connection', function(socket) {
  // console.log('Socket connected: ' + socket.id);

  socket.on('add phone number', function() {
    socket.emit('add phone number', addPhoneNumber());
  });

  socket.on('remove phone number', function(data) {
    socket.emit('remove phone number', removePhoneNumber(data));
  });

  // socket.on('disconnect', function() {
  //   console.log('Socket  disconnected: ' + socket.id);
  // });
});
