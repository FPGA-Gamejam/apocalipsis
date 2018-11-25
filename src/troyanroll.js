class Troyanroll extends Enemy{
	constructor(level, x, y) {
		super(level, x, y);
	}
	update(dt) {
		
	}
	draw() {
		image(troyanroll_idle, this.body.position[0] - 50, this.body.position[1] - 100);
	}
}