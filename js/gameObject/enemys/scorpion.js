

/*********************************************
            Group of scorpions
********************************************/

function addScorpions(){
	scorpions = game.add.group();
    scorpions.enableBody = true;
    scorpions.physicsBodyType = Phaser.Physics.ARCADE;

    scorpions.createMultiple(1, 'scorpion');
    scorpions.create(0, 0, 'light');

    scorpions.setAll('anchor.x', 0.5);
    scorpions.setAll('anchor.y', 0.5);

    scorpions.timeOfLastScorpion = game.time.now + 2000;
    scorpions.timeBetweenScorpions = 10000;

    scorpions.forEach(this.setScorpion, this);

//    scorpions.inGame = false;

    scorpions.killSound = game.add.audio('rugido');
    scorpions.newSound = game.add.audio('scorpion');

    scorpions.attack = scorpionsGroupAttack;
    scorpions.update = updateScorpionsGroup;
    scorpions.updateScorpion = updateScorpion;
    scorpions.addPauseTime = addScorpionsPauseTime;
    scorpions.setScorpion = setScorpion;
    scorpions.reset = resetScorpions;
}

function resetScorpions(){
    this.timeOfLastScorpion = game.time.now + 2000;
    this.callAll('kill');

    this.timeBetweenScorpions = 10000 - (game.global.level * 1400);
}

function scorpionsGroupAttack(){
	var scorpion = this.getFirstExists(false);
    if (scorpion)
    {
        scorpion.reset(400, 0);
        scorpion.body.acceleration.y = 20;
        scorpion.platformPosition = 0;
        this.timeOfLastScorpion = game.time.now;
        this.newSound.play();

        if(scorpion.key == 'light'){
            scorpion.healthBar.revive();
            scorpion.health = 30;
            scorpion.healthBar.width = 32;
            scorpion.speed = 30;
        }
        else{
            scorpion.health = 10;
        }

        if(Math.random() <= 0.5)
            scorpion.speed *= -1;
    }
}

function updateScorpionsGroup(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;
	
	if( game.time.now - this.timeOfLastScorpion > this.timeBetweenScorpions){
			this.timeOfLastScorpion = game.time.now;
			this.attack();
	}

	this.forEachAlive(this.updateScorpion, this);
}

/*****************************************************
            Every single scorpion in the group
*****************************************************/

function setScorpion(scorpion){
    scorpion.timeOfLastMove = game.time.now;

    if(scorpion.key == 'scorpion'){
        scorpion.health = 10;
        scorpion.speed = 20;
        scorpion.damage = 20;
    }
    else{
        scorpion.damage = 20;
        scorpion.speed = 30;
        scorpion.health = 30;
        scorpion.timeOfLastHit = game.time.now;
        scorpion.timeBetweenHits = 2000;
        scorpion.timeDeath = game.time.now;

        scorpion.healthBar = game.add.sprite(0, -15, 'enemyBar');
        scorpion.healthBar.anchor.setTo(0.5, 0.5);
        scorpion.addChild(scorpion.healthBar);
        scorpion.healthBar.width = 32;

        scorpion.makeSegment = makeScorpionToSegment;
    }

    scorpion.move = moveScorpion;
    scorpion.setPosition = setScorpionPosition;
    scorpion.takeDamage = scorpionTakeDamage;
    scorpion.die = scorpionDies;
}

function setScorpionPosition(){
    var local_position = this.platformPosition - player.platformPosition;
    if(local_position < 0)
        local_position += 360;
    else if(local_position >= 360)
        local_position -= 360;

    local_position = Math.PI * local_position / 180;

    var x = 250 * Math.sin(local_position);
    var y = 250 * Math.cos(local_position);

    y*=0.2;

    this.position.setTo(400 + x, 380 + y);
}

function updateScorpion(scorpion){
    if(scorpion.y < 330){
        return;
    }
    else if(scorpion.body.velocity.y > 0){
        scorpion.body.acceleration.y = 0;
        scorpion.body.velocity.y = 0;

        scorpion.platformPosition = player.platformPosition + 180;
        if(scorpion.platformPosition >= 360)
            scorpion.platformPosition -= 360;

        scorpion.timeOfLastMove = game.time.now;
    }

    if(scorpion.key == 'light'){
        if(scorpion.health <= 0 && game.time.now - scorpion.timeDeath > 15000){
            scorpion.health = 30;
            scorpion.speed = 30;
            scorpion.platformPosition = player.platformPosition;
            scorpion.healthBar.visible = true;
            scorpion.healthBar.width = 32 * ( scorpion.health / 30);

            if(player.segment){
                player.segment = null;
            }
        }

        if(player.segment)
            return;
    }

    scorpion.setPosition();
    scorpion.move();
    
}

function addScorpionsPauseTime(scorpion, value){
    scorpion.timeOfLastMove += value;
}

function moveScorpion(){
    var time = game.time.now - this.timeOfLastMove;
//  this.timeOfLastMove = game.time.now;
    time /= 1000;

    this.platformPosition += (this.speed * time);

    if(this.platformPosition >= 360)
        this.platformPosition -= 360;
    else if(this.platformPosition < 0)
        this.platformPosition += 360;



    this.timeOfLastMove = game.time.now;
}

function scorpionTakeDamage(damage){
    if(this.key == 'light'){
        if(game.time.now - this.timeOfLastHit < this.timeBetweenHits)
            return;

        this.timeOfLastHit = game.time.now;
    }

    this.health -= damage;

    if(this.key == 'light'){
        this.healthBar.width = 32 * ( this.health / 30);
    }

    if(this.health > 0)
        return;

    if(this.key == 'light'){
        this.makeSegment();
        return;
    }
    else
        this.die();
    
}

function makeScorpionToSegment(){
    gui.upScore(15);

    this.healthBar.visible = false;
    this.timeDeath = game.time.now;
    this.speed = 0;
}

function scorpionDies(){
    gui.upScore(10);

    var prob = Math.random();
    if(items == null){
        if(prob < 0.2)
            items = addItem('shield');
        else if( prob < 0.4)
            items = addItem('velocity');
    }

    scorpions.killSound.play();
    this.kill();
}