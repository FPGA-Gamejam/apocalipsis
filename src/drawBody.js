//drawBody dibuja un cuerpo de p2.js
//soporta figuras con vertices p2.js y circulos
function drawBody(body, canvas) {
	if (!body.world) {return};
	for (var k = 0; k != body.shapes.length; k++) {
		var worldVertices = [];
		var relative_pos = body.shapes[k].position;
		var shape = body.shapes[k];
		var drawpos = [];
		var v;
		if (shape.vertices) {
			for (var i = 0; i != shape.vertices.length; i++) {
				v = shape.vertices[i];
				worldVertices[i] = [];
				body.toWorldFrame(worldVertices[i], [v[0] + relative_pos[0], v[1] + relative_pos[1]]);
			}
			//canvas.beginShape();
			for (var i = 0; i != worldVertices.length; i++) {
				//canvas.vertex(worldVertices[i][0], worldVertices[i][1]);
			}
			//canvas.endShape(CLOSE);
		}
		else if (shape.type == p2.Shape.CIRCLE || shape.type == p2.Shape.CAPSULE) {
			body.toWorldFrame(drawpos, [relative_pos[0], relative_pos[1]]);
			//canvas.ellipse(drawpos[0], drawpos[1], shape.radius * 2);
			//canvas.line(drawpos[0], drawpos[1], drawpos[0] + Math.cos(body.angle) * shape.radius, drawpos[1] + Math.sin(body.angle) * shape.radius);
		}
	}
}