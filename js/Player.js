

/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(ruta, juego, id) {
	if (ruta === "cpu"){
		this.sprite =juego.add.sprite(juego.world.width - 52, juego.world.height - 250, ruta);
		this.sprite.animations.add('senfada', [0], 5, true);
        this.sprite.animations.add('semueve', [2, 3], 7, true);
        this.sprite.animations.add('salta', [1], 5, true);
        this.sprite.limite_izquierda = 410;
        this.sprite.limite_derecha = 800;
	}
	else{
		this.sprite =juego.add.sprite(32, juego.world.height - 250, ruta);
		this.sprite.animations.add('semueve', [0, 1], 7, true);
    	this.sprite.animations.add('senfada', [3], 5, true);
    	this.sprite.animations.add('salta', [2], 5, true);
    	this.sprite.limite_izquierda = 0;
    	this.sprite.limite_derecha = 380;
	}

	this.id = id;

	this.entreno = false;

	juego.physics.arcade.enable(this.sprite);
	this.sprite.anchor.setTo(0.5, 0.5);

	this.sprite.body.bounce.y = 0;
    this.sprite.body.gravity.y = 800*juego.game.factor_slow_gravity;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.enfadao = false;
    this.sprite.enfadao_time = juego.time.now;

 	this.sprite.tiempo_gorrino = juego.time.now;
    this.sprite.hace_gorrino = false;
    this.sprite.para_gorrino = false;

    

    this.sprite.frame = 1;

    this.es_entreno = function() {
    	this.entreno = true;
    	this.sprite.limite_derecha = 800;
    }

    this.mueve = function(adonde) {
        if(this.sprite.hace_gorrino){
            if (adonde == "izquierda" && this.sprite.body.touching.down && !this.sprite.para_gorrino){
                //this.acho_audio2.play("",0,0.3);
                this.sprite.body.velocity.x = -400*juego.game.factor_slow_velocity;
                this.sprite.body.rotation = -90;
                this.sprite.para_gorrino = true;
                if (this.entreno){
                	juego.tip3.alpha = 1;
                }
            }
            else if (adonde == "derecha" && this.sprite.body.touching.down && !this.sprite.para_gorrino){
                //this.acho_audio2.play("",0,0.3);
                this.sprite.body.velocity.x = 400*juego.game.factor_slow_velocity;
                this.sprite.body.rotation = 90;
                this.sprite.para_gorrino = true;
                if (this.entreno){
                	juego.tip3.alpha = 1;
                }
            }
        }
        else{
            if (adonde == "izquierda" && this.sprite.position.x > this.sprite.limite_izquierda){
                this.sprite.body.velocity.x = -150*juego.game.factor_slow_velocity;
                if (juego.time.now > this.sprite.enfadao_time && Player1.sprite.salta != true){
                    this.sprite.animations.play('semueve');
                    if (this.entreno){
                    	juego.tip4.alpha = 0.5;
                    	juego.tip1.alpha = 1;
                	}
                }
            }
            else if (adonde == "derecha" && this.sprite.position.x < this.sprite.limite_derecha){
                this.sprite.body.velocity.x = 150*juego.game.factor_slow_velocity;
                if (juego.time.now > this.sprite.enfadao_time && Player1.sprite.salta != true){
                    this.sprite.animations.play('semueve');
                    if (this.entreno){
                    	juego.tip4.alpha = 0.5;
                    	juego.tip1.alpha = 1;
                	}
                }
            }
            else
            {
                if (adonde == "parao" && juego.time.now > this.sprite.enfadao_time && Player1.sprite.salta != true){
                    this.sprite.animations.stop();
                    this.sprite.body.velocity.x = 0;
                    this.sprite.frame = 0;
                    if (this.entreno){
                    	juego.tip4.alpha = 0.5;
                    	juego.tip1.alpha = 0.5;
                	}
                }
            }

            if(adonde == "arriba" && !this.sprite.hace_gorrino && this.sprite.body.touching.down){
                //this.sprite.body.velocity.y = -550*juego.game.factor_slow_velocity;
                this.sprite.body.velocity.y = -550;
                Player1.sprite.salta = true;
                this.sprite.animations.play('salta');
                if (this.entreno){
                	juego.tip2.alpha = 1;
            	}
            }

        }

    }

};