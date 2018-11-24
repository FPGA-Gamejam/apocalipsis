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
        this.sensorbody = new p2.Body({mass: 5, position: [this.x, this.y]});
        this.sensorshape = new p2.Circle({radius: 10});
        this.sensorshape.sensor=true;
        this.sensorbody.addShape(this.sensorshape);
        world.addBody(this.sensorbody);
        sensors.push(this.sensorbody);
        
        this.world=world;
    }
    update(){
        //this.sensorbody.position[0]=this.personbody.position[0];
        //this.sensorbody.position[1]=this.personbody.position[1]+this.r+2;
        this.world.on("endContact",function(event){
            if(event.bodyA==sensors[0]){
                console.log("a");
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
        if(posY==true && double==false){
            this.personbody.applyImpulse([0,-1000]);
            posY=false;
            if(contact==false){
                double=true;
            }
        }
        else{
            posY=false;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.personbody.applyImpulse([30,0]);
        }
        if(keyIsDown(LEFT_ARROW)){
            this.personbody.applyImpulse([-30,0]);
        }
    }
    draw(){
        drawBody(this.personbody);
        drawBody(this.sensorbody);
    }
} 
