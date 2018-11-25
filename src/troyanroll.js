class Troyanroll extends Enemy{
	constructor(level, x, y) {
		super(level, x, y);
		this.lockedChar = false;
		this.pastNear = false;
		this.nearNow  = false;
		this.deltaChar = 150;
		this.jumpSpeed = 1000;
	}
	update(dt) {
		this.body.velocity[0] = 0;
		if(this.charLocked()&&this.body.velocity[1]<Math.abs(1))
		{
			this.body.velocity[1] = -this.jumpSpeed ;
			console.log("aca salto por cercano");
		}
	  // if(this.charNear() && this.level.cha.personbody.velocity[1]<-20 && this.body.velocity[1]<Math.abs(1) ){
		// 	this.body.velocity[1] = -this.jumpSpeed ;
		// 	console.log("aca salto por salto");
		// }

		this.pastNear = this.nearNow;
	}
	draw() {
		image(troyanroll_idle, this.body.position[0] - 50, this.body.position[1] - 100);
	}

	charNear(){
		if( Math.abs(this.level.cha.personbody.position[0] - this.body.position[0]) < this.deltaChar)
		{
		if( Math.abs(this.level.cha.personbody.position[1] - this.body.position[1]) < this.deltaChar)
			return true;
		}
		return false;
	}

	charLocked(){
		this.nearNow = this.charNear();
		if (!this.pastNear && this.nearNow){
			return true;
		}
		else{
			return false;
		}
	}
}
