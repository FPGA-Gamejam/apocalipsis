var TIMESTEP = 1 / 60;
var level3_svg;
var level;
function preload() {
	level3_svg = new svgParser("rsc/levels/level_1.svg");
}

function setup() {
	canvas = createCanvas(1600, 900);
	canvas.drawingContext.imageSmoothingEnabled = false;

	level = new Level(level3_svg);
}

function draw() {
	//logica
	this.level.world.step(1 / 60);
	this.level.update(TIMESTEP);

	//dibujado
	background(255);
	this.level.draw();

	text("(0, 0)", 0, 10);
	text("(400, 300)", 400, 310);
	text("(800, 600)", 800, 610);

	text("FPS: " + frameRate().toFixed(2), 40, 10);
}

