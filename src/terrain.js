class Terrain {
	constructor(level, svg) {
		this.level = level;
		this.body = new p2.Body({mass: 0, position: [0, 0]});
		this.solidos = svg.layer("passive_objects");
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
		this.solidos.forEach(function(obj) {
			switch (obj.type) {
				case "rect":
				case "path":
					if (obj.vertices.length >= 3) {
						beginShape();
						for (var i = 0; i != obj.vertices.length; i++) {
							vertex(obj.vertices[i][0], obj.vertices[i][1]);
						}
						endShape(CLOSE);
					}
					break;
			}
		});
	}
} 
