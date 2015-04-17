
BasicGame.LevelMenu = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.LevelMenu.prototype = {


	create: function () {

		//situo las cosas en la pantalla
		var titulo_estirado = this.cache.getImage('titulo_estirado');
		this.titulo_estirado = this.add.sprite(this.world.centerX - titulo_estirado.width/2.0, 20, 'titulo_estirado');
		//this.background = this.add.sprite(this.world.centerX - titulo.width/2.0, 120, 'titulo_saltolinea');

		var chupao = this.cache.getImage('chupao');
		var jugadores_seleccionado = this.cache.getImage('jugadores_seleccionado');
		this.chupao = this.add.sprite(this.world.centerX - chupao.width/2.0, 150, 'chupao');
		this.normalico = this.add.sprite(this.world.centerX - chupao.width/2.0, 250, 'normalico');
		this.jodio = this.add.sprite(this.world.centerX - chupao.width/2.0, 350, 'jodio');

		this.select_tipo = this.add.sprite(this.world.centerX - jugadores_seleccionado.width/2.0, 150, 'jugadores_seleccionado');

		if (this.game.device.desktop){
			this.select_dificultad = this.add.sprite(130,540,'select_dificultad');
			this.movil_jugar = this.add.sprite(410,540,'movil_jugar');
			this.movil_jugar.inputEnabled = true;
			this.movil_jugar.input.sprite.events.onInputDown.add(this.empieza, this);
		}
		else{
			this.movil_select_dificultad = this.add.sprite(130,540,'movil_select_dificultad');
			this.movil_jugar = this.add.sprite(410,540,'movil_jugar');
			this.movil_jugar.inputEnabled = true;
			this.movil_jugar.input.sprite.events.onInputDown.add(this.empieza, this);
		}

		//inicializo si son dos jugadores
		this.game.level = 0;
		
		this.physics.enable(this.select_tipo, Phaser.Physics.ARCADE);
		
		this.cursors = this.input.keyboard.createCursorKeys();

		L = this.input.keyboard.addKey(Phaser.Keyboard.L);
		Z = this.input.keyboard.addKey(Phaser.Keyboard.Z);
		ENTER = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);	

		this.nomoviendo1 = false;
		this.nomoviendo1_y = false;

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
		//muevo el selector y salto al menu correspondiente

		//CAPTURA EL SWIPE
		this.game.input.onDown.add(this.beginSwipe, this);


		if ((this.select_tipo.body.position.y == this.pos_select1_y - 100 || this.select_tipo.body.position.y == this.pos_select1_y + 100) && !this.cursors.down.isDown && !this.cursors.up.isDown){
			this.nomoviendo1_y = false;
		}

		if ((this.cursors.down.isDown || this.mueveabajo) && !this.nomoviendo1_y && !this.seleccionado1)
	    {
	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;

	        this.pos_select1_y =  this.select_tipo.position.y;
	        limit_pos_y = 450;
	        if ((this.pos_select1_y+100) >= limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_tipo.body.position.y += 100;
	        }       
	    }

	    else if ((this.cursors.up.isDown || this.muevearriba) && !this.nomoviendo1_y && !this.seleccionado1)
	    {
	    	this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;

	        this.pos_select1_y =  this.select_tipo.position.y;
	        limit_pos_y = 150;
	        if ((this.pos_select1_y-100) < limit_pos_y){
		        //control
	        }
	        else{
	    		this.nomoviendo1_y = true;
	        	this.select_tipo.body.position.y -= 100;
	        }       
	    }

		if(L.isDown || Z.isDown || ENTER.isDown){
			this.empieza();
			
		}
	},

	empieza: function (pointer) {

    	if (this.select_tipo.position.y == 300){
			this.game.level = 0;
		}
		if (this.select_tipo.position.y == 400){
			this.game.level = 1;
		}
		if (this.select_tipo.position.y == 500){
			this.game.level = 2;
		}
		this.state.start('MainMenuOnePlayer');

	}

};
