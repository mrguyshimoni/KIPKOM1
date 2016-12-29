////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var startButtonText = 'לחצו כאן להתחלת המשחק'; //text for start button
var instructionText = 'החליקו את הבירה...'; //text for game instruction

//scores steps
var prize1score = 500;
var prize2score = 800;
var minScoreForBonus = 90;
var bonusScore = 20;
var highScoreParam = 'high_score';
//var poweredByLink = 'http://playkit.xyz/?source=shenkinGame';
var poweredByLink = 'http://bit.ly/shenkin2nimbot'; // goto http://m.me/nimbot


//mugs array
var mugs_arr = [{src:'assets/mug1.png', weight:.45, width:125},
				{src:'assets/mug2.png', weight:.45, width:125},
				{src:'assets/mug3.png', weight:.45, width:85},
				{src:'assets/mug4.png', weight:.45, width:70}];				
				
var chairDistanceNumber = 500; //chair distance number
var totalChances = 5; //total of chances
var textChances = 'x [NUMBER]'; //text for game chances
var textScores = "[NUMBER] נק'"; //text for game scores
var textDistance = 'שלב [NUMBER]'; //text for game distance
var panCameraEndOnce = true; //set true to pan camera to end for once only, false for everytime

var level_arr = {distanceStart:300, //distance number for game start
				distanceIncrease:300, //distance number to increase
				targetRange:900, //table end target range
				targetRangeDecrease:10}; //table end target range decrease

var textResultTitle = ''; //text for game result title
var textResultScore = ''; //text for game result title
var replayButtonText = 'שחקו שוב'; //text for replay button

//Social share, [SCORE] will replace with game time
var shareTitle = "דחוף את הבירה!";//social share score title
var shareMessage = "אני קיבלתי [SCORE] נקודות[WON]. רוצה לנסות גם?"; //social share score message
var won = ' (וזכיתי בשתיה חינם!)';
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var playerData = {score:0, highScore: 1523, chances:3, distance:0, swipe:false};
var gameData = {status:'', beerNum:0, beerCount:0, beerArray:[], speed:0, decreaseSpeed:0, distance:0, updateBackground:false, chairs_arr:[], distanceStart:800, targetRange:0, sound:'none', panCamera:true};
var beerData = {startX:204, startY:430}

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$("#canvasHolder").swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if(direction == 'right' && playerData.swipe && duration < 500){
				pushBeer(distance, duration);
			}
		}
	});
	
	soundToggle.cursor = "pointer";
	soundToggle.addEventListener("click", function(evt) {
		if (soundOn) {
			soundOn = false;
			stopSound();
			soundToggle.image = loader.getResult('soundOff');
		}
		else {
			soundOn = true;
			playSound('music', true);
			soundToggle.image = loader.getResult('soundOn');
		}
	});

	poweredBy.cursor = "pointer";
	poweredBy.addEventListener("click", function(evt) {
		window.open(poweredByLink,'playkit');
	});

	buttonReplayTxt.cursor = "pointer";
	buttonReplayTxt.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	// buttonTwitter.cursor = "pointer";
	// buttonTwitter.addEventListener("click", function(evt) {
	// 	share('twitter');
	// });
	// buttonGoogle.cursor = "pointer";
	// buttonGoogle.addEventListener("click", function(evt) {
	// 	share('google');
	// });
}

function toggleSwipeButton(con){
	if(con){
		$("#canvasHolder").swipe('enable');
	}else{
		$("#canvasHolder").swipe('disable');
	}
}

