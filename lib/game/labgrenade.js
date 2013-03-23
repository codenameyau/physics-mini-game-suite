ig.module( 
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.labgrenade.test',
	'game.entities.playerGrenader',
	'game.entities.spikeMonster'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 300,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		// load level
		this.loadLevel( LevelTest );

		// Bind keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.X, 'shoot');

		// Background Music
		ig.music.add( 'media/labgrenade/sounds/bgmusic.ogg' );
		ig.music.loop = true;
		ig.music.play();
	},
	
	update: function() {		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayerGrenader )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2+10;
			}
		// Update all entities and BackgroundMaps
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
	}
});

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 500, 240, 2 );
});
