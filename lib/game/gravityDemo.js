ig.module( 
	'game.gravityDemo' 
)
.requires(
	'impact.game',
	'impact.entity',
	'game.levels.gravityDemo.gravityDemo',
	'game.entities.gravityPlayer'
)
.defines(function(){

MyGame = ig.Game.extend({	
	
	init: function() {

		this.loadLevel(LevelGravityDemo);
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
