var posY=false;
var contact=true;

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
        this.personbody = new p2.Body({mass: 5, position: [this.x, this.y], fixedRotation: true});
        this.personshape = new p2.Capsule({length:this.r ,radius: 2*this.r});
        //this.personshape.sensor=true;
        this.personbody.addShape(this.personshape);
        world.addBody(this.personbody);
        
        this.world=world;
    }
    update(){
        this.world.on("endContact",function(event){
            contact=false;
            posY=false;
        });
        this.world.on("beginContact",function(event){
            contact=true;
        });
        if(posY==true && contact==true){
            this.personbody.applyImpulse([0,-1000]);
            posY=false;
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
    }
} 
