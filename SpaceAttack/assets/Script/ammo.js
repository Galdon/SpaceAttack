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
        attackRadius: 0,
        moveSpeed: 0
    },

    // use this for initialization
    onLoad: function () {
        
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
                other.node.destroy();
            }
        }
        if(other.getComponent("enemyMiddle") !== null) {
            self.node.destroy();
            other.node.hp = other.node.hp - 1;
            if(other.node.hp <= 0) {
                this.game.gainScore(3)
                other.node.destroy();
            }
        }
    }
    
});
