//Set up the server for the client web pages
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//Listen for connections to the web server
http.listen(4000, '127.0.0.2');

//Send the main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client.html');
});

//===============================================
//Connect to the host
var hostSocket = require('socket.io-client')('http://127.0.0.1:3000');

hostSocket.on('connect', function(){
    console.log('Connected to the host server!');
});

//===============================================
//Listen for socket requests to this server
io.on('connection', function(clientSocket) {
    console.log('A new user has connected!');

    //Send a vote event to the host server
    clientSocket.on('vote', function(num) {
        hostSocket.emit('vote', num);
    });

    clientSocket.on('reset vote', function() {
        console.log('vote reset');
    });
});




