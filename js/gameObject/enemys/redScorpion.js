
function addRedScorpion () {
	var scorpion = addScorpion('red');

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

    this.healthBar.visible = false;
    this.timeDeath = game.time.now;
    this.speed = 0;
}

function updateRedScorpion(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;

	if(this.y < 330){
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

    if(this.health <= 0 && game.time.now - this.timeDeath > 15000){
        this.health = 30;
        this.speed = 30;
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

    if(player.segment){
        this.platformPosition = player.platformPosition;
        return;
    }

    if(!this.canMove && game.time.now - this.timeOfLastHit > 1500){
        this.canMove = true;
        this.speed = 30;
        if(Math.random() >= 0.5){
            this.speed *= -1;
        }
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

