////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW=1200;
var stageH=768;

/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
function initMain(){
	if(!$.browser.mobile || !isTablet){
		$('#canvasHolder').show();	
	}
	
	initGameCanvas(stageW,stageH);
	buildGameCanvas();
	buildGameButton();
	
	playSound('music', true);
	goPage('main');
	resizeCanvas();

	$(window).focus(function() {
	    // Unpause when window gains focus
	    playSound('music', true);
	}).blur(function() {
	    // Pause when window loses focus
	    stopSound();
	});

	displayIntroMessage();

	$(document).ready(function() {
		//raise ga event	
		raiseGaEvent('entered game', 'user entered game', 0, 0);
	});
}

var windowW=windowH=0;
var scalePercent=0;

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
function resizeGameFunc(){
	setTimeout(function() {
		$('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
		$('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));
		
		windowW = $(window).width();
		windowH = $(window).height();

		$('#mainHolder').css('height', windowH);
		$('#mainHolder').css('width', windowW);
		
		scalePercent = windowW/stageW;
			
		if((stageH*scalePercent)>windowH){
			scalePercent = windowH/stageH;
		}
		
		var gameCanvas = document.getElementById("gameCanvas");
		
		gameCanvas.width=stageW*scalePercent;
		gameCanvas.height=stageH*scalePercent;
		$('#canvasHolder').css('max-width',stageW*scalePercent);
		$('#canvasHolder').css('top',(windowH/2)-((stageH*scalePercent)/2));
		
		resizeCanvas();
	}, 100);	
}

function displayIntroMessage() {
	$('#introMessageContainer').fadeIn('slow', function() {
		$(this).on('click', function() {
			$(this).fadeOut('fast');
		});
	});
}