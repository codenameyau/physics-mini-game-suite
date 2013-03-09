ig.module( 
	'game.pandaplay' 
)
.requires(
	'impact.game',
	'game.levels.pandaplay.pandalevel1'
)
// Game l
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
	
	// Load a font
	font: new ig.Font( 'media/pandaplay/04b03.font.png' ),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		// bind keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.C, 'shoot');
		
		// load level
		this.loadLevel(LevelPandalevel1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});
