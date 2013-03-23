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
    maxVel: {x: 150, y: 200},
    offset: {x: 0, y: -2},
    flip: false,
    friction: {x:40, y:20},

    // Game Properties
    health: 20,

    init: function( x, y, settings ) {

        this.parent( x, y, settings );
        this.addAnim('idle', 1, [0]);
        this.addAnim('flight', 1, [1]);

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

        // Shoot projectile
        if( ig.input.pressed('shoot') ) {
            ig.game.spawnEntity( EntityProjectile, this.pos.x, this.pos.y, {flip:this.flip} );
        }

        // Enable flip
        this.currentAnim.flip.x = this.flip;
        this.parent(); 
    }
});

    // Weapon Projectile for player
    EntityProjectile = ig.Entity.extend({

        animSheet: new ig.AnimationSheet( 'media/jetpack/projectile.png', 8, 4 ),

        // Collision Properties
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.LITE,

        // Entity Properties
        size: {x: 8, y: 4},
        offset: {x: -5, y: 4},
        maxVel: {x: 600, y: 100},
        bounciness: .5,
        bounceCounter: 0,
        minBounceVelocity: 40,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -10;
            this.addAnim( 'idle', 1, [0] );
        },

        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ) {
                this.bounceCounter++;
                if( this.bounceCounter > 20 ) {
                    this.kill();
                }
            }
        },

        check: function( other ) {
            other.receiveDamage( 10, this );
            this.kill();
        },

    });

});
