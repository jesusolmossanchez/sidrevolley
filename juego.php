<!DOCTYPE HTML>
<html style="margin:0 !important;">
<head>
	<meta charset="UTF-8" />
	<title>Sidrería Volley</title>
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
	<script src="js/GameOver.js"></script>
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
    <label for="fileToUpload">
    	<div id="fakeinput">Sube tu foto</div>
    </label>
    <input type="file" name="fileToUpload" id="fileToUpload" style="display:none"><br/><br/>
    <input id="inputsubefoto" type="submit" value="Aceptar" name="submit" style="display:none">
</form>
<div id="contiene_foto_subida" style="max-width:500px;">
    
</div>
<div id="contiene_mandapuntos" style="">

		<form id="mandapuntos">
			<p id="texto_fin"></p>
			<p id="puntos"></p>
			<p id="envia_tus_puntos">Envía tu puntuación:</p>
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
	var game = new Phaser.Game(800, 700, Phaser.AUTO, 'gameContainer');

	//añado las 'pantallas'
	game.state.add('Boot', DudeVolley.Boot);
	game.state.add('Preloader', DudeVolley.Preloader);
	game.state.add('PreMainMenu', DudeVolley.PreMainMenu);
    game.state.add('LevelMenu', DudeVolley.LevelMenu);
	game.state.add('SubePlayer', DudeVolley.SubePlayer);
	game.state.add('MainMenuOnePlayer', DudeVolley.MainMenuOnePlayer);
	game.state.add('MainMenu', DudeVolley.MainMenu);
	game.state.add('Game', DudeVolley.Game);
	game.state.add('GameOnePlayer', DudeVolley.GameOnePlayer);
	game.state.add('GameOver', DudeVolley.GameOver);

	//empieza
	game.state.start('Boot');


};

</script>

</body>
</html>