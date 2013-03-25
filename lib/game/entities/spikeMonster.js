ig.module(
    'game.entities.spikeMonster'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntitySpikeMonster = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/labgrenade/spike.png', 16, 9 ),
    size: {x: 16, y: 9},
    maxVel: {x: 150, y: 130},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 15,
    health: 30,
    jump: 130,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );  
        this.addAnim( 'crawl', 0.08, [0,1,2] );
        this.player  = ig.game.getEntitiesByType(EntityPlayerGrenader)[0];

        // Sounds
        sound_dmg = new ig.Sound('media/labgrenade/sounds/damage.ogg');
    },

    // AI to move monster near collision and flip 
    update: function() {
        // near an edge? return!
        if( !ig.game.collisionMap.getTile(
            this.pos.x + (this.flip ? +4 : this.size.x -4),
                this.pos.y + this.size.y+1
            )
        ) {
            this.flip = !this.flip;
        }

        if(this.distanceTo(this.player) < 40 && this.standing) {
            this.vel.y = -this.jump;
        }

        var xdir = this.flip ? -1 : 1;
        this.vel.x = this.speed * xdir; 
        this.parent();
    },

    // Receive Damage to collision entities
    check: function( other ) {
        other.receiveDamage( 2, this );
        sound_dmg.play();
    },

    // Causes monster to flip when collides with wall
    handleMovementTrace: function( res ) {
        this.parent( res );
            
        // collision with a wall? return!
        if( res.collision.x ) {
            this.flip = !this.flip;
        }
    },

});
});