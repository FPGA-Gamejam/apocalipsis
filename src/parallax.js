class Parallax {
	constructor() {
		this.screenDimentions = {
			width: width,
			heigth: height,
		}
		this.layer = [
			{pos: [0, 0], dest: [0, 0], dist: 1},
			{pos: [0, 0], dest: [0, 0], dist: 2},
		]
		this.pos = [0, 0];
		this.dest = [0, 0];
		this.scale = 0.5;
	}
	target(x, y, l) {
		var dim = this.screenDimentions;
		this.layer[l].dest[0] = x - dim.width / (1 / this.layer[l].dist * 2);
		this.layer[l].dest[1] = y - dim.heigth / (1 / this.layer[l].dist * 2);
	}
	worldToScreen(x, y, l) {
		return [(x + this.layer[l].pos[0]) * this.layer[l].dist, (y + this.layer[l].pos[1]) * this.layer[l].dist];
	}
	screenToWorld(x, y, l) {
		return [x / this.layer[l].dist - this.layer[l].pos[0], y / this.layer[l].dist - this.layer[l].pos[1]];
	}
	update(dt) {
		for (var i = 0; i != this.layer.length; i++) {
			this.layer[i].pos[0] = this.layer[i].pos[0] + ((-this.layer[i].dest[0] - this.layer[i].pos[0]) * dt * 5);
			this.layer[i].pos[1] = this.layer[i].pos[1] + ((-this.layer[i].dest[1] - this.layer[i].pos[1]) * dt * 5);
		}
	}
	draw(l) {
		scale(8 / (10*this.layer[l].dist));
		translate(this.layer[l].pos[0], this.layer[l].pos[1]);
	}
}
