
DudeVolley.MainMenuOnePlayer = function (game) {

	this.music = null;
	this.playButton = null;

};

DudeVolley.MainMenuOnePlayer.prototype = {

	preload: function (){
		ga('send', 'pageview', '/FakeMenu');
		if (this.game.normalplayer){
			this.load.spritesheet('player1','../cpu_player/default_player.png',80,110)
		}else{
			this.load.spritesheet('player1', this.game.ruta_jugador, 80, 110);
		}

        this.load.image('volver', '../assets/volver.png');
		if (this.game.device.desktop){
            this.load.image('tip1', '../assets/muevete.png');
            this.load.image('tip2', '../assets/salta_arriba.png');
            this.load.image('tip3', '../assets/gorrino.png');
            this.load.image('tip4', '../assets/mate.png');
        }
        else{
            this.load.image('tip1', '../assets/muevete_movil.png');
            this.load.image('tip2', '../assets/salta_arriba_movil.png');
            this.load.image('tip3', '../assets/gorrino_movil.png');
            this.load.image('tip4', '../assets/mate_movil.png');          
        }
	},
	
	init: function (){
		
	},

	create: function () {
		//AUDIO
		//this.game.huertica_music =  this.game.add.audio('huertica_sound');
		//this.game.huertica_music.play("",0,0.7,true);
 		//this.selected_sound =  this.game.add.audio('select_sound');

		this.cursors = this.input.keyboard.createCursorKeys();
		L = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ENTER = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		PIKA1 = this.input.keyboard.addKey(Phaser.Keyboard.L);
		ARRIBA = this.input.keyboard.addKey(Phaser.Keyboard.R);
		ABAJO = this.input.keyboard.addKey(Phaser.Keyboard.F);
		IZQUIERDA = this.input.keyboard.addKey(Phaser.Keyboard.D);
		DERECHA = this.input.keyboard.addKey(Phaser.Keyboard.G);
		ZETA = this.input.keyboard.addKey(Phaser.Keyboard.Z);

	},

	update: function () {
		this.empieza();
	},

	empieza: function (pointer) {

		if (!this.game.es_entreno){
    		this.state.start('GameOnePlayer');
		}
		else{

    		this.state.start('Entrenamiento');
		}

	}


};
