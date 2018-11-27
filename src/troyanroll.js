class Troyanroll extends Enemy{
	constructor(level, x, y, life) {
		super(level, x, y, life);
		this.lockedChar = false;
		this.pastNear = false;
		this.nearNow  = false;
		this.deltaChar = 150;
		this.jumpSpeed = 500;
		this.jumpLocked = false;
		this.horizontalRatio = 5;
	}
	update(dt) {
        this.nearNow = this.charNear();
        if (this.stun) {
            this.stuntime -= dt;
            if (this.stuntime <= 0) {
                this.stun = false;
            }
        };

		if(this.charNear()&&this.body.velocity[1]<Math.abs(1))
		{
			this.body.velocity[1] = -this.jumpSpeed ;
			this.jumpLocked	= true;
			console.log("aca salto por cercano");
		}
		if( this.level.cha.personbody.position[0] < this.body.position[0]  && this.stun==false)
			this.body.velocity[0] = -Math.abs(this.body.velocity[1]/this.horizontalRatio);
		else
			if(!this.stun) this.body.velocity[0] = Math.abs(this.body.velocity[1]/this.horizontalRatio);


		this.pastNear = this.nearNow;
	}
	

	charNear(stun){
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
		drawBody(this.body);
	}
}
