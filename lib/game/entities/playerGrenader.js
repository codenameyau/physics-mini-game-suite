ig.module(
    'game.entities.playerGrenader'
)
.requires(
    'impact.entity'
)
.defines(function(){
EntityPlayerGrenader = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/labgrenade/player.png', 16, 16 ),
    size: {x: 8, y:14},
    offset: {x: 4, y: 2},
    flip: false,
    maxVel: {x: 70, y: 130},
    friction: {x: 80, y: 0},
    accelGround: 70,
    accelAir: 70,
    jump: 128,
    health: 200,
    // Collision Properties
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.grenadeCounter = 0;

        // Sound Initialization
        sound_shoot = new ig.Sound( 'media/labgrenade/sounds/shoot.ogg' );
        sound_jump  = new ig.Sound( 'media/labgrenade/sounds/jump1.ogg' );

        // Add the animations
        this.addAnim( 'idle', 1, [0] );
        this.addAnim( 'run', 0.08, [0,1,2,3,4,5] );
        this.addAnim( 'jump', 1, [9] );
        this.addAnim( 'fall', 0.4, [6,7] );
    },

    update: function() {
          // move left or right
        var accel = this.standing ? this.accelGround : this.accelAir;
        if( ig.input.state('left') ) {
            this.accel.x = -accel;
            this.flip = true;
        }
        else if( ig.input.state('right') ) {
            this.accel.x = accel;
            this.flip = false;
        }
        else {
            this.accel.x = 0;
        }
        // jump
        if( this.standing && ig.input.pressed('jump') ) {
            this.vel.y = -this.jump;
            sound_jump.play();
        }

        // set the current animation, based on the player's speed
        if( this.vel.y < 0 ) {
            this.currentAnim = this.anims.jump;
        }
        else if( this.vel.y > 0 ) {
            this.currentAnim = this.anims.fall;
        }
        else if( this.vel.x != 0 ) {
            this.currentAnim = this.anims.run;
        }
        else {
            this.currentAnim = this.anims.idle;
        }

        // shoot
        if( ig.input.pressed('shoot') && this.grenadeCounter < 2 ){
            this.grenadeCounter += 1;
            ig.game.spawnEntity( EntitySlimeGrenade, this.pos.x, this.pos.y, {flip:this.flip} );
            sound_shoot.play();
        }

        // Enable flip
        this.currentAnim.flip.x = this.flip;
        // move!
        this.parent();
    },

});

// Weapon For Player
EntitySlimeGrenade = ig.Entity.extend({
    size: {x: 4, y: 4},
    offset: {x: 2, y: 0},
    animSheet: new ig.AnimationSheet( 'media/labgrenade/slime-grenade.png', 8, 8 ),
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    maxVel: {x: 160, y: 100},
    bounciness: .6,
    bounceCounter: 0,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
        this.vel.y = -50;
        this.addAnim( 'idle', 0.2, [0,1] );
        this.player  = ig.game.getEntitiesByType(EntityPlayerGrenader)[0];

        // Explosion Sound
        sound_bomb  = new ig.Sound( 'media/labgrenade/sounds/explosion.ogg' );
    },

    handleMovementTrace: function( res ) {
        this.parent( res );
        if( res.collision.x || res.collision.y ) {
            // only bounce 5 times
            this.bounceCounter++;
            if( this.bounceCounter > 5 ) {
                this.kill();
                this.player.grenadeCounter -= 1;
            }
        }
    },

    check: function( other ) {
        other.receiveDamage( 10, this );
        sound_bomb.play();
        this.kill();
        this.player.grenadeCounter -= 1;
    },

});

});