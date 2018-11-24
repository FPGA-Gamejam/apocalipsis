class Terrain {
	constructor(level, svg) {
		this.level = level;
		this.body = new p2.Body({mass: 0, position: [0, 0]});
		this.solidos = svg.layer("Floor");
		this.solidos.forEach(function(obj) {
			switch (obj.type) {
				case "rect":
				case "path":
					this.body.fromPolygon(obj.vertices);
					break;
			}
		}, this);
		this.level.world.addBody(this.body);
	}
} 
