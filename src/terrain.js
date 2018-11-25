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
					this.body.fromPolygon(obj.vertices);
					break;
			}
		}, this);
		this.solidos2 = svg.layer("border");
		this.solidos2.forEach(function(obj) {
			switch (obj.type) {
				case "rect":
					var x = obj.vertices[0][0];
					var y = obj.vertices[0][1];
					var width = obj.vertices[2][0] - x;
					var height = obj.vertices[2][1] - y;
					for (var xx = x; xx < width + x; xx += 100) {
						for (var yy = y; yy < height + y; yy += 100) {
							this.graphic.image(tile, xx, yy, 100, 100);
						}
					}
				case "path":
					this.body.fromPolygon(obj.vertices);
					break;
			}
		}, this);
		this.level.world.addBody(this.body);
	}
	draw() {
		image(this.graphic, 0, 0);
	}
} 
