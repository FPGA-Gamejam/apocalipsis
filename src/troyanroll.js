class Troyanroll extends Enemy{
	constructor(level, x, y, life) {
		super(level, x, y, life);
		this.lockedChar = false;
		this.pastNear = false;
		this.nearNow  = false;
		this.deltaChar = 350;
		this.detaAlmostNear = 600;
		this.jumpSpeed = 450;
		this.chaseVelocity = 200;
		this.pastPositionY = 0;
		this.hasJumped = false;
		this.hasLanded = true;
		this.hasChased = false;
	}
	update(dt) {
        this.nearNow = this.charNear();
        if (this.stun) {
            this.stuntime -= dt;
            if (this.stuntime <= 0) {
                this.stun = false;
            }
        };

		this.jumpRoll();
		this.getCloseRoll();
		this.jumped();
		this.landed();
		this.pastPositionY=this.body.position[1];
		this.pastNear = this.nearNow;
	}


	jumped(){
		if((this.pastPositionY - this.body.position[1])>0 && this.hasLanded)
		{
			this.hasJumped = true;
			this.hasLanded = false;
			//console.log("salta");
		}
	}

	landed(){
		if((this.pastPositionY - this.body.position[1])==0 && this.hasJumped)
		{
			this.hasJumped = false;
			this.hasLanded = true;
			this.hasChased = false;
			//console.log("cae");
		}
	}

	jumpRoll(){
		if(this.hasLanded)
		{
			if(this.charNear()){
				this.body.velocity[1] = -this.jumpSpeed ;
			}
			else if(this.almostNear()){
				this.body.velocity[1] = -this.jumpSpeed/4;
			}
		}
	}

	getCloseRoll(){
		if(!this.stun)
		 {
			if(this.charNear()&&!this.hasChased)
	 		{
				this.hasChased = true;
	 			if( this.level.cha.personbody.position[0] < this.body.position[0] ){
	 				this.body.velocity[0]= -this.chaseVelocity ;
				}
	 			else{
					this.body.velocity[0]= this.chaseVelocity ;
				}
	 		}
	 		else if(this.hasLanded){
				this.hasChased = false;
	 			this.body.velocity[0]= 0;
	 		}
		 }

	}

	almostNear(){
		if( Math.abs(this.level.cha.personbody.position[0] - this.body.position[0]) > this.deltaChar
			|| Math.abs(this.level.cha.personbody.position[0] - this.body.position[0]) < this.detaAlmostNear)
		{
		if( Math.abs(this.level.cha.personbody.position[1] - this.body.position[1]) > this.deltaChar
			|| Math.abs(this.level.cha.personbody.position[1] - this.body.position[1]) < this.detaAlmostNear)
			return true;
		}
		return false;
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
		if (!this.pastNear && this.nearNow){
			return true;
		}
		else{
			return false;
		}
	}

	draw() {
		image(troyanroll_idle, this.body.position[0] - 55, this.body.position[1] - 60);
	}
}
