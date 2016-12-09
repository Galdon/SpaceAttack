cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        explodeAudio: {
            default: null,
            url: cc.AudioClip
        },
        
        moveSpeed: 0,
        
        playerAmmo: {
            default: null,
            type: cc.Prefab
        }
    },
    
    setInputControl: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.w:
                        // self.node.runAction(cc.moveBy(0, cc.p(0, 50)));
                        self.upMoveSpeed = 1;
                        self.downMoveSpeed = 0;
                        break;
                    case cc.KEY.a:
                        // self.node.runAction(cc.moveBy(0, cc.p(-5, 0)).repeatForever());
                        self.leftMoveSpeed = 1;
                        self.rightMoveSpeed = 0;
                        break;
                    case cc.KEY.s:
                        // self.node.runAction(cc.moveBy(0, cc.p(0, -5)).repeatForever());
                        self.upMoveSpeed = 0;
                        self.downMoveSpeed = 1;
                        break;
                    case cc.KEY.d:
                        // self.node.runAction(cc.moveBy(0, cc.p(5, 0)).repeatForever());
                        self.leftMoveSpeed = 0;
                        self.rightMoveSpeed = 1;
                        break;
                    case cc.KEY.j:
                        // this.createPlayerAmmo();
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.w:
                        // self.node.runAction(cc.moveBy(0, cc.p(0, 50)));
                        self.upMoveSpeed = 0;
                        break;
                    case cc.KEY.a:
                        // self.node.runAction(cc.moveBy(0, cc.p(-5, 0)).repeatForever());
                        self.leftMoveSpeed = 0;
                        break;
                    case cc.KEY.s:
                        // self.node.runAction(cc.moveBy(0, cc.p(0, -5)).repeatForever());
                        self.downMoveSpeed = 0;
                        break;
                    case cc.KEY.d:
                        // self.node.runAction(cc.moveBy(0, cc.p(5, 0)).repeatForever());
                        self.rightMoveSpeed = 0;
                        break;
                }
            }
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {
        this.upMoveSpeed = 0;
        this.downMoveSpeed = 0;
        this.leftMoveSpeed = 0;
        this.rightMoveSpeed = 0;
        // this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.x > this.node.width - 310) {
            if(this.leftMoveSpeed !== 0) {
                this.node.x = this.node.x - 10;
            }
        }
        if(this.node.x + this.node.width < 310) {
            if(this.rightMoveSpeed !== 0) {
                this.node.x = this.node.x + 10;
            }
        }
        if(this.node.y - (this.node.height / 2) > -450) {
            if(this.downMoveSpeed !== 0) {
                this.node.y = this.node.y - 10;
            }
        }
        if(this.node.y + (this.node.height / 2) < 430) {
            if(this.upMoveSpeed !== 0) {
                this.node.y = this.node.y + 10;
            }
        }
        
        // console.log(this.node.x + ',' + this.node.y);

    },
    
    stopMove: function() {
        cc.audioEngine.playEffect(this.explodeAudio, false);
        this.node.group = 'none';
    },
    
    playerDestroy: function() {
        console.log('destroy');
        this.node.destroy();
    },
    
    // onCollisionEnter: function (other, self) {
    //     if(other.getComponent("enemySmall") || other.getComponent("enemyMiddle")) {
    //         this.game.gameOver();
    //     }
    // }
    
});
