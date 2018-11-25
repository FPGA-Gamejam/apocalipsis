var TIMESTEP = 1 / 60;
var level3_svg, level3_bg, vcr;
var level, hud;
function preload() {
	level3_svg = new svgParser("rsc/levels/level_1.svg");
	level3_bg = loadImage("resources/sprites/background_01.jpg");
	vcr = loadFont("rsc/fonts/VCR.ttf")
	panda_idle = loadImage("resources/sprites/Panda-prev1-mov_stat1.png");
	troyanpike_idle = loadImage("resources/sprites/TroyanKid-prev1.png")
	tile = loadImage("resources/sprites/tile_100_b.png");
}

function setup() {
	canvas = createCanvas(1600, 900);
	canvas.drawingContext.imageSmoothingEnabled = false;

	level = new Level(level3_svg);
	hud = new HUD(level);
	fill(0, 80, 0);
}

function draw() {
	//logica
	level.world.step(TIMESTEP);
	level.update(TIMESTEP);
	hud.update(TIMESTEP);

	//dibujado
	background(255);
	level.draw();
	hud.draw();

	text("(0, 0)", 0, 10);
	text("(400, 300)", 400, 310);
	text("(800, 600)", 800, 610);

	text("FPS: " + frameRate().toFixed(2), 40, 10);
}

