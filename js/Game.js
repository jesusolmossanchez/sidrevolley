



DudeVolley.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

DudeVolley.Game.prototype = {

    

    init: function () {

         //Inicializo la fisica del juego
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //fondo
        this.add.sprite(0, 0, 'sky');

        //Suelo
        platforms = this.add.group();

        // We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, this.world.height - 134, 'ground');

        //  Scale it to fit the width of the this (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //Red
        var red = platforms.create(390, 380, 'red');
        red.body.immovable = true;

        //SOMBRAS

        this.sombra1 = this.add.sprite(32, 500, 'sombra');
        this.sombra_pelota = this.add.sprite(32, 500, 'sombra');
        this.sombra2 = this.add.sprite(this.world.width - 32, 500, 'sombra');
        this.sombra1.alpha = 0.5;
        this.sombra2.alpha = 0.5;
        this.sombra_pelota.alpha = 0.2;


        //SONIDOS
        this.acho_audio2 =  this.game.add.audio('acho');
        this.explosion_sound2 =  this.game.add.audio('explosion_sound');



        //JUGADORES

        switch(que_player1) {
            case 1:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'mostri');
                break;
            case 2:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'chino1');
                break;
            case 3:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'adri1');
                break;
            case 4:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'bambi1');
                break;
            case 5:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'edu1');
                break;
            case 6:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'dictinio1');
                break;
            case 7:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'fagg1');
                break;
            case 8:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'jesus1');
                break;
            case 9:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'jorgi1');
                break;
            case 10:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'juan1');
                break;
            case 11:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'juanfran1');
                break;
            case 12:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'kenny1');
                break;
            case 13:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'jenny1');
                break;
            case 14:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'laura1');
                break;
            case 15:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'maria1');
                break;
            case 16:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'marta1');
                break;
            case 17:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'laurapina1');
                break;
            case 18:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'miguel1');
                break;
            case 19:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'mikel1');
                break;
            case 20:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'paco1');
                break;
            case 21:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'paqui1');
                break;
            case 22:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'pedro1');
                break;
            case 23:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'rebe1');
                break;
            case 24:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'romero1');
                break;
            case 25:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'sergio1');
                break;
            case 26:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'terry1');
                break;
            case 27:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'alvarito1');
                break;
            case 28:
                this.game.player = this.add.sprite(32, this.world.height - 250, 'pinchi');
                break;
            
        }  
        this.game.player.anchor.setTo(0.5, 0.5);

        switch(que_player2) {
            case 1:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'mostri');
                break;
            case 2:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'chino1');
                break;
            case 3:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'adri1');
                break;
            case 4:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'bambi1');
                break;
            case 5:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'edu1');
                break;
            case 6:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'dictinio1');
                break;
            case 7:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'fagg1');
                break;
            case 8:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'jesus1');
                break;
            case 9:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'jorgi1');
                break;
            case 10:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'juan1');
                break;
            case 11:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'juanfran1');
                break;
            case 12:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'kenny1');
                break;
            case 13:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'jenny1');
                break;
            case 14:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'laura1');
                break;
            case 15:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'maria1');
                break;
            case 16:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'marta1');
                break;
            case 17:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'laurapina1');
                break;
            case 18:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'miguel1');
                break;
            case 19:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'mikel1');
                break;
            case 20:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'paco1');
                break;
            case 21:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'paqui1');
                break;
            case 22:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'pedro1');
                break;
            case 23:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'rebe1');
                break;
            case 24:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'romero1');
                break;
            case 25:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'sergio1');
                break;
            case 26:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'terry1');
                break;
            case 27:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'alvarito1');
                break;
            case 28:
                this.game.player2 = this.add.sprite(this.world.width - 32, this.world.height - 250, 'pinchi');
                break;
        } 
        this.game.player2.anchor.setTo(0.5, 0.5);
      
        //PELOTA
        this.pelota = this.add.sprite(32, 0, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);

        //Fisica de jugadores y this.pelota
        this.physics.arcade.enable(this.game.player);
        this.physics.arcade.enable(this.game.player2);
        this.physics.arcade.enable(this.pelota);

        //Fisica del jugador
        this.game.player.body.bounce.y = 0;
        this.game.player.body.gravity.y = 800;
        this.game.player.body.collideWorldBounds = true;

        this.game.player2.body.bounce.y = 0;
        this.game.player2.body.gravity.y = 800;
        this.game.player2.body.collideWorldBounds = true;

        //Fisica de la this.pelota
        this.pelota.body.bounce.y = 0.9;
        this.pelota.body.bounce.x = 0.900;
        this.pelota.body.gravity.y = 900;
        this.pelota.body.collideWorldBounds = true;
        this.pelota.body.deltaMax = (400,400)

        //animaciones de movimiento
        this.game.player.animations.add('semueve', [0, 1], 5, true);
        this.game.player2.animations.add('semueve', [0, 1], 5, true);
        this.game.player.animations.add('senfada', [2, 3], 5, true);
        this.game.player2.animations.add('senfada', [2, 3], 5, true);

        //  The score
        this.scoreText1 = this.add.text(16, 16, '0', { font: '44px Age', fill: "#eaff02", align: "center" });
        this.scoreText2 = this.add.text(this.world.width - 38, 16, '0', { font: '44px Age', fill: "#eaff02", align: "center" });
        puntos_player1 = 0;
        puntos_player2 = 0;

        this.scoreText1.text = puntos_player1;
        this.scoreText2.text = puntos_player2;
        
        //teclas
        cursors = this.input.keyboard.createCursorKeys();

        //pikas
        superpika = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        superpika2 = this.input.keyboard.addKey(Phaser.Keyboard.L);
        PAUSE = this.input.keyboard.addKey(Phaser.Keyboard.ESC);


        //INICIALIZO COSAS
        this.enpausa = false;

        this.game.player.enfadao = false;
        this.game.player.enfadao_time = this.time.now;
        this.game.player2.enfadao = false;
        this.game.player2.enfadao_time = this.time.now;



        this.game.player.tiempo_gorrino = this.time.now;
        this.game.player.hace_gorrino = false;
        this.game.player.para_gorrino = false;

        this.game.player2.tiempo_gorrino = this.time.now;
        this.game.player2.hace_gorrino = false;
        this.game.player2.para_gorrino = false;

        this.game.player.limite_izquierda = 0;
        this.game.player.limite_derecha = 380;

        this.game.player2.limite_izquierda = 410;
        this.game.player2.limite_derecha = 800;

        this.enunratico = this.time.now;
        this.quien_empieza = "uno";
        this.punto = false;

        this.dondecae = 0;
        this.cuandocae = 0;

        this.mueveaqui = 32;

        this.game.hasperdio = false;
        this.game.unplayer = false;

        window.onkeydown = function() {
            //SI PULSA ESCAPE -- PAUSA
            if (this.PAUSE.game.input.keyboard.event.keyCode == 27){
                this.PAUSE.game.paused = !this.PAUSE.game.paused;
            }
        }

    },


    update: function () {

        this.sombra1.position.set(this.game.player.body.position.x, this.world.height - 144);
        this.sombra2.position.set(this.game.player2.body.position.x, this.world.height - 144);
        this.sombra_pelota.position.set(this.pelota.body.position.x, this.world.height - 144);

        //angulo de la pelota segun la velocidad
        this.pelota.angle += this.pelota.body.velocity.x/20;

        //choque de this.pelota con jugador 1 Y 2
        this.physics.arcade.collide(this.pelota, this.game.player, this.pika, null, this);
        this.physics.arcade.collide(this.pelota, this.game.player2, this.pika2, null, this);
        
        //choque de jugadores con cosas
        this.physics.arcade.collide(this.game.player, platforms);
        this.physics.arcade.collide(this.game.player2, platforms);

        //choque de this.pelota con cosas
        this.physics.arcade.collide(this.pelota, platforms);


        //SI HAY PUNTO Y HA PASAO EL TIEMPO DEL SLOW MOTION, QUITO LA EXPLOSION Y EMPIEZA
        if (this.punto){
            if(this.time.now > this.enunratico){
                this.punto = false;
                this.explota.kill();
                this.empieza(this.quien_empieza);
            }
        }
        else{

            //Reseteo gorrino1
            if(this.time.now > (this.game.player.tiempo_gorrino - 100)){
                this.game.player.body.velocity.x = 0;
                this.game.player.body.rotation = 0;
                this.game.player.hace_gorrino = false;
            }

            if(this.time.now > (this.game.player.tiempo_gorrino+100)){
                this.game.player.para_gorrino = false;
            }

            //MOVIMIENTOS PLAYER1
            if(superpika.isDown){
                if (!this.game.player.body.touching.down && !this.game.player.para_gorrino){
                    this.game.player.enfadao = true;
                    this.game.player.animations.play('senfada');
                    this.game.player.enfadao_time = this.time.now + 500;
                }
                else if (!this.game.player.para_gorrino){
                    this.game.player.hace_gorrino=true;
                    this.game.player.tiempo_gorrino = this.time.now + 400;
                }
            }

            if (IZQUIERDA.isDown){
                this.mueve("izquierda",this.game.player);
            }
            else if(DERECHA.isDown){
                this.mueve("derecha",this.game.player);
            }
            else{
                this.mueve("parao",this.game.player);
            }

            if (ARRIBA.isDown){
                this.mueve("arriba",this.game.player);
            }



            //Reseteo gorrino2
            if(this.time.now > (this.game.player2.tiempo_gorrino - 100)){
                this.game.player2.body.velocity.x = 0;
                this.game.player2.body.rotation = 0;
                this.game.player2.hace_gorrino = false;
            }

            if(this.time.now > (this.game.player2.tiempo_gorrino+100)){
                this.game.player2.para_gorrino = false;
            }

            //MOVIMIENTOS PLAYER2
            if(superpika2.isDown){
                if (!this.game.player2.body.touching.down && !this.game.player.para_gorrino){
                    this.game.player2.enfadao = true;
                    this.game.player2.animations.play('senfada');
                    this.game.player2.enfadao_time = this.time.now + 500;
                }
                else if (!this.game.player2.para_gorrino){
                    this.game.player2.hace_gorrino=true;
                    this.game.player2.tiempo_gorrino = this.time.now + 400;
                }
            }

            if (cursors.left.isDown){
                this.mueve("izquierda",this.game.player2);
            }
            else if(cursors.right.isDown){
                this.mueve("derecha",this.game.player2);
            }
            else{
                this.mueve("parao",this.game.player2);
            }

            if (cursors.up.isDown){
                this.mueve("arriba",this.game.player2);
            }

            

            //LA PELOTA TOCA EL SUELO
            if(this.pelota.body.position.y > 515){
                this.procesapunto();
            }
        }


    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    procesapunto: function () {
        this.explosion_sound2.play("",0,0.7);
        this.explota = this.add.sprite(this.pelota.body.position.x, this.pelota.body.position.y+5, 'explota');
        this.game.player.body.velocity.y = this.game.player.body.velocity.y * 0.2;
        this.game.player2.body.velocity.y = this.game.player2.body.velocity.y * 0.2;
        this.game.player.body.velocity.x = this.game.player.body.velocity.x * 0.2;
        this.game.player2.body.velocity.x = this.game.player2.body.velocity.x * 0.2;
        this.pelota.body.velocity.y = this.pelota.body.velocity.y * 0.2;
        this.pelota.body.velocity.x = this.pelota.body.velocity.x * 0.2;
        this.pelota.body.gravity.y = 200;
        if(this.pelota.body.position.x > 390){
            puntos_player1++;
            this.scoreText1.text = puntos_player1;
            if (puntos_player1 >= 15){
                this.game.ganador = this.game.player;
                this.game.perdedor = this.game.player2;
                this.state.start('GameOver');
            }
            tiempo_punto = this.time.now;
            this.enunratico = this.time.now + 2500;
            this.quien_empieza = "uno";
            this.punto = true;
        }
        else{
            puntos_player2++;
            this.scoreText2.text = puntos_player2;
            if (puntos_player2 >= 15){
                this.game.ganador = this.game.player2;
                this.game.perdedor = this.game.player;
                this.state.start('GameOver');
            }
            tiempo_punto = this.time.now;
            this.enunratico = this.time.now + 2500;
            this.quien_empieza = "dos";
            this.punto = true;
        }
    },

    mueve: function (adonde, quien) {
        if(quien.hace_gorrino){
            if (adonde == "izquierda" && quien.body.touching.down && !quien.para_gorrino){
                this.acho_audio2.play("",0,0.7);
                quien.body.velocity.x = -400;
                quien.body.rotation = -90;
                quien.para_gorrino = true;
            }
            else if (adonde == "derecha" && quien.body.touching.down && !quien.para_gorrino){
                this.acho_audio2.play("",0,0.7);
                quien.body.velocity.x = 400;
                quien.body.rotation = 90;
                quien.para_gorrino = true;
            }
        }
        else{
            if (adonde == "izquierda" && quien.position.x > quien.limite_izquierda){
                quien.body.velocity.x = -150;
                if (this.time.now > quien.enfadao_time){
                    quien.animations.play('semueve');
                }
            }
            else if (adonde == "derecha" && quien.position.x < quien.limite_derecha){
                quien.body.velocity.x = 150;
                if (this.time.now > quien.enfadao_time){
                    quien.animations.play('semueve');
                }
            }
            else
            {
                if (adonde == "parao" && this.time.now > quien.enfadao_time){
                    quien.animations.stop();
                    quien.frame = 1;
                }
            }

            if(adonde == "arriba" && !quien.hace_gorrino && quien.body.touching.down){
                quien.body.velocity.y = -550;
            }

        }

    },

    pika: function () {
        /*
        this.muevederecha = false;
        this.mueveizquierda = false;
        this.muevearriba = false;
        this.mueveabajo = false;
        */
        if (this.punto){
            return true;
        }
        //////console.log(this.pelota.body.newVelocity.y);
        this.pelota.body.gravity.y = 900;
        this.pelota.body.velocity.y = -600;
        //this.pelota.body.velocity.y = this.pelota.body.velocity.y * (-7);
        pos_pelota = this.pelota.body.position.x;
        pos_player = this.game.player.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < this.game.player.enfadao_time && this.game.player.enfadao){
            this.acho_audio2.play("",0,0.7);
            if ((DERECHA.isDown || IZQUIERDA.isDown) && !ARRIBA.isDown && !ABAJO.isDown)
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3;
                this.pelota.body.velocity.x = 800;
                this.pelota.body.gravity.y = 1400;
            }
            else if(DERECHA.isDown  && ARRIBA.isDown && !ABAJO.isDown){
                this.pelota.body.velocity.y = -800;
                this.pelota.body.velocity.x = 800;
                this.pelota.body.gravity.y = 1400;
            }
            else if(IZQUIERDA.isDown  && ARRIBA.isDown && !ABAJO.isDown){
                this.pelota.body.velocity.y = -800;
                this.pelota.body.velocity.x = -800;
                this.pelota.body.gravity.y = 1400;
            }
            else if((DERECHA.isDown || IZQUIERDA.isDown) && !ARRIBA.isDown && ABAJO.isDown){
                this.pelota.body.velocity.y = 800;
                this.pelota.body.velocity.x = 1000;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!DERECHA.isDown && !IZQUIERDA.isDown && !ARRIBA.isDown && ABAJO.isDown){
                this.pelota.body.velocity.y = 800;
                this.pelota.body.velocity.x = 300;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!DERECHA.isDown && !IZQUIERDA.isDown && !ARRIBA.isDown && !ABAJO.isDown){
                this.pelota.body.velocity.y = -100;
                this.pelota.body.velocity.x = 300;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!DERECHA.isDown && !IZQUIERDA.isDown && ARRIBA.isDown && !ABAJO.isDown){
                this.pelota.body.velocity.y = -1000;
                this.pelota.body.velocity.x = 300;
                this.pelota.body.gravity.y = 1400;
            }
        }

    },


    
    
    pika2: function () {
        //////console.log(this.game.player2.enfadao_time);
        //////console.log(this.game.player2.enfadao);
        if (this.punto){
            return true;
        }
        this.pelota.body.gravity.y = 900;
        this.pelota.body.velocity.y = -600;
        pos_pelota = this.pelota.body.position.x;
        pos_player = this.game.player2.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < this.game.player2.enfadao_time && this.game.player2.enfadao){
            this.acho_audio2.play("",0,0.7);
           if ((cursors.right.isDown || cursors.left.isDown) && !cursors.up.isDown && !cursors.down.isDown)
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3;
                this.pelota.body.velocity.x = -800;
                this.pelota.body.gravity.y = 1400;
            }
            else if(cursors.right.isDown  && cursors.up.isDown && !cursors.down.isDown){
                this.pelota.body.velocity.y = -800;
                this.pelota.body.velocity.x = 800;
                this.pelota.body.gravity.y = 1400;
            }
            else if(cursors.left.isDown  && cursors.up.isDown && !cursors.down.isDown){
                this.pelota.body.velocity.y = -800;
                this.pelota.body.velocity.x = -800;
                this.pelota.body.gravity.y = 1400;
            }
            else if((cursors.right.isDown || cursors.left.isDown) && !cursors.up.isDown && cursors.down.isDown){
                this.pelota.body.velocity.y = 800;
                this.pelota.body.velocity.x = -1000;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && cursors.down.isDown){
                this.pelota.body.velocity.y = 800;
                this.pelota.body.velocity.x = -300;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
                this.pelota.body.velocity.y = -100;
                this.pelota.body.velocity.x = -300;
                this.pelota.body.gravity.y = 1400;
            }
            else if(!cursors.right.isDown && !cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown){
                this.pelota.body.velocity.y = -1000;
                this.pelota.body.velocity.x = -300;
                this.pelota.body.gravity.y = 1400;
            }
        }
    },


    empieza: function (quien) {
        this.pelota.body.gravity.y = 900;
        this.game.player.body.position.x = 32;
        this.game.player.body.position.y = this.world.height - 250;
        this.game.player.body.velocity.x = 0;
        this.game.player.body.velocity.y = 0;

        this.game.player2.body.position.x = this.world.width - 32;
        this.game.player2.body.position.y = this.world.height - 250;
        this.game.player2.body.velocity.x = 0;
        this.game.player2.body.velocity.y = 0;

        this.pelota.body.position.y = 0;
        this.pelota.body.velocity.x = 0;
        this.pelota.body.velocity.y = 0;
        if (quien == "uno"){
            this.pelota.body.position.x = 32;
        }
        else{
            this.pelota.body.position.x = this.world.width - 32;
        }
    }

};
