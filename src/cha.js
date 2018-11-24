var posY=false;
var contact=true;
var double=false; //false sin salto, true doble salto utilizado
var sensors=[];

function keyPressed(){
    if(keyCode == UP_ARROW){
        posY=true;
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
        
        this.world=world;

        this.world.on("endContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0] ){
                 console.log(event);
                contact=false;
                if(double==true){
                    posY=false;
                }
            }
        });
        this.world.on("beginContact",function(event){
            if(event.bodyA==sensors[0] || event.bodyB==sensors[0]){
                contact=true;
                double=false;
            }
        });
    }
    update(){
        var vel = this.personbody.velocity;
        var pos = this.personbody.position;
        if(keyIsDown(RIGHT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(150, vel[1]);
        }
        else if(keyIsDown(LEFT_ARROW)){
            this.personbody.velocity = p2.vec2.fromValues(-150, vel[1]);
        }
        else{
            this.personbody.velocity = p2.vec2.fromValues(0, vel[1]);
        }
        vel = this.personbody.velocity;
        if(posY==true && double==false){
            console.log(vel);
            this.personbody.velocity = p2.vec2.fromValues(vel[0], -1000);
            posY=false;
            if(contact==false){
                double=true;
            }
        }
        else{
            posY=false;
        }
    }
    draw(){
        drawBody(this.personbody);
        drawBody(this.sensorbody);
    }
} 
