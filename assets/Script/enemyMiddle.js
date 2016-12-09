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
        beAttackedRadius: 0,
        beCrashed: 0,
        hp: 0
    },

    // use this for initialization
    onLoad: function () {
        this.node.hp = 2;
        this.moveSpeed = 5;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.y - (this.node.height / 2) > -500) {
            this.node.y = this.node.y - this.moveSpeed;
        } else {
            this.node.destroy();
        }
    },
    
    enemyStopMove: function() {
        this.moveSpeed = 0;
        this.node.group = 'none';
        cc.audioEngine.playEffect(this.explodeAudio, false);
    },
    
    enemyDestroy: function() {
        this.node.destroy(); 
    },
    
    onCollisionEnter: function (other, self) {
        if(other.getComponent("player") !== null) {
            console.log('over!');
            this.game.gameOver();
        }
    },
});
