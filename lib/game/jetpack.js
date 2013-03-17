ig.module( 
	'game.jetpack' 
)
.requires(
	'impact.game',
	'impact.entity',
	'game.levels.jetpack.jetpack',
	'game.entities.jetpackPlayer'

)
.defines(function(){

MyGame = ig.Game.extend({	

	gravity: 300,
	init: function() {

		this.loadLevel(LevelJetpack);
		// Bind keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.X, 'flight');
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
ig.main( '#canvas', MyGame, 60, 520, 260, 2 );

});
