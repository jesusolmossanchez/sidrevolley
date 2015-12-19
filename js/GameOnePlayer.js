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

        //alias para el objeto del juego
        eljuego = this;





        /***********************************************************************
        ***********************************************************************
                        START -- MANEJO DE SOCKET
        ***********************************************************************
        ***********************************************************************/



        //conecto con socket
        socket = io.connect("http://192.168.0.198:8080", {port: 8080, transports: ["websocket"]});


        //incluir en el index: https://raw.githubusercontent.com/socketio/socket.io-p2p/master/socketiop2p.min.js
        p2p = new P2P(socket);

        p2p.on('ready', function(){
          p2p.usePeerConnection = true;
          console.log(p2p);
          p2p.emit('peer-obj', { peerId: peerId });
        })


        //llamo a la función que maneja los mensajes recibidos
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

                //TODO -- EN LA CREACIÓN MOSTRAR UNA CAPA ENCIMA DEL CAVAS
                //EN ESA CAPA SE PEDIRÁ UN NOMBRE Y HABRÁ UN ENLACE PARA 'RETAR A UN AMIGO'
                //UNA VEZ ENVIADO SE DEBE EMITIR ALGO COMO:
                //$("#socket_overlay").show();
                //$("#soy_el_uno").show();
                ////$("#socket_empezar").click(function(){
                //     Player1.nombre = $("#socket_nombre").val();
                //     socket.emit("player_ready", {nombre: Player1.nombre, id: Player1.id});
                //});


            }
            //ELEMINAR?? NO HARÍA FALTA, NO? NUNCA ENTRA AQUI?
            else{
                OTROPLAYER = new Player('player1', eljuego, data);
            }

        };

        function onNewPlayer2(data) {
            //Me viene uno nuevo, lo creo
            console.log("New player2 connected: "+data);

            //Si es el segundo jugador que ha entrado en el juego, no tiene definido Player 1, así que lo creo
            //En la posición derecha de la pantalla 
            if (typeof Player1 === 'undefined'){
                Player1 = new Player('cpu', eljuego, data);

                //TODO -- EN LA CREACIÓN MOSTRAR UNA CAPA ENCIMA DEL CAVAS
                //EN ESA CAPA SE PEDIRÁ UN NOMBRE, UNA VEZ ENVIADO SE DEBE EMITIR ALGO COMO:
                //$("#socket_overlay").show();
                //$("#socket_empezar").click(function(){
                //     Player1.nombre = $("#socket_nombre").val();
                //     socket.emit("player_ready", {nombre: Player1.nombre, id: Player1.id});
                //});

            }
            
            //Creo el OTROPLAYER en el lugar correspondiente
            if (data.id !== Player1.id && typeof OTROPLAYER === 'undefined'){
                if (Player1.soyplayer1 == false){
                    ruta = "player1";
                }
                else{
                    ruta = 'cpu';
                }
                OTROPLAYER = new Player(ruta, eljuego, data);
            }
            
        };

        function onYaestaPlayer(data) {

            //TODO -- QUITO LA CAPA ENCIMA DEL CANVAS Y EL JUEGO PUEDE EMPEZAR
            //
            //TODO -- PONGO
            //Dependiendo de quien soy yo
            //Pillar dat[0].id y comprobar con Player1.id
            //this.scoreText1.text = data[0].nombre + "-" + this.game.puntos_player1;
            //this.scoreText2.text = data[1].nombre + "-" + this.game.puntos_player2;
            //$("#socket_overlay").hide();

            //Puedo empezar... empiezo
            console.log("palante!!");
            eljuego.empieza("uno");
        };

        function onSaMovio(data) {
            if (data.id === Player1.id){
                //el otro se mueve y lo muevo
                if (data.dir == "derecha"){
                    Player1.mueve("derecha");
                }
                if (data.dir == "izquierda"){
                    Player1.mueve("izquierda");
                }
                if (data.dir == "arriba"){
                    Player1.mueve("arriba");   
                }
                if (data.dir == "parao"){
                    Player1.mueve("parao");
                }
            }
            else{
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


        function onTeclas(data) {
            if (data.id === Player1.id){
                if (data.R == "1"){
                    Player1.mueve("derecha");
                }
                if (data.L == "1"){
                    Player1.mueve("izquierda");
                }
                if (data.U == "1"){
                    Player1.mueve("arriba");   
                }
                if (data.P == "1"){
                    Player1.mueve("parao");
                }
            }
            else{
                if (data.R == "1"){
                    OTROPLAYER.mueve("derecha");
                }
                if (data.L == "1"){
                    OTROPLAYER.mueve("izquierda");
                }
                if (data.U == "1"){
                    OTROPLAYER.mueve("arriba");   
                    OTROPLAYER.pulsa_arriba = true;
                }
                if (data.P == "1"){
                    OTROPLAYER.mueve("parao");
                }
                if (data.D == "1"){
                    OTROPLAYER.pulsa_abajo = true;
                }
            }
        };


        function onSituaPelota(data) {
            if (!Player1.soyplayer1){
                //console.log("recivo",eljuego.time.now);
                
                eljuego.pelota.angle = data.angulo;
                
                //if ((eljuego.pelota.x > data.x + 30) || (eljuego.pelota.x < data.x - 30)){
                    eljuego.pelota.x = data.x;
               // }
                //if ((eljuego.pelota.y > data.y + 30) || (eljuego.pelota.y < data.y - 30)){
                    eljuego.pelota.y = data.y;
                //}

               
                
                //tween = eljuego.add.tween(eljuego.pelota).to( { x: [ eljuego.pelota.x, data.x ], y: [ eljuego.pelota.y, data.y ] }, 5, Phaser.Easing.Linear.None, true);
            }
        };

        function onSituajugador1(data) {
            if (!Player1.soyplayer1){
                //console.log("recivo",eljuego.time.now);
                //eljuego.pelota.angle = data.angulo;
                if ((OTROPLAYER.sprite.x > data.P1x+40) || (OTROPLAYER.sprite.x < data.P1x-40)){
                    OTROPLAYER.sprite.x = data.P1x;
                    tween = eljuego.add.tween(OTROPLAYER.sprite).to( { x: [ OTROPLAYER.sprite.x, data.P1x ] }, 2, Phaser.Easing.Linear.None, true);
                }   
               /* if ((OTROPLAYER.sprite.y > data.P1y+40) || (OTROPLAYER.sprite.y < data.P1y-40)){
                    OTROPLAYER.sprite.y = data.P1y;
                } 
                */  
                if ((Player1.sprite.x > data.P2x+40) || (Player1.sprite.x < data.P2x-40)){
                    Player1.sprite.x = data.P2x;
                    tween2 = eljuego.add.tween(Player1.sprite).to( { x: [ Player1.sprite.x, data.P2x ] }, 2, Phaser.Easing.Linear.None, true);
                } 
                /*
                if ((Player1.sprite.y > data.P2y+40) || (Player1.sprite.y < data.P2y-40)){
                    Player1.sprite.y = data.P2y;
                }  */ 
                
            }
        };

        function onEnfadao2(){
            OTROPLAYER.sprite.enfadao = true;
            OTROPLAYER.sprite.animations.play('senfada');
            OTROPLAYER.sprite.enfadao_time = eljuego.time.now + 500;
        }
        function onHacegorrino2(){
            OTROPLAYER.sprite.hace_gorrino=true;
            OTROPLAYER.sprite.tiempo_gorrino = eljuego.time.now + 400;
        }
        function onTeclaspika2(data){
            if(data.U == 1){
                if(data.L == 1){
                    quehaceel2 = 7;
                }
                else if(data.R == 1){
                    quehaceel2 = 9;
                }
                else{
                    quehaceel2 = 8;
                }
            }
            else if(data.D == 1){
                if(data.L == 1){
                    quehaceel2 = 1;
                }
                else if(data.R == 1){
                    quehaceel2 = 2;
                }
                else{
                    quehaceel2 = 3;
                }
            }
            else{
                if(data.L == 1){
                    quehaceel2 = 4;
                }
                else if(data.R == 1){
                    quehaceel2 = 6;
                }
                else{
                    quehaceel2 = 5;
                }
            }
        }


        function onRemovePlayer(data) {

        };

        //manejador de eventos
        function setEventHandlers() {
            // Socket connection successful
            socket.on("connect", onSocketConnected);
            // Socket disconnection
            socket.on("disconnect", onSocketDisconnect);
            // New player message received
            socket.on("new player", onNewPlayer);
            // New player message received
            socket.on("new player2", onNewPlayer2);
            // Player move message received
            socket.on("samovio", onSaMovio);
            socket.on("recibeteclas", onTeclas);
            // Player move message received
            socket.on("situapelota", onSituaPelota);
            socket.on("situajugador1", onSituajugador1);
            p2p.on("posicion pelota", onSituaPelota);
            p2p.on("posicion jugador1", onSituajugador1);


            p2p.on("enfadao2", onEnfadao2);
            p2p.on("hacegorrino2", onHacegorrino2);
            p2p.on("teclaspika", onTeclaspika2);





            // Player removed message received
            socket.on("remove player", onRemovePlayer);
            // Player removed message received
            socket.on("ya estamos todos", onYaestaPlayer);
        };


        /***********************************************************************
        ***********************************************************************
                        END -- MANEJO DE SOCKET
        ***********************************************************************
        ***********************************************************************/

        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


         //Inicializo la fisica del juego
        this.physics.startSystem(Phaser.Physics.ARCADE);



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




        /***********************************************************************
        ***********************************************************************
                        START -- ELEMENTOS VISUALES FIJOS
        ***********************************************************************
        ***********************************************************************/

        //fondo
        this.add.sprite(0, 0, 'sky');

        //Suelo
        platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.world.height - 134, 'ground');
        //  Scale it to fit the width of the this (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        //Red
        var red = platforms.create(390, this.world.height-320, 'red');
        red.body.immovable = true;
        //Sombras
        this.sombra1 = this.add.sprite(32, this.world.height-200, 'sombra');
        this.sombra_pelota = this.add.sprite(32, this.world.height-200, 'sombra');
        this.sombra2 = this.add.sprite(this.world.width - 52, this.world.height-200, 'sombra');
        this.sombra1.alpha = 0.5;
        this.sombra2.alpha = 0.5;
        this.sombra_pelota.alpha = 0.2;
        //marcadores
        this.scoreText1 = this.add.text(16, 16, '0', { font: '44px ArcadeClassic', fill: "#eaff02", align: "center" });
        this.scoreText2 = this.add.text(this.world.width - 38, 16, '0', { font: '44px ArcadeClassic', fill: "#eaff02", align: "center" });
        this.game.puntos_player1 = 0;
        this.game.puntos_player2 = 0;
        this.scoreText1.text = this.game.puntos_player1;
        this.scoreText2.text = this.game.puntos_player2;

        /***********************************************************************
        ***********************************************************************
                        END -- ELEMENTOS VISUALES FIJOS
        ***********************************************************************
        ***********************************************************************/




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /***********************************************************************
        ***********************************************************************
                        START -- COSAS PARA EL MOVIL
        ***********************************************************************
        ***********************************************************************/

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
            //this.game.factor_slow_velocity = 0.8;
            //this.game.factor_slow_gravity = 0.64;
        }

        /***********************************************************************
        ***********************************************************************
                        END -- COSAS PARA EL MOVIL
        ***********************************************************************
        ***********************************************************************/





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /***********************************************************************
        ***********************************************************************
                        START -- AUDIO
        ***********************************************************************
        ***********************************************************************/


        //AUDIO
        //this.acho_audio2 =  this.game.add.audio('acho');
        //this.explosion_sound2 =  this.game.add.audio('explosion_sound');
        

        /***********************************************************************
        ***********************************************************************
                        END -- AUDIO
        ***********************************************************************
        ***********************************************************************/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /***********************************************************************
        ***********************************************************************
                        START -- REGISTRO DE INPUTS
        ***********************************************************************
        ***********************************************************************/
        
        //Inputs
        cursors = this.input.keyboard.createCursorKeys();
        //pikas
        superpika = this.input.keyboard.addKey(Phaser.Keyboard.L);
        superpika2 = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        PAUSE = this.input.keyboard.addKey(Phaser.Keyboard.ESC);



        quehaceel2 = 0;

        /***********************************************************************
        ***********************************************************************
                        END -- REGISTRO DE INPUTS
        ***********************************************************************
        ***********************************************************************/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




        /***********************************************************************
        ***********************************************************************
                        START -- INICIALIZACIÓN DE COSAS IMPORTANTES
        ***********************************************************************
        ***********************************************************************/


        this.sincronizapelotatime = this.time.now + 100;

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


        /***********************************************************************
        ***********************************************************************
                        END -- INICIALIZACIÓN DE COSAS IMPORTANTES
        ***********************************************************************
        ***********************************************************************/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        /***********************************************************************
        ***********************************************************************
                        START -- MANEJO DE PAUSA
        ***********************************************************************
        ***********************************************************************/

        this.enpausa = false;
        window.onkeydown = function() {
            if (this.PAUSE.game.input.keyboard.event.keyCode == 27){
                this.PAUSE.game.paused = !this.PAUSE.game.paused;
            }
        }

        /***********************************************************************
        ***********************************************************************
                        END -- MANEJO DE PAUSA
        ***********************************************************************
        ***********************************************************************/

    },




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /***********************************************************************
    ***********************************************************************
                    START -- MOVIMIENTOS MOVIL
    ***********************************************************************
    ***********************************************************************/   

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

    /***********************************************************************
    ***********************************************************************
                    END -- MOVIMIENTOS MOVIL
    ***********************************************************************
    ***********************************************************************/   



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    update: function () {

        
        /***********************************************************************
        ***********************************************************************
                        START -- FISICAS DE LOS JUGADORES
        ***********************************************************************
        ***********************************************************************/  
        if (typeof OTROPLAYER !== 'undefined'){
            if (OTROPLAYER.sprite.body.y > this.world.height-250){
                OTROPLAYER.sprite.salta = false;
            }
            this.sombra2.position.set(OTROPLAYER.sprite.body.position.x, this.world.height - 144);
            if (typeof this.pelota !== 'undefined'){
                this.physics.arcade.collide(this.pelota, OTROPLAYER.sprite, this.pika_OTRO, null, this);
            }
            this.physics.arcade.collide(OTROPLAYER.sprite, platforms);
        }


        if (typeof Player1 !== 'undefined'){
            if (Player1.sprite.body.y > this.world.height-250){
                Player1.sprite.salta = false;
            }
            this.sombra1.position.set(Player1.sprite.body.position.x, this.world.height - 144);
            if (typeof this.pelota !== 'undefined'){
                this.physics.arcade.collide(this.pelota, Player1.sprite, this.pika, null, this);
            }
            this.physics.arcade.collide(Player1.sprite, platforms);
        }
        /***********************************************************************
        ***********************************************************************
                        END -- FISICAS DE LOS JUGADORES
        ***********************************************************************
        ***********************************************************************/

        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        /***********************************************************************
        ***********************************************************************
                        START -- FISICA DE LA PELOTA
        ***********************************************************************
        ***********************************************************************/
        if (typeof this.pelota !== 'undefined' && Player1.soyplayer1){
            this.sombra_pelota.position.set(this.pelota.body.position.x, this.world.height - 144);
            this.pelota.angle += this.pelota.body.velocity.x/20;
            this.physics.arcade.collide(this.pelota, platforms);
            
            p2p.emit("posicion pelota", {x: this.pelota.x, y: this.pelota.y, angulo: this.pelota.angle});
            p2p.emit("posicion jugador1", {P1x: Player1.sprite.x, P2x: OTROPLAYER.sprite.x, P1y: Player1.sprite.y, P2y: OTROPLAYER.sprite.y});
            if (this.time.now > this.sincronizapelotatime){
                //console.log("emito",eljuego.time.now);
                this.sincronizapelotatime = this.time.now + 20;        
            }
        }
        /***********************************************************************
        ***********************************************************************
                        END -- FISICA DE LA PELOTA
        ***********************************************************************
        ***********************************************************************/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /***********************************************************************
        ***********************************************************************
                        START -- MOVIMIENTOS JUGADORES
        ***********************************************************************
        ***********************************************************************/                      

        if (this.punto){
            if(this.time.now > this.enunratico){
                this.punto = false;
                this.explota.kill();
                this.empieza(this.quien_empieza);
            }
        }
        else{

            if (typeof OTROPLAYER !== 'undefined'){
                if(this.time.now > (OTROPLAYER.sprite.tiempo_gorrino - 100)){
                    OTROPLAYER.sprite.body.rotation = 0;
                    OTROPLAYER.sprite.hace_gorrino = false;
                }

                if(this.time.now > (OTROPLAYER.sprite.tiempo_gorrino+100)){
                    OTROPLAYER.sprite.para_gorrino = false;
                }
            }

            if (typeof Player1 !== 'undefined'){
                if(this.time.now > (Player1.sprite.tiempo_gorrino - 100)){
                    Player1.sprite.body.rotation = 0;
                    Player1.sprite.hace_gorrino = false;
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
                        if (!Player1.soyplayer1){
                            p2p.emit("enfadao2");
                        }
                    }
                    else if (!Player1.sprite.para_gorrino){
                        p2p.emit("hacegorrino2");
                        Player1.sprite.hace_gorrino=true;
                        Player1.sprite.tiempo_gorrino = this.time.now + 400;
                    }
                }

                var l = 0;
                var r = 0;
                var u = 0;
                var d = 0;
                var p = 0;
                //TODO -- Emitir las gorrinadas
                if (cursors.left.isDown || this.mueveizquierda){
                    //Player1.ultimomovimiento = "izq";
                    //socket.emit("move player", {id: Player1.id, dir: "izquierda"});
                    l=1;
                }
                else if(cursors.right.isDown || this.muevederecha){
                    //Player1.ultimomovimiento = "der";
                    //socket.emit("move player", {id: Player1.id, dir: "derecha"});
                    r=1;
                }
                else{
                    //Player1.ultimomovimiento = "parao";
                    //socket.emit("move player", {id: Player1.id, dir: "parao"});
                    p=1;
                }

                if (cursors.up.isDown || this.muevearriba){
                    //Player1.ultimomovimiento = "arr";
                    //socket.emit("move player", {id: Player1.id, dir: "arriba"});
                    u=1;
                }
                if(cursors.down.isDown || this.mueveabajo){
                    d=1;
                }



                socket.emit("teclas",{id: Player1.id, L:l, R:r, U:u, D:d, P:p});
                if (!Player1.soyplayer1){
                    p2p.emit("teclaspika",{L:l, R:r, U:u, D:d});
                }
            }
        }

        /***********************************************************************
        ***********************************************************************
                        END -- MOVIMIENTOS JUGADORES
        ***********************************************************************
        ***********************************************************************/  
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /***********************************************************************
    ***********************************************************************
                    START -- COLISION JUGADOR1-PELOTA
    ***********************************************************************
    ***********************************************************************/

    pika: function () {

        if (typeof this.pelota !== 'undefined'){
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
            this.pelota.body.mass= 1;
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

            this.pelota.body.mass= 0.15;
            //console.log(this.time.now)
            //socket.emit("posicion pelota", {x: this.pelota.x, y: this.pelota.y, vx: this.pelota.body.velocity.x, vy:this.pelota.body.velocity.y});
        }
    },


    /***********************************************************************
    ***********************************************************************
                    END -- COLISION JUGADOR1-PELOTA
    ***********************************************************************
    ***********************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /***********************************************************************
    ***********************************************************************
                    START -- COLISION OTROJUGADOR-PELOTA
    ***********************************************************************
    ***********************************************************************/

    pika_OTRO: function () {

        if (typeof this.pelota !== 'undefined'){
            if (this.punto){
                return true;
            }
            
            //////console.log(this.pelota.body.newVelocity.y);
            this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
            this.pelota.body.velocity.y = -600*this.game.factor_slow_velocity;
            //this.pelota.body.velocity.y = this.pelota.body.velocity.y * (-7);
            pos_pelota = this.pelota.body.position.x;
            pos_player = OTROPLAYER.sprite.body.position.x;
            diferencia = pos_pelota - pos_player;
            v_x_pelota = this.pelota.body.velocity.x;
            v_y_pelota = this.pelota.body.velocity.y;
            this.pelota.body.velocity.x = diferencia*3;
            this.pelota.body.mass= 1;

            if (this.time.now < OTROPLAYER.sprite.enfadao_time && OTROPLAYER.sprite.enfadao){
                //this.acho_audio2.play("",0,0.3);
                
                if (quehaceel2 == 4 || quehaceel2 == 6){
                    this.pelota.body.velocity.y = v_y_pelota*0.3*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = -800*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1500*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 9){
                    this.pelota.body.velocity.y = -800*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = 800*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 7){
                    this.pelota.body.velocity.y = -800*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = -800*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 1 || quehaceel2 == 3){
                    this.pelota.body.velocity.y = 800*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = -1000*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 2){
                    this.pelota.body.velocity.y = 800*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = -300*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 5){
                    this.pelota.body.velocity.y = -100*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = 300*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
                else if(quehaceel2 == 8){
                    this.pelota.body.velocity.y = -1000*this.game.factor_slow_velocity;
                    this.pelota.body.velocity.x = -300*this.game.factor_slow_velocity;
                    this.pelota.body.gravity.y = 1400*this.game.factor_slow_gravity;
                }
            }
            //socket.emit("posicion pelota", {x: this.pelota.x, y: this.pelota.y, vx: this.pelota.body.velocity.x, vy:this.pelota.body.velocity.y});
            
            this.pelota.body.mass= 0.15;    
        }
    },

    /***********************************************************************
    ***********************************************************************
                    END -- COLISION OTROJUGADOR-PELOTA
    ***********************************************************************
    ***********************************************************************/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    empieza: function (quien) {
        
        //Creo la pelota
        this.pelota = this.add.sprite(32, 0, 'pelota');
        this.pelota.anchor.setTo(0.5, 0.5);

        //Para el usuario que entró primero(master), se crean las físicas de la pelota
        //Para el otro usuario no se crean, de esa forma, solo se moverá la pelota cuando se lo diga el evento 
        if (Player1.soyplayer1){
            this.physics.arcade.enable(this.pelota);
            this.pelota.body.gravity.y = 0;
            this.pelota.body.bounce.y = 0.9;
            this.pelota.body.bounce.x = 0.900;
            this.pelota.body.gravity.y = 900*this.game.factor_slow_gravity;
            this.pelota.body.collideWorldBounds = true;
            this.pelota.body.deltaMax = (400,400);
            
            this.pelota.body.mass= 0.15;
            //console.log(this.pelota.body.position);
        }
        
    }



};