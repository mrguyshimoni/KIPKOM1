<?php
require_once('GameList.php');
$mainSiteUrl = 'playkit.xyz';
$pageTitleBase  = "$mainSiteUrl - play online games";
$gameId = (isset($_GET['gameId']) ? $_GET['gameId'] : null);
$gameTitle = (isset($_GET['gameTitle']) ? $_GET['gameTitle'] : null);
$gameTitle = urldecode($gameTitle);
$pageTitle = empty($gameTitle) ? $pageTitleBase : $gameTitle . ' - ' . $pageTitleBase;
$gameUrl = GameList::getGameUrlById($gameId);

?>
<!doctype html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php echo $pageTitle; ?></title>

        <!-- Google Tag Manager -->
        <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WGTCJL');
        </script>
        <!-- End Google Tag Manager -->

        <meta name="description" content="<?php echo $mainSiteUrl; ?> - play online games - no download required!">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
    </head>
    <body>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WGTCJL"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->

		<?php 
		if ($gameUrl) {
			echo "
			<div id=\"iframes\">
				<iframe name=\"gameFrame\" src=\"$gameUrl\" style=\"position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;\">
				</iframe>
			</div>
			";
		}
		else{
			echo "
				<p> Game not found. redirecting...
				<script>
				window.setTimeout(function(){ window.location = \"http://www.playkit.xyz\"; },3000);
				</script>";
		}
		?>
		
    </body>
</html>
<?php 

