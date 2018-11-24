var posY=false;

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
        this.personbody = new p2.Body({mass: 5, position: [this.x, this.y]});
        this.personshape = new p2.Capsule({length:3 ,radius: this.r});
        this.personbody.addShape(this.personshape);
        world.addBody(this.personbody);
        
        this.chasensor= new p2.Circle();
    }
    update(){
        if(posY==true){
            this.personbody.applyImpulse([0,-1000]);
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
