



BasicGame.GameOnePlayer = function (game) {

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

BasicGame.GameOnePlayer.prototype = {

    

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

        this.sombra1 = this.add.sprite(32, 500, 'sombra');
        this.sombra_pelota = this.add.sprite(32, 500, 'sombra');
        this.sombra2 = this.add.sprite(this.world.width - 52, 500, 'sombra');
        this.sombra1.alpha = 0.5;
        this.sombra2.alpha = 0.5;
        this.sombra_pelota.alpha = 0.2;


        //VELOCIDAD NORMAL
        //this.game.factor_slow_velocity = 0.8;
        //this.game.factor_slow_gravity = 0.64;
        this.game.factor_slow_velocity = 1;
        this.game.factor_slow_gravity = 1;

        //cosas de movil
        if (!this.game.device.desktop){
            this.movil_izq = this.add.sprite(5,580,'movil_izq');
            this.movil_der = this.add.sprite(150,580,'movil_der');
            this.movil_arr = this.add.sprite(510,580,'movil_arr');
            this.movil_pika = this.add.sprite(655,580,'movil_pika');
            this.movil_izq.alpha = 0.5;
            this.movil_der.alpha = 0.5;
            this.movil_arr.alpha = 0.5;
            this.movil_pika.alpha = 0.5;

            //clicando en cosas
            this.movil_izq.inputEnabled = true;
            this.movil_der.inputEnabled = true;
            this.movil_arr.inputEnabled = true;
            this.movil_pika.inputEnabled = true;


            //eventos de los botones movil
            this.movil_izq.input.sprite.events.onInputDown.add(this.movil_vete_izquierda, this);
            this.movil_der.input.sprite.events.onInputDown.add(this.movil_vete_derecha, this);
            this.movil_arr.input.sprite.events.onInputDown.add(this.movil_vete_arriba, this);
            this.movil_pika.input.sprite.events.onInputDown.add(this.movil_vete_pika, this);
            
            this.movil_izq.input.sprite.events.onInputUp.add(this.movil_vete_izquierda_out, this);
            this.movil_der.input.sprite.events.onInputUp.add(this.movil_vete_derecha_out, this);
            this.movil_arr.input.sprite.events.onInputUp.add(this.movil_vete_arriba_out, this);
            this.movil_pika.input.sprite.events.onInputUp.add(this.movil_vete_pika_out, this);

            //SLOW MOTION!!
            this.game.factor_slow_velocity = 0.8;
            this.game.factor_slow_gravity = 0.64;
        }


        //AUDIO
        this.acho_audio2 =  this.game.add.audio('acho');
        this.explosion_sound2 =  this.game.add.audio('explosion_sound');


        //Jugadores
        this.game.player = this.add.sprite(32, this.world.height - 250, 'player1');
        this.game.player.anchor.setTo(0.5, 0.5);

        this.game.player2 = this.add.sprite(this.world.width - 52, this.world.height - 250, 'cpu');
        this.game.player2.anchor.setTo(0.5, 0.5);


        this.pelota = this.add.sprite(32, 0, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);

        //Fisica de jugadores y this.pelota
        this.physics.arcade.enable(this.game.player);
        this.physics.arcade.enable(this.game.player2);
        this.physics.arcade.enable(this.pelota);



        //Fisica del jugador
        this.game.player.body.bounce.y = 0;
        this.game.player.body.gravity.y = 800*this.game.factor_slow_gravity;
        this.game.player.body.collideWorldBounds = true;

        this.game.player2.body.bounce.y = 0;
        this.game.player2.body.gravity.y = 800*this.game.factor_slow_gravity;
        this.game.player2.body.collideWorldBounds = true;

        //Fisica de la this.pelota
        this.pelota.body.bounce.y = 0.9;
        this.pelota.body.bounce.x = 0.900;
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.collideWorldBounds = true;
        this.pelota.body.deltaMax = (400,400)

        //animaciones de movimiento
        this.game.player.animations.add('semueve', [0, 1], 7, true);
        this.game.player.animations.add('senfada', [3], 5, true);
        this.game.player.animations.add('salta', [2], 5, true);
        this.game.player2.animations.add('senfada', [0], 5, true);
        this.game.player2.animations.add('semueve', [2, 3], 7, true);
        this.game.player2.animations.add('salta', [1], 5, true);

        //  The score
        //this.scoreText1 = this.add.text(16, 16, '0', { font: '44px Age', fill: "#eaff02", align: "center" });
        //this.scoreText2 = this.add.text(this.world.width - 38, 16, '0', { font: '44px Age', fill: "#eaff02", align: "center" });
        this.scoreText1 = this.add.text(16, 16, '0', { font: '44px ArcadeClassic', fill: "#eaff02", align: "center" });
        this.scoreText2 = this.add.text(this.world.width - 38, 16, '0', { font: '44px ArcadeClassic', fill: "#eaff02", align: "center" });
        this.game.puntos_player1 = 0;
        this.game.puntos_player2 = 0;

        this.scoreText1.text = this.game.puntos_player1;
        this.scoreText2.text = this.game.puntos_player2;
        
        //teclas
        cursors = this.input.keyboard.createCursorKeys();

        //pikas
        superpika = this.input.keyboard.addKey(Phaser.Keyboard.L);
        superpika2 = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        PAUSE = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

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


        
        this.muevederecha = false;
        this.mueveizquierda = false;
        this.muevearriba = false;
        this.mueveabajo = false;
        this.hace_gorrino_tap = false;

        this.game.player2.frame = 1;
        this.game.player.frame = 1;

        this.game.hasperdio = false;
        this.game.unplayer = true;
        this.game.empieza = this.time.now;


        //control para nivel de dificultad
        //this.game.level = 2;

        window.onkeydown = function() {
            if (this.PAUSE.game.input.keyboard.event.keyCode == 27){
                this.PAUSE.game.paused = !this.PAUSE.game.paused;
            }
        }

    },

    movil_vete_izquierda: function () {  
        //console.log("izquierda");
        this.muevederecha = false;
        this.mueveizquierda = true;
        this.movil_izq.alpha = 0.9; 
    },
    movil_vete_derecha: function () {  
       // console.log("dere");
        this.muevederecha = true;
        this.mueveizquierda = false;
        this.movil_der.alpha = 0.9;
    },
    movil_vete_arriba: function () {  
        //console.log("arr");
        this.muevearriba = true;
        this.mueveabajo = false;
        this.movil_arr.alpha = 0.9; 
    },
    movil_vete_pika: function () {  
        //console.log("pij");
        tiempo_gorrino = this.time.now + 400;
        this.hace_gorrino_tap = true;
        this.movil_pika.alpha = 0.9; 
    },

    movil_vete_izquierda_out: function () {  
        this.muevederecha = false;
        this.mueveizquierda = false;
        this.movil_izq.alpha = 0.5; 
    },
    movil_vete_derecha_out: function () {  
        this.muevederecha = false;
        this.mueveizquierda = false;
        this.movil_der.alpha = 0.5;
    },
    movil_vete_arriba_out: function () {  
        this.muevearriba = false;
        this.mueveabajo = false;
        this.movil_arr.alpha = 0.5; 
    },
    movil_vete_pika_out: function () {  
        //tiempo_gorrino = this.time.now + 400;
        this.hace_gorrino_tap = false;
        this.movil_pika.alpha = 0.5; 
    },


    update: function () {


        if (this.game.player.body.y > 450){

            this.game.player.salta = false;
        }
        if (this.game.player2.body.y > 450){

            this.game.player2.salta = false;
        }

        this.sombra1.position.set(this.game.player.body.position.x, this.world.height - 144);
        this.sombra2.position.set(this.game.player2.body.position.x, this.world.height - 144);
        this.sombra_pelota.position.set(this.pelota.body.position.x, this.world.height - 144);


        this.pelota.angle += this.pelota.body.velocity.x/20;
        //choque de this.pelota con jugador
        this.physics.arcade.collide(this.pelota, this.game.player, this.pika, null, this);
        //pruebas para el cpu player
        this.physics.arcade.collide(this.pelota, this.game.player2, this.pika3, null, this);
        
        //choque de jugadores con cosas
        this.physics.arcade.collide(this.game.player, platforms);
        this.physics.arcade.collide(this.game.player2, platforms);

        //choque de this.pelota con cosas
        this.physics.arcade.collide(this.pelota, platforms);

        //console.log("se mueve a la izquierda?"+this.mueveizquierda);
                    

        if (this.punto){
            if(this.time.now > this.enunratico){
                //////console.log(this.physics.arcade._velocity1);
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
                //this.hace_gorrino_tap = false;
            }

            if(this.time.now > (this.game.player.tiempo_gorrino+100)){
                this.game.player.para_gorrino = false;
            }

            //MOVIMIENTOS PLAYER1
            if(superpika.isDown || this.hace_gorrino_tap || superpika2.isDown){
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

            if (cursors.left.isDown || this.mueveizquierda){
                this.mueve("izquierda",this.game.player);
            }
            else if(cursors.right.isDown || this.muevederecha){
                this.mueve("derecha",this.game.player);
            }
            else{
                this.mueve("parao",this.game.player);
            }

            if (cursors.up.isDown || this.muevearriba){
                this.mueve("arriba",this.game.player);
            }


            //Reseteo player2
            if(this.time.now > this.game.player2.tiempo_gorrino){
                this.game.player2.body.velocity.x = 0;
                this.game.player2.body.rotation = 0;
                this.game.player2.hace_gorrino = false;
            }

            //MOVIMIENTO PLAYER2
            /*
            this.nocontroles++;
            if (this.limite_nocontroles != this.nocontroles){
                this.procesa_movimientos_maquina();
            }
            else{
                this.nocontroles = 0;
            }
            */
            this.procesa_movimientos_maquina();



            if(this.pelota.body.position.y > 515){
                //LA PELOTA TOCA EL SUELO
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

    procesapunto: function (pointer) {

        this.explosion_sound2.play("",0,0.5);
        this.explota = this.add.sprite(this.pelota.body.position.x, this.pelota.body.position.y+5, 'explota');
        this.game.player.body.velocity.y = this.game.player.body.velocity.y * 0.2;
        this.game.player2.body.velocity.y = this.game.player2.body.velocity.y * 0.2;
        this.game.player.body.velocity.x = this.game.player.body.velocity.x * 0.2;
        this.game.player2.body.velocity.x = this.game.player2.body.velocity.x * 0.2;
        this.pelota.body.velocity.y = this.pelota.body.velocity.y * 0.2;
        this.pelota.body.velocity.x = this.pelota.body.velocity.x * 0.2;
        this.pelota.body.gravity.y = this.pelota.body.gravity.y*0.4*this.game.factor_slow_gravity;
        if(this.pelota.body.position.x > 390){
            this.game.puntos_player1++;
            this.scoreText1.text = this.game.puntos_player1;
            if (this.game.puntos_player1 >= 10){
                //////console.log("gameover");
                
                this.game.ganador = this.game.player;
                this.game.perdedor = this.game.player2;
                //this.world.remove(this.game.player);
                //this.world.remove(this.game.player2);

                this.state.start('GameOver');
            }
            tiempo_punto = this.time.now;
            this.enunratico = this.time.now + 2500;
            this.quien_empieza = "uno";
            this.punto = true;
            this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;
            //this.empieza("uno");
            
        }
        else{
            this.game.puntos_player2++;
            this.scoreText2.text = this.game.puntos_player2;
            //////console.log(this.game.puntos_player2);
            //this.game.world.worldAlpha = 0.3;
            if (this.game.puntos_player2 >= 10){
                //////console.log("gameover");
                this.game.ganador = this.game.player2;
                this.game.perdedor = this.game.player;
                this.game.hasperdio = true;
                //this.world.remove(this.game.player);
                //this.world.remove(this.game.player2);
                this.state.start('GameOver');
            }
            tiempo_punto = this.time.now;
            this.enunratico = this.time.now + 2500;
            this.quien_empieza = "dos";
            this.punto = true;
            this.muevederecha = false;
            this.mueveizquierda = false;
            this.muevearriba = false;
            this.mueveabajo = false;
            //this.empieza("dos");
        }

    },


    procesa_movimientos_maquina: function () {
        x = this.pelota.body.position.x
        y=515;
        H = (this.pelota.body.position.y-515)*(-1);
        Vx = this.pelota.body.velocity.x
        Vy = this.pelota.body.velocity.y;

        if (this.game.level == 0){
            cuantocorre = 135;
            cuantocorre_gorrino = 300;
            cuanto_tiempo_enfadao = 700;
            cuanto_tiempo_gorrino = 300;
        }
        else if (this.game.level == 1){
            cuantocorre = 125;
            cuantocorre_gorrino = 300;
            cuanto_tiempo_enfadao = 700;
            cuanto_tiempo_gorrino = 300;
        }
        else if (this.game.level == 2){
            cuantocorre = 150;
            cuantocorre_gorrino = 400;
            cuanto_tiempo_enfadao = 800;
            cuanto_tiempo_gorrino = 300;
        }
        
        
        //calcula donde cae
        if (Vy<0){
            Vy = Vy*(-1);
            this.dondecae =x + (Vx)/this.pelota.body.gravity.y * Math.sqrt((2*this.pelota.body.gravity.y*H)+(Vx));
            if (this.dondecae>800){
                this.dondecae = 800 -(this.dondecae-800);
            }
            else if(this.dondecae<0){
                this.dondecae = -(this.dondecae);
            }
        }else{
            //solo calculo donde cae si se mueve abajo(la pelota)
        }

        //si cae en mi campo
        if(this.dondecae > 360){
            //si cae a mi izquierda, me muevo pallá
            if(this.dondecae<this.game.player2.position.x && !this.game.player2.hace_gorrino){
                this.game.player2.body.velocity.x = -cuantocorre*this.game.factor_slow_velocity;
                if (this.time.now > this.game.player2.enfadao_time && this.game.player2.body.velocity.x != 0){
                    this.game.player2.animations.play('semueve');
                }
            }
            //si cae a mi derecha, me muevo palla
            else{
                if (!this.game.player2.hace_gorrino){
                    this.game.player2.body.velocity.x = cuantocorre*this.game.factor_slow_velocity;
                    if (this.time.now > this.game.player2.enfadao_time && this.game.player2.body.velocity.x != 0){
                        this.game.player2.animations.play('semueve');
                    }
                }
            }
            //si va a caer cerca, salto y me enfado
            if(this.dondecae-this.game.player2.position.x < 70 && x>460 && this.game.player2.position.y > 500 && (Vx<120&&Vx>-120) && this.pelota.position.y<400){
                this.game.player2.body.velocity.y = -550*this.game.factor_slow_velocity;
                this.game.player2.enfadao = true;
                this.game.player2.animations.play('senfada');
                this.game.player2.enfadao_time = this.time.now + cuanto_tiempo_enfadao;

            }

            //si pongo aqui el gorrino, no se equivoca
        }
        else{
            //paradico si no cae en mi campo
            this.game.player2.animations.stop();
            this.game.player2.frame = 3;
        }


        //a veces no hay donde cae y la lia la maquina, jejej
        if (this.game.level != 0){
            if(H<200){
                if(this.dondecae<this.game.player2.position.x){
                    if(this.game.player2.position.x - this.dondecae > 130 && x>460 && !this.game.player2.hace_gorrino){
                        //this.acho_audio2.play();
                        this.game.player2.body.velocity.x = -cuantocorre_gorrino*this.game.factor_slow_velocity;
                        this.game.player2.body.rotation = -90;
                        this.game.player2.tiempo_gorrino = this.time.now + cuanto_tiempo_gorrino;
                        this.game.player2.hace_gorrino=true;
                    }

                }
                else{
                    if(this.dondecae-this.game.player2.position.x > 130 && x>460 && !this.game.player2.hace_gorrino){
                        //this.acho_audio2.play();
                        this.game.player2.body.velocity.x = cuantocorre_gorrino*this.game.factor_slow_velocity;
                        this.game.player2.body.rotation = 90;
                        this.game.player2.tiempo_gorrino = this.time.now + cuanto_tiempo_gorrino;
                        this.game.player2.hace_gorrino=true;
                    }

                }
            }
        }
        

        
        

    },

    mueve: function (adonde, quien) {
        if(quien.hace_gorrino){
            if (adonde == "izquierda" && quien.body.touching.down && !quien.para_gorrino){
                this.acho_audio2.play("",0,0.3);
                quien.body.velocity.x = -400*this.game.factor_slow_velocity;
                quien.body.rotation = -90;
                quien.para_gorrino = true;
            }
            else if (adonde == "derecha" && quien.body.touching.down && !quien.para_gorrino){
                this.acho_audio2.play("",0,0.3);
                quien.body.velocity.x = 400*this.game.factor_slow_velocity;
                quien.body.rotation = 90;
                quien.para_gorrino = true;
            }
        }
        else{
            if (adonde == "izquierda" && quien.position.x > quien.limite_izquierda){
                quien.body.velocity.x = -150*this.game.factor_slow_velocity;
                if (this.time.now > quien.enfadao_time && this.game.player.salta != true){
                    quien.animations.play('semueve');
                }
            }
            else if (adonde == "derecha" && quien.position.x < quien.limite_derecha){
                quien.body.velocity.x = 150*this.game.factor_slow_velocity;
                if (this.time.now > quien.enfadao_time && this.game.player.salta != true){
                    quien.animations.play('semueve');
                }
            }
            else
            {
                if (adonde == "parao" && this.time.now > quien.enfadao_time && this.game.player.salta != true){
                    quien.animations.stop();
                    quien.frame = 0;
                }
            }

            if(adonde == "arriba" && !quien.hace_gorrino && quien.body.touching.down){
                quien.body.velocity.y = -550*this.game.factor_slow_velocity;
                this.game.player.salta = true;
                quien.animations.play('salta');
                
            }

        }

    },

    pika: function () {

        if (this.punto){
            return true;
        }
        //////console.log(this.pelota.body.newVelocity.y);
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.velocity.y = -600*this.game.factor_slow_velocity;
        //this.pelota.body.velocity.y = this.pelota.body.velocity.y * (-7);
        pos_pelota = this.pelota.body.position.x;
        pos_player = this.game.player.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < this.game.player.enfadao_time && this.game.player.enfadao){
            this.acho_audio2.play("",0,0.3);


            if ((cursors.right.isDown || cursors.left.isDown || this.mueveizquierda || this.muevederecha || !this.game.device.desktop) 
                && (!cursors.up.isDown && !this.muevearriba)  && (!cursors.down.isDown && !this.mueveabajo))
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 800*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((cursors.right.isDown || this.muevederecha)  && (cursors.up.isDown || this.muevearriba) 
                && (!cursors.down.isDown && !this.mueveabajo)){
                this.pelota.body.velocity.y = -800*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 800*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((cursors.left.isDown || this.mueveizquierda) && (cursors.up.isDown || this.muevearriba) 
                && (!cursors.down.isDown && !this.mueveabajo)){
                this.pelota.body.velocity.y = -800*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = -800*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((cursors.right.isDown || cursors.left.isDown || this.mueveizquierda || this.muevederecha) 
                && (!cursors.up.isDown && !this.muevearriba) && (cursors.down.isDown || this.mueveabajo)){
                this.pelota.body.velocity.y = 800*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 1000*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((!cursors.right.isDown && !this.muevederecha) && (!cursors.left.isDown && !this.mueveizquierda) 
                && (!cursors.up.isDown && !this.muevearriba) && (cursors.down.isDown || this.mueveabajo)){
                this.pelota.body.velocity.y = 800*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 300*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((!cursors.right.isDown && !this.muevederecha) && (!cursors.left.isDown && !this.muevearriba)
                && (!cursors.up.isDown && !this.muevearriba) && (!cursors.down.isDown && !this.mueveabajo)){
                this.pelota.body.velocity.y = -100*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 300*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
            else if((!cursors.right.isDown && !this.muevederecha) && (!cursors.left.isDown && !this.mueveizquierda) 
                && (cursors.up.isDown || this.muevearriba) && (!cursors.down.isDown && !this.mueveabajo)){
                this.pelota.body.velocity.y = -1000*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 300*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
            }
        }

    },


    pika3: function () {
        if (this.punto){
            return true;
        }

        if (this.game.level == 0){
            this.factor_facilidad_x = 0.6;
            this.factor_facilidad_y = 0.8;
        }
        else if (this.game.level == 1){
            this.factor_facilidad_x = 0.9;
            this.factor_facilidad_y = 0.9;
        }
        else if (this.game.level == 2){
            this.factor_facilidad_x = 1;
            this.factor_facilidad_y = 1;
        }

        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.velocity.y = -600*this.game.factor_slow_velocity;
        pos_pelota = this.pelota.body.position.x;
        pos_player = this.game.player2.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < this.game.player2.enfadao_time && this.game.player2.enfadao){
            //this.acho_audio2.play();
           quehago = Math.floor(Math.random() * 4);
           if (quehago == 0)
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = -800*this.factor_facilidad_x*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.factor_facilidad_x*this.game.factor_slow_gravity;
            }
            else if(quehago == 1){
                this.pelota.body.velocity.y = -800*this.factor_facilidad_y*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 800*this.factor_facilidad_x*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.factor_facilidad_x*this.game.factor_slow_gravity;
            }
            else if(quehago == 2){
                this.pelota.body.velocity.y = -800*this.factor_facilidad_y*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = -800*this.factor_facilidad_x*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.factor_facilidad_x*this.game.factor_slow_gravity;
            }
            else if(quehago == 3){
                this.pelota.body.velocity.y = 800*this.factor_facilidad_y*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = -1000*this.factor_facilidad_x*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1400*this.factor_facilidad_x*this.game.factor_slow_gravity;
            }
            /*
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
            }*/
        }
    },

    empieza: function (quien) {
        //////console.log("cocotu")
        this.game.player2.frame = 1;
        this.game.player.frame = 1;
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.game.player.body.position.x = 32;
        this.game.player.body.position.y = this.world.height - 350;
        this.game.player.body.velocity.x = 0;
        this.game.player.body.velocity.y = 0;

        this.game.player2.body.position.x = this.world.width - 52;
        this.game.player2.body.position.y = this.world.height - 350;
        this.game.player2.body.velocity.x = 0;
        this.game.player2.body.velocity.y = 0;

        this.pelota.body.position.y = 0;
        this.pelota.body.velocity.x = 0;
        this.pelota.body.velocity.y = 0;
        if (quien == "uno"){
            this.pelota.body.position.x = 32;
        }
        else{
            this.pelota.body.position.x = this.world.width - 52;
        }
    }

};
