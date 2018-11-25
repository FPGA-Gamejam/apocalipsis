class cha_anim {
	constructor(cha) {
		this.cha = cha;
		this.anims = {
			idle: [
				{image: panda_stan, time: 0.5, offset: [0, 47]},
			],
			run: [
				{image: panda_stan, time: 0.1, offset: [0, 47]},
				{image: panda_mov, time: 0.1, offset: [0, 47]},
			],
			fall: [
				{image: panda_fall, time: 0.1, offset: [0, 47]},
			],
			air: [
				{image: panda_jump, time: 0.1, offset: [0, 47]},
			],
			punch: [
				{image: panda_punch, time: 0.1, offset: [0, 47]},
			],
			damage: [
				{image: panda_damage, time: 0.1, offset: [0, 47]},
			]
		}
		this.face = 1;
		this.currentAnim = this.anims.run;
		this.lastAnim = this.currentAnim;
		this.timer = 0;
		this.frame = 0;
		this.hitLock = 0;
	}
	update(dt, contact, hit, stun) {
		var vel = this.cha.personbody.velocity;
		if (stun) {
			console.log("stun");
			this.currentAnim = this.anims.damage;
		}
		else {
			if (hit) {
				this.hitLock = 0.15;
			}
			if (this.hitLock > 0) {
				this.hitLock -= dt;
				this.currentAnim = this.anims.punch;
			}
			else {
				if (vel[0] < -5) {
					this.face = -1;
				}
				else if (vel[0] > 5) {
					this.face = 1;
				}
				if (!contact) {
					if (vel[1] < 200) {
						this.currentAnim = this.anims.air;
					}
					else {
						this.currentAnim = this.anims.fall;
					}
				}
				else {
					if (Math.abs(vel[0]) <= 5) {
						this.currentAnim = this.anims.idle;
					}
					else {
						this.currentAnim = this.anims.run;
					}
				}
			}
		}
		if (this.lastAnim != this.currentAnim) {
			this.frame = 0;
			this.timer = 0;
		}
		this.timer += dt;
		if (this.timer >= this.currentAnim[this.frame].time) {
			this.frame += 1;
			if (!this.currentAnim[this.frame]) {
				this.frame = 0;
			}
			this.timer = 0;
		}
	}
	draw() {
		var pos = this.cha.personbody.position;
		push()
		translate(pos[0] - this.currentAnim[this.frame].image.width / 2 - this.currentAnim[this.frame].offset[0], pos[1] - this.currentAnim[this.frame].image.height / 2 - this.currentAnim[this.frame].offset[1])
		scale(this.face, 1);
		if (this.face == -1) {
			translate(-this.currentAnim[this.frame].image.width, 0);
		}
		image(this.currentAnim[this.frame].image, 0, 0);
		pop();
	}
}