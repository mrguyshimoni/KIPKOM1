////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, tableContainer, mainContainer, gameContainer, resultContainer;
var background, logo, buttonStartTxt, beer, beerShadow, chair, tableSide, tableTop, tableEnd, tableTarget, tableMask, tableTopImg, tableSideImg, boards, boardsImg, iconBeer, txtChances, txtScores, txtHighScores, txtBonus, txtSuccessPoints, txtDistance, distanceBg, coastersBg, txtInstruction, buttonFacebook, buttonTwitter, buttonGoogle, buttonWhatsapp, txtResultTitle, txtResultScore, txtResultOffer1, txtResultOffer2, txtResultOffer3, txtResultOffer4, buttonReplayTxt, swipeArrow, soundToggle, poweredBy;

$.beers = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	tableContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));

	soundToggle = new createjs.Bitmap(loader.getResult('soundOn'));
	centerReg(soundToggle);
	soundToggle.x = canvasW/100 * 6;
	soundToggle.y = canvasH/100 * 92;

	poweredBy = new createjs.Bitmap(loader.getResult('poweredBy'));
	centerReg(poweredBy);
	poweredBy.x = canvasW/100 * 90;
	poweredBy.y = canvasH/100 * 86;

	buttonStartTxt = new createjs.Text();
	buttonStartTxt.font = "50px Alef";
	buttonStartTxt.color = "#ffffff";
	buttonStartTxt.text = startButtonText;
	buttonStartTxt.textAlign = "center";
	buttonStartTxt.textBaseline='alphabetic';
	buttonStartTxt.x = canvasW/2;
	buttonStartTxt.y = canvasH/100 * 69;
	
	chair = new createjs.Bitmap(loader.getResult('chair'));
	centerReg(chair);
	chair.x -= chair.image.naturalWidth;
	
	boardsImg = loader.getResult("boards");
	boards = new createjs.Shape();
	boards.graphics.beginBitmapFill(boardsImg).drawRect(0, 0, canvasW + (boardsImg.width*2), boardsImg.height);
	boards.tileW = boardsImg.width;
	boards.y = canvasH/100 * 20;
	
	tableSideImg = loader.getResult("tableSide");
	tableSide = new createjs.Shape();
	tableSide.graphics.beginBitmapFill(tableSideImg).drawRect(0, 0, canvasW + (tableSideImg.width*2), tableSideImg.height);
	tableSide.tileW = tableSideImg.width;
	tableSide.y = canvasH - tableSideImg.naturalHeight;
	
	tableTopImg = loader.getResult("tableTop");
	tableTop = new createjs.Shape();
	tableTop.graphics.beginBitmapFill(tableTopImg).drawRect(0, 0, canvasW + (tableTopImg.width*2), tableTopImg.height);
	tableTop.tileW = tableTopImg.width;
	tableTop.y = canvasH - (tableSideImg.naturalHeight+tableTopImg.naturalHeight);
	
	tableEnd = new createjs.Bitmap(loader.getResult('tableEnd'));
	tableEnd.regX = tableEnd.image.naturalWidth/2;
	tableEnd.y = tableTop.y;
	tableEnd.x = canvasW;
	
	tableTarget = new createjs.Bitmap(loader.getResult('tableTarget'));
	centerReg(tableTarget);
	tableTarget.y = tableTop.y + (tableTarget.image.naturalHeight/2);
	
	coastersBg = new createjs.Bitmap(loader.getResult('coastersBg'));
	centerReg(coastersBg);
	coastersBg.y = tableTop.y + (coastersBg.image.naturalHeight/2) ;

	tableMask = new createjs.Shape();
	tableMask.alpha = 0;
	tableSide.mask = tableMask;
	tableTop.mask = tableMask;
	
	beerShadow = new createjs.Shape();
	
	txtDistance = new createjs.Text();
	txtDistance.font = "50px Alef";
	txtDistance.color = "#fff";
	txtDistance.text = '';
	txtDistance.textAlign = "center";
	txtDistance.textBaseline='alphabetic';
	txtDistance.x = canvasW/100 * 120;
	
	distanceBg = new createjs.Bitmap(loader.getResult('distanceBg'));
	centerReg(distanceBg);
	distanceBg.regX = distanceBg.image.naturalWidth;

	tableContainer.addChild(boards, chair, tableSide, tableTop, tableEnd, tableTarget, distanceBg, coastersBg, txtDistance, tableMask, beerShadow);
	
	for(n=0;n<mugs_arr.length;n++){
		$.beers[n] = new createjs.Bitmap(loader.getResult('beer'+n));
		centerReg($.beers[n]);
		$.beers[n].regY = $.beers[n].image.naturalHeight;
		tableContainer.addChild($.beers[n]);
		
		gameData.beerArray.push(n);
	}
	shuffle(gameData.beerArray);
	
	iconBeer = new createjs.Bitmap(loader.getResult('iconBeer'));
	centerReg(iconBeer);
	iconBeer.x = canvasW/100 * 7;
	iconBeer.y = canvasH/100 * 10;
	
	swipeArrow = new createjs.Bitmap(loader.getResult('swipeArrow'));
	centerReg(swipeArrow);
	swipeArrow.x = canvasW/100 * 38;
	swipeArrow.y = canvasH/100 * 46;
	
	txtChances = new createjs.Text();
	txtChances.font = "70px Alef";
	txtChances.color = "#536654";
	txtChances.text = '';
	txtChances.textAlign = "left";
	txtChances.textBaseline='alphabetic';
	txtChances.x = canvasW/100 * 13;
	txtChances.y = canvasH/100 * 13;
	
	txtScores = new createjs.Text();
	txtScores.font = "70px Alef";
	txtScores.color = "#536654";
	txtScores.text = '';
	txtScores.textAlign = "right";
	txtScores.textBaseline='alphabetic';
	txtScores.x = canvasW/100 * 94;
	txtScores.y = canvasH/100 * 13;

	txtHighScores = new createjs.Text();
	txtHighScores.font = "45px Alef";
	txtHighScores.color = "#536654";
	txtHighScores.text = 'שיא: 0 נק\'';
	txtHighScores.textAlign = "right";
	txtHighScores.textBaseline='alphabetic';
	txtHighScores.x = canvasW/100 * 94;
	txtHighScores.y = canvasH/100 * 20;

	txtBonus = new createjs.Text();
	txtBonus.font = "bold 52px Alef";
	txtBonus.color = "#EA0000";
	txtBonus.text = '+20 MAX BONUS!';
	txtBonus.textAlign = "center";
	txtBonus.textBaseline='alphabetic';
	txtBonus.x = canvasW/100 * 78;
	txtBonus.y = canvasH/100 * 28;
	txtBonus.lineWidth = canvasW/100 * 60;
	txtBonus.alpha = 0;

	txtSuccessPoints = new createjs.Text();
	txtSuccessPoints.font = "bold 52px Alef";
	txtSuccessPoints.color = "#00A452";
	txtSuccessPoints.text = '+';
	txtSuccessPoints.textAlign = "center";
	txtSuccessPoints.textBaseline='alphabetic';
	txtSuccessPoints.x = 0;
	txtSuccessPoints.y = 0;
	txtSuccessPoints.lineWidth = canvasW/100 * 60;
	txtSuccessPoints.alpha = 0;

	txtInstruction = new createjs.Text();
	txtInstruction.font = "50px Alef";
	txtInstruction.color = "#ffffff";
	txtInstruction.text = instructionText;
	txtInstruction.textAlign = "center";
	txtInstruction.textBaseline='alphabetic';
	txtInstruction.x = canvasW/2;
	txtInstruction.y = canvasH/100 * 69;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	//buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	//buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
	
	centerReg(buttonFacebook);
	centerReg(buttonWhatsapp);
	//centerReg(buttonTwitter);
	//centerReg(buttonGoogle);
	
	//buttonFacebook.x = canvasW/100 * 32;
	//buttonTwitter.x = canvasW/2;
	//buttonGoogle.x = canvasW/100 * 68;
	buttonFacebook.x = canvasW/100 * 9;
	buttonWhatsapp.x = canvasW/100 * 23;
	
	//buttonFacebook.y = buttonTwitter.y = buttonGoogle.y = canvasH/100 * 45;
	buttonFacebook.y = buttonWhatsapp.y = canvasH/100 * 45;
	
	txtResultTitle = new createjs.Text();
	txtResultTitle.font = "bold 50px Alef";
	txtResultTitle.color = "#495749";
	txtResultTitle.text = '';
	txtResultTitle.textAlign = "right";
	txtResultTitle.textBaseline='alphabetic';
	txtResultTitle.lineWidth = canvasW/100 * 90;
	txtResultTitle.x = canvasW/100 * 95;
	txtResultTitle.y = canvasH/100 * 34;
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "60px Alef";
	txtResultScore.color = "#495749";
	txtResultScore.text = '';
	txtResultScore.textAlign = "right";
	txtResultScore.textBaseline='alphabetic';
	txtResultScore.lineWidth = canvasW/100 * 90;
	txtResultScore.x = canvasW/100 * 95;
	txtResultScore.y = canvasH/100 * 25;
	
	txtResultOffer1 = new createjs.Text();
	txtResultOffer1.font = "40px Alef";
	txtResultOffer1.color = "blue";
	txtResultOffer1.text = '1 - לחצו כאן בכדי להשאיר פרטים';
	txtResultOffer1.cursor = 'pointer';
	txtResultOffer1.textAlign = "right";
	txtResultOffer1.textBaseline='alphabetic';
	txtResultOffer1.lineWidth = canvasW/100 * 60;
	txtResultOffer1.x = canvasW/100 * 95;
	txtResultOffer1.y = canvasH/100 * 41.5;
	
	txtResultOffer2 = new createjs.Text();
	txtResultOffer2.font = "40px Alef";
	txtResultOffer2.color = "#000";
	txtResultOffer2.text = '2 - שתפו את החברים ⇽⇽⇽';
	txtResultOffer2.textAlign = "right";
	txtResultOffer2.textBaseline='alphabetic';
	txtResultOffer2.lineWidth = canvasW/100 * 60;
	txtResultOffer2.x = canvasW/100 * 95;
	txtResultOffer2.y = canvasH/100 * 48.5;
	
	txtResultOffer3 = new createjs.Text();
	txtResultOffer3.font = "40px Alef";
	txtResultOffer3.color = "#fff";
	txtResultOffer3.text = '3 - בואו לשתות! מחכים לכם ב\'היצירה 5, רעננה\'';
	txtResultOffer3.textAlign = "right";
	txtResultOffer3.textBaseline='alphabetic';
	txtResultOffer3.lineWidth = canvasW/100 * 80;
	txtResultOffer3.x = canvasW/100 * 95;
	txtResultOffer3.y = canvasH/100 * 56;
	
	txtResultOffer4 = new createjs.Text();
	txtResultOffer4.font = "40px Alef";
	txtResultOffer4.color = "#000";
	txtResultOffer4.text = 'שתפו את החברים שגם הם ישחקו ויזכו בפרסים ⇽⇽⇽';
	txtResultOffer4.textAlign = "right";
	txtResultOffer4.textBaseline='alphabetic';
	txtResultOffer4.lineWidth = canvasW/100 * 60;
	txtResultOffer4.x = canvasW/100 * 95;
	txtResultOffer4.y = canvasH/100 * 42;
	
	buttonReplayTxt = new createjs.Text();
	buttonReplayTxt.font = "50px Alef";
	buttonReplayTxt.color = "#ffffff";
	buttonReplayTxt.text = replayButtonText;
	buttonReplayTxt.textAlign = "center";
	buttonReplayTxt.textBaseline='alphabetic';
	buttonReplayTxt.x = canvasW/2;
	buttonReplayTxt.y = canvasH/100 * 69;
	buttonReplayTxt.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	
	mainContainer.addChild(logo, buttonStartTxt, soundToggle, poweredBy);
	gameContainer.addChild(iconBeer, txtChances, txtScores, txtHighScores, txtBonus, txtSuccessPoints, swipeArrow, txtInstruction, soundToggle, poweredBy);
	//resultContainer.addChild(buttonFacebook, buttonTwitter, buttonGoogle, txtResultTitle, txtResultScore, buttonReplayTxt);
	if ($.browser.mobile || isTablet) {
		resultContainer.addChild(buttonFacebook, buttonWhatsapp, txtResultTitle, txtResultScore, txtResultOffer1, txtResultOffer2, txtResultOffer3, txtResultOffer4, buttonReplayTxt, soundToggle, poweredBy);
	}
	else {
		resultContainer.addChild(buttonFacebook, txtResultTitle, txtResultScore, txtResultOffer1, txtResultOffer2, txtResultOffer3, txtResultOffer4, buttonReplayTxt, soundToggle, poweredBy);
	}
	canvasContainer.addChild(background, tableContainer, mainContainer, gameContainer, resultContainer, soundToggle, poweredBy);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame(event);
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}