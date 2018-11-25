 class Level {
	constructor(svg) {
		this.world = new p2.World({gravity: [0, 700]});
		this.terrain = new Terrain(this, svg);
		this.parallax = new Parallax();

		//**ENEMIES**
		this.enemyarray = [];
		var enemies = svg.layer("npc");
		enemies.forEach(function(obj) {
			if (obj.type == "circle") {
				var enemy = new Enemy(this, obj.x, obj.y);
	        	this.enemyarray.push(enemy);
			}
		}, this);

		this.cha = new cha(300, 500, 50, this.world);
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
			enemy.draw();
		});
		this.terrain.draw();
		this.cha.draw();
		pop();
	}
}