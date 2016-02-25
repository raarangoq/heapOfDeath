
function addRedScorpion () {
	var scorpion = addScorpion('red');

    scorpion.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
    scorpion.animations.add('close', [5, 6, 7, 8, 9], 6);
    scorpion.animations.add('open', [9, 8, 7, 6, 5], 6);

    scorpion.play('walk');

	scorpion.damage = 20;
    scorpion.speed = 30;
    scorpion.reverseSpeed = 45;
    scorpion.health = 30;
    scorpion.timeBetweenHits = 2000;
    scorpion.timeDeath = game.time.now;

    scorpion.healthBar = game.add.sprite(0, -15, 'enemyBar');
    scorpion.healthBar.anchor.setTo(0.5, 0.5);
    scorpion.addChild(scorpion.healthBar);
    scorpion.healthBar.width = 32;

    scorpion.makeSegment = makeScorpionToSegment;
    scorpion.update = updateRedScorpion;
    scorpion.takeDamage = redScorpionTakeDamage;

    return scorpion;
}

function makeScorpionToSegment(){
    gui.upScore(15);
    this.play('close');
    this.healthBar.visible = false;
    this.timeDeath = game.time.now;
    this.speed = 0;
}

function updateRedScorpion(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;

	if(this.y < 270){
		this.platformPosition = player.platformPosition;
        this.platformPosition = this.addAngularPosition(180);
        return;
    }
    else if(this.body.velocity.y > 0){
        this.body.acceleration.y = 0;
        this.body.velocity.y = 0;

        this.platformPosition = player.platformPosition;
        this.platformPosition = this.addAngularPosition(180);

        this.timeOfLastMove = game.time.now;
    }

    if(this.health <= 0){
        if(game.time.now - this.timeDeath > 4000)
            this.play('open');
        if(game.time.now - this.timeDeath > 7000){
            this.health = 30;
            this.speed = 30;
            this.play('walk');
            this.timeOfLastMove = game.time.now;
            if(Math.random() >= 0.5){
                this.speed *= -1;
            }
            this.healthBar.visible = true;
            this.healthBar.width = 32 * ( this.health / 30);
            this.canMove = true;

            if(player.segment){
            	this.platformPosition = player.platformPosition;
                player.segment = null;
                player.touchingSegment = null;
            }
        }
    }

    if(player.segment){
        this.platformPosition = player.platformPosition;
        return;
    }

    
    if(!this.canMove && game.time.now - this.timeOfLastHit > 1500){
        this.canMove = true;
        this.speed = 30;
        if(Math.random() >= 0.5)    this.speed *= -1;
    }
    

    this.setPosition();
    this.move();
}

function redScorpionTakeDamage(damage, direction){
    if(game.time.now - this.timeOfLastHit < this.timeBetweenHits)
        return;
    this.timeOfLastHit = game.time.now;

    this.health -= damage;
    this.healthBar.width = 32 * ( this.health / 30);

    if(this.health > 0){
        this.goBack(direction);
    }else{
        this.makeSegment();
    }
}

