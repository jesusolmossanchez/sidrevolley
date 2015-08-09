<?php
	$allowedExts = array("image/gif", "image/jpeg", "image/jpg", "image/png");
	$temp = explode(".", $_FILES["fileToUpload"]["name"]);

  $handle = finfo_open(FILEINFO_MIME); 
  $mime_type = finfo_file($handle, $_FILES["fileToUpload"]["tmp_name"]);
  $mime_type = mime_content_type($_FILES["fileToUpload"]["tmp_name"]);

	$mime_type = $mime_type;
  $extension_arr = explode("/", $mime_type);
  $extension = end($extension_arr);

	if (($_FILES["fileToUpload"]["size"] < 10000000)	&& in_array($mime_type, $allowedExts))
	{
		if ($_FILES["fileToUpload"]["error"] > 0){
		  echo "Return Code: " . $_FILES["fileToUpload"]["error"] . "<br>";
		}
		else{    
		  $temp = explode(".",$_FILES["fileToUpload"]["name"]);
		  $nombre = uniqid();
			$file_name = $nombre . '.' .$extension;
			


      if($mime_type=="image/jpg" || $mime_type=="image/jpeg" ){
        $uploadedfile = $_FILES["fileToUpload"]["tmp_name"];
        $src = imagecreatefromjpeg($uploadedfile);
      }
      else if($mime_type=="image/png")      {
        $uploadedfile = $_FILES["fileToUpload"]["tmp_name"];
        $src = imagecreatefrompng($uploadedfile);
      }
      else{
      $src = imagecreatefromgif($uploadedfile);
      }

      list($width,$height)=getimagesize($uploadedfile);

      $newwidth=500;
      $newheight=($height/$width)*$newwidth;
      $tmp=imagecreatetruecolor($newwidth,$newheight);

      imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);

      
      if($mime_type=="image/jpg" || $mime_type=="image/jpeg" ){
        imagejpeg($tmp,$_FILES["fileToUpload"]["tmp_name"]);
      }      
      else if($mime_type=="image/png") {
        imagepng($tmp,$_FILES["fileToUpload"]["tmp_name"]);
      }
      else {
        imagegif($tmp,$_FILES["fileToUpload"]["tmp_name"]);
      }

      move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "img/" . $file_name);

		}
	}
	else{
		echo "Invalid fileToUpload";
	}

?> 
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
      //setSelect:   [ x1, y1, x2, y2 ],
      setSelect:   [ 50, 50, 130, 150 ],
      bgOpacity:   .4,
      touchSupport: true,
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
<div class="container" style="width:auto;">


  <img style="width:auto;" src="img/<?=$file_name;?>" id="target"/>


<div class="clearfix"></div>
<form id="sube_img_cortada" method="post">
    <input type="hidden" id="x" name="x" />
    <input type="hidden" id="y" name="y" />
    <input type="hidden" id="w" name="w" />
    <input type="hidden" id="h" name="h" />
    <input type="hidden" id="nombre" name="nombre" value="<?= $nombre;?>"/>
    <input type="hidden" id="extension" name="extension" value="<?= $extension;?>"/>
    <input id="click_imagen_cortada" type="submit" value="guardar" />
</form>


</div>
