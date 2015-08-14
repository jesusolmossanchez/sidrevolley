
DudeVolley.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

DudeVolley.MainMenu.prototype = {

	init: function (){
		
	},

	create: function () {
		//cargo la musica
		this.game.huertica_music =  this.game.add.audio('huertica_sound');
		this.game.huertica_music.play("",0,0.7,true);
		this.selected_sound =  this.game.add.audio('select_sound');

		//situo las cosas en la pantalla
		var all_players = this.cache.getImage('all_players');
		var select_player1 = this.cache.getImage('select_player1');
		var titulo_estirado = this.cache.getImage('titulo_estirado');
		var movimientos1 = this.cache.getImage('movimientos1');
		var movimientos2 = this.cache.getImage('movimientos2');
		this.jugadores = this.add.sprite(this.world.centerX - all_players.width/2.0,this.world.centerY - all_players.height/2.0,'all_players');
		this.select_player1 = this.add.sprite(this.world.centerX - all_players.width/2.0,this.world.centerY - all_players.height/2.0,'select_player1');
		this.select_player2 = this.add.sprite(this.world.centerX + all_players.width/2.0 - 80,this.world.centerY - all_players.height/2.0,'select_player2');

		this.titulo_estirado = this.add.sprite(this.world.centerX - titulo_estirado.width/2.0, 20, 'titulo_estirado');
		this.movimientos1 = this.add.sprite(0,520,'movimientos1');
		this.movimientos2 = this.add.sprite(550, 520, 'movimientos2');



		//capturo las teclas
		this.cursors = this.input.keyboard.createCursorKeys();
		PIKA1 = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ARRIBA = this.input.keyboard.addKey(Phaser.Keyboard.R);
		ABAJO = this.input.keyboard.addKey(Phaser.Keyboard.F);
		IZQUIERDA = this.input.keyboard.addKey(Phaser.Keyboard.D);
		DERECHA = this.input.keyboard.addKey(Phaser.Keyboard.G);
		ZETA = this.input.keyboard.addKey(Phaser.Keyboard.Z);
		
		//inicializo cosas
		this.nomoviendo1 = false;
		this.nomoviendo2 = false;
		this.nomoviendo1_y = false;
		this.nomoviendo2_y = false;

		this.physics.enable(this.select_player1, Phaser.Physics.ARCADE);
		this.physics.enable(this.select_player2, Phaser.Physics.ARCADE);
		this.physics.enable(this.jugadores, Phaser.Physics.ARCADE);

		this.seleccionado1 = false;
		this.seleccionado2 = false;


		//pinto dos cuadrados, amarillo y rojo(seleccionadores)
		this.yaseleccionado1 = this.game.add.bitmapData(80,80);

	    this.yaseleccionado1.ctx.beginPath();
	    this.yaseleccionado1.ctx.rect(0,0,128,128);
	    this.yaseleccionado1.ctx.fillStyle = '#eaff02';
	    this.yaseleccionado1.ctx.fill();

		this.yaseleccionado2 = this.game.add.bitmapData(80,80);

	    this.yaseleccionado2.ctx.beginPath();
	    this.yaseleccionado2.ctx.rect(0,0,128,128);
	    this.yaseleccionado2.ctx.fillStyle = '#ff0000';
	    this.yaseleccionado2.ctx.fill();


	    

	},

	update: function () {

		//controlo movimiento del selector
		if ((this.select_player2.body.position.x == this.pos_select2 - 80 || this.select_player2.body.position.x == this.pos_select2 + 80) && !this.cursors.left.isDown && !this.cursors.right.isDown){
			this.nomoviendo2 = false;
		}
		if ((this.select_player2.body.position.y == this.pos_select2_y - 83 || this.select_player2.body.position.y == this.pos_select2_y + 83) && !this.cursors.down.isDown && !this.cursors.up.isDown){
			this.nomoviendo2_y = false;
		}

		if ((this.select_player1.body.position.x == this.pos_select1 - 80 || this.select_player1.body.position.x == this.pos_select1 + 80) && !IZQUIERDA.isDown && !DERECHA.isDown){
			this.nomoviendo1 = false;
		}

		if ((this.select_player1.body.position.y == this.pos_select1_y - 83 || this.select_player1.body.position.y == this.pos_select1_y + 83) && !ABAJO.isDown && !ARRIBA.isDown){
			this.nomoviendo1_y = false;
		}




		//MOVIMIENTOS SELECTOR 2
		if (this.cursors.left.isDown && !this.nomoviendo2 && !this.seleccionado1)
	    {
	        this.pos_select2 =  this.select_player2.position.x;
	        limit_pos_izq = this.world.centerX - this.jugadores.width/2;
	        if ((this.pos_select2-80) < limit_pos_izq){
		        //control
	        }
	        else{
	        	this.nomoviendo2 = true;
	        	this.select_player2.body.position.x -= 80;
	        }

	    }
	    else if (this.cursors.right.isDown && !this.nomoviendo2 && !this.seleccionado1)
	    {
	        this.pos_select2 =  this.select_player2.position.x;
	        limit_pos = this.world.centerX + this.jugadores.width/2;
	        if ((this.pos_select2+80) >= limit_pos){
		        //control
	        }
	        else{
	    		this.nomoviendo2 = true;
	        	this.select_player2.body.position.x += 80;
	        }       
	    }
	    else if (this.cursors.down.isDown && !this.nomoviendo2_y && !this.seleccionado1)
	    {
	        this.pos_select2_y =  this.select_player2.position.y;
	        limit_pos_y = this.world.centerY + this.jugadores.height/2;
	        if ((this.pos_select2_y+83) >= limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo2_y = true;
	        	this.select_player2.body.position.y += 83;
	        }       
	    }

	    else if (this.cursors.up.isDown && !this.nomoviendo2_y && !this.seleccionado1)
	    {
	        this.pos_select2_y =  this.select_player2.position.y;
	        limit_pos_y = this.world.centerY - this.jugadores.height/2;
	        if ((this.pos_select2_y-80) < limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo2_y = true;
	        	this.select_player2.body.position.y -= 83;
	        }       
	    }



		//MOVIMIENTOS SELECTOR 1
		if (IZQUIERDA.isDown && !this.nomoviendo1 && !this.seleccionado2)
	    {
	        this.pos_select1 =  this.select_player1.position.x;
	        limit_pos_izq = this.world.centerX - this.jugadores.width/2;
	        if ((this.pos_select1-80) < limit_pos_izq){
		        ////console.log(this.pos_select1-80);
		        ////console.log(this.world.centerX - this.jugadores.width/2);
	        }
	        else{
	        	this.nomoviendo1 = true;
	        	this.select_player1.body.position.x -= 80;
	        }

	    }
	    else if (DERECHA.isDown && !this.nomoviendo1 && !this.seleccionado2)
	    {
	        this.pos_select1 =  this.select_player1.position.x;
	        limit_pos = this.world.centerX + this.jugadores.width/2;
	        if ((this.pos_select1+80) >=limit_pos){
		        ////console.log(this.pos_select1+80);
		        ////console.log(limit_pos);
	        }
	        else{
	    		this.nomoviendo1 = true;
	        	this.select_player1.body.position.x += 80;
	        }
	    }  
	    else if (ABAJO.isDown && !this.nomoviendo1_y && !this.seleccionado2)
	    {
	        this.pos_select1_y =  this.select_player1.position.y;
	        limit_pos_y1 = this.world.centerY + this.jugadores.height/2;
	        if ((this.pos_select1_y+83) >= limit_pos_y1){
		        ////console.log(this.pos_select1_y);
		        ////console.log(this.world.centerY + this.jugadores.width/2);
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_player1.body.position.y += 83;
	        }       
	    }

	    else if (ARRIBA.isDown && !this.nomoviendo1_y && !this.seleccionado2)
	    {
	        this.pos_select1_y =  this.select_player1.position.y;
	        limit_pos_y1 = this.world.centerY - this.jugadores.height/2;
	        if ((this.pos_select1_y-80) < limit_pos_y1){
		        ////console.log(this.pos_select1_y);
		        ////console.log(this.world.centerY - this.jugadores.height/2);
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_player1.body.position.y -= 83;
	        }       
	    }

	    //SELECCIÓN DE UN JUGADOR
	    if(PIKA1.isDown){
	    	this.selected_sound.play();
	    	this.seleccionado1 = true;
	    	this.marcaseleccion2 = this.game.add.sprite(this.select_player2.position.x, this.select_player2.position.y, this.yaseleccionado2);
	    	this.marcaseleccion2.alpha = 0.1;
	    } 
	    if(ZETA.isDown){
	    	this.selected_sound.play();
	    	this.seleccionado2 = true;
	    	this.marcaseleccion1 = this.game.add.sprite(this.select_player1.position.x, this.select_player1.position.y, this.yaseleccionado1);
	    	this.marcaseleccion1.alpha = 0.1;
	    	//console.log(this.marcaseleccion1);
	    }

	    //SI LOS DOS ESTAN SELECCIONADOS
	    if (this.seleccionado1 && this.seleccionado2){
	    	pos1_normalizada = ((this.select_player1.position.x-this.jugadores.width/2)/80)+3;
	    	pos2_normalizada = ((this.select_player2.position.x-this.jugadores.width/2)/80)+3;

	    	jugadores_count = this.jugadores.width/80;
	    	linea = Math.round((this.select_player1.position.y-this.jugadores.height/2+60)/83)-1;
	    	linea2 = Math.round((this.select_player2.position.y-this.jugadores.height/2+60)/83)-1;
	    	

	    	que_player1 = pos1_normalizada + jugadores_count*linea;
	    	que_player2 = pos2_normalizada + jugadores_count*linea2;
	    	

	    	this.state.start('Game');
	    }


	    

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	empieza: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		que_player1 = 1;
		que_player2 = 2;
		this.state.start('Game');

	}

};
