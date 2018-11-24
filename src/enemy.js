class Enemy {
	constructor(level, x, y) {
		//char
		this.level = level;
        this.body = new p2.Body({mass: 5, position: [x, y], fixedRotation: true});
        this.body.angle = Math.PI / 2;
        this.shape = new p2.Capsule({length: 60, radius: 10});
        this.body.addShape(this.shape);
        this.level.world.addBody(this.body);
	}
	draw() {
		drawBody(this.body);
	}
}