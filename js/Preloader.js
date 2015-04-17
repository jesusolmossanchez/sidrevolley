
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

	
		//situo el titulo y la barra de carga
		var titulo = this.cache.getImage('titulo');
		this.background = this.add.sprite(this.world.centerX - titulo.width/2.0, 120, 'titulo');
		this.preloadBar = this.add.sprite(240, 400, 'preloaderBar');

		//carga la barra horizontalmente(con crop)
		this.load.setPreloadSprite(this.preloadBar);

		//carga de imagenes


		this.load.image('sidre1', 'assets/sidre1.png');
		this.load.image('sky', 'assets/huerta2.png');
	    this.load.image('ground', 'assets/platform2.png');
	    this.load.image('red', 'assets/red_estrella_new.png');

	    this.load.image('has_ganao', 'assets/has_ganao.png');
	    this.load.image('has_perdio', 'assets/has_perdio.png');
	    this.load.image('palizaca', 'assets/palizaca.png');
	    this.load.image('otra', 'assets/otra.png');

	    this.load.image('sombra', 'assets/sombra.png');
	    this.load.image('titulo_estirado', 'assets/titulo_estirado1.png');
	    this.load.image('titulo_saltolinea', 'assets/titulo1.png');

	    this.load.image('1jugador', 'assets/1jugador.png');
	    this.load.image('2jugadores', 'assets/2jugadores.png');
	    this.load.image('jugadores_seleccionado', 'assets/jugadores_seleccionado.png');


	    this.load.image('movimientos1', 'assets/movimientos1.png');
	    this.load.image('movimientos2', 'assets/movimientos2.png');
	    this.load.image('movimientos_oneplayer', 'assets/movimientos_oneplayer.png');
	    this.load.image('movimientos2', 'assets/movimientos2.png');
	    this.load.image('pelota', 'assets/pelota3.png');
	    this.load.image('explota', 'assets/explota.png');
	    this.load.image('all_players', 'assets/all_players2.png');


	    this.load.image('select_player1', 'assets/select_player1.png', 80, 80);
	    this.load.image('select_player2', 'assets/select_player2.png', 80, 80);
	    this.load.spritesheet('mostri', 'assets/mostri3_enfado.png', 80, 80);
	    this.load.spritesheet('pinchi', 'assets/pinchi1_enfadao.png', 80, 80);
	    this.load.spritesheet('chino1', 'assets/chino1_enfadao.png', 80, 80);
	    this.load.spritesheet('adri1', 'assets/adri1_enfadao.png', 80, 80);
	    this.load.spritesheet('bambi1', 'assets/bambi1_enfadao.png', 80, 80);
	    this.load.spritesheet('edu1', 'assets/edu1_enfadao.png', 80, 80);
	    this.load.spritesheet('fagg1', 'assets/fagg1_enfadao.png', 80, 80);
	    this.load.spritesheet('jesus1', 'assets/jesus1_enfadao.png', 80, 80);
	    this.load.spritesheet('jorgi1', 'assets/jorgi1_enfadao.png', 80, 80);
	    this.load.spritesheet('juan1', 'assets/juan1_enfadao.png', 80, 80);
	    this.load.spritesheet('juanfran1', 'assets/juanfran1_enfadao.png', 80, 80);
	    this.load.spritesheet('kenny1', 'assets/kenny1_enfadao.png', 80, 80);
	    this.load.spritesheet('laura1', 'assets/laura1_enfada.png', 80, 80);
	    this.load.spritesheet('maria1', 'assets/maria1_enfada.png', 80, 80);
	    this.load.spritesheet('marta1', 'assets/marta1_enfada.png', 80, 80);
	    this.load.spritesheet('miguel1', 'assets/miguel1_enfadao.png', 80, 80);
	    this.load.spritesheet('mikel1', 'assets/mikel1_enfadao.png', 80, 80);
	    this.load.spritesheet('paqui1', 'assets/paqui1_enfada.png', 80, 80);
	    this.load.spritesheet('pedro1', 'assets/pedro1_enfadao.png', 80, 80);
	    this.load.spritesheet('rebe1', 'assets/rebe1_enfada.png', 80, 80);
	    this.load.spritesheet('romero1', 'assets/romero1_enfadao.png', 80, 80);
	    this.load.spritesheet('sergio1', 'assets/sergio1_enfadao.png', 80, 80);
	    this.load.spritesheet('terry1', 'assets/terry1_enfadao.png', 80, 80);
	    this.load.spritesheet('dictinio1', 'assets/dictinio1_enfadao.png', 80, 80);
	    this.load.spritesheet('paco1', 'assets/paco1_enfadao.png', 80, 80);
	    this.load.spritesheet('laurapina1', 'assets/laurapina1_enfada.png', 80, 80);
	    this.load.spritesheet('jenny1', 'assets/jenny1_enfada.png', 80, 80);
	    this.load.spritesheet('alvarito1', 'assets/alvarito1_enfadao.png', 80, 80);

	    //botones mobile
	    
	    this.load.spritesheet('movil_izq', 'assets/izq_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_der', 'assets/der_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_arr', 'assets/arr_arrow_120.png', 140, 120);
	    this.load.spritesheet('movil_pika', 'assets/pika_arrow_120.png', 140, 120);

	    this.load.image('movil_jugar', 'assets/ajugar.png');
	    this.load.image('movil_volver_a_jugar', 'assets/volver_a_jugar.png');
	    this.load.image('movil_comoelegir', 'assets/texto_select.png');


	    //sonidos

	    this.load.audio('acho',['assets/acho2.ogg','assets/acho2.mp3']);
	    this.load.audio('select_sound',['assets/select.ogg','assets/select.mp3']);
	    this.load.audio('explosion_sound',['assets/explosion_sound.ogg','assets/explosion_sound.mp3']);
	    this.load.audio('huertica_sound',['assets/musica1.ogg','assets/musica1.mp3']);
		
		this.huertica_music =  this.game.add.audio('huertica_sound');

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
		this.ready = true;
		if (this.game.device.desktop){
			this.state.start('PreMainMenu');
		}
		else{
			this.state.start('MainMenuOnePlayer');
		}

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
