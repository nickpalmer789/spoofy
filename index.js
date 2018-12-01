//Set up the server for the host web page
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//Listen for incoming connections on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Send the main page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//============================================
//Connect to the clients
var clientSocket = require('socket.io-client')('http://127.0.0.2:4000');

clientSocket.on('connect', function() {
    console.log('Connected to the client server!');
});

//=============================================
//Listen for events on the connection event
io.on('connection', function(socket){
    //Log when the user connects
    console.log('A host has connected!');

    //Log when the user disconnects
    socket.on('disconnect', function() {
        console.log('A host has disconnected!')
    });

    socket.on('reset vote', function() {
        console.log('reset vote');
        clientSocket.emit('reset vote'); 
    });

    socket.on('vote', function(num) {
        console.log('Someone voted for ' + num);
    });

});

