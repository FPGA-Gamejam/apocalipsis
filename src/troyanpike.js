class Troyanpike extends Enemy{
	constructor(level, x, y) {
		super(level, x, y);
		this.body.gravityScale = 0;
		this.sensor.body.gravityScale = 0;
		this.pivotPositionY = x;
		this.pivotPositionX = y;
		//level.cha.position    [x,y]
		//this.body.position
		//this.body.applyImpulse([2000,2000]);
		this.body.velocity = [10,-100];
		this.deltaMovY = 20;
		this.deltaMovX = 10;
		this.deltaChar = 150;
		this.chaseVelocity = 120;
		this.backVelocity  = 75;


	}

	update(dt) {
        if (this.stun) {
            this.stuntime -= dt;
            if (this.stuntime <= 0) {
                this.stun = false;
            }
        };
		if( this.charNear() && this.stun==false){
			if( this.level.cha.personbody.position[0] < this.body.position[0] )
				this.body.velocity[0]= -this.chaseVelocity ;
			else
				this.body.velocity[0]= this.chaseVelocity ;
			if( this.level.cha.personbody.position[1] < this.body.position[1] )
				this.body.velocity[1] = -this.chaseVelocity ;
			else
				this.body.velocity[1] = this.chaseVelocity ;
		}
		else{
            if(this.stun==false){
                if( this.body.position[1] > this.pivotPositionX + this.deltaMovY )
                    this.body.velocity[1] = -this.backVelocity;
                if( this.body.position[1] < this.pivotPositionX - this.deltaMovY )
                    this.body.velocity[1] = this.backVelocity;
                if( this.body.position[0] > this.pivotPositionY + this.deltaMovY )
                    this.body.velocity[0] = -this.backVelocity;
                if( this.body.position[0] < this.pivotPositionY - this.deltaMovY )
                    this.body.velocity[0] = this.backVelocity;
            }
		}


	}

	charNear(){
		if( Math.abs(this.level.cha.personbody.position[0] - this.body.position[0]) < this.deltaChar)
		{
		if( Math.abs(this.level.cha.personbody.position[1] - this.body.position[1]) < this.deltaChar)
			return true;
		}
		return false;
	}
}
