



DudeVolley.Entrenamiento = function (game) {

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

DudeVolley.Entrenamiento.prototype = {

    preload: function(){
        ga('send', 'pageview', '/Entrenamiento');
        this.tip1 = this.add.sprite(20, 20, 'tip1');
        this.tip2 = this.add.sprite(220, 20, 'tip2');
        this.tip3 = this.add.sprite(420, 20, 'tip3');
        this.tip4 = this.add.sprite(620, 20, 'tip4');
        
        this.tip1.alpha = 0.5;
        this.tip2.alpha = 0.5;
        this.tip3.alpha = 0.5;
        this.tip4.alpha = 0.5;

        this.volver = this.add.sprite(650, 220, 'volver');
        this.volver.inputEnabled = true;
        this.volver.input.sprite.events.onInputDown.add(this.volver_a_jugar, this);
    },

    volver_a_jugar: function () {
        location.reload();
    },

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

        //Red
        var red = platforms.create(390, this.world.height-320, 'red');
        red.body.immovable = true;

        //  Scale it to fit the width of the this (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        ///this.world.height
        this.sombra1 = this.add.sprite(32, this.world.height-200, 'sombra');
        this.sombra_pelota = this.add.sprite(32, this.world.height-200, 'sombra');
        this.sombra2 = this.add.sprite(this.world.width - 52, this.world.height-200, 'sombra');
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
            this.movil_izq = this.add.sprite(5,this.world.height-120,'movil_izq');
            this.movil_der = this.add.sprite(150,this.world.height-120,'movil_der');
            this.movil_arr = this.add.sprite(510,this.world.height-120,'movil_arr');
            this.movil_pika = this.add.sprite(655,this.world.height-120,'movil_pika');
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

        Player1 = new Player('player1', this, "soy_yo");
        Player1.es_entreno();

        this.pelota = this.add.sprite(32, 0, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);

        //Fisica de jugadores y this.pelota
        //this.physics.arcade.enable(Player2.sprite);
        this.physics.arcade.enable(this.pelota);

        //Fisica de la this.pelota
        this.pelota.body.bounce.y = 0.9;
        this.pelota.body.bounce.x = 0.900;
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.collideWorldBounds = true;
        this.pelota.body.deltaMax = (400,400)

        //animaciones de movimiento
        
        //teclas
        cursors = this.input.keyboard.createCursorKeys();

        //pikas
        superpika = this.input.keyboard.addKey(Phaser.Keyboard.L);
        superpika2 = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        PAUSE = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.enpausa = false;

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

        if (typeof Player1 !== 'undefined'){
            if (Player1.sprite.body.y > this.world.height-250){
                this.tip2.alpha = 0.5;
                Player1.sprite.salta = false;
            }
            this.sombra1.position.set(Player1.sprite.body.position.x, this.world.height - 144);
            this.physics.arcade.collide(this.pelota, Player1.sprite, this.pika, null, this);
            this.physics.arcade.collide(Player1.sprite, platforms);
        }
        
        this.sombra_pelota.position.set(this.pelota.body.position.x, this.world.height - 144);

        this.pelota.angle += this.pelota.body.velocity.x/20;
        //choque de this.pelota con jugador

        this.physics.arcade.collide(this.pelota, platforms);

        

            
        if (typeof Player1 !== 'undefined'){
            //Reseteo gorrino1
            if(this.time.now > (Player1.sprite.tiempo_gorrino - 100)){
                Player1.sprite.body.velocity.x = 0;
                Player1.sprite.body.rotation = 0;
                Player1.sprite.hace_gorrino = false;
                //this.hace_gorrino_tap = false;
                this.tip3.alpha = 0.5;
            }

            if(this.time.now > (Player1.sprite.tiempo_gorrino+100)){
                Player1.sprite.para_gorrino = false;
            }

            //MOVIMIENTOS PLAYER1
            if(superpika.isDown || this.hace_gorrino_tap || superpika2.isDown){
                if (!Player1.sprite.body.touching.down && !Player1.sprite.para_gorrino){
                    Player1.sprite.enfadao = true;
                    Player1.sprite.animations.play('senfada');
                    Player1.sprite.enfadao_time = this.time.now + 500;
                }
                else if (!Player1.sprite.para_gorrino){
                    Player1.sprite.hace_gorrino=true;
                    Player1.sprite.tiempo_gorrino = this.time.now + 400;
                }
            }

            if (cursors.left.isDown || this.mueveizquierda){
                Player1.mueve("izquierda");
            }
            else if(cursors.right.isDown || this.muevederecha){
                Player1.mueve("derecha");
            }
            else{
                Player1.mueve("parao");
            }

            if (cursors.up.isDown || this.muevearriba){

                Player1.mueve("arriba");
            } 
        }


    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    pika: function () {

        if (this.pelota.body.position.y > (Player1.sprite.body.position.y + 60)){
            return true;
        }

        if ((this.pelota.body.position.y > 450)){
            this.pelota.body.velocity.y = -600*this.game.factor_slow_velocity;
        }

        //////console.log(this.pelota.body.newVelocity.y);
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.velocity.y = -600*this.game.factor_slow_velocity;
        //this.pelota.body.velocity.y = this.pelota.body.velocity.y * (-7);
        pos_pelota = this.pelota.body.position.x;
        pos_player = Player1.sprite.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < Player1.sprite.enfadao_time && Player1.sprite.enfadao){
            //this.acho_audio2.play("",0,0.3);
            this.tip4.alpha = 1;

            if ((cursors.right.isDown || cursors.left.isDown || this.mueveizquierda || this.muevederecha || !this.game.device.desktop) 
                && (!cursors.up.isDown && !this.muevearriba)  && (!cursors.down.isDown && !this.mueveabajo))
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = 800*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1500*this.game.factor_slow_gravity;
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

    }

};


