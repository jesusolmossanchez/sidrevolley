<?php

	$img_player = $_POST['rutaplayer'];

	//$mueve = rename($img_player,"cpu_player/cpu_player.png");

	$top_image = imagecreatefrompng($img_player);
	$merged_image = "cpu_player/cpu_player.png";
	imageflip($top_image,IMG_FLIP_HORIZONTAL);
	imagepng($top_image, $merged_image);

	echo $mueve;

