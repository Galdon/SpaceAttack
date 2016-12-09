var moveBg = require("bgMove");
var touchEvent;
cc.Class({
    extends: cc.Component,

    properties: {
        // 背景结点1
        bgSprite1: {
            default: null,
            type: cc.Node
        },
        
        // 背景节点2
        bgSprite2: {
            default: null,
            type: cc.Node
        },
        
        playerAmmoPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        enemyAmmoPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        player: {
            default: null,
            type: cc.Node
        },
        
        enemySmallPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        enemyMiddlePrefab: {
            default: null,
            type: cc.Prefab
        },
        
        enemyLargePrefab: {
            default: null,
            type: cc.Prefab
        },
        
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        
        button: cc.Button,
        
        retryLabel: {
            default: null,
            type: cc.Label
        },
        
        backgroundAudio: {
            default: null,
            url: cc.AudioClip
        },
        
        currentBackGroundAudio: null,
    },
    
    setInputControl: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.j:
                        self.createPlayerAmmo();
                        break;
                }
            }
            
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {
        
        cc.audioEngine.setVolume(this.currentBackGroundAudio, cc.audioEngine.getVolume(this.currentBackGroundAudio) / 2);
        
        this.score = 0;
        this.button.node.on('click', this.retryCallBack, this);
        cc.director.getScheduler().schedule(this.callback, this, 0.5, !this._isRunning);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        
        var myPlayer = this.player;
        touchEvent = this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            myPlayer.setPositionX(myPlayer.getPositionX() + event.getDeltaX());
            myPlayer.setPositionY(myPlayer.getPositionY() + event.getDeltaY());
        }, this.node);
        
        this.currentBackGroundAudio = cc.audioEngine.playEffect(this.backgroundAudio, true);
        
        // this.setInputControl();
    },

    // called every frame
    update: function (dt) {
        
        var bg1 = this.bgSprite1.getComponent(moveBg);
        var bg2 = this.bgSprite2.getComponent(moveBg);
        bg1.node.runAction(bg1.setMoveAction(3));
        bg2.node.runAction(bg2.setMoveAction(3));
        if(this.bgSprite1.getPositionY() < 480) {
            this.bgSprite2.setPositionY(this.bgSprite1.getPositionY() + this.bgSprite1.getContentSize().height);
        }
        if(this.bgSprite2.getPositionY() < 480) {
            this.bgSprite1.setPositionY(this.bgSprite2.getPositionY() + this.bgSprite2.getContentSize().height);
        }
        // this.createPlayerAmmo();
        
        return;
    },
    
    createPlayerAmmo: function() {
        var newPlayerAmmo = cc.instantiate(this.playerAmmoPrefab);
        this.node.addChild(newPlayerAmmo);
        newPlayerAmmo.setPosition(this.player.getPosition());
        newPlayerAmmo.getComponent("ammo").game = this;
    },
    
    createEnemySmall: function() {
        var newEnemySmall = cc.instantiate(this.enemySmallPrefab);
        this.node.addChild(newEnemySmall);
        newEnemySmall.setPosition(this.getRandomEnemyPosition());
        newEnemySmall.getComponent("enemySmall").game = this;
    },
    
    createEnemyMiddle: function() {
        var newEnemyMiddle = cc.instantiate(this.enemyMiddlePrefab);
        this.node.addChild(newEnemyMiddle);
        newEnemyMiddle.setPosition(this.getRandomEnemyPosition());
        newEnemyMiddle.getComponent("enemyMiddle").game = this;
    },
    
    getRandomEnemyPosition: function() {
        return cc.p(cc.randomMinus1To1() * (this.node.width / 2), 500);
    },
    
    callback: function() {
        
        if(this.gameOverFlag) {
            return;
        }
        
        this.createPlayerAmmo();
        this.createEnemySmall();
        this.createEnemyMiddle();
        return;
    },
    
    retryCallBack: function() {
        cc.director.loadScene('mainScene');
    },
    
    gainScore: function (gainedScore) {
        this.score = this.score + gainedScore;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    
    // touchMoveCallBack: function(event){
    //     this.player.setPositionX(this.player.getPositionX() + event.getDeltaX());
    //     this.player.setPositionY(this.player.getPositionY() + event.getDeltaY());
    // },
    
    gameOver: function() {
        this.gameOverFlag = true;
        this.node.off(cc.Node.EventType.TOUCH_MOVE, touchEvent, this.node);
        var playerDestroyAni = this.player.getComponent('cc.Animation');
        playerDestroyAni.play('playerDestroy');
        // this.player.destroy();
        this.button.interactable = true;
        this.button.node.opacity = 255;
        this.retryLabel.node.opacity = 255;
        cc.director.getScheduler().unscheduleUpdate();
        cc.audioEngine.stop(this.currentBackGroundAudio);
    }
    
});
