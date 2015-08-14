var io = require('socket.io')(8080);
Player = require("./Player").Player;
var util = require("util");
var setEventHandlers = function() {
	io.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
	//Me llega que se ha conectao alguien
    util.log("New player has connected: "+client.id);
	this.emit("new player", client.id)
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
};
function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};
function onNewPlayer(data) {
	
	/*
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
	    existingPlayer = players[i];
	    this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
	players.push(newPlayer);
	*/
};
function onMovePlayer(data) {
	util.log(data.id);
	io.emit("samovio", data)
};
function init() {
    players = [];
    io.set("transports", ["websocket"]);
   	setEventHandlers();
};

init();