
DudeVolley.GameOver = function (game) {



};

DudeVolley.GameOver.prototype = {

	create: function () {

			ga('send', 'pageview', '/GameOver');
			var rutajuagdor = this.game.ruta_jugador;

		
			relacion = $(window).height()/$(window).width();
			//relacion = 1-relacion;
			if (relacion < 1){
				//relacion=relacion+1.5;
				letra1 = $(window).height()/9;
				letra2 = $(window).height()/14;
				letra3 = $(window).height()/20;

				borde = $(window).height()/40;
				ancho = $(window).height()/2;

				$("#puntos").css("font-size",letra1+"px");

				$("#texto_fin").css("font-size",letra2+"px");
				$("#envia_tus_puntos").css("font-size",letra2+"px");

				$("#inputtunombre").css("font-size",letra2+"px");
				$("#inputtunombre").css("padding",borde+"px");
				$("#inputtunombre").css("width",ancho+"px");
				$("#inputtunombre").css("border",borde+"px solid #f5f823");
				$("#envia_tu_nombre").css("font-size",letra2+"px");
				$("#envia_tu_nombre").css("padding",borde+"px");
				$("#envia_tu_nombre").css("border",borde+"px solid #f5f823");

				$("#contiene_mandapuntos").css("font-size",letra3+"px");
				$("#contiene_clasificacion").css("font-size",letra3+"px");

			}            
        

		//Inicializo la fisica del juego
		/*
		L = this.input.keyboard.addKey(Phaser.Keyboard.L);
		PIKA1 = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ARRIBA = this.input.keyboard.addKey(Phaser.Keyboard.R);
		ABAJO = this.input.keyboard.addKey(Phaser.Keyboard.F);
		IZQUIERDA = this.input.keyboard.addKey(Phaser.Keyboard.D);
		DERECHA = this.input.keyboard.addKey(Phaser.Keyboard.G);
		ZETA = this.input.keyboard.addKey(Phaser.Keyboard.Z);*/
		ENTER = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.input.keyboard.removeKey(Phaser.Keyboard.D);
		this.input.keyboard.removeKey(Phaser.Keyboard.R);
		this.input.keyboard.removeKey(Phaser.Keyboard.F);
		this.input.keyboard.removeKey(Phaser.Keyboard.G);
		this.input.keyboard.removeKey(Phaser.Keyboard.Z);
		this.input.keyboard.removeKey(Phaser.Keyboard.L);
		
		this.add.sprite(0, 0, 'sidre1');
		
		if(this.game.unplayer){
			var tiempofinal = this.time.now - this.game.empieza;
			var resultado;
			var level;
			if(this.game.hasperdio == true){
				resultado = "perdido";
			}
			else{
				resultado = "ganado";
				if (rutajuagdor != false){
					var post_data= {
				        rutaplayer: rutajuagdor,
				        token: window.token
				    }
					$.post("cambia_imagen_winner.php", post_data)
						.done(function( data ) {
							console.log(data);
					});
				}
			}
			if (this.game.level == 0){
				level = "chupao";
			}
			else if (this.game.level == 1){
				level = "normalico";
			}
			else if (this.game.level == 2){
				level = "jodio";
			}
			
			$("#mandapuntos").show();
			$("#contiene_mandapuntos").fadeIn();
			$("#contiene_mandapuntos").focus();
			$("#texto_fin").text("Has   "+resultado+"!");
			$("#puntos").text(this.game.puntos_player1+" - "+this.game.puntos_player2);

			window.entra = 0;
			$("#envia_tu_nombre").click(function(e){
				e.preventDefault();
				if (window.entra < 1){
					//window.entra = 1;
					var post_data= {
								        nombre: $("#inputtunombre").val(),
								        diferencia: diferencia,
								        puntuacion: puntuacion,
								        tiempo: tiempofinal,
								        level: level,
								        token: window.token
								    }
					$.post( "registrapuntos.php", post_data)
						.done(function( data ) {
							
							$("#mandapuntos").slideUp();
							$("#contiene_clasificacion").slideDown();
							//console.log( "Data Loaded: " + data );
							acho = JSON.parse(data);
							$.each(acho, function() {
								var num = Number(this.tiempo);
								var seconds = Math.floor(num / 1000);
								var minutes = Math.floor(seconds / 60);
								var seconds = seconds - (minutes * 60);
								if (seconds<10){
									seconds="0"+seconds;
								}
								var format = minutes + ':' + seconds
								//$("#titulo_nivel").html("Nivel: "+level);
								$("#contiene_clasificacion").html($("#contiene_clasificacion").html()+"<dl><dt>"+this.nombre+"</dt><dd>"+this.puntuacion+"("+format+")</dd></dl>");
							  	//use obj.id and obj.name here, for example:
							});
							//DudeVolley.scale.refresh();
					});
				}
			});


		


		}
		else if(this.game.hasperdio == true){
			var has_perdio = this.cache.getImage('has_perdio');
			this.has_perdio = this.add.sprite(this.world.centerX - has_perdio.width/2.0, 150, 'has_perdio');
			var otra = this.cache.getImage('otra');
			this.otra = this.add.sprite(this.world.centerX - otra.width/2.0, 250, 'otra');
		}
		else{
			var has_ganao = this.cache.getImage('has_ganao');
			this.has_ganao = this.add.sprite(this.world.centerX - has_ganao.width/2.0, 150, 'has_ganao');
			var otra = this.cache.getImage('otra');
			this.otra = this.add.sprite(this.world.centerX - otra.width/2.0, 250, 'otra');
		}
		
		var diferencia = this.game.puntos_player1 - this.game.puntos_player2;
		var puntuacion = this.game.puntos_player1+" - "+this.game.puntos_player2;

		
		
		
		//var palizaca = this.cache.getImage('palizaca');
		//this.palizaca = this.add.sprite(this.world.centerX - palizaca.width/2.0, 150, 'palizaca');

        this.physics.startSystem(Phaser.Physics.ARCADE);

		this.ganador = this.add.sprite(32, this.world.height - 250, this.game.ganador.key);
		this.perdedor = this.add.sprite(this.world.width/2, this.world.height - 250, this.game.perdedor.key);

		this.ganador.anchor.setTo(0.5, 0.5);
		this.perdedor.anchor.setTo(0.5, 0.5);

		//Fisica de jugadores y this.pelota
        this.physics.arcade.enable(this.ganador);
        this.physics.arcade.enable(this.perdedor);

        //Fisica del jugador
        this.ganador.body.bounce.y = 0;
        this.ganador.body.gravity.y = 800;
        this.ganador.body.collideWorldBounds = true;

        this.perdedor.body.bounce.y = 0;
        this.perdedor.body.gravity.y = 800;
        this.perdedor.body.collideWorldBounds = true;

        this.pelota = this.add.sprite(300, this.world.height - 130, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);
        this.pelota.angle = Math.floor((Math.random() * 180) + 1); 
        this.explota = this.add.sprite(300, this.world.height - 150, 'explota');

        //animaciones de movimiento
        this.ganador.animations.add('semueve', [0, 1], 7, true);
        this.perdedor.animations.add('semueve2', [0, 1], 7, true);
        this.ganador.animations.add('senfada', [2, 3], 7, true);
        this.perdedor.animations.add('senfada2', [2, 3], 7, true);

        var movil_volver_a_jugar = this.cache.getImage('movil_volver_a_jugar');
		this.movil_volver_a_jugar = this.add.sprite(this.world.centerX - movil_volver_a_jugar.width/2.0,470,'movil_volver_a_jugar');
		this.movil_volver_a_jugar.inputEnabled = true;
		this.movil_volver_a_jugar.input.sprite.events.onInputDown.add(this.empieza, this);



	},

	update: function () {
		if (this.ganador.body.x >= (this.world.width-180))
        {
			this.ganador.body.velocity.x = -150;
        }
        if(this.ganador.body.x <= 140){
        	this.ganador.body.velocity.x = 150;
        }
		this.ganador.animations.play('semueve');
		this.perdedor.animations.play('senfada');
		this.perdedor.body.rotation = 90;
		if (this.ganador.body.y > (this.world.height-190))
        {
            this.ganador.body.velocity.y = -550;
        }
        if (this.perdedor.body.y > (this.world.height-180))
        {
            this.perdedor.body.velocity.y = 0;
            this.perdedor.body.y = this.world.height-180;
        }
		
	    if(ENTER.isDown && !this.game.yaregistrado){
			$("#envia_tu_nombre").click();
			this.game.yaregistrado = true;
	    }

	    //this.game.input.holdRate = 600;
		//this.game.input.onTap.add(this.empieza, this);
		



	},

	empieza: function(){
		location.reload();
		/*
		$("#contiene_mandapuntos").hide();
		$("#mandapuntos").hide();
		$("#contiene_clasificacion").html("");
		$("#contiene_clasificacion").hide();
		this.game.huertica_music.stop();
	    this.state.start('Preloader');
		*/
	}

};
