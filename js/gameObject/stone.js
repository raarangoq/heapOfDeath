
var stone;

function addStones(){
	stones = game.add.group();
    stones.enableBody = true;
    stones.physicsBodyType = Phaser.Physics.ARCADE;
    stones.createMultiple(30, 'stone');
    stones.setAll('anchor.x', 0.5);
    stones.setAll('anchor.y', 0.5);
    stones.setAll('outOfBoundsKill', true);
    stones.setAll('checkWorldBounds', true);

    stones.timeOfLastStone = game.time.now;
    stones.timeBetweenStones = 6000;

    stones.damage = 25;
    stones.speed = 300;

    stones.initAvalanche = false;

    stones.sound = game.add.audio("stone", 0.2);


    stones.avalanche = game.add.sprite(-200, -800, 'avalanche');
    game.physics.enable(stones.avalanche, Phaser.Physics.ARCADE);
    stones.avalanche.visible = false;

    stones.dropStone = dropStone;
    stones.update = updateStone;
    stones.reset = resetStones;
    stones.startAvalanche = startAvalanche;
}

function dropStone(){
	stone = this.getFirstExists(false);
    if (stone)
    {
        this.sound.play();

        stone.reset(100 + (Math.random() * 600), 0);

        stone.body.velocity.y = this.speed;
        
        stone.scale.x = 0.5 + (Math.random());
        stone.scale.y = 0.5 + (Math.random()); 

        if(flags['winState']){
            stone.scale.x *= 1.5;
            stone.scale.y *= 1.5;
        }
        else
            stone.body.angularVelocity = Math.random() * 90;


        this.timeOfLastStone = game.time.now;
    }
}

function updateStone(){
	if( game.physics.arcade.isPaused || !game.global.is_playing)
		return;
	
	if(!flags['winState'] && !flags['timeOut']) {
        if( game.time.now - this.timeOfLastStone > this.timeBetweenStones){
			this.timeOfLastStone = game.time.now;
			this.dropStone();
	   }
    }
    else{
        if (this.initAvalanche && game.time.now - this.timeOfLastStone > 200){
            this.timeOfLastStone = game.time.now;
            this.dropStone();
        }
        if( this.avalanche.y > -200){
            this.avalanche.body.velocity.y = 0;
            this.avalanche.body.acceleration.y = 0;
        }
    }
}

function resetStones(){
    this.timeOfLastStone = game.time.now + 2000;
    this.timeBetweenStones = 6000 - (game.global.level * 600);
    this.callAll('kill');
    this.initAvalanche = false;
    this.avalanche.y = -800;
    this.avalanche.visible = true;
    this.avalanche.body.velocity.y = 0;
    this.avalanche.body.acceleration.y = 0;
}

function startAvalanche(){
    this.initAvalanche = true;
//    this.avalanche.visible = true;
    this.avalanche.body.acceleration.y = this.speed / 4;
}
