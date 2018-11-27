class music {

    constructor (base,sample1)  { 
	this.base = base;
	this.sample1 = sample1;
    }

    loopBase () {
	this.base.setVolume(0.5);
	this.base.loop();
    }
    playBase(){
	this.base.setVolume(0.5);
	this.base.play();
    }
    stopBase (){
	this.base.stop();
    }
    loopSample1(){
	this.sample1.setVolume(0.5);
	this.sample1.loop();
    }
    playSample1(){
	this.sample1.setVolume(0.5);
	this.sample1.play();
    }
    stopSample1(){
	this.sample1.stop();
    }

} 
var base;
var s1;
var button;
var song;
var song2;
var base2;
var button2;
var drums = false;
var winwin = false;
function preload(){
    base = loadSound('song1/track-base.mp3');
    s1 = loadSound('song1/enemy4.mp3');
    base2 = loadSound('winwin.mp3');
}

function setup(){

    song = new music(base, s1);
    song2 = new music(base2);
    button = createButton("play drums");
    button2 = createButton("play winwin");
    
    song.playBase();
    
    button.mousePressed(playdrums);
    button2.mousePressed(playwin);
}

function draw(){
    if(!song.base.isPlaying() && !drums && !winwin)
	song.playBase();
    else if(drums && !song.base.isPlaying() && !song.sample1.isPlaying()){
	song.playBase();
	song.playSample1();
    }
    console.log(drums);
    console.log( !song.base.isPlaying());
    console.log(!song.sample1.isPlaying());

}
function playdrums(){
    drums = true;
}

function playwin(){
   winwin = true;
}
