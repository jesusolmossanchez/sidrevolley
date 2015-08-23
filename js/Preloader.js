
DudeVolley.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

DudeVolley.Preloader.prototype = {

	preload: function () {

		ga('send', 'pageview', '/Preloader');
		//situo el titulo y la barra de carga
		var titulo = this.cache.getImage('titulo');
		this.background = this.add.sprite(this.world.centerX - titulo.width/2.0, 120, 'titulo');
		this.preloadBar = this.add.sprite(240, 400, 'preloaderBar');

		//carga la barra horizontalmente(con crop)
		this.load.setPreloadSprite(this.preloadBar);

		//carga de imagenes


		//this.load.image('sidre1', '../assets/sidre1.png'); //background final -- cambiar
		this.load.image('sidre1', '../assets/game_over_back.png'); //background final -- cambiar
		//this.load.image('sky', '../assets/huerta2.png'); // background principal -- cambiar
		this.load.image('sky', '../assets/new_campo2.png'); // background principal -- cambiar
	    this.load.image('ground', '../assets/platform2.png'); // suelo
	    //this.load.image('red', '../assets/red_estrella_new.png'); // red -- cambiar
	    this.load.image('red', '../assets/new_red.png'); // red -- cambiar

	    this.load.image('has_ganao', '../assets/has_ganao.png');
	    this.load.image('has_perdio', '../assets/has_perdio.png');
	    this.load.image('palizaca', '../assets/palizaca.png'); // deprecated?
	    this.load.image('otra', '../assets/otra.png'); /// deprecated?

	    this.load.image('sombra', '../assets/sombra.png'); //sombra -- OK
	   // this.load.image('titulo_estirado', '../assets/titulo_estirado1.png'); //titulo alargado
	    this.load.image('titulo_estirado', '../assets/dude_volley.png'); //titulo alargado
	    this.load.image('titulo_saltolinea', '../assets/titulo1.png'); // titulo sin alargar


	    this.load.image('1jugador', '../assets/1jugador.png'); //titulo 1 jugador -- // deprecated?
	    this.load.image('2jugadores', '../assets/2jugadores.png');//selector jugador -- // deprecated? 
	    this.load.image('jugadores_seleccionado', '../assets/boton_seleccion.png'); //seleccion rectangular


	    this.load.image('default_player', '../assets/default_player_es.png'); //titulos dificultades
	    this.load.image('upload_image', '../assets/upload_image_es.png');
	    this.load.image('how_to_play', '../assets/how_to_play_es.png');
	    /*
	    this.load.image('chupao', '../assets/chupao.png'); //titulos dificultades
	    this.load.image('normalico', '../assets/normalico.png');
	    this.load.image('jodio', '../assets/jodio.png');
	    */
	    
	    this.load.image('select_dificultad', '../assets/select_dificultad.png');
	    this.load.image('select_dificultad', '../assets/select.png');
	    this.load.image('movil_select_dificultad', '../assets/movil_select_dificultad.png');

/*
	    this.load.image('movimientos1', '../assets/movimientos1.png');
	    this.load.image('movimientos2', '../assets/movimientos2.png');
	    this.load.image('movimientos_oneplayer', '../assets/movimientos_oneplayer.png');
	    this.load.image('movimientos2', '../assets/movimientos2.png');
*/

	    this.load.image('pelota', '../assets/new_pelota.png');
	    this.load.image('explota', '../assets/explota.png');

/*
	    this.load.image('all_players', '../assets/all_players2.png');
	    this.load.image('select_player1', '../assets/select_player1.png', 80, 80);
	    this.load.image('select_player2', '../assets/select_player2.png', 80, 80);
	    
	    this.load.spritesheet('mostri', rutajugador, 80, 80);
*/



		//CPU_PLAYER IMAGEN
	    this.load.spritesheet('cpu', '../cpu_player/cpu_player.png', 80, 110);



	    //botones mobile
	    this.load.spritesheet('movil_izq', '../assets/izq_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_der', '../assets/der_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_arr', '../assets/arr_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_pika', '../assets/pika_arrow_120.png', 140, 120);

	    //this.load.image('movil_jugar', '../assets/ajugar.png');
	    this.load.image('movil_jugar', '../assets/play_es.png');
	    //this.load.image('movil_volver_a_jugar', '../assets/volver_a_jugar.png');
	    this.load.image('movil_volver_a_jugar', '../assets/play_again_es.png');
	    
	    //this.load.image('movil_comoelegir', '../assets/texto_select.png');


	    //sonidos
	    //desactivo los sonidos!!??
	    /*
	    this.load.audio('acho',['../assets/acho2.ogg','../assets/acho2.mp3']);
	    this.load.audio('select_sound',['../assets/select.ogg','../assets/select.mp3']);
	    this.load.audio('explosion_sound',['../assets/explosion_sound.ogg','../assets/explosion_sound.mp3']);
	    this.load.audio('huertica_sound',['../assets/musica1.ogg','../assets/musica1.mp3']);
		this.huertica_music =  this.game.add.audio('huertica_sound');
		*/

		//punterooos
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();

	},

	create: function () {


		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

		
		//si estamos en pc pasa al premenu(elegir players) sino al menu de un jugador
		/*
		this.ready = true;
		if (this.game.device.desktop){
			this.state.start('PreMainMenu');
		}
		else{
			this.state.start('LevelMenu');
		}
		*/
		this.state.start('SubePlayer');

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		/*
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
		*/

	}

};
