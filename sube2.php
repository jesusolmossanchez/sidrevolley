<?php
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES["fileToUpload"]["name"]);
	$extension = end($temp);
	if ((($_FILES["fileToUpload"]["type"] == "image/gif")
	|| ($_FILES["fileToUpload"]["type"] == "image/jpeg")
	|| ($_FILES["fileToUpload"]["type"] == "image/jpg")
	|| ($_FILES["fileToUpload"]["type"] == "image/pjpeg")
	|| ($_FILES["fileToUpload"]["type"] == "image/x-png")
	|| ($_FILES["fileToUpload"]["type"] == "image/png"))
	&& ($_FILES["fileToUpload"]["size"] < 100000)
	&& in_array($extension, $allowedExts))
	{
		if ($_FILES["fileToUpload"]["error"] > 0){
		  echo "Return Code: " . $_FILES["fileToUpload"]["error"] . "<br>";
		}
		else{    
		  $temp = explode(".",$_FILES["fileToUpload"]["name"]);
		  $nombre = uniqid();
			$file_name = $nombre . '.' .$extension;

      move_uploaded_file($_FILES['file']['tmp_name'], "img/" . $file_name);

      if($extension=="jpg" || $extension=="jpeg" )
      {
      $uploadedfile = $file_name;
      $src = imagecreatefromjpeg($uploadedfile);
      }
      else if($extension=="png")
      {
      $uploadedfile = $file_name;
      $src = imagecreatefrompng($uploadedfile);
      }
      else 
      {
      $src = imagecreatefromgif($uploadedfile);
      }

      list($width,$height)=getimagesize($uploadedfile);

      $newwidth=100;
      $newheight=($height/$width)*$newwidth;
      $tmp=imagecreatetruecolor($newwidth,$newheight);

      imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);

      imagejpeg($tmp,$filename,100);

      move_uploaded_file($tmp, "img/" . $file_name);

      //imagedestroy($src);


			
		}
	}
	else{
		echo "Invalid fileToUpload";
	}

?> 

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Aspect Ratio with Preview Pane | Jcrop Demo</title>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />

<script src="js/jquery.min.js"></script>
<script src="js/jquery.Jcrop.js"></script>
<script type="text/javascript">
  jQuery(function($){

    // Create variables (in this scope) to hold the API and image size
    var jcrop_api,
        boundx,
        boundy,


        xsize = $("#target").width(),
        ysize = $("#target").height();

        x1 = xsize/4;
        x2 = xsize/4*3;
        y1 = ysize/8;
        y2 = ysize/8*3;

    
    $('#target').Jcrop({
      aspectRatio: 0.8,
      setSelect:   [ x1, y1, x2, y2 ],
      bgOpacity:   .4,
      onSelect: updateCoords
    });

    function updateCoords(c){
        $('#x').val(c.x);
        $('#y').val(c.y);
        $('#w').val(c.w);
        $('#h').val(c.h);
    };

    function checkCoords(){
        if (parseInt($('#w').val())) return true;
        alert('Select to crop.');
        return false;
    };

    

  });


</script>
<link rel="stylesheet" href="demos/demo_files/main.css" type="text/css" />
<link rel="stylesheet" href="demos/demo_files/demos.css" type="text/css" />
<link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css" />
<style type="text/css">
  .jcrop-holder div{
    border-radius: 50%;
  }


</style>

</head>
<body>

<div class="container">
<div class="row">
<div class="span12">
<div class="jc-demo-box">


  <img src="img/<?= $file_name;?>" id="target" alt="[Jcrop Example]" />


<div class="clearfix"></div>
<form action="juego.php" method="post" onsubmit="return checkCoords();">
    <input type="hidden" id="x" name="x" />
    <input type="hidden" id="y" name="y" />
    <input type="hidden" id="w" name="w" />
    <input type="hidden" id="h" name="h" />
    <input type="hidden" id="nombre" name="nombre" value="<?= $nombre;?>"/>
    <input type="hidden" id="extension" name="extension" value="<?= $extension;?>"/>
    <input type="submit" value="guardar" />
</form>

</div>
</div>
</div>
</div>

</body>
</html>