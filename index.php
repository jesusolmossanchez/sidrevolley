<?php
	session_start();
	$token = md5(rand(1000,9999));
	$_SESSION['token'] = $token;
	$_SESSION['puntos_registrados'] = 0;
	$_SESSION['suebeajax1'] = 0;
	$_SESSION['suebeajax2'] = 0;
	$_SESSION['winner_cambiado'] = 0;

?>
<!DOCTYPE HTML>
<html style="margin:0 !important;">
<head>
	<meta charset="UTF-8" />
	<title>Dude Volley</title>
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="js/phaser.min.js"></script>
	<script src="src/out.min.js"></script>
	<!-- Sin minificar
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
	-->
	
	
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.Jcrop.js"></script>
    <link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css" />
    <script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-66368910-2', 'auto');
		ga('send', 'pageview', '/Index');

	</script>
</head>

<body style="background-color:rgb(0,0,0); margin:0 !important;">
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
	    <input type="hidden" name="token" id="token" value="<?=$token?>">
	    <input id="inputsubefoto" type="submit" value="Aceptar" name="submit" style="display:none">
	</form>

	<div id="contiene_foto_subida" style="max-width:600px;">
	    <div id="explica_sube"><span>Selecciona</span><span>el</span><span>area</span><span>a</span><span>recortar</span></div>
	</div>
	<div id="contiene_mandapuntos" style="">
		<form id="mandapuntos">
			<p id="texto_fin"></p>
			<p id="puntos"></p>
			<p id="envia_tus_puntos">Guarda  tu  puntuacion:</p>
			<input id="inputtunombre" type="text" name="tu_nombre" maxlength="10"/>
			<input type="hidden" name="token" id="token" value="<?=$token?>">
			<button id="envia_tu_nombre"> Enviar </button> 
		</form>
		<ul id="contiene_clasificacion">
			<!--<dl id="titulo_nivel"></dl>-->
		</ul>
	</div>

	<script type="text/javascript">

	window.onload = function() {

		window.token = '<?php echo $token;?>';
		//creo el objeto del juego
		var game = new Phaser.Game(800, 685, Phaser.AUTO, 'gameContainer');

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
		game.state.add('Entrenamiento', DudeVolley.Entrenamiento);
		game.state.add('GameOver', DudeVolley.GameOver);

		//empieza
		game.state.start('Boot');


	};

	</script>
	<footer style="width:100%; text-align:center; font-size: 1.5vw;"><a href="mailto:jesusolmossanchez@gmail.com" style="color:#f5f823; text-decoration:none;">jesusolmossanchez@gmail.com</a> </footer>
	</body>
</html>