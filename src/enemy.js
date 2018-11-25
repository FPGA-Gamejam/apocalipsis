class Enemy {
	constructor(level, x, y) {
		this.level = level;

        //fisicas
        this.body = new p2.Body({mass: 5, position: [x, y], fixedRotation: true});
        this.shape = new p2.Circle({radius: 30});
        this.body.addShape(this.shape);
        this.level.world.addBody(this.body);
        this.sensor = {
        	body: new p2.Body({mass: 1, position: [x, y + this.shape.radius], fixedRotation: true}),
        	shape: new p2.Box({width: this.shape.radius * 1.5, height: 20})
        }
        this.sensor.shape.sensor = true;
        this.sensor.body.addShape(this.sensor.shape);
        this.level.world.addBody(this.sensor.body);
        var constraint = new p2.RevoluteConstraint(this.body, this.sensor.body, {
            localPivotA: [0, this.shape.radius]
        });
        this.level.world.addConstraint(constraint);

        this.health = 100;
	}
	update(dt) {
		
	}
	draw() {
		//drawBody(this.body);
		//drawBody(this.sensor.body);
        image(troyanpike_idle, this.body.position[0] - 50, this.body.position[1] - 100);
	}
}