function setupGameButton(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 	playSound('soundButton');
		 	goPage('game');
		 	break;
	 }
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeGameButton();
	stopAnimateButton(buttonStartTxt);
	stopAnimateButton(buttonReplayTxt);
	toggleSwipeButton(false);
	
	var targetContainer = '';

	//REMOVE!!!!
	// page = 'result';
	// playerData = {
	// 	_gsTweenID:"t1",
	// 	chances:0,
	// 	distance:600,
	// 	score:466,
	// 	swipe:false,
	// };
	// $('#introMessageContainer').click();
	//END REMOVE!!!!


	switch(page){
		case 'main':
			targetContainer = mainContainer;
			setupGameButton();
			startAnimateButton(buttonStartTxt);

			//add scroll to for full screen in android
			createBeer();
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
			toggleSwipeButton(true);
		break;
		
		case 'result':
			targetContainer = resultContainer;
			startAnimateButton(buttonReplayTxt);
			
			if (playerData.score < prize1score) {
				txtResultScore.text = "ניסיון יפה - התוצאה שלכם : "+playerData.score+" נק'";
				txtResultTitle.visible = false;

				txtResultOffer1.visible = false;
				txtResultOffer2.visible = false;
				txtResultOffer3.text = 'בואו לשתות! מחכים לכם ב\'היצירה 5, רעננה\'';
				txtResultOffer4.visible = true;
			}
			else {
				txtResultScore.text = "שיחקתם אותה! התוצאה שלכם : "+playerData.score+" נק'";
				txtResultTitle.visible = true;
				txtResultTitle.text = '';

				txtResultOffer1.visible = true;
				txtResultOffer2.visible = true;
				txtResultOffer3.text = '3 - בואו לשתות! מחכים לכם ב\'היצירה 5, רעננה\'';
				txtResultOffer4.visible = false;

			 	var shape = new createjs.Shape();
			 	shape.graphics.beginFill("#fff").drawRect(0, 0, (canvasW/100 * 50), (canvasH/100 * 10));				
				shape.x = canvasW/100 * 45;
				shape.y = canvasH/100 * 35;
				shape.alpha = 0.01;
				shape.cursor = 'pointer';
				shape.addEventListener("click", function(event) {
					showLeadsForm(playerData.score);
				});
				resultContainer.addChild(shape);

				if (playerData.score >= prize1score & playerData.score < prize2score) {
					txtResultTitle.text = 'זכיתם בשלושה צ\'ייסרים במתנה!';
				}
				else if (playerData.score >= prize2score) {
					txtResultTitle.text = 'זכיתם בכניסה חינם למסיבת הסילבסטר שלנו!';
				}
			
			}

			playSound('soundEnd');
			stopGame();
			saveGame(playerData.score);

			
		break;
	}
	
	targetContainer.visible=true;
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}


/*!
 * 
 * TOGGLE ARROW ANIMATION - This is the function that runs to toggle arrow animation
 * 
 */
