class Troyanboss extends Enemy {
	constructor(level, x, y, life) {
		super(level, x, y, life);
	}
	update(dt) {

	}
	draw() {
		drawBody(this.body);
	}
}