ig.module( 
	'game.jetpack' 
)
.requires(
	'impact.game',
	'impact.entity',
	'game.levels.jetpack.jetpack'
)
.defines(function(){

MyGame = ig.Game.extend({	
	
	init: function() {

		this.loadLevel(LevelJetpack);
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
