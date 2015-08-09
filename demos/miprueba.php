<?php

//crooopp

class CircleCrop
{

    private $src_img;
    private $src_w;
    private $src_h;
    private $dst_img;
    private $dst_w;
    private $dst_h;

    public function __construct($img)
    {
        $this->src_img = $img;
        $this->src_w = imagesx($img);
        $this->src_h = imagesy($img);
        $this->dst_w = imagesx($img);
        $this->dst_h = imagesy($img);
    }

    public function __destruct()
    {
        if (is_resource($this->dst_img))
        {
            imagedestroy($this->dst_img);
        }
    }

    public function display()
    {
        header("Content-type: image/png");
        imagepng($this->dst_img);
        return $this;
    }

    public function reset()
    {
        if (is_resource(($this->dst_img)))
        {
            imagedestroy($this->dst_img);
        }
        $this->dst_img = imagecreatetruecolor($this->dst_w, $this->dst_h);
        imagecopy($this->dst_img, $this->src_img, 0, 0, 0, 0, $this->dst_w, $this->dst_h);
        return $this;
    }

    public function size($dstWidth, $dstHeight)
    {
        $this->dst_w = $dstWidth;
        $this->dst_h = $dstHeight;
        return $this->reset();
    }

    public function save($destino)
    {
        imagepng($this->dst_img,$destino);
    }

    public function crop()
    {
        // Intializes destination image
        $this->reset();

        // Create a black image with a transparent ellipse, and merge with destination
        $mask = imagecreatetruecolor($this->dst_w, $this->dst_h);
        $maskTransparent = imagecolorallocate($mask, 255, 0, 255);
        imagecolortransparent($mask, $maskTransparent);
        imagefilledellipse($mask, $this->dst_w / 2, $this->dst_h / 2, $this->dst_w*0.9, $this->dst_h, $maskTransparent);
        imagecopymerge($this->dst_img, $mask, 0, 0, 0, 0, $this->dst_w, $this->dst_h, 100);

        // Fill each corners of destination image with transparency
        $dstTransparent = imagecolorallocate($this->dst_img, 255, 0, 255);
        imagefill($this->dst_img, 0, 0, $dstTransparent);
        imagefill($this->dst_img, $this->dst_w - 1, 0, $dstTransparent);
        imagefill($this->dst_img, 0, $this->dst_h - 1, $dstTransparent);
        imagefill($this->dst_img, $this->dst_w - 1, $this->dst_h - 1, $dstTransparent);
        imagecolortransparent($this->dst_img, $dstTransparent);

        return $this;
    }

}



if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $targ_w = $targ_h = 150;
    $jpeg_quality = 90;
 
    $src = 'demo_files/sago.jpg';
    $img_r = imagecreatefromjpeg($src);
    $dst_r = ImageCreateTrueColor( $targ_w, $targ_h );
 
    imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
    $targ_w,$targ_h,$_POST['w'],$_POST['h']);
 

    //$img = imagecreatefromjpeg("test4.jpg");
    $crop = new CircleCrop($dst_r);
    //$crop->crop()->display();
    $crop->crop();
    $crop->save("aqui.png");

    //header('Content-type: image/jpeg');
    //imagejpeg($dst_r,null,$jpeg_quality);
 
    //exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Aspect Ratio with Preview Pane | Jcrop Demo</title>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />

<script src="../js/jquery.min.js"></script>
<script src="../js/jquery.Jcrop.js"></script>
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
      aspectRatio: 0.9,
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
<link rel="stylesheet" href="demo_files/main.css" type="text/css" />
<link rel="stylesheet" href="demo_files/demos.css" type="text/css" />
<link rel="stylesheet" href="../css/jquery.Jcrop.css" type="text/css" />
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


  <img src="demo_files/sago.jpg" id="target" alt="[Jcrop Example]" />


<div class="clearfix"></div>
<form action="" method="post" onsubmit="return checkCoords();">
    <input type="hidden" id="x" name="x" />
    <input type="hidden" id="y" name="y" />
    <input type="hidden" id="w" name="w" />
    <input type="hidden" id="h" name="h" />
    <input type="submit" value="guardar" />
</form>

</div>
</div>
</div>
</div>

</body>
</html>