function toggleAnimateArrow(obj, con){
	obj.x=canvasW/100 * 38;
	if(con){
		$(obj)
		.animate({ x:canvasW/100 * 42}, 500)
		.animate({ x:canvasW/100 * 38}, 500, function(){
			toggleAnimateArrow(obj, con);	
		});
	}else{
		$(obj)
		.clearQueue()
		.stop(true,false);
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	gameData.panCamera = true;
	playerData.chances = totalChances;
	playerData.score = 0;
	distanceBg.alpha = txtDistance.alpha = 1;
	
	gameData.distanceStart = level_arr.distanceStart;
	gameData.targetRange = level_arr.targetRange;

	playerData.highScore = getHighScore();
	txtHighScores.text = 'שיא: '+playerData.highScore+' נק\'';
	
	resetCharis();
	createGame();

	//raise ga event
	raiseGaEvent('started playing', 'user started playing', 0, 0);	
}

/*!
 * 
 * CREATE GAME - This is the function that runs to create new game
 * 
 */
function createGame(){
	playerData.swipe = false;
	swipeArrow.alpha = txtInstruction.alpha = 0;
	
	createBeer();
	updateStat();
	animateBeerDrop(true);
}

/*!
 * 
 * RESET CHAIRS - This is the function that remove chairs
 * 
 */
function resetCharis(){
	for(n=0;n<gameData.chairs_arr.length;n++){
		tableContainer.removeChild(gameData.chairs_arr[n]);
	}	
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	TweenMax.killTweensOf(playerData);
	TweenMax.killTweensOf(gameData);
	TweenMax.killTweensOf(beer);
	
	gameData.speed = 0;
	gameData.updateBackground = false;
	
	distanceBg.alpha = txtDistance.alpha = 0;
}

 /*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/

    if (score > playerData.highScore) {
    	saveHighScore(score);
    	playerData.highScore = score;
    	txtHighScores.text = 'שיא: '+playerData.highScore+' נק\'';
    }

}

 /*!
 * 
 * reset leads form 
 * 
 */
function resetLeadsForm() {
	var html = '';
		html += '<form>';
		html += '    <div class="leadsFormRow">';
		html += '        <label for="name">שם מלא</label>';
		html += '        <input type="text" name="name" id="name" tabindex="1" required="required" />';
		html += '    </div>';
		html += '    <div class="leadsFormRow">';
		html += '        <label for="phone">טלפון</label>';
		html += '        <input type="text" name="phone" id="phone" style="direction:ltr;" tabindex="2" required="required" />';
		html += '    </div>';
		html += '    <div class="leadsFormRow">';
		html += '        <label for="email">אימייל</label>';
		html += '        <input type="email" name="email" id="email" style="direction:ltr;" tabindex="3" />';
		html += '    </div>';
		html += '    <div class="leadsFormRow">';
		html += '        <label for="birthday">תאריך לידה</label>';
		html += '        <input type="text" name="birthday" id="birthday" tabindex="4" />';
		html += '    </div>';
		html += '    <div class="leadsFormFullRow">';
		html += '        <input type="submit" value="שלחו" name="submit" id="submit" tabindex="5" />';
		html += '    </div>';
		html += '</form>';
                   
	$('#leadsFormContent').html(html);
}

 /*!
 * 
 * show leads form and register submit event
 * 
 */
function showLeadsForm(score) {
	//set empty form
	resetLeadsForm();

	//show form and register events
	$('#leadsForm').fadeIn('slow', function() {
		$('#leadsFormClose').on('click', function() {
			$('#leadsForm').fadeOut('fast');
		});

		//raise ga event
		raiseGaEvent('lead form', 'open form', score, 1);

		$("#leadsFormContent>form").on("submit", function(event) {
			event.preventDefault();

			var json = {
				name: $('#name').val(),
				phone: $('#phone').val(),
				email: $('#email').val(),
				birthday: $('#birthday').val(),
				score: score,
				timestamp: new Date(),
			};
			//console.log(json);

			//load spinner
			$('#leadsFormContent').html('<div id="leadsFormLoader"></div>');

			//submit form
			$.ajax({
				url: 'https://sheetsu.com/apis/v1.0/79b89ecd4970',
				data: json,
				dataType: 'json',
				type: 'POST',

				// place for handling successful response
				// showing (redirecting to) something like /thanks.html
				// page could be a good idea
				success: function(data) {
					//console.log(data);
					if (score > prize1score) {
						$('#leadsFormContent').html('<div id="leadsFormResponse">הפרטים התקבלו והפרס ממתין לכם בבר</div>');
					}
					else {
						$('#leadsFormContent').html('<div id="leadsFormResponse">הפרטים התקבלו</div>');	
					}
					$('#leadsFormContent').append('<div id="leadsFormReminder">(לא לשכוח לשתף את החברים)</div>');

					//raise ga event
					raiseGaEvent('lead form', 'submitted form - success', score, 1);
				},

				// handling error response
				error: function(data) {
					//console.log(data);
					$('#leadsFormContent').html('<div id="leadsFormResponse">חלה שגיאה - אנא נסו במועד מאוחר יותר</div>');

					//raise ga event
					raiseGaEvent('lead form', 'submitted form - error', score, 1);
				},

				complete: function(data) {
					setTimeout(function() {
						$('#leadsForm').fadeOut('fast');
					}, 3000);
				}
			});

			return false;
		});


	});

		
}

 /*!
 * 
 * CREATE NEW BEER - This is the function that runs to create new beer
 * 
 */
function createBeer(){	
	tableContainer.removeChild(beer);
	gameData.beerNum = gameData.beerArray[gameData.beerCount];
	gameData.beerCount++;
	if(gameData.beerCount > gameData.beerArray.length-1){
		gameData.beerCount = 0;
		shuffle(gameData.beerArray);
	}
	beer = $.beers[gameData.beerNum].clone();
	
	beer.x = beerData.startX;
	beer.y = beerData.startY;
	tableContainer.addChild(beer);
	
	beerShadow.graphics.clear();
	beerShadow.graphics.beginFill("black");
 	beerShadow.graphics.drawCircle(0,0,mugs_arr[gameData.beerNum].width/2);
	beerShadow.scaleY = .2;
	beerShadow.alpha = .2;
	beerShadow.x = beer.x;
	beerShadow.y = beer.y;
	
	gameData.distance = canvasW + gameData.distanceStart;
	tableTarget.x = gameData.distance;
	tableEnd.x = gameData.distance+gameData.targetRange;
	coastersBg.x = tableEnd.x - (canvasH/100 * 4);
	
	updateDistance();
	txtDistance.y = canvasH/100 * 46;
	distanceBg.y = canvasH/100 * 44;
	
	var chairStartX = tableEnd.x - chairDistanceNumber;
	var totalChairs = Math.floor(gameData.distance/chairDistanceNumber)+1;
	
	gameData.chairs_arr = [];
	for(n=0;n<totalChairs;n++){
		var newChair = chair.clone();
		newChair.x = chairStartX;
		newChair.y = canvasH/100 * 115;
		gameData.chairs_arr.push(newChair);
		tableContainer.addChild(newChair);
		
		chairStartX -= chairDistanceNumber;
	}
}

 /*!
 * 
 * ANIMATE TABLE AREA - This is the function that runs to pan to target area
 * 
 */
function animateTableTarget(){
	gameData.status = 'focus';
	gameData.updateBackground = true;
	
	beer.oldX = beer.x;
	var cameraTweenSpeed = gameData.distance/1500;
	TweenMax.to(beer, cameraTweenSpeed, {delay:.5, x:-((gameData.distance+gameData.targetRange) - (canvasW)), overwrite:true, onComplete:function(){
		TweenMax.to(beer, cameraTweenSpeed, {delay:.5, x:beerData.startX, overwrite:true, onComplete:function(){
			setActionReady();
		}});
	}});
}

/*!
 * 
 * SET ACTION READY - This is the function that runs to enable swipe action
 * 
 */
function setActionReady(){
	beer.x = beerData.startX;
	beer.y = beerData.startY;
	
	beer.alpha = 1;
	beerShadow.alpha = .2;
	
	gameData.status = 'action';
	gameData.updateBackground = false;
	swipeArrow.alpha = txtInstruction.alpha = 1;
	toggleAnimateArrow(swipeArrow, true);
	playerData.swipe = true;
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(event){
	if(gameData.updateBackground){
		beerShadow.x = beer.x;
		
		var stickX = canvasW/100 * 98;
		if(tableTarget.x + (tableTarget.image.naturalWidth/2) < stickX){
			distanceBg.x = tableTarget.x + (tableTarget.image.naturalWidth/2);
		}else{
			distanceBg.x = stickX;
		}
		txtDistance.x = distanceBg.x - 110;
		
		if(gameData.status == 'focus'){
			if(beer.oldX != beer.x){
				gameData.speed = beer.oldX - beer.x;
				beer.oldX = beer.x;
			}else{
				gameData.speed = 0;	
			}
			updateBackground();
		}else{
			playSlidingSound();
			if(tableEnd.x <= canvasW/100 * 80){
				beer.x += gameData.speed;
				
				if(beer.x >= tableEnd.x){
					stopSlidingSound();
					animateBeerFall();
					return;
				}
			}else{
				updateBackground();
			}
			
			if(gameData.speed > 0){
				gameData.speed -= gameData.decreaseSpeed;
			}else{
				gameData.speed = 0;	
				if(beer.x < tableTarget.x){
					checkGameEnd(false);	
				}else{
					updateScore();	
				}
			}
		}
	}
}

 /*!
 * 
 * SLIDING SOUND - This is the function that runs to sliding sound
 * 
 */
function playSlidingSound(){
	if(gameData.speed > 0){
		if(gameData.speed > 10){
			if(gameData.sound != 'fast'){
				gameData.sound = 'fast';
				stopSoundLoop('soundSlidingSlow');
				playSoundLoop('soundSlidingFast');
			}
		}else{
			if(gameData.sound != 'slow'){
				gameData.sound = 'slow';
				stopSoundLoop('soundSlidingFast');
				playSoundLoop('soundSlidingSlow');
			}
		}
	}
}

function stopSlidingSound(){
	gameData.sound = 'none';
	stopSoundLoop('soundSlidingFast');
	stopSoundLoop('soundSlidingSlow');
}

/*!
 * 
 * UPDATE BACKGROUND - This is the function that runs to update background loop
 * 
 */
function updateBackground(){
	boards.x = (boards.x - (gameData.speed * .2)) % (boards.tileW)-(boardsImg.width);
	tableSide.x = (tableSide.x - gameData.speed) % (tableSide.tileW)-(tableSideImg.width);
	tableTop.x = (tableTop.x - gameData.speed) % (tableTop.tileW)-(tableTopImg.width);
	
	tableTarget.x -= gameData.speed;
	coastersBg.x -= gameData.speed;
	tableEnd.x -= gameData.speed;
	
	for(c=0;c<gameData.chairs_arr.length;c++){
		gameData.chairs_arr[c].x -= gameData.speed;
	}
	
	updateTableMask();
}

/*!
 * 
 * UPDATE TABLE MASK - This is the function that runs to update table mask
 * 
 */
function updateTableMask(){
	tableMask.graphics.clear();
	tableMask.graphics.beginFill('black').drawRect(0, tableTop.y, tableEnd.x + (tableEnd.image.naturalWidth/2), tableTopImg.height + tableSideImg.height);
}

/*!
 * 
 * PUSH BEER - This is the function that runs to animate beer pushing
 * 
 */
function pushBeer(distance, duration){
	distance = distance / scalePercent;
	
	toggleAnimateArrow(swipeArrow, false);
	playerData.swipe = false;
	swipeArrow.alpha = txtInstruction.alpha = 0;
	
	gameData.speed = (distance * (mugs_arr[gameData.beerNum].weight * .1)).toFixed(3);
	gameData.decreaseSpeed = 0;
	
	var durationSpeed = distance * .005;
	TweenMax.killTweensOf(gameData);
	TweenMax.to(gameData, durationSpeed, {decreaseSpeed:.5, overwrite:true});
	
	gameData.updateBackground = true;
}

/*!
 * 
 * ANIMATE BEER DROP - This is the function that runs to animate beer drop on table
 * 
 */
function animateBeerDrop(con){
	playSound('soundDrop');
	
	beer.oriY = beer.y;
	beer.y -= 100;
	TweenMax.to(beer, .5, {y:beer.oriY, overwrite:true, ease:Bounce.easeOut, onComplete:function(){
		if(con){
			if(gameData.panCamera){
				if(panCameraEndOnce){
					gameData.panCamera = false;	
				}
				animateTableTarget();
			}else{
				setActionReady();	
			}
		}
	}});	
}

/*!
 * 
 * ANIMATE BEER FALL - This is the function that runs to animate beer fall from table
 * 
 */
function animateBeerFall(){
	var tweenSpeed = gameData.speed * .02;
	var rangeNum = gameData.speed * 10;
	
	if(gameData.speed < 15){
		tweenSpeed = 1;
	}
	
	beerShadow.alpha = 0;
	gameData.speed = 0;
	gameData.updateBackground = false;
	
	beer.fallX = beer.x;
	TweenMax.killTweensOf(beer);
	TweenMax.to(beer, tweenSpeed, {bezier:{type:"quadratic", autoRotate:true, values:[{x:beer.x, y:beer.y}, {x:beer.x + rangeNum, y:beer.y}, {x:beer.x + rangeNum, y:canvasH/100 * 120}]}, ease:Linear.easeNone, onComplete:function(){
		playSound('soundBreaking');
		checkGameEnd(false);
	}});
}

/*!
 * 
 * CHECK GAME END - This is the function that runs to check game end
 * 
 */
function checkGameEnd(con){
	stopSlidingSound();
		
	var gameEnd = false;
	var gameNew = con;
	
	if(!gameNew){
		playSound('soundFail');
		if(decreaseChances() == false){
			gameEnd = true;
		}
	}
	
	beerShadow.alpha = 0;
	beer.alpha = 0;
	beer.rotation = 0;
	beer.x = tableTarget.x - (gameData.distance - beerData.startX);
	beer.y = beerData.startY;
	
	gameData.status = 'focus';
	gameData.updateBackground = true;
	beer.oldX = beer.x;
	
	var cameraTweenSpeed = Math.abs(beer.x)/1500;
	TweenMax.to(beer, cameraTweenSpeed, {x:beerData.startX, overwrite:true, onComplete:function(){
		if(gameNew){
			gameData.updateBackground = false;
			resetCharis();
			createGame();
		}else if(gameEnd){
			goPage('result');

			//raise ga event
			raiseGaEvent('ended game', 'user ended game', playerData.score, 0);
		}else{
			setActionReady();
			animateBeerDrop(false);
		}
	}});
}

/*!
 * 
 * UPDATE LEVEL - This is the function that runs to update game level
 * 
 */
function updateLevel(){
	gameData.distanceStart += level_arr.distanceIncrease;
	gameData.targetRange -= level_arr.targetRangeDecrease;	
}

/*!
 * 
 * UPDATE STAT - This is the function that runs to update game stats
 * 
 */
function updateStat(){
	txtChances.text = textChances.replace('[NUMBER]', playerData.chances);
	txtScores.text = textScores.replace('[NUMBER]', Math.floor(playerData.score));
	txtDistance.text = textDistance.replace('[NUMBER]', Math.floor(playerData.distance/300));
}

function updateScore(){
	stopSlidingSound();
	playSound('soundScore');
	gameData.updateBackground = false;

	var scoreRange = beer.x - tableTarget.x;
	var addScore = Math.floor(scoreRange/(level_arr.targetRange - (beer.image.naturalWidth/2)) * 100);

	runSuccessPointsAnimation(addScore);

	if (addScore > minScoreForBonus) {
		addScore += bonusScore;
		runBonusAnimation();
	}

	addScore = addScore;

	var newScore = playerData.score + addScore;

	updateStat();
	TweenMax.to(playerData, 1, {score:newScore, overwrite:true, onUpdate:function(){
		updateStat();
	}, onComplete:function(){
		updateLevel();
		checkGameEnd(true);
	}});
}

function runSuccessPointsAnimation(points) {
	//set left position according to points
	var leftPosition;
	if (points < 25) {
		leftPosition = 15;
	}
	else if (points < 50) {
		leftPosition = 40;
	}
	else if (points < 75) {
		leftPosition = 65;
	}
	else if (points < 90) {
		leftPosition = 75;
	}
	else {
		leftPosition = 60;
	}

	txtSuccessPoints.x = canvasW/100 * leftPosition;
	txtSuccessPoints.y = canvasH/100 * 28;
	txtSuccessPoints.visible = true;

	var steps = 50;
	var heightStep = txtSuccessPoints.y/steps;
	var alphaStep = 100/steps;
	var fontSize = 52;

	txtSuccessPoints.text = '+'+points+' נקודות';
	txtSuccessPoints.font = "bold "+fontSize+"px Alef";
	txtSuccessPoints.alpha = 1;

	createjs.Tween.get(txtSuccessPoints)
		.wait(700)
		.to({alpha:0, visible:false, y:0, font: '60px'}, 500)
		.call(bonusAnimComplete);
	
	// $('#gameFlash').fadeIn(100, function() {
	// 	$('#gameFlash').fadeOut(200);
	// });
}

function runBonusAnimation() {
	txtBonus.x = canvasW/100 * 85;
	txtBonus.y = canvasH/100 * 28;
	txtBonus.visible = true;

	var steps = 50;
	var heightStep = txtBonus.y/steps;
	var alphaStep = 100/steps;
	var fontSize = 52;

	txtBonus.text = '+'+bonusScore+' בונוס!';
	txtBonus.font = "bold "+fontSize+"px Alef";
	txtBonus.alpha = 1;

	createjs.Tween.get(txtBonus)
		.wait(700)
		.to({alpha:0, visible:false, y:0, font: '60px'}, 500)
		.call(bonusAnimComplete);
	
	$('#gameFlash').fadeIn(100, function() {
		$('#gameFlash').fadeOut(200);
	});
}

function bonusAnimComplete() {
	
}

function updateDistance(){
	TweenMax.to(playerData, .5, {distance:gameData.distanceStart, overwrite:true, onUpdate:function(){
		updateStat();
	}});
}

function decreaseChances(){
	playerData.chances--;
	updateStat();
	
	if(playerData.chances <= 0){
		return false;	
	}else{
		return true;	
	}
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	//var loc = location.href
	//loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var baseUrl = 'http://playkit.xyz/games/shenkin/';
	var loc = baseUrl + '?source=[SOURCE]';
	var source = 'other';
	var title = shareTitle.replace("[SCORE]", playerData.score);
	var text = shareMessage.replace("[SCORE]", playerData.score);
		text = text.replace("[WON]", (playerData.score >= prize1score) ? won : '');
	var shareurl = '';
	
	if( action == 'twitter' ) {
		source = 'twitterShare';
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
		shareurl = shareurl.replace("[SOURCE]", source);
	}else if( action == 'facebook' ){
		source = 'facebookShare';
		loc = loc.replace("[SOURCE]", source);// before the encode

		params = title+'~~~~'+text;
		params = params.replace(/ /g, '~');

		shareurl = 'http://www.facebook.com/sharer.php?m2w&u='+encodeURIComponent(baseUrl+'share.php?params='+params);

		//raise ga event
		raiseGaEvent('shared game', 'facebook share', playerData.score, 1);	

	}else if( action == 'google' ){
		source = 'googleShare';
		shareurl = 'https://plus.google.com/share?url='+loc;
		shareurl = shareurl.replace("[SOURCE]", source);
	}else if( action == 'whatsapp' ){
		source = 'whatsappShare';
		loc = loc.replace("[SOURCE]", source);
		shareurl = 'whatsapp://send?text='+encodeURIComponent(text)+' - '+encodeURIComponent(loc);

		//raise ga event
		raiseGaEvent('shared game', 'whatsapp share', playerData.score, 1);	
	}
	
	window.open(shareurl);
}

function getHighScore() {
	var highScore = localStorage.getItem(highScoreParam);
	return (highScore === null ? 0 : highScore);
}

function saveHighScore(score) {
	localStorage.setItem(highScoreParam, score);
}
