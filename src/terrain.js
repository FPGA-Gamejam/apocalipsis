class Terrain {
	constructor(level, svg) {
		this.level = level;
		this.body = new p2.Body({mass: 0, position: [0, 0]});
		this.solidos = svg.layer("passive_objects");
		this.graphic = createGraphics(4000, 4000);
		this.solidos.forEach(function(obj) {
			switch (obj.type) {
				case "rect":
				case "path":
					if (obj.vertices.length >= 3) {
						this.body.fromPolygon(obj.vertices);
					}
					break;
			}
		}, this);
		this.solidos = svg.layer("border");
		this.solidos.forEach(function(obj) {
			switch (obj.type) {
				case "rect":
				case "path":
					if (obj.vertices.length >= 3) {
						this.body.fromPolygon(obj.vertices);
					}
					break;
			}
		}, this);
		this.level.world.addBody(this.body);
	}
	draw() {
		image(this.graphic, 0, 0);
	}
} 
