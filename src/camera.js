class Camera {
	constructor() {
		this.screenDimentions = {
			width: width,
			heigth: height,
		}
		this.pos = [0, 0];
		this.dest = [0, 0];
		this.scale = 1;
	}
	target(x, y) {
		var dim = this.screenDimentions;
		this.dest[0] = x - dim.width / (this.scale * 2);
		this.dest[1] = y - dim.heigth / (this.scale * 2);
	}
	worldToScreen(x, y) {
		return [(x + this.pos[0]) * this.scale, (y + this.pos[1]) * this.scale];
	}
	screenToWorld(x, y) {
		return [x / this.scale - this.pos[0], y / this.scale - this.pos[1]];
	}
	update(dt) {
		this.pos[0] = this.pos[0] + ((-this.dest[0] - this.pos[0]) * dt * 10);
		this.pos[1] = this.pos[1] + ((-this.dest[1] - this.pos[1]) * dt * 10);
	}
	draw() {
		scale(this.scale);
		translate(this.pos[0], this.pos[1]);
	}
}