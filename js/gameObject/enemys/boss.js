

function addBoss(){
    boss = addScorpion('boss');
    boss.scale.set(2);

    boss.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
    boss.animations.add('close', [5, 6, 7, 8, 9], 6);
    boss.animations.add('open', [9, 8, 7, 6, 5], 6);
    boss.play('walk');

	boss.speed = 30;
    boss.damage = 40;
    boss.health = 60;
    boss.platformPosition = 0;
    boss.body.velocity.y = 20;
    boss.timeBetweenHits = 2000;
    boss.timeDeath = game.time.now;

    boss.healthBar = game.add.sprite(0, -15, 'enemyBar');
    boss.healthBar.anchor.setTo(0.5, 0.5);
    boss.addChild(boss.healthBar);
    boss.healthBar.width = 32;

    boss.killSound = game.add.audio('creature');
    boss.sound = game.add.audio('boss');
    boss.hitSound = game.add.audio('rugido');

    boss.makeSegment = makeBossToSegment;
    boss.update = updateBoss;
    boss.reset = resetBoss;
    boss.takeDamage = bossTakeDamage;
    boss.addPauseTime = addBossPauseTime;
}

function makeBossToSegment(){
    this.play('close');
    this.healthBar.visible = false;
    this.timeDeath = game.time.now;
    this.speed = 0;
}

function updateBoss(){
    if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
        return;

    if(this.body.velocity.y > 0){
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
            this.health = 60;
            this.speed = 30 + (Math.random() * 10);
            this.play('walk');
            this.timeOfLastMove = game.time.now;
            if(Math.random() >= 0.5){
                this.speed *= -1;
            }
            this.healthBar.visible = true;
            this.healthBar.width = 32 * ( this.health / 60);
            this.canMove = true;
        }
    }

    if(!this.canMove && game.time.now - this.timeOfLastHit > 1500){
        this.canMove = true;
        this.speed = 30 + (Math.random() * 10);
        if(Math.random() >= 0.5)    this.speed *= -1;
    }
    
    this.setPosition();
    this.move();

    this.scale.set(this.scale.x * 1.5);
}

function bossTakeDamage(damage, direction){
    if(game.time.now - this.timeOfLastHit < this.timeBetweenHits)
        return;
    this.timeOfLastHit = game.time.now;

    if(this.health > 0)
        this.hitSound.play();

    this.health -= damage;
    this.healthBar.width = 32 * ( this.health / 60);

    if(this.health > 0){
        this.goBack(direction);
    }else{
        this.makeSegment();
    }
}

function resetBoss(){
    this.platformPosition = player.platformPosition;
    this.platformPosition = this.addAngularPosition(180);
    this.body.velocity.y = 20;
    this.health = 60;
}

function addBossPauseTime(value){
    this.timeOfLastMove += value;
    this.timeOfLastHit += value;
}