 class Level {
	constructor(svg) {
		this.world = new p2.World({gravity: [0, 200]});
		this.terrain = new Terrain(this, svg);
		this.parallax = new Parallax();

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

		this.cha = new cha(100, 100, 50, this.world);
	}
	update(dt) {
		this.world.step(dt);
		this.cha.update(dt);
		var cameray = this.cha.personbody.position[1];
		if (cameray > 450) {cameray = 450};
		this.parallax.target(this.cha.personbody.position[0], cameray, 0);
		this.parallax.target(this.cha.personbody.position[0], cameray, 1);
		this.parallax.update(dt);
	}
	draw() {
		//fondo
		push();
		this.parallax.draw(1);
		var dist = this.parallax.layer[1].dist;
		image(level3_bg, -1400, -720 * (1 / dist), 3200 * dist, 900 * dist);
		pop();
		//nivel
		push();
		this.parallax.draw(0);
		drawBody(this.terrain.body);
		this.enemyarray.forEach(function(enemy) {
			drawBody(enemy);
		});
		this.cha.draw();
		pop();
	}
}