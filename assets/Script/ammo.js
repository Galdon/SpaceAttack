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
        
        playerFireAudio: {
            default: null,
            url: cc.AudioClip
        },
        
        attackRadius: 0,
        moveSpeed: 0
    },

    // use this for initialization
    onLoad: function () {
        cc.audioEngine.playEffect(this.playerFireAudio, false);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.y + (this.node.height / 2) < 500) {
            this.node.y = this.node.y + 10;
        } else {
            this.node.destroy();
        }
    },
    
    onCollisionEnter: function (other, self) {
        if(other.getComponent("enemySmall") !== null) {
            self.node.destroy();
            other.node.hp = other.node.hp - 1;
            if(other.node.hp <= 0) {
                this.game.gainScore(1);
                var smallDestroyAni = other.node.getComponent('cc.Animation');
                smallDestroyAni.play('enemySmallDestroy');
            }
        }
        if(other.getComponent("enemyMiddle") !== null) {
            self.node.destroy();
            other.node.hp = other.node.hp - 1;
            if(other.node.hp <= 0) {
                this.game.gainScore(3)
                var middleDestroyAni = other.node.getComponent('cc.Animation');
                middleDestroyAni.play('enemyMiddleDestroy');
            }
        }
    }
    
});
