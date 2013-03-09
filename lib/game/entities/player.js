ig.module(
	'game.entities.player')
.requires(
	'impact.entity')
.defines(function() {
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/pandaplay/panda-sprite.png', 64, 64),
		size: {x:30, y:40},
		offset: {x:20, y:20},
		flip: false,
		maxVel: {x:100, y:150},
		friction: {x:600, y:0},
		accelGround: 400,
		accelAir: 200,
		jump: 200,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [24*11]);
			this.addAnim('run', 0.1, [24*11+0,24*11+1,24*11+2,24*11+3,24*11+4,24*11+5,24*11+6,24*11+7,24*11+8]);
			this.addAnim('jump', 1, [24*11+3]);
			this.addAnim('fall', 1, [24*3+5]);
		},
		update: function() {
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if (ig.input.state('right')) {
				this.accel.x = accel;
				this.flip = false;
			} else if (ig.input.state('left')) {
				this.accel.x = -accel;
				this.flip = true;
			} else {
				this.accel.x = 0;
			}
			
			if (ig.input.pressed('jump')) {
        // if (this.vel.y == 0) {
          this.vel.y = -this.jump;
        // }
			}

			
			if (this.vel.y < 0) {
				this.currentAnim = this.anims.jump
			} else if (this.vel.y > 0) {
				this.currentAnim = this.anims.fall;
			} else if (this.vel.x != 0) {
				this.currentAnim = this.anims.run;
			} else {
				this.currentAnim = this.anims.idle;
			}

      if (ig.input.pressed('shoot')) {
        ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {flip:this.flip});
      }
			
			this.currentAnim.flip.x = this.flip;
			this.parent();
		}
	});

  EntityBullet = ig.Entity.extend({
    size: {x: 10, y: 10},
    offset: {x: 0, y:0}, 
    animSheet: new ig.AnimationSheet('media/pandaplay/panda-weapon.png', 32, 32),
    maxVel:{x:300, y:500},
		// accelGround: 400,
		// accelAir: 200,
    bounciness: 1,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    jump:200,
    collides: ig.Entity.COLLIDES.PASSIVE, // make it active?
    init: function(x, y, settings) {
      this.parent(x + (settings.flip ? -32:32), y, settings);
      this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x:this.maxVel.x);
      this.vel.y = -400;
     this.addAnim('idle', 0.5, [0,1,2,], true);
    },
    handleMovementTrace: function(res) {
      this.parent(res);
      if (res.collision.x || res.collision.y) {
        if (res.collision.x) {
        this.accel.x = - this.accel.x;
        }
        // this.kill();
      }
    },
    check: function(other) {
      other.receiveDamage(0.1, this);
      this.kill();
    },
  });
});
