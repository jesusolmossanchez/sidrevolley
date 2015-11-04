var io = require('socket.io')(8080);
Player = require("./Player").Player;
var util = require("util");
var setEventHandlers = function() {
	io.sockets.on("connection", onSocketConnection);
};


var yasta = false;

function onSocketConnection(client) {
	//Me llega que se ha conectao alguien
    util.log("New player has connected: "+client.id);

    if(players.length > 0){
    	this.emit("new player2", client.id);
    }
    else{
    	this.emit("new player", client.id);
    }
    players.push(client.id);
    //util.log(players);
    util.log(players.length);
    
    if (players.length == 2){
    	if(!yasta){
    		yasta = true;
    		this.emit("ya estamos todos");
    	}
    }
    else{
    	yasta = false;
    }
	
	
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
    client.on("posicion pelota", onPosicionPelota);
    client.on("tururu", onTururu);
};
function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
    util.log(players);
    players.splice(players.indexOf(this.id), 1);
    util.log(players);
};
function onNewPlayer(data) {
	util.log("pasas por aqui?");
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
	//util.log(data.id);
	io.emit("samovio", data);
};
function onPosicionPelota(data) {
    //util.log(data)
    //new_x = data.x+((data.vx*10)/60);
    //new_y = data.y+((data.vy*10)/60);


    //new_data = { x: new_x, y: new_y, vx: data.vx, vy: data.vy }
    //util.log(new_data);
    //if (new_y < 400){
        //io.emit("situapelota", new_data);
        io.emit("situapelota", data);
   // }
};
function onTururu(data) {
	io.emit("tururaki", data);
};
function init() {
    players = [];
    io.set("transports", ["websocket"]);
   	setEventHandlers();
};

init();