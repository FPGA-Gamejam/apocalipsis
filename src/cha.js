var posY=false;
var contact=true;
var double=false; //false sin salto, true doble salto utilizado
var sensors=[];
var hit=false;
var posX=true; //true derecha, false izquierda
var count=0;
var relY = true;
var jumpTimeFirst = 0.05;
var jumpTimeSecond = 0.05;
var canJumpFirst = false;
var canJumpSecond = false;
var canJump = true;
var hit = false;
var pum_d=false;
var pum_i=false;
var damage=1; //-1 izquierda, 1 derecha

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
    constructor (level, x, y, r){
        this.x=x;
        this.y=y;
        this.r=r;
        
        this.en_sensor=[];
        this.level=level;
        this.stun=false;
        this.stuntime=0.5;

        //char
        this.personbody = new p2.Body({mass: 5, position: [this.x, this.y], fixedRotation: true});
        this.personshape = new p2.Circle({radius: this.r});
        this.personbody.addShape(this.personshape);
        this.level.world.addBody(this.personbody);
        
        //sensor
        this.sensorbody = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.sensorshape = new p2.Box({width: 60, height: 20});
        this.sensorshape.sensor=true;
        this.sensorbody.addShape(this.sensorshape);
        this.level.world.addBody(this.sensorbody);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.sensorbody, {
            localPivotA: [0, 50]
        });
        this.level.world.addConstraint(constraint);
        sensors.push(this.sensorbody);
        
        //puño derecha
        this.hitbody = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.hitshape = new p2.Circle({radius: 20});
        this.hitshape.sensor=true;
        this.hitbody.addShape(this.hitshape);
        this.level.world.addBody(this.hitbody);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.hitbody, {
            localPivotA: [70, -10]
        });
        this.level.world.addConstraint(constraint);
        sensors.push(this.hitbody);
        
        //puño izquierda
        this.hitbody_i = new p2.Body({mass: 0.001, position: [this.x, this.y], fixedRotation: true, gravityScale: 0});
        this.hitshape_i = new p2.Circle({radius: 20});
        this.hitshape_i.sensor=true;
        this.hitbody_i.addShape(this.hitshape_i);
        this.level.world.addBody(this.hitbody_i);
        var constraint = new p2.RevoluteConstraint(this.personbody, this.hitbody_i, {
            localPivotA: [-70, -10]
        });
        this.level.world.addConstraint(constraint);
        sensors.push(this.hitbody_i);
        
        this.health=10;

        this.level.world.on("endContact",function(event){
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
        this.level.world.on("beginContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0]){
                count += 1;
                if (count > 1) {
                    jumpTimeFirst = 0.05;
                    jumpTimeSecond = 0.05;
                }
                contact=true;
                double=false;
            }
            if(event.bodyA==this.hitbody || event.bodyB==this.hitbody){
                damage=-100;
            }
            if(event.bodyA==this.hitbody_i || event.bodyB==this.hitbody_i){
                damage=100;
            }
            if(event.bodyA==this.personbody || event.bodyB==this.personbody){
                for(var i=0; i!=this.level.enemyarray.length;i++){
                    if(event.bodyA==this.level.enemyarray[i].body || event.bodyB==this.level.enemyarray[i].body){
                        if(this.level.enemyarray[i].stun==false){
                            this.level.enemyarray[i].stun=true;
                            this.level.enemyarray[i].stuntime = 0.5;
                            
                            this.level.enemyarray[i].body.velocity[0]=damage*-1;
                            
                            this.health-=1;
                            console.log(this.health);
                            //this.personbody.applyImpulse([damage,-1000]);
                            this.personbody.velocity[0]=damage;
                            this.personbody.velocity[1]=-200;
                            this.stun=true;
                            this.stuntime=0.3;
                        }
                    }
                }
            }
        }, this);

        this.cha_anim = new cha_anim(this);
    }
    update(dt){
        var vel = this.personbody.velocity;
        var pos = this.personbody.position;
        
        this.stuntime -= dt;
        if (this.stuntime <= 0) {
            this.stun = false;
        }
        
        if(keyIsDown(RIGHT_ARROW)){
            if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(200, vel[1]);
            posX=true;
        }
        else if(keyIsDown(LEFT_ARROW)){
            if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(-200, vel[1]);
            posX=false;
        }
        else{
            if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(0, vel[1]);
        }
        vel = this.personbody.velocity;
        if (vel[1] > 500) {
            if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(vel[0], 500);
        }
        //salto
        vel = this.personbody.velocity;
        if (posY && canJumpSecond) {
            jumpTimeSecond = jumpTimeSecond - dt;
            if (jumpTimeSecond > 0) {
                canJumpSecond = true;
                if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(vel[0], -400);
            }
            else {
                canJumpSecond = false;
            }
        }
        if (posY && canJumpFirst) {
            jumpTimeFirst = jumpTimeFirst - dt;
            if (jumpTimeFirst > 0) {
                canJumpFirst = true;
                if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(vel[0], -500);
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
                    if(!this.stun) this.personbody.velocity = p2.vec2.fromValues(vel[0], vel[1] * 0.75);
                }
            }
            else {
                if (!posY) {
                    canJumpFirst = true;
                    canJumpSecond = false;
                }
            }
        }
        this.cha_anim.update(dt, contact, hit)

        if (hit) {
            for (var i = 0; i != this.en_sensor.length; i++) {
                var enemy = this.en_sensor[i];
                enemy.health -= 1;
                
                var valor=1;
                if(posX==true){
                    valor=300;
                }
                else{
                    valor=-300;
                }
                
                enemy.stun = true;
                enemy.stuntime = 0.8;
                
                enemy.body.velocity[0] = valor;
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