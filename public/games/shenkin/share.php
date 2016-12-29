<?php 
$params = isset($_GET['params']) ? $_GET['params'] : null;
if (empty($params)) {
    header('Location: http://playkit.xyz/games/shenkin/?source=facebookShare');
}

$paramsArr = explode('~~~~', $params);
$params = str_replace('~', ' ', $params);

if (count($paramsArr) != 2) {
    header('Location: http://playkit.xyz/games/shenkin/?source=facebookShare');
}

$title = str_replace('~', ' ', $paramsArr[0]);
$desc = str_replace('~', ' ', $paramsArr[1]);
$url = 'http://playkit.xyz/games/shenkin/?source=facebookShare';
$thumb = 'http://playkit.xyz/games/shenkin/fbshare.jpg';
$width = 300;
$height = 300;

?>

<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title><?php echo $title;?></title>
        <meta property="og:title" content="<?php echo $title;?>" />
        <meta property="og:description" content="<?php echo $desc;?>"/>
        <meta property="og:image" content="<?php echo $thumb; ?>" />
        <meta property="og:image:width" content="<?php echo $width;?>"/>
        <meta property="og:image:height" content="<?php echo $height;?>"/>
    </head>
    <body>
        <script>
            window.location.href = "<?php echo $url;?>";
        </script>
    </body>

</html>