 class Level {
	constructor(svg) {
		this.world = new p2.World({gravity: [0, 90]});
		this.terrain = new Terrain(this, svg);
		this.camera = new Camera();

		//**ENEMIES**
		this.enemyarray = [];
		var enemies = svg.layer("Enemies");
		enemies.forEach(function(obj) {
			if (obj.type == "circle") {
				var enemybody = new p2.Body({mass: 5, position: [obj.x, obj.y]});
				var enemyshape = new p2.Circle({radius: obj.r});
				enemybody.addShape(enemyshape);
				this.world.addBody(enemybody);
	        	this.enemyarray.push(enemybody);
			}
		}, this);

		this.cha = new cha(100, 100, 100, this.world);
	}
	update(dt) {
		this.world.step(dt);
		this.cha.update(dt);
		this.camera.target(this.cha.personbody.position[0], this.cha.personbody.position[1])
		this.camera.update(dt);
	}
	draw() {
		push();
		this.camera.draw();
		drawBody(this.terrain.body);
		this.enemyarray.forEach(function(enemy) {
			drawBody(enemy);
		});
		this.cha.draw();
		pop();
	}
}