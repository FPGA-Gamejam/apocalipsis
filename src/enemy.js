class Enemy {
	constructor(level, x, y, life) {
		this.level = level;
        this.stun = false;
        this.stuntime = 0;
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

        this.health = life;
        
        this.level.world.on("beginContact",function(event){
            var sensors = [
                this.level.cha.hitbody, this.level.cha.hitbody_i
            ];
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0] || event.bodyA==sensors[1] || event.bodyB==sensors[1]){
                if (event.bodyA == this.body) {
                    this.level.cha.en_sensor.push(this);
                }
                else if (event.bodyB == this.body) {
                    this.level.cha.en_sensor.push(this);
                }
            } 
        }, this);
        
        this.level.world.on("endContact",function(event){
            var sensors = [
                this.level.cha.hitbody, this.level.cha.hitbody_i
            ];
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0] || event.bodyA==sensors[1] || event.bodyB==sensors[1]){
                for (var i = this.level.cha.en_sensor.length - 1; i != -1; i--) {
                    if (event.bodyA == this.body) {
                    this.level.cha.en_sensor.splice(i, 1);
                    }
                    else if (event.bodyB == this.body) {
                        this.level.cha.en_sensor.splice(i, 1);
                    }
                }
            }
        }, this);
	}
	update(dt) {

	}
	draw() {
		drawBody(this.body);
		//drawBody(this.sensor.body);
        image(troyanpike_idle, this.body.position[0] - 50, this.body.position[1] - 100);
	}
}