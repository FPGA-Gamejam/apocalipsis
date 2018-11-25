class Troyanboss extends Enemy {
	constructor(level, x, y, life) {
		super(level, x, y, life, true);
		this.body.gravityScale = 0;
		this.sensor.body.gravityScale = 0;
		this.body.mass = 1000;
		this.body.updateMassProperties();
		this.pivotPositionY = y;
		this.pivotPositionX = x;
		this.moveVelocityX = 450;
		this.moveVelocityY = 370;
		this.leftX = this.pivotPositionX-700;
		this.rightX = this.pivotPositionX+700;
		this.topY = this.pivotPositionY-320;
		this.bottomY = this.pivotPositionY+370;
		this.estadoBoss = 0;
		this.dtant = 0;
		this.oscidir = 1;
		this.osci    = 0;
		this.tdraw= 0;
		this.idle  = 0;
		this.tackle = 0;
	}
	update(dt) {
		this.stun = false;
		//this.topRight()
		this.makeAction(dt);
		this.movOsc();
	}
	draw(dt) {
		this.tdraw=1/60+this.tdraw;
		if(this.tdraw<0.2)
				image(boss_stan_1,this.body.position[0], this.body.position[1]);
		else if(this.tdraw<0.4)
				image(boss_stan_2,this.body.position[0], this.body.position[1]);
		else if(this.tdraw<0.6)
				image(boss_stan_3,this.body.position[0], this.body.position[1]);
		else{
				image(boss_stan_3,this.body.position[0], this.body.position[1]);
				this.tdraw= 0;
		}

			}



	topLeft(){
		this.tackle = 0;
		if( this.leftX < this.body.position[0]-10 ){
			this.body.velocity[0]= -this.moveVelocityX ;
			this.tackle = 1;
		}
		else if( this.leftX > this.body.position[0]+10 ){
			this.body.velocity[0]= this.moveVelocityX ;
			this.tackle = 1;
		}
		else
			this.body.velocity[0]= 0 ;
		if( this.topY < this.body.position[1]-10 )
			this.body.velocity[1]= -this.moveVelocityY;
		else if( this.topY > this.body.position[1]+10 )
			this.body.velocity[1]= this.moveVelocityY;
		else
			this.body.velocity[1]= 0 ;
	}

	topRight(){
		if( this.rightX < this.body.position[0]-15 )
			this.body.velocity[0]= -this.moveVelocityX ;
		else if( this.rightX > this.body.position[0]+15 )
			this.body.velocity[0]= this.moveVelocityX ;
		else
			this.body.velocity[0]= 0 ;
		if( this.topY < this.body.position[1]-15 )
			this.body.velocity[1]= -this.moveVelocityY ;
		else if( this.topY > this.body.position[1]+15 )
			this.body.velocity[1]= this.moveVelocityY ;
		else
			this.body.velocity[1]= 0 ;
	}

	bottomRight(){
		if( this.rightX < this.body.position[0]-15 )
			this.body.velocity[0]= -this.moveVelocityX ;
		else if( this.rightX > this.body.position[0]+15 )
			this.body.velocity[0]= this.moveVelocityX ;
		else
			this.body.velocity[0]= 0 ;
		if( this.bottomY < this.body.position[1]-15 )
			this.body.velocity[1]= -this.moveVelocityY ;
		else if( this.bottomY > this.body.position[1]+15 )
			this.body.velocity[1]= this.moveVelocityY ;
		else
			this.body.velocity[1]= 0 ;
	}

	bottomLeft(){
		if( this.leftX < this.body.position[0]-15 )
			this.body.velocity[0]= -this.moveVelocityX ;
		else if( this.leftX > this.body.position[0]+15 )
			this.body.velocity[0]= this.moveVelocityX ;
		else
			this.body.velocity[0]= 0 ;
		if( this.bottomY < this.body.position[1]-15 )
			this.body.velocity[1]= -this.moveVelocityY ;
		else if( this.bottomY > this.body.position[1]+15 )
			this.body.velocity[1]= this.moveVelocityY ;
		else
			this.body.velocity[1]= 0 ;
	}

	movOsc(){
		//this.body.position[0] = this.body.position[0] + this.osci ;
		this.body.position[1] = this.body.position[1] + this.osci ;
		this.osci = this.osci + this.oscidir;
		if( this.osci == 10 || this.osci == -10 )
			this.oscidir = -this.oscidir;
	}


	makeAction(dt){
		this.dtant=dt+this.dtant;
		switch (this.estadoBoss) {
			case 0:
				this.moveVelocityX = 450;
				this.moveVelocityY = 370;
				//this.dtant=dt+this.dtant;
				this.estadoBoss = 1;
				this.dtant= 0;
				//this.bottomRight();
			break;
			case 1:
				if( (this.dtant)>3 )
				{
					this.estadoBoss = 2;
					this.bottomLeft();
					this.dtant= 0;
				}
				else {
					this.bottomRight();
				}
			break;
			case 2:
			if( (this.dtant)>3 )
			{
				this.estadoBoss = 3;
				this.bottomRight();
				this.dtant= 0;
			}
			else {
				this.bottomLeft();
			}
			break;
			case 3:
			if( (this.dtant)>3 )
			{
				this.estadoBoss = 4;
				this.bottomLeft();
				this.dtant= 0;
			}
			else {
				this.topRight();
			}
			break;
			case 4:
			if( (this.dtant)>3 )
			{
				this.estadoBoss = 5;
				this.topRight();
				this.dtant= 0;
			}
			else {
				this.topLeft();
			}
			break;
			case 5:
			if( (this.dtant)>3 )
			{
				this.estadoBoss = 6;
				this.topLeft();
				this.dtant= 0;
				this.moveVelocityX = 850;
				this.moveVelocityY = 770;
			}
			else {
				this.bottomLeft();
			}
			break;
			case 6:
			if( (this.dtant)>1 )
			{
				this.estadoBoss = 7;
				this.bottomRight();
				this.dtant= 0;
			}
			else {
				this.bottomLeft();
			}
			break;
			case 7:
			if( (this.dtant)>1 )
			{
				this.estadoBoss = 8;
				this.bottomLeft();
				this.dtant= 0;
			}
			else {
				this.bottomRight();
			}
			break;
			case 8:
			if( (this.dtant)>1 )
			{
				this.estadoBoss = 0;
				//this.topLeft();
				this.dtant= 0;
			}
			else {
				this.bottomLeft();
			}
			default:

		}
	}
}
