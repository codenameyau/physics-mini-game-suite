ig.module('game.entities.jetpackPlayer')

.requires(
    'impact.entity'
)

.defines(function() {

EntityJetpackPlayer = ig.Entity.extend({

    // Animation Sheet
    animSheet: new ig.AnimationSheet('media/jetpack/player.png', 16, 20),

    // Collision Properties
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    // Entity Properties
    size: {x: 16, y: 20},
    maxVel: {x: 150, y: 180},
    offset: {x: 0, y: -20},
    flip: false,
    
    init: function( x, y, settings ) {

        this.parent( x, y, settings );
        this.addAnim('idle', 1, [0]);
        this.addAnim('flight', 1, [1]);
        this.accel.y = 150;
    },
    
    update: function() {
        
        if (ig.input.state('right')) {
            this.vel.x = 60;
            this.flip = false;
        }
        else if (ig.input.state('left')) {
            this.vel.x = -60;
            this.flip = true;
        }
        else {
            this.vel.x = 0;
        }

        if (ig.input.state("flight")) {
            // Set max flight acceleration
            if (this.vel.y > -100)
                this.vel.y = this.vel.y - 10;
            this.currentAnim = this.anims.flight;
        }
        else{
            this.currentAnim = this.anims.idle;
        }

        // Enable flip
        this.currentAnim.flip.x = this.flip;
        this.parent(); 
    }
});
});
