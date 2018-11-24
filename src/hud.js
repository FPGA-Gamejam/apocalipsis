class HUD {
	constructor(level) {
		this.screenDimentions = {
			width: width,
			heigth: height,
		};
		this.stats = {
			//stats rectangle
			x: this.screenDimentions - width,
			y: 0,
			width: 300,
			heigth: 300,
			//stats
			cpu: 0,
			ram: 0,
			temperature: 0,
		}
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