 class Level {
	constructor(svg) {
		this.world = new p2.World({gravity: [0, 700]});
		this.world.setGlobalStiffness(100000);
		this.world.defaultContactMaterial.friction = 0.0;
		this.terrain = new Terrain(this, svg);
		this.parallax = new Parallax();
        this.cameraXoffset = 0;
        this.cameraYoffset = 0;
        this.life_roll=2;
        this.life_pike=3;
        this.life_boss=10;
        this.svg=svg;
   this.bgXSize = 3200*1.5;
   this.bgYSize = 900*1.5;
   this.bgXOrigin = 0;
   this.bgYOrigin = 0;
		//**ENEMIES**
		this.enemyarray = [];
		var enemies = svg.layer("npc");
		enemies.forEach(function(obj) {
			if (obj.type == "circle") {
				if (obj.label == "enemy_ground") {
					var enemy = new Troyanroll(this, obj.x, obj.y, this.life_roll);
				}
				else if (obj.label == "enemy_fly") {
					var enemy = new Troyanpike(this, obj.x, obj.y, this.life_pike);
				}
				else if (obj.label == "enemy_boss") {
					var enemy = new Troyanboss(this, obj.x, obj.y, this.life_boss);
				}
	        	this.enemyarray.push(enemy);
			}
		}, this);

		this.cha = new cha(this, -4000, 300, 25);
        this.reset=false;
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
		var pos = rails(this.cha.personbody.position[0], this.cha.personbody.position[1])
		this.parallax.target(pos[0], pos[1], 0);
		this.parallax.update(dt);
        this.enemyarray.forEach(function(enemy) {
        		enemy.update(dt);
		});
        for (var i=this.enemyarray.length-1;i!=-1;i--){
            if(this.enemyarray[i].health==0 || this.enemyarray[i].body.position>2000){
                this.world.removeBody(this.enemyarray[i].body);
                delete this.enemyarray[i];
                this.enemyarray.splice(i,1);
            }
        }

        // if(this.cha.health==0 || this.cha.personbody.position[1]>2000){
        //     for (var i=this.enemyarray.length-1;i!=-1;i--){
        //         this.world.removeBody(this.enemyarray[i].body);
        //         delete this.enemyarray[i];
        //         this.enemyarray.splice(i,1);
        //     }
        // }
        /*this.enemyarray = [];
		var enemies = this.svg.layer("npc");
		enemies.forEach(function(obj) {
			if (obj.type == "circle") {
				if (obj.label == "enemy_ground") {
					var enemy = new Troyanroll(this, obj.x, obj.y, this.life_roll);
				}
				else if (obj.label == "enemy_fly") {
					var enemy = new Troyanpike(this, obj.x, obj.y, this.life_roll);
				}
				else if (obj.label == "enemy_boss") {
					var enemy = new Troyanboss(this, obj.x, obj.y, this.life_roll);
				}
	        	this.enemyarray.push(enemy);
			}
		});*/
	}
	draw() {
		//fondo
		push();
		this.parallax.draw(1);
		var dist = this.parallax.layer[1].dist;
		image(level3_bg, this.bgXOrigin, this.bgYOrigin * (1 / dist), this.bgXSize * dist, this.bgYSize * dist);
		pop();
		//nivel
		push();
		this.parallax.draw(0);
		//drawBody(this.terrain.body);
		this.terrain.draw();
		this.enemyarray.forEach(function(enemy) {
			enemy.draw();
		});
		this.cha.draw();

		//tutorial
		//var fizq = [-4000, 400];

		image(fizq, -4000, 400, 100, 100);
		image(fder, -3800, 400, 100, 100);
		image(fup, -3900, 300, 100, 100);
		image(fatt, -3900, 400, 100, 100);

		pop();
	}
}
