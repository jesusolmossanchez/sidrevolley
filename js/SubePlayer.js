
DudeVolley.SubePlayer = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

DudeVolley.SubePlayer.prototype = {


	create: function () {
		ga('send', 'pageview', '/MenuJuego');
		//situo las cosas en la pantalla
		var titulo_estirado = this.cache.getImage('titulo_estirado');
		this.titulo_estirado = this.add.sprite(this.world.centerX - titulo_estirado.width/2.0, 20, 'titulo_estirado');
		//this.background = this.add.sprite(this.world.centerX - titulo.width/2.0, 120, 'titulo_saltolinea');

		var default_player = this.cache.getImage('default_player');
		var jugadores_seleccionado = this.cache.getImage('jugadores_seleccionado');

		//aqui pongo seleccionar imagen o subir una
		this.default_player = this.add.sprite(this.world.centerX - default_player.width/2.0, 150, 'default_player');
		this.upload_player = this.add.sprite(this.world.centerX - default_player.width/2.0, 250, 'upload_image');
		this.how_to_play = this.add.sprite(this.world.centerX - default_player.width/2.0, 350, 'how_to_play');
		this.default_player.inputEnabled = true;
		this.upload_player.inputEnabled = true;
		this.how_to_play.inputEnabled = true;
		this.default_player.input.sprite.events.onInputDown.add(this.empieza_default, this);
		this.upload_player.input.sprite.events.onInputDown.add(this.empieza_upload, this);
		this.how_to_play.input.sprite.events.onInputDown.add(this.empieza_how, this);

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
	        limit_pos_y = 400;
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

	empieza_default: function (pointer) {
		this.select_tipo.position.y = 150;
		this.empieza();
	},
	empieza_upload: function (pointer) {
		this.select_tipo.position.y = 250;
		this.empieza();
	},
	empieza_how: function (pointer) {
		this.select_tipo.position.y = 350;
		this.empieza();
	},

	empieza: function (pointer) {

		this.game.normalplayer = false;
		//dificultad jodia por defecto ( 2 )
		yomismo = this;
    	if (this.select_tipo.position.y == 150){
			this.game.level = 2;
			this.game.normalplayer = true;
			yomismo.juega(false);
		}
		if (this.select_tipo.position.y == 250){
			this.game.level = 2;

			this.default_player.destroy();
			this.upload_player.destroy();
			this.select_tipo.destroy();
			this.movil_jugar.destroy();
			this.how_to_play.destroy();
			if (this.game.device.desktop){
				this.select_dificultad.destroy();
			}
			else{
				this.movil_select_dificultad.destroy();
			}
			$("#subefoto").show();

			$('#fileToUpload').change(function() {
			  	$('#inputsubefoto').submit();
			});

			window.sube = 0;
			window.sube2 = 0;
			$("#subefoto").on('submit',(function(e) {
				e.preventDefault();
				if (window.sube < 1){
					window.sube = 1;

					$.ajax({
						url: "../subeajax1.php", 
						type: "POST",             
						data: new FormData(this),
						contentType: false,   
						cache: false,      
						processData:false,    
						success: function(data){
							$("#subefoto").hide();
							$("#contiene_foto_subida").show();
							lo_que_habia = $("#contiene_foto_subida").html();
							$("#contiene_foto_subida").html(lo_que_habia+data);



							$("#sube_img_cortada").on('submit',(function(e) {
								e.preventDefault();
								if (window.sube2 < 1){
									window.sube2 = 1;
									$.ajax({
										url: "../subeajax2.php", 
										type: "POST",             
										data: new FormData(this),
										contentType: false,   
										cache: false,      
										processData:false,    
										success: function(data){
											//window.ruta_jugador = data;
											

											yomismo.juega(data);
										}
									});
								}
							}));
						}
					});
				}
			}));


		}
		if (this.select_tipo.position.y == 350){
			this.game.level = 2;
			this.game.normalplayer = true;
			yomismo.entrena(false);
		}
		//

	},

	juega: function (ruta_jugador) {
		
		$("#contiene_foto_subida").css("display","none");
		this.game.ruta_jugador = ruta_jugador;
		this.state.start('MainMenuOnePlayer');
	},
	entrena: function (ruta_jugador) {
		
		$("#contiene_foto_subida").css("display","none");
		this.game.ruta_jugador = ruta_jugador;
		this.game.es_entreno = true;
		this.state.start('MainMenuOnePlayer');
	}

};

