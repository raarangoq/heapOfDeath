
// Variables para controlar la entrada por teclado
var keyboard;

var text;


loading = {
	preload: function(){

    game.load.image('velocity', 'assets/pics/items/speedItem.png');
    game.load.image('shield', 'assets/pics/items/shield.png');
    game.load.spritesheet('aura', 'assets/pics/aura.png', 64, 64);

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    

    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');
    game.load.image('scorpion', 'assets/pics/enemys/segment.png');
    game.load.spritesheet('redscorpion', 'assets/pics/enemys/redscorpion.png', 46, 41);
    game.load.image('boss', 'assets/pics/enemys/boss.png');
    
    game.load.image('node', 'assets/pics/node.png');

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);

    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    game.load.spritesheet('spiral','assets/pics/spiral.png', 44, 38);
    game.load.spritesheet('blood', 'assets/pics/blood.png', 83, 69);
  
    game.load.image('background', 'assets/pics/background.png');
    game.load.image('ground', 'assets/pics/levels/ground.png');
    game.load.image('hourglass', 'assets/pics/hourglass.png');
    game.load.image('hourglassback', 'assets/pics/hourglassback.png');
    game.load.image('door', 'assets/pics/levels/door.png');
    game.load.spritesheet('platform', 'assets/pics/levels/platform.png', 594, 151);
    game.load.spritesheet('gear', 'assets/pics/levels/gear.png', 599, 203);
    game.load.image('pillar', 'assets/pics/levels/pillar.png');
    game.load.spritesheet('basket', 'assets/pics/basket.png', 50, 40);

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('win', 'assets/pics/images/win.png');

    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('blankpause', 'assets/pics/images/blankpause.png');
    game.load.image('input', 'assets/pics/images/input.png');

    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);

    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');

    game.load.image(        'sky',        'assets/pics/videos/sky.png');
    game.load.spritesheet(  'link',       'assets/pics/videos/link.png', 148, 150);
    game.load.spritesheet(  'linkfail',   'assets/pics/videos/linkfail.png', 145, 175);
    game.load.image(        'cloud',      'assets/pics/videos/cloud.png');
    game.load.image(        'dialog',     'assets/pics/videos/dialog.png');

    game.load.spritesheet('medusa', 'assets/pics/videos/medusa.png', 128, 128);

/***********************************************************/
//              Sounds

	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('scorpion', 'assets/sounds/nuevo_escorpion.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('boss', 'assets/sounds/boss.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('bat', 'assets/sounds/bat.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');

    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');
    game.load.audio('stone', 'assets/sounds/stone.mp3');
    game.load.audio('door', 'assets/sounds/door.mp3');

    game.load.audio('medusa', 'assets/sounds/medusa-grito.mp3');

	},

	
	create: function(){
        addKeyboard();
    },

    update: function(){
        if(game.load.onLoadComplete){
            loadingImage.destroy();
            game.state.start('initMenu');
        }
    },
}
