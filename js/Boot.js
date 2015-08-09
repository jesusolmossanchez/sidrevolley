var BasicGame = {};

BasicGame.Boot = function (game) {
    
};

BasicGame.Boot.prototype = {

    init: function () {


        //maximo de punteros(pongo un numero alto porque a veces se queda punki)
        this.input.maxPointers = 9;

        //cuando no está activa la pestaña, el juego se pausa
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //si escritorio
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //si no escritotio

            //cosas del escalado
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.game.scale.setShowAll();
            this.game.scale.refresh();

            //refresco al cambiar orientacion
            this.scale.leaveIncorrectOrientation.add(this.rescale, this);
            this.scale.enterIncorrectOrientation.add(this.rescale, this);
        }

    },
    rescale : function () {
        this.game.scale.setShowAll();
        this.game.scale.refresh();
    },

    preload: function () {

        //imagen para empezar y barra de progreso
        //this.load.image('titulo', 'assets/titulo1_cargando.png');
        this.load.image('titulo', 'assets/dude_volley_title.png');
        //this.load.image('preloaderBar', 'assets/preloader.png');
        this.load.image('preloaderBar', 'assets/cargando_dude.png');

    },

    create: function () {

        //lanza precarga
        this.state.start('Preloader');

    }

};
