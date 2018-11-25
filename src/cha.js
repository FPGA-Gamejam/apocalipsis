var posY=false;
var contact=true;
var double=false; //false sin salto, true doble salto utilizado
var sensors=[];
var hit=false;
var pum_d=false;
var pum_i=false;
var posX=true; //true derecha, false izquierda
var count=0;
var relY = true;
var jumpTimeFirst = 0.05;
var jumpTimeSecond = 0.05;
var canJumpFirst = false;
var canJumpSecond = false;
var canJump = true;
var hit = false;

function keyPressed(){
    if(keyCode == UP_ARROW){
        posY=true;
    }
    if (key == "a") {
        hit = true;
    }
}

function keyReleased(){
    if (keyCode == UP_ARROW){
        posY=false;
    }
}

class cha{
    constructor (x, y, r, world){
        this.x=x;
        this.y=y;
        this.r=r;
        
        this.en_sensor=[];

        //char
        this.personbody = new p2.Body({mass: 5, position: [this.x, this.y], fixedRotation: true});
        this.personshape = new p2.Circle({radius: this.r});
        this.personbody.addShape(this.personshape);
        world.addBody(this.personbody);
        
        //sensor
        this.sensorbody = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.sensorshape = new p2.Box({width: 60, height: 20});
        this.sensorshape.sensor=true;
        this.sensorbody.addShape(this.sensorshape);
        world.addBody(this.sensorbody);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.sensorbody, {
            localPivotA: [0, 50]
        });
        world.addConstraint(constraint);
        sensors.push(this.sensorbody);
        
        //puño derecha
        this.hitbody = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.hitshape = new p2.Circle({radius: 20});
        this.hitshape.sensor=true;
        this.hitbody.addShape(this.hitshape);
        world.addBody(this.hitbody);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.hitbody, {
            localPivotA: [70, -10]
        });
        world.addConstraint(constraint);
        sensors.push(this.hitbody);
        
        //puño izquierda
        this.hitbody_i = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.hitshape_i = new p2.Circle({radius: 20});
        this.hitshape_i.sensor=true;
        this.hitbody_i.addShape(this.hitshape_i);
        world.addBody(this.hitbody_i);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.hitbody_i, {
            localPivotA: [-70, -10]
        });
        world.addConstraint(constraint);
        sensors.push(this.hitbody_i);
        
        this.world=world;
        this.level=level;

        this.world.on("endContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0] ){
                count -= 1;
                if (count <= 1) {
                    contact=false;
                    if(double==true){
                        posY=false;
                    }
                }

            }
        });
        this.world.on("beginContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0]){
                count += 1;
                if (count > 1) {
                    jumpTimeFirst = 0.05;
                    jumpTimeSecond = 0.05;
                }
                contact=true;
                double=false;
            }
        });

        this.cha_anim = new cha_anim(this);
    }
    update(dt){
        console.log(this.en_sensor.length);
        var vel = this.personbody.velocity;
        var pos = this.personbody.position;
        if(keyIsDown(RIGHT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(200, vel[1]);
            posX=true;
        }
        else if(keyIsDown(LEFT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(-200, vel[1]);
            posX=false;
        }
        else{
            this.personbody.velocity = p2.vec2.fromValues(0, vel[1]);
        }
        vel = this.personbody.velocity;
        if (vel[1] > 500) {
            this.personbody.velocity = p2.vec2.fromValues(vel[0], 500);
        }
        //salto
        vel = this.personbody.velocity;
        if (posY && canJumpSecond) {
            jumpTimeSecond = jumpTimeSecond - dt;
            if (jumpTimeSecond > 0) {
                canJumpSecond = true;
                this.personbody.velocity = p2.vec2.fromValues(vel[0], -400);
            }
            else {
                canJumpSecond = false;
            }
        }
        if (posY && canJumpFirst) {
            jumpTimeFirst = jumpTimeFirst - dt;
            if (jumpTimeFirst > 0) {
                canJumpFirst = true;
                this.personbody.velocity = p2.vec2.fromValues(vel[0], -500);
            }
            else {
                canJumpFirst = false;
            }
        }
        else {
            if (!contact) {
                jumpTimeFirst = 0;
                canJumpFirst = false;
                if (!posY && jumpTimeSecond > 0) {
                    canJumpSecond = true;
                }
                if (vel[1] < 0 && !posY) {
                    this.personbody.velocity = p2.vec2.fromValues(vel[0], vel[1] * 0.75);
                }
            }
            else {
                if (!posY) {
                    canJumpFirst = true;
                    canJumpSecond = false;
                }
            }
        }
        //golpe
        if(hit==true && pum_d==true && posX==true){
            console.log("golpe derecha", timer);
            timer=timer-dt;
            if (timer <= 0) {
                hit=false;
            }
        }
        if(hit==true && pum_i==true && posX==false){
            console.log("golpe izquierda", timer);
            timer=timer-dt;
            if (timer <= 0) {
                hit=false;
            }
        }
        this.cha_anim.update(dt, contact)

        if (hit) {
            for (var i = 0; i != this.en_sensor.length; i++) {
                var enemy = this.en_sensor[i];
                enemy.health -= 1;
                console.log(enemy.health);
            }
            hit = false;
        }
    }
    draw(){
        drawBody(this.personbody);
        drawBody(this.hitbody);
        drawBody(this.hitbody_i);
        //image(panda_idle, this.personbody.position[0] - 55, this.personbody.position[1] - 140);
        this.cha_anim.draw();
    }
} 