



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

        eljuego = this;

        socket = io.connect("http://192.168.0.198:8080", {port: 8080, transports: ["websocket"]});
        setEventHandlers();

        function onSocketConnected() {
            console.log("Me conecto");
        };

        function onSocketDisconnect() {
            console.log("Me desconecto");
        };

        function onNewPlayer(data) {
            //Me viene uno nuevo, lo creo
            console.log("New player connected: "+data);
            if (typeof Player1 === 'undefined'){
                Player1 = new Player('player1', eljuego, data);
            }
            else{
                OTROPLAYER = new Player('player1', eljuego, data);
            }
        };

        function onSaMovio(data) {
            if (data.id !== Player1.id){
            console.log(data)
                //el otro se mueve y lo muevo
                if (data.dir == "derecha"){
                    OTROPLAYER.mueve("derecha");
                }
                if (data.dir == "izquierda"){
                    OTROPLAYER.mueve("izquierda");
                }
                if (data.dir == "arriba"){
                    OTROPLAYER.mueve("arriba");   
                }
                if (data.dir == "parao"){
                    OTROPLAYER.mueve("parao");
                }
            }
            
        };

        function onRemovePlayer(data) {

        };

        function setEventHandlers() {
            // Socket connection successful
            socket.on("connect", onSocketConnected);
            // Socket disconnection
            socket.on("disconnect", onSocketDisconnect);
            // New player message received
            socket.on("new player", onNewPlayer);
            // Player move message received
            socket.on("samovio", onSaMovio);
            // Player removed message received
            socket.on("remove player", onRemovePlayer);
        };


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


        ///this.world.height

        //Red
        var red = platforms.create(390, this.world.height-320, 'red');
        red.body.immovable = true;

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


        //AUDIO
        //this.acho_audio2 =  this.game.add.audio('acho');
        //this.explosion_sound2 =  this.game.add.audio('explosion_sound');


        //Jugadores
        //this.game.player = this.add.sprite(32, this.world.height - 250, 'player1');
        //Player1 = new Player('player1', this, "soy_yo");

        //Player2 = new Player('cpu', this);
        
        

        //Player2.sprite = this.add.sprite(this.world.width - 52, this.world.height - 250, 'cpu');
        //Player2.sprite.anchor.setTo(0.5, 0.5);


        this.pelota = this.add.sprite(32, 0, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);

        //Fisica de jugadores y this.pelota
        
        //this.physics.arcade.enable(Player2.sprite);
        this.physics.arcade.enable(this.pelota);



        //Fisica del jugador
        

        //Player2.sprite.body.bounce.y = 0;
        //Player2.sprite.body.gravity.y = 800*this.game.factor_slow_gravity;
        //Player2.sprite.body.collideWorldBounds = true;

        //Fisica de la this.pelota
        this.pelota.body.bounce.y = 0.9;
        this.pelota.body.bounce.x = 0.900;
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        this.pelota.body.collideWorldBounds = true;
        this.pelota.body.deltaMax = (400,400)

        //animaciones de movimiento
        

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
        if (typeof Player2 !== 'undefined'){
            if (Player2.sprite.body.y > this.world.height-250){

                Player2.sprite.salta = false;

            }
            this.sombra2.position.set(Player2.sprite.body.position.x, this.world.height - 144);
            this.physics.arcade.collide(this.pelota, Player2.sprite, this.pika_maquina, null, this);
            this.physics.arcade.collide(Player2.sprite, platforms);
        }
        if (typeof OTROPLAYER !== 'undefined'){
            if (OTROPLAYER.sprite.body.y > this.world.height-250){

                OTROPLAYER.sprite.salta = false;

            }
            this.sombra2.position.set(OTROPLAYER.sprite.body.position.x, this.world.height - 144);
            this.physics.arcade.collide(this.pelota, OTROPLAYER.sprite, this.pika, null, this);
            this.physics.arcade.collide(OTROPLAYER.sprite, platforms);
        }
        if (typeof Player1 !== 'undefined'){
            if (Player1.sprite.body.y > this.world.height-250){

                Player1.sprite.salta = false;
            }
            this.sombra1.position.set(Player1.sprite.body.position.x, this.world.height - 144);
            this.physics.arcade.collide(this.pelota, Player1.sprite, this.pika, null, this);
            this.physics.arcade.collide(Player1.sprite, platforms);
        }
        
        

        
        this.sombra_pelota.position.set(this.pelota.body.position.x, this.world.height - 144);


        this.pelota.angle += this.pelota.body.velocity.x/20;
        //choque de this.pelota con jugador
        
        //pruebas para el cpu player
        
        
        //choque de jugadores con cosas
        

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

            if (typeof OTROPLAYER !== 'undefined'){ 
                //Reseteo gorrino1
                if(this.time.now > (OTROPLAYER.sprite.tiempo_gorrino - 100)){
                    OTROPLAYER.sprite.body.velocity.x = 0;
                    OTROPLAYER.sprite.body.rotation = 0;
                    OTROPLAYER.sprite.hace_gorrino = false;
                    //this.hace_gorrino_tap = false;
                }

                if(this.time.now > (OTROPLAYER.sprite.tiempo_gorrino+100)){
                    OTROPLAYER.sprite.para_gorrino = false;
                }
            }
            if (typeof Player1 !== 'undefined'){
                //Reseteo gorrino1
                if(this.time.now > (Player1.sprite.tiempo_gorrino - 100)){
                    Player1.sprite.body.velocity.x = 0;
                    Player1.sprite.body.rotation = 0;
                    Player1.sprite.hace_gorrino = false;
                    //this.hace_gorrino_tap = false;
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
                    socket.emit("move player", {id: Player1.id, dir: "izquierda"});
                    Player1.mueve("izquierda");
                }
                else if(cursors.right.isDown || this.muevederecha){
                    //this.mueve("derecha",Player1.sprite);
                    socket.emit("move player", {id: Player1.id, dir: "derecha"});
                    Player1.mueve("derecha");
                }
                else{
                    socket.emit("move player", {id: Player1.id, dir: "parao"});
                    Player1.mueve("parao");
                    //this.mueve("parao",Player1.sprite);
                }

                if (cursors.up.isDown || this.muevearriba){
                    socket.emit("move player", {id: Player1.id, dir: "arriba"});
                    Player1.mueve("arriba");
                    //this.mueve("arriba",Player1.sprite);
                }
            }


            if (typeof Player2 !== 'undefined'){
                //Reseteo player2
                if(this.time.now > Player2.sprite.tiempo_gorrino){
                    Player2.sprite.body.velocity.x = 0;
                    Player2.sprite.body.rotation = 0;
                    Player2.sprite.hace_gorrino = false;
                }
                this.procesa_movimientos_maquina();

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



            if(this.pelota.body.position.y > this.world.height-185 && (typeof Player2 !== 'undefined')){
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

        //this.explosion_sound2.play("",0,0.5);
        this.explota = this.add.sprite(this.pelota.body.position.x, this.pelota.body.position.y+5, 'explota');
        Player1.sprite.body.velocity.y = Player1.sprite.body.velocity.y * 0.2;
        Player2.sprite.body.velocity.y = Player2.sprite.body.velocity.y * 0.2;
        Player1.sprite.body.velocity.x = Player1.sprite.body.velocity.x * 0.2;
        Player2.sprite.body.velocity.x = Player2.sprite.body.velocity.x * 0.2;
        this.pelota.body.velocity.y = this.pelota.body.velocity.y * 0.2;
        this.pelota.body.velocity.x = this.pelota.body.velocity.x * 0.2;
        this.pelota.body.gravity.y = this.pelota.body.gravity.y*0.4*this.game.factor_slow_gravity;
        if(this.pelota.body.position.x > 390){
            this.game.puntos_player1++;
            this.scoreText1.text = this.game.puntos_player1;
            if (this.game.puntos_player1 >= 10){
                //////console.log("gameover");
                
                this.game.ganador = Player1.sprite;
                this.game.perdedor = Player2.sprite;
                //this.world.remove(this.game.player);
                //this.world.remove(Player2.sprite);

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
                this.game.ganador = Player2.sprite;
                this.game.perdedor = Player1.sprite;
                this.game.hasperdio = true;
                //this.world.remove(this.game.player);
                //this.world.remove(Player2.sprite);
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
        H = (this.pelota.body.position.y-(this.world.height-185))*(-1);
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
            if(this.dondecae<Player2.sprite.position.x && !Player2.sprite.hace_gorrino){
                Player2.sprite.body.velocity.x = -cuantocorre*this.game.factor_slow_velocity;
                if (this.time.now > Player2.sprite.enfadao_time && Player2.sprite.body.velocity.x != 0){
                    Player2.sprite.animations.play('semueve');
                }
            }
            //si cae a mi derecha, me muevo palla
            else{
                if (!Player2.sprite.hace_gorrino){
                    Player2.sprite.body.velocity.x = cuantocorre*this.game.factor_slow_velocity;
                    if (this.time.now > Player2.sprite.enfadao_time && Player2.sprite.body.velocity.x != 0){
                        Player2.sprite.animations.play('semueve');
                    }
                }
            }
            //si va a caer cerca, salto y me enfado
            if(this.dondecae-Player2.sprite.position.x < 70 && x>440 && (Player2.sprite.position.y > this.world.height-200) && (Vx<120&&Vx>-120) && (this.pelota.position.y<this.world.height-300)){
                Player2.sprite.body.velocity.y = -550*this.game.factor_slow_velocity;
                Player2.sprite.enfadao = true;
                Player2.sprite.animations.play('senfada');
                Player2.sprite.enfadao_time = this.time.now + cuanto_tiempo_enfadao;

            }

            //si pongo aqui el gorrino, no se equivoca
        }
        else{
            //paradico si no cae en mi campo
            Player2.sprite.animations.stop();
            Player2.sprite.frame = 3;
        }


        //a veces no hay donde cae y la lia la maquina, jejej
        if (this.game.level != 0){
            if(H<200){
                if(this.dondecae<Player2.sprite.position.x){
                    if(Player2.sprite.position.x - this.dondecae > 130 && x>440 && !Player2.sprite.hace_gorrino){
                        //this.acho_audio2.play();
                        Player2.sprite.body.velocity.x = -cuantocorre_gorrino*this.game.factor_slow_velocity;
                        Player2.sprite.body.rotation = -90;
                        Player2.sprite.tiempo_gorrino = this.time.now + cuanto_tiempo_gorrino;
                        Player2.sprite.hace_gorrino=true;
                    }

                }
                else{
                    if(this.dondecae-Player2.sprite.position.x > 130 && x>440 && !Player2.sprite.hace_gorrino){
                        //this.acho_audio2.play();
                        Player2.sprite.body.velocity.x = cuantocorre_gorrino*this.game.factor_slow_velocity;
                        Player2.sprite.body.rotation = 90;
                        Player2.sprite.tiempo_gorrino = this.time.now + cuanto_tiempo_gorrino;
                        Player2.sprite.hace_gorrino=true;
                    }

                }
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
        pos_player = Player1.sprite.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < Player1.sprite.enfadao_time && Player1.sprite.enfadao){
            //this.acho_audio2.play("",0,0.3);


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

    },


    pika_maquina: function () {
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
        pos_player = Player2.sprite.body.position.x;
        diferencia = pos_pelota - pos_player;
        v_x_pelota = this.pelota.body.velocity.x;
        v_y_pelota = this.pelota.body.velocity.y;
        this.pelota.body.velocity.x = diferencia*3;
        if (this.time.now < Player2.sprite.enfadao_time && Player2.sprite.enfadao){
            //this.acho_audio2.play();
           quehago = Math.floor(Math.random() * 4);
           if (quehago == 0)
            {
                this.pelota.body.velocity.y = v_y_pelota*0.3*this.game.factor_slow_velocity;
                this.pelota.body.velocity.x = -800*this.factor_facilidad_x*this.game.factor_slow_velocity;
                this.pelota.body.gravity.y = 1500*this.factor_facilidad_x*this.game.factor_slow_gravity;
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
        }
    },

    empieza: function (quien) {
        //////console.log("cocotu")
        Player2.sprite.frame = 1;
        Player1.sprite.frame = 1;
        this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
        Player1.sprite.body.position.x = 32;
        Player1.sprite.body.position.y = this.world.height - 350;
        Player1.sprite.body.velocity.x = 0;
        Player1.sprite.body.velocity.y = 0;

        Player2.sprite.body.position.x = this.world.width - 52;
        Player2.sprite.body.position.y = this.world.height - 350;
        Player2.sprite.body.velocity.x = 0;
        Player2.sprite.body.velocity.y = 0;

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


