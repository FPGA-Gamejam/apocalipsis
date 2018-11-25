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
			if (obj.label == "cube") {
				image(tile, obj.vertices[0][0], obj.vertices[0][1], 100, 100);
			}
			else {
				push();
				switch (obj.label) {
					case "background_border":
						fill(90, 35, 29);
						break;
					case "background_filler":
						fill(30, 60, 15);
						break;
					case "poly":
						fill(0, 255, 0);
						break;
					case "tube":
						fill(50, 128, 40);
						break;
					case "panel":
						fill(30, 60, 15);
						break;
				}
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
				pop();
			}
		}, this);
	}
} 
