var posY=false;
var contact=true;
var double=false; //false sin salto, true doble salto utilizado
var sensors=[];
var hit=false;
var pum=false;
var posX=true; //true derecha, false izquierda

function keyPressed(){
    if(keyCode == UP_ARROW){
        posY=true;
    }
    if(key == 'a'){
        hit=true;
    }
}

class cha{
    constructor (x, y, r, world){
        this.x=x;
        this.y=y;
        this.r=r;
        
        //char
        this.personbody = new p2.Body({mass: 5, position: [this.x, this.y], fixedRotation: true});
        this.personshape = new p2.Circle({radius: this.r});
        this.personbody.addShape(this.personshape);
        world.addBody(this.personbody);
        
        //sensor
        this.sensorbody = new p2.Body({mass: 1, position: [this.x, this.y], fixedRotation: true});
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
        this.hitbody = new p2.Body({mass: 1, position: [this.x, this.y], fixedRotation: true});
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
        this.hitbody_i = new p2.Body({mass: 1, position: [this.x, this.y], fixedRotation: true});
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

        this.world.on("endContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0] ){
                 console.log(event);
                contact=false;
                if(double==true){
                    posY=false;
                }
            }
            if(event.bodyA==sensors[1] || event.bodyB==sensors[1] || event.bodyA==sensors[2] || event.bodyB==sensors[2]){
                pum=false;
            }
        });
        this.world.on("beginContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0]){
                contact=true;
                double=false;
            }
            if(event.bodyA==sensors[1] || event.bodyB==sensors[1] || event.bodyA==sensors[2] || event.bodyB==sensors[2]){
                pum=true;
            }
        });
    }
    update(){
        var vel = this.personbody.velocity;
        var pos = this.personbody.position;
        if(keyIsDown(RIGHT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(150, vel[1]);
            posX=true;
        }
        else if(keyIsDown(LEFT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(-150, vel[1]);
            posX=false;
        }
        else{
            this.personbody.velocity = p2.vec2.fromValues(0, vel[1]);
        }
        //salto
        vel = this.personbody.velocity;
        if(posY==true && double==false){
            posY=false;
            if(contact==false){
                double=true;
                this.personbody.velocity = p2.vec2.fromValues(vel[0], -600);
            }
            else{
                this.personbody.velocity = p2.vec2.fromValues(vel[0], -900); //-1000
            }
        }
        else{
            posY=false;
        }
        //golpe
        if(hit==true && pum==true){
            if(posX=true){
                console.log("golpe derecha");
                hit=false;
            }
            else{
                console.log("golpe izquierda");
                hit=false;
            }
        }
    }
    draw(){
        //drawBody(this.personbody);
        drawBody(this.hitbody);
        drawBody(this.hitbody_i);
        image(panda_idle, this.personbody.position[0] - 55, this.personbody.position[1] - 140);
    }
} 