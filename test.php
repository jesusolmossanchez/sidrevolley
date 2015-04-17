<?php
	$dif = intval($_POST['diferencia']);
	$tiempo = intval($_POST['tiempo']);
	$registro = array(
				'nombre' => $_POST['nombre'],
				'diferencia' => $dif,
				'puntuacion' => $_POST['puntuacion'],
				'tiempo' => $tiempo
			);

	// Configuration
	$dbhost = 'localhost';
	$dbname = 'registrapuntos';

	$m = new Mongo("mongodb://$dbhost");
	// Connect to test database
	$db = $m->$dbname;

	// Get the users collection
	$punticos = $db->puntuaciones;
	// Insert this new document into the users collection
	$punticos->save($registro);
	
	$cursor = $punticos->find()->sort(array('diferencia' => -1, 'tiempo' => 1))->limit(10);
	foreach ( $cursor as $valor )
	{
		$devuelve[] = $valor;
	    
	}
	$encoded = json_encode($devuelve);
	print_r($encoded);


	
