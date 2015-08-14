
DudeVolley.PreMainMenu = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

DudeVolley.PreMainMenu.prototype = {


	create: function () {

		//situo las cosas en la pantalla
		var titulo = this.cache.getImage('titulo_saltolinea');
		this.background = this.add.sprite(this.world.centerX - titulo.width/2.0, 120, 'titulo_saltolinea');

		var jugador1 = this.cache.getImage('1jugador');
		var jugadores_seleccionado = this.cache.getImage('jugadores_seleccionado');
		this.jugar1player = this.add.sprite(this.world.centerX - jugador1.width/2.0, 300, '1jugador');
		this.jugar2player = this.add.sprite(this.world.centerX - jugador1.width/2.0, 400, '2jugadores');

		this.select_tipo = this.add.sprite(this.world.centerX - jugadores_seleccionado.width/2.0, 300, 'jugadores_seleccionado');

		//inicializo si son dos jugadores
		this.is_two_players = false;
		
		this.physics.enable(this.select_tipo, Phaser.Physics.ARCADE);
		
		this.cursors = this.input.keyboard.createCursorKeys();
		
		L = this.input.keyboard.addKey(Phaser.Keyboard.L);
		Z = this.input.keyboard.addKey(Phaser.Keyboard.Z);
		ENTER = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.startX;
		this.startY;

	},

	update: function () {

		//muevo el selector y salto al menu correspondiente
		if (this.cursors.down.isDown){
			this.select_tipo.body.position.y = 400;
			this.is_two_players = true;
		}
		if (this.cursors.up.isDown){
			this.select_tipo.body.position.y = 300;
			this.is_two_players = false;
		}
		if(L.isDown || Z.isDown || ENTER.isDown){
			if(this.is_two_players){
				this.state.start('MainMenu');
			}
			else{
				this.state.start('LevelMenu');
			}
		}




	}

};
