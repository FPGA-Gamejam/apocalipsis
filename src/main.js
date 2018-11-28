var TIMESTEP = 1 / 60;
var level3_svg, level3_bg, vcr;
var level, hud;
var splashTime = 3;
function preload() {
	level3_svg = new svgParser("rsc/levels/level_tutorial.svg");
	level3_bg = loadImage("resources/sprites/background_00.jpg");
	vcr = loadFont("rsc/fonts/VCR.ttf")
	panda_stan = loadImage("resources/sprites/Panda_stan.png");
	panda_mov = loadImage("resources/sprites/Panda-mov.png");
	panda_jump = loadImage("resources/sprites/Panda-jump.png");
	panda_fall = loadImage("resources/sprites/Panda_fall.png");
	panda_punch = loadImage("resources/sprites/Panda-punch.png");
	panda_damage = loadImage("resources/sprites/Panda_damage.png");

	troyanpike_stan1 = loadImage("resources/sprites/TroyanKid_stan1.png")
	troyanpike_stan2 = loadImage("resources/sprites/TroyanKid_stan2.png")
	troyanpike_angry1 = loadImage("resources/sprites/TroyanKid_angry1.png")
	troyanpike_angry2 = loadImage("resources/sprites/TroyanKid_angry2.png")
	troyanpike_angry3 = loadImage("resources/sprites/TroyanKid_angry3.png")
	troyanroll_idle = loadImage("resources/sprites/TroyanPike-prev1.png")
	boss_stan_1		  = loadImage("resources/sprites/boss_stan1.png")
	boss_stan_2		  = loadImage("resources/sprites/boss_stan2.png")
	boss_stan_3		  = loadImage("resources/sprites/boss_stan3.png")
	boss_tacle_1		  = loadImage("resources/sprites/boss_tacle1.png")
	boss_tacle_2		  = loadImage("resources/sprites/boss_tacle2.png")
	boss_tacle_3		  = loadImage("resources/sprites/boss_tacle3.png")
	troyanpike_idle = loadImage("resources/sprites/TroyanKid-prev1.png")
	troyanroll_idle = loadImage("resources/sprites/TroyanPike-prev1.png")
	tile = loadImage("resources/sprites/tile_100_b.png");

	fder = loadImage("resources/sprites/in_der.png");
	fizq = loadImage("resources/sprites/in_izq.png");
	fup = loadImage("resources/sprites/in_up.png");
	fatt = loadImage("resources/sprites/in_att.png");

	splash = loadImage("resources/sprites/main.jpg");
}

function setup() {
	canvas = createCanvas(1600, 900);
	canvas.drawingContext.imageSmoothingEnabled = false;

    level = new Level(level3_svg);
	hud = new HUD(level);
	//fill(0, 80, 0);
}

function draw() {

	//logica
	level.world.step(TIMESTEP);
	level.update(TIMESTEP);
	hud.update(TIMESTEP);

	//dibujado
	background(255);
	level.draw();
	hud.draw(level.cha.health);

}
