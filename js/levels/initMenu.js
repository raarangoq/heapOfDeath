var image;

var background;
var player;
var floor;

var flags = [];

var wall;
var ground;
var hourGlass;
var hourglassback;
var platform;
var gear;
var door;
var stones;
var scorpions;
var boss;
var basket;

var heap;

var explosions;

var gui;
var score;

var sky;

var winImage;
var loseImage;
var endImage;

var medusa;
var medusa_sound;
var linkfail;

var texta;
var text;
var textc;

var node;

initMenu = {
	create: function(){

		image = game.add.sprite(0, 0, 'initmenu');
		var text = game.add.text(400, 200, 'Scape the Heap.',
		{ font: "64pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		image.addChild(text);
		text = game.add.text(400, 500, 'Presiona ENTER para jugar...',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		image.addChild(text);


		game.global.is_playing = false;

		this.addFlags();
		
		sky = game.add.sprite(0, 0, 'sky');
		text = game.add.text(400, 500, 'Presiona ENTER para empezar el juego...',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		sky.addChild(text);
		sky.kill();

		// GameObjects ever in game
		background = game.add.sprite(0, 0, 'background');
		background.kill();

		addGear();
		gear.kill();
	    addPlatform();
	    platform.setAlive(false);

	    hourglassback = game.add.sprite(400, 234, 'hourglassback');
		hourglassback.anchor.set(0.5);
		hourglassback.scale.set(1.3);
		hourglassback.kill();

	    hourGlass = game.add.sprite(400, 260, 'hourglass');
	    hourGlass.anchor.set(0.5);
		hourGlass.scale.set(1.3);
	    hourGlass.kill();

	    basket = game.add.sprite(400, 270, 'basket');
	    basket.anchor.setTo(0.5, 0.5);
	    basket.scale.set(2);
	    basket.kill();

	    scorpions = new addScorpionsGroup();
	    scorpions.setAlive(false);



	    this.addPlayerFloor();
	    addPlayer();
	    player.kill();

	    addBoss();
	    boss.kill();

	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.createMultiple(15, 'kaboom');
	    explosions.forEach(this.setupExplosion, this);



//game.global.level = 5;

	    sound_backgroud = game.add.audio('levelB', 0.5, true);
	    boom_sound = game.add.audio('boom', 0.5);

	    dialog = game.add.sprite(230, 300, 'dialog');
	    dialog.kill();

	    this.addMedusa();
	    medusa.kill();
	    medusa_sound = game.add.audio('medusa');

	    this.addLink();

	    texta = game.add.text(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2, '', 
			{ font: "12pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: dialog.width, align: "center"});
	    texta.anchor.set(0.5);
	    texta.kill();


		heap = new addHeap();


//		alert(heap.toString());
	   
	    gui = new GUI();
	    gui.setAlive(false);

//textc = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


	},

	addPlayerFloor: function(){
		floor = game.add.sprite(380, 460, 'pillar');
		game.physics.enable(floor, Phaser.Physics.ARCADE);
		floor.body.immovable = true;
		floor.renderable = false;
	},

	addFlags: function(){
		flags['winAnimationPointA'] = false;
		flags['winAnimationPointB'] = false;
		flags['winState'] = false;
		flags['timeOut'] = false;
        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;

	},

	// Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

	update: function(){
		if(keyboard.enterKey()){
			image.destroy();
			
			//game.state.start('end', false);
			game.state.start('introVideo', false);
		}
	},

	addMedusa: function(){
		medusa = game.add.sprite(100, 350, 'medusa');
		game.physics.enable(medusa, Phaser.Physics.ARCADE);
		medusa.animations.add('normal', [0, 1, 2, 3, 4, 5], 6, true);
		medusa.animations.add('attack', [6, 7, 8, 9], 6, false);
		medusa.scale.setTo(2, 2);
	},

	addLink: function(){
		link = game.add.sprite(1000, 600, 'link');
		link.scale.setTo(1.5, 1.5);
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.kill();

		linkfail = game.add.sprite(550, 350, 'linkfail');
		linkfail.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		game.physics.enable(linkfail, Phaser.Physics.ARCADE);
		linkfail.scale.setTo(0.2, 0.2);
		linkfail.hit_sound = game.add.audio('hit');
		linkfail.scream_sound = game.add.audio('scream', true);
		linkfail.kill();

	    winImage = game.add.sprite(0, 0, 'win');
	    var text = game.add.text(400, 200, 'Ganaste!!',
		{ font: "48pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		winImage.addChild(text);
	    text = game.add.text(400, 500, 'Presiona ENTER para ir al siguiente nivel.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		winImage.addChild(text);
	    winImage.visible = false;

	    loseImage = game.add.sprite(0, 0, 'lose');
	    text = game.add.text(400, 500, 'Presiona ENTER para volver a jugar...',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		loseImage.addChild(text);
	    loseImage.visible = false;

	    endImage = game.add.sprite(0, 0, 'end');
	    endImage.visible = false;
	    text = game.add.text(400, 200, '¡¡¡¡GANASTE!!!!',
		{ font: "46pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 7,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	    text = game.add.text(400, 300, 'Haz completado todos los montículos,' +
	    	'lástima que esa bruja te tratara tan mal.',
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	    text = game.add.text(400, 500, 'Presiona ENTER para volver a jugar.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	},
}