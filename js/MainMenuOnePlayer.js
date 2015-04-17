
BasicGame.MainMenuOnePlayer = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenuOnePlayer.prototype = {

	init: function (){
		
	},

	create: function () {
		//AUDIO
		this.game.huertica_music =  this.game.add.audio('huertica_sound');
		this.game.huertica_music.play("",0,0.7,true);
 		this.selected_sound =  this.game.add.audio('select_sound');


		//COLOCO LAS COSAS
		var all_players = this.cache.getImage('all_players');
		var select_player1 = this.cache.getImage('select_player1');
		var titulo_estirado = this.cache.getImage('titulo_estirado');
		var movimientos_oneplayer = this.cache.getImage('movimientos_oneplayer');
		this.jugadores = this.add.sprite(this.world.centerX - all_players.width/2.0,this.world.centerY - all_players.height/2.0,'all_players');
		this.select_player1 = this.add.sprite(this.world.centerX - all_players.width/2.0,this.world.centerY - all_players.height/2.0,'select_player1');

		this.titulo_estirado = this.add.sprite(this.world.centerX - titulo_estirado.width/2.0, 20, 'titulo_estirado');

		if (this.game.device.desktop){
			this.movimientos_oneplayer = this.add.sprite(this.world.centerX - movimientos_oneplayer.width/2.0,520,'movimientos_oneplayer');
		}
		else{
			this.movil_comoelegir = this.add.sprite(130,540,'movil_comoelegir');
			this.movil_jugar = this.add.sprite(410,540,'movil_jugar');
			this.movil_jugar.inputEnabled = true;
			this.movil_jugar.input.sprite.events.onInputDown.add(this.empieza, this);
		}

		this.cursors = this.input.keyboard.createCursorKeys();
		L = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ENTER = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		PIKA1 = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ARRIBA = this.input.keyboard.addKey(Phaser.Keyboard.R);
		ABAJO = this.input.keyboard.addKey(Phaser.Keyboard.F);
		IZQUIERDA = this.input.keyboard.addKey(Phaser.Keyboard.D);
		DERECHA = this.input.keyboard.addKey(Phaser.Keyboard.G);
		ZETA = this.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.nomoviendo1 = false;
		this.nomoviendo1_y = false;

		this.physics.enable(this.select_player1, Phaser.Physics.ARCADE);
		this.physics.enable(this.jugadores, Phaser.Physics.ARCADE);

		this.seleccionado1 = false;
		this.seleccionado2 = false;

		this.yaseleccionado1 = this.game.add.bitmapData(80,80);

	    this.yaseleccionado1.ctx.beginPath();
	    this.yaseleccionado1.ctx.rect(0,0,128,128);
	    this.yaseleccionado1.ctx.fillStyle = '#eaff02';
	    this.yaseleccionado1.ctx.fill();
	},

	
	//CONTROL DEL SWIPE PARA SELECCIÓN
	beginSwipe: function () {
        startX = this.game.input.worldX;
        startY = this.game.input.worldY;
        
        this.game.input.onDown.remove(this.beginSwipe);
        this.game.input.onUp.add(this.endSwipe,this);
    },

    endSwipe: function () {

        // saving mouse/finger coordinates
        endX = this.game.input.worldX;
        endY = this.game.input.worldY;
        // determining x and y distance travelled by mouse/finger from the start
        // of the swipe until the end
        var distX = startX-endX;
        var distY = startY-endY;
        // in order to have an horizontal swipe, we need that x distance is at least twice the y distance
        // and the amount of horizontal distance is at least 10 pixels
        if(Math.abs(distX)>10){
            // moving left, calling move function with horizontal and vertical tiles to move as arguments
            if(distX>0){

                    this.muevederecha = false;
                    this.mueveizquierda = false;
                    this.muevearriba = false;
                    this.mueveabajo = false;

                    this.mueveizquierda = true;
               }
               // moving right, calling move function with horizontal and vertical tiles to move as arguments
               else{
                    this.muevederecha = false;
                    this.mueveizquierda = false;
                    this.muevearriba = false;
                    this.mueveabajo = false;

                    this.muevederecha = true;
               }
        }
        
        if(Math.abs(distY)>60){
            if(distY>0){           
                    this.muevederecha = false;
                    this.mueveizquierda = false;
                    this.muevearriba = false;
                    this.mueveabajo = false;

                    this.muevearriba = true;
               }
               else{
                    this.muevederecha = false;
                    this.mueveizquierda = false;
                    this.muevearriba = false;
                    this.mueveabajo = false;

                    this.mueveabajo = true;
               }
        }   
        // stop listening for the player to release finger/mouse, let's start listening for the player to click/touch
        this.game.input.onDown.add(this.beginSwipe);
        this.game.input.onUp.remove(this.endSwipe);

    },

	update: function () {

		//CAPTURA EL SWIPE
		this.game.input.onDown.add(this.beginSwipe, this);

		if ((this.select_player1.body.position.x == this.pos_select1 - 80 || this.select_player1.body.position.x == this.pos_select1 + 80) && !this.cursors.left.isDown && !this.cursors.right.isDown){
			this.nomoviendo1 = false;
		}
		if ((this.select_player1.body.position.y == this.pos_select1_y - 83 || this.select_player1.body.position.y == this.pos_select1_y + 83) && !this.cursors.down.isDown && !this.cursors.up.isDown){
			this.nomoviendo1_y = false;
		}

		if ((this.cursors.left.isDown || this.mueveizquierda) && !this.nomoviendo1 && !this.seleccionado1)
	    {

	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;
	        this.pos_select1 =  this.select_player1.position.x;
	        limit_pos_izq = this.world.centerX - this.jugadores.width/2;
	        if ((this.pos_select1-80) < limit_pos_izq){
		        //control
	        }
	        else{
	        	this.nomoviendo1 = true;
	        	this.select_player1.body.position.x -= 80;
	        }

	    }
	    else if ((this.cursors.right.isDown || this.muevederecha) && !this.nomoviendo1 && !this.seleccionado1)
	    {
	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;
	        this.pos_select1 =  this.select_player1.position.x;
	        limit_pos = this.world.centerX + this.jugadores.width/2;
	        if ((this.pos_select1+80) >= limit_pos){
		        //control
	        }
	        else{
	    		this.nomoviendo1 = true;
	        	this.select_player1.body.position.x += 80;
	        }       
	    }
	    else if ((this.cursors.down.isDown || this.mueveabajo) && !this.nomoviendo1_y && !this.seleccionado1)
	    {
	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;

	        this.pos_select1_y =  this.select_player1.position.y;
	        limit_pos_y = this.world.centerY + this.jugadores.height/2;
	        if ((this.pos_select1_y+83) >= limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_player1.body.position.y += 83;
	        }       
	    }

	    else if ((this.cursors.up.isDown || this.muevearriba) && !this.nomoviendo1_y && !this.seleccionado1)
	    {
	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;

	        this.pos_select1_y =  this.select_player1.position.y;
	        limit_pos_y = this.world.centerY - this.jugadores.height/2;
	        if ((this.pos_select1_y-80) < limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_player1.body.position.y -= 83;
	        }       
	    }

	    

	    if(L.isDown || ENTER.isDown){
	    	this.selected_sound.play();
	    	this.empieza();
	    } 



	    

	},

	empieza: function (pointer) {
		
    	pos1_normalizada = ((this.select_player1.position.x-this.jugadores.width/2)/80)+3;

    	jugadores_count = this.jugadores.width/80;
    	linea = Math.round((this.select_player1.position.y-this.jugadores.height/2+60)/83)-1;
    	

    	que_player1 = pos1_normalizada + jugadores_count*linea;
    	que_player2 = Math.floor(Math.random() * 28)+1;

    	this.state.start('GameOnePlayer');

	}

};
