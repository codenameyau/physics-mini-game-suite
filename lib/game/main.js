ig.module( 
        'game.main' 
)
.requires(
        'impact.game',
        'impact.entity',
        'game.levels.demoGravity',
        'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({       
        
        init: function() {

                this.loadLevel(LevelDemoGravity);
        },
        
        update: function() {

                this.parent();
        },
        
        draw: function() {

                this.parent();
        }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 160, 2 );

});