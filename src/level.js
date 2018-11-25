 class Level {
	constructor(svg) {
		this.world = new p2.World({gravity: [0, 700]});
		this.terrain = new Terrain(this, svg);
		this.parallax = new Parallax();
        this.cameraXoffset = 0;
        this.cameraYoffset = 0;
        this.life_roll=3;

		//**ENEMIES**
		this.enemyarray = [];
		var enemies = svg.layer("npc");
		enemies.forEach(function(obj) {
			if (obj.type == "circle") {
				var enemy = new Troyanroll(this, obj.x, obj.y, this.life_roll);
	        	this.enemyarray.push(enemy);
			}
		}, this);

		this.cha = new cha(this, 300, 500, 50);
	}
	update(dt) {
		this.world.step(dt);
		this.cha.update(dt);
        if (keyIsDown(73)) {
			this.cameraYoffset -= 50;
		}
		else if (keyIsDown(75)) {
			this.cameraYoffset += 50;
		}
		if (keyIsDown(74)) {
			this.cameraXoffset -= 50;
		}
		else if (keyIsDown(76)) {
			this.cameraXoffset += 50;
		}
		var cameray = this.cha.personbody.position[1];
		if (cameray > 450) {cameray = 450};
		this.parallax.target(this.cha.personbody.position[0] + this.cameraXoffset, cameray + this.cameraYoffset, 0);
		this.parallax.target(this.cha.personbody.position[0] + this.cameraXoffset, cameray + this.cameraYoffset, 1);
		this.parallax.update(dt);
        this.enemyarray.forEach(function(enemy) {
			enemy.update(dt);
		});
        for (var i=this.enemyarray.length-1;i!=-1;i--){
            if(this.enemyarray[i].health==0){
                this.world.removeBody(this.enemyarray[i].body);
                delete this.enemyarray[i];
                this.enemyarray.splice(i,1);
            }
        }
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
