<!DOCTYPE HTML>
<html style="margin:0 !important;">
<head>
	<meta charset="UTF-8" />
	<title>Dude Volley</title>
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="fonts/Age.ttf.woff" />
	<link rel="stylesheet" type="text/css" href="fonts/Age.ttf.svg#Age" />
	<link rel="stylesheet" type="text/css" href="fonts/Age.ttf.eot" />
	<link rel="stylesheet" type="text/css" href="fonts/Age.ttf.eot?#iefix" />
	<link rel="stylesheet" type="text/css" href="fonts/ArcadeClassic.woff" />
	<link rel="stylesheet" type="text/css" href="fonts/ArcadeClassic.svg#ArcadeClassic" />
	<link rel="stylesheet" type="text/css" href="fonts/ArcadeClassic.eot" />
	<link rel="stylesheet" type="text/css" href="fonts/ArcadeClassic.eot?#iefix" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="http://localhost:8080/socket.io/socket.io.js"></script>
	<script src="js/phaser.min.js"></script>
	<script src="js/Boot.js"></script>
	<script src="js/Preloader.js"></script>
	<script src="js/PreMainMenu.js"></script>
    <script src="js/LevelMenu.js"></script>
	<script src="js/SubePlayer.js"></script>
	<script src="js/MainMenuOnePlayer.js"></script>
	<script src="js/MainMenu.js"></script>
	<script src="js/Game.js"></script>
	<script src="js/GameOnePlayer.js"></script>
	<script src="js/Entrenamiento.js"></script>
	<script src="js/GameOver.js"></script>
	<script src="js/Player.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
	

    <script src="js/jquery.Jcrop.js"></script>
    
    <link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css" />
    <style type="text/css">
      .jcrop-holder div{
        border-radius: 50%;
      }


    </style>




</head>
<body style="background-color:rgb(0,0,0); margin:0 !important;">
<!-- <div class="fontPreload" style="font-family: Age;">.</div> -->
<div class="fontPreload" style="font-family: ArcadeClassic;">.</div>
<div id="gameContainer" style="margin:auto;">
	

	
</div>

<form id="subefoto" action="sube2.php" method="post" enctype="multipart/form-data" style="display:none;">
	<div id="explica_sube">
		<span>Sube</span><span>tu</span><span>imagen</span><span>para</span><span>crear</span><span>tu</span><span>jugador.</span>
		<br/>
		<span>Si</span><span>le</span><span>ganas</span><span>a</span><span>la</span><span>maquina,</span>
		<br/>
		<span>juagara</span><span>con</span><span>tu</span><span>imagen</span>

	</div>
    <label for="fileToUpload">
    	<div id="fakeinput"><span>Subir imagen</span>
    		<img src="assets/sube.png" style="margin: -1vw 0 -1vw 2vw; width:15%;"></div>
    </label>
    <input type="file" name="fileToUpload" id="fileToUpload" style="display:none"><br/><br/>
    <input id="inputsubefoto" type="submit" value="Aceptar" name="submit" style="display:none">
</form>
<div id="contiene_foto_subida" style="max-width:600px;">
    <div id="explica_sube"><span>Selecciona</span><span>el</span><span>area</span><span>a</span><span>recortar</span></div>
</div>
<div id="contiene_mandapuntos" style="">

		<form id="mandapuntos">
			<p id="texto_fin"></p>
			<p id="puntos"></p>
			<p id="envia_tus_puntos">Send  your  score:</p>
			<input id="inputtunombre" type="text" name="tu_nombre" maxlength="10"/>
			<button id="envia_tu_nombre"> Enviar </button> 
		</form>
		<ul id="contiene_clasificacion">
			<dl id="titulo_nivel"></dl>
		</ul>
	</div>

<script type="text/javascript">

window.onload = function() {

	//creo el objeto del juego
	var game = new Phaser.Game(800, 685, Phaser.AUTO, 'gameContainer');

	//añado las 'pantallas'
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('PreMainMenu', BasicGame.PreMainMenu);
    game.state.add('LevelMenu', BasicGame.LevelMenu);
	game.state.add('SubePlayer', BasicGame.SubePlayer);
	game.state.add('MainMenuOnePlayer', BasicGame.MainMenuOnePlayer);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('Game', BasicGame.Game);
	game.state.add('GameOnePlayer', BasicGame.GameOnePlayer);
	game.state.add('Entrenamiento', BasicGame.Entrenamiento);
	game.state.add('GameOver', BasicGame.GameOver);

	//empieza
	game.state.start('Boot');


};

</script>

</body>
</html>