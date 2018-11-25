class HUD {
	constructor(level) {
		this.screenDimentions = {
			width: width,
			heigth: height,
		};
		this.stats = {
			cpu: 0,
			ram: 0,
			temperature: 0,
		}
		this.stats.width = 500;
		this.stats.heigth = 300;
		this.stats.x = this.screenDimentions.width - this.stats.width;
		this.stats.y = 0;

		textFont(vcr);
	}
 	update(dt) {

 	}
 	draw() {
 		var dim = this.screenDimentions;
 		var stats = this.stats;
 		rect(stats.x, stats.y, stats.width, stats.heigth);
 		text(stats.cpu, stats.x + 10, stats.y + 10);
 		
 	}
}