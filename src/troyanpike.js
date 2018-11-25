class Troyanpike extends Enemy{
	constructor(level, x, y) {
		super(level, x, y);
		this.body.gravityScale = 0;
		this.sensor.body.gravityScale = 0;
		
	}
}