ig.module('game.entities.gravityPlayer')
.requires(
	'impact.input',
	'impact.entity',
	'impact.timer'
)
.defines(function() {

EntityGravityPlayer = ig.Entity.extend({

	collides: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,

	size: {x: 8, y: 8},

	_wmDrawBox: true,
	_wmBoxColor: '#0000ff',
	
	animSheet: new ig.AnimationSheet('media/gravityDemo/backgrounds.png', 8, 8),

	jumpTimer: new ig.Timer(),
	
	init: function( x, y, settings ) {

		ig.input.bind(ig.KEY.RIGHT_ARROW, 'moveRight');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'moveLeft');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.X, 'thrust');
		this.addAnim('frozen', 1, [0]);
		this.addAnim('badass', 0.5, [0,1]);
		this.currentAnim = this.anims.badass;
		this.accel.y = 150;


		this.parent( x, y, settings );		
	},
	
	update: function() {

		if (ig.input.pressed('jump') && (this.vel.y == 0)) {

			this.vel.y = -90;
		}
		
		if (ig.input.state('moveRight')) {
			this.vel.x = 40;
		}
		else if (ig.input.state('moveLeft')) {
			this.vel.x = -40;
		}
		else {
			this.vel.x = 0;
		}

		if (ig.input.state("thrust") && (this.vel.y > -25)) {
			this.vel.y = this.vel.y - 10;
		}

		this.parent(); 
	}
});
});
