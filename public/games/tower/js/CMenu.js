function CMenu() {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosInfo;
    var _oBg;
    var _oFBg;
    var _oButPlay;
    var _oButInfo;
    var _oFade;
    var _oAudioToggle;
    var _oContainerReset;
    var _oContainerStack;

    var _oLogo;
    this._init = function () {
        s_iBestScore = getItem("box_best_score");
        if (s_iBestScore === null) {
            s_iBestScore = 0;
        }

        var iColorPos = Math.floor(Math.random() * COLOR_GRADIENTS_STACKS.length);
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill(COLOR_GRADIENTS_STACKS[iColorPos]).drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oBg);

        _oFBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oFBg);

        _oContainerStack = new createjs.Container();
        s_oStage.addChild(_oContainerStack);
        var iRate = 1.3;
        var aEdge = new Array();
        for (var i = 0; i < NUM_OF_EDGES_FOR_STACK; i++) {
            aEdge.push(new CEdge(START_EDGES_POSITION[i].startX * iRate, START_EDGES_POSITION[i].startY * iRate,
                    START_EDGES_POSITION[i].endX * iRate, START_EDGES_POSITION[i].endY * iRate));
        }

        var iBgColorPos = iColorPos + 32;
        if (iBgColorPos >= COLOR_GRADIENTS_STACKS.length) {
            var iDif = iBgColorPos - COLOR_GRADIENTS_STACKS.length;
            iBgColorPos = iDif;
        }

        var oPos = {x: CANVAS_WIDTH_HALF - 122, y: CANVAS_HEIGHT_HALF + 30};
        var oMenuStack2 = new CStack({x: oPos.x + (DIRECTION_STACKS[2].x * ((STACK_DIMENSION.x) * iRate) + STACK_DEPTH_SIZE - 15 * iRate), y: oPos.y + (DIRECTION_STACKS[2].y * (STACK_DIMENSION.y * iRate) - 12 * iRate) - STACK_DEPTH_SIZE, dir: NO_DIR}, {line: COLOR_GRADIENTS_STACKS[iBgColorPos], plane: COLOR_GRADIENTS_STACKS[iBgColorPos], width: LINES_WIDTH, depth: null}, aEdge, _oContainerStack)
        var oMenuStack1 = new CStack({x: oPos.x, y: oPos.y, dir: NO_DIR}, {line: COLOR_GRADIENTS_STACKS[iBgColorPos], plane: COLOR_GRADIENTS_STACKS[iBgColorPos], width: LINES_WIDTH, depth: null}, aEdge, _oContainerStack);
        
        var oSpriteLogo = s_oSpriteLibrary.getSprite("logo_menu");
        _oLogo = createBitmap(oSpriteLogo);
        _oLogo.x = CANVAS_WIDTH_HALF + 56;
        _oLogo.y = -oSpriteLogo.width * 0.5;
        _oLogo.regX = oSpriteLogo.width * 0.5;
        _oLogo.regY = oSpriteLogo.height * 0.5;
        _oLogo.rotation = -15;

        s_oStage.addChild(_oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 435};
        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        _oButPlay.pulseAnimation();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 15, y: (oSprite.height / 2) + 15};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteInfo = s_oSpriteLibrary.getSprite("but_info");
        _pStartPosInfo = {x: (oSpriteInfo.height / 2) + 17, y: (oSpriteInfo.height / 2) + 15};
        _oButInfo = new CGfxButton(_pStartPosInfo.x, _pStartPosInfo.y, oSpriteInfo, s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);

        _oContainerReset = new createjs.Container();
        s_oStage.addChild(_oContainerReset);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oLogo).wait(300).to({rotation: 0}, 1000, createjs.Ease.cubicOut);
        createjs.Tween.get(_oLogo).wait(300).to({y: CANVAS_HEIGHT_HALF - 96}, 1000, createjs.Ease.bounceOut);

        createjs.Tween.get(_oFade, {override: true}).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX, _pStartPosInfo.y + iNewY);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        _oButInfo.unload();
        _oButInfo = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButInfoRelease = function () {
        new CCreditsPanel();
    };

    this._onButPlayRelease = function () {        //       playSound("click", 1, 0);
        this.fadeAnim();

    };

    this.fadeAnim = function () {
        var oParent = this;
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicIn).call(function () {
            oParent.unload();
            s_oMain.gotoGame();
        });
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;