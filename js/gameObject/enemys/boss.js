

function addBoss(){
    boss = addScorpion('boss');
    boss.scale.set(2);

    boss.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
    boss.play('walk');

	boss.speed = 40;
    boss.damage = 40;
    boss.platformPosition = 0;
    boss.body.velocity.y = 20;

    boss.killSound = game.add.audio('creature');
    boss.sound = game.add.audio('boss');
    boss.hitSound = game.add.audio('rugido');

    boss.update = updateBoss;
    boss.reset = resetBoss;
    boss.takeDamage = bossTakeDamage;
    boss.addPauseTime = addBossPauseTime;
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

    if(!this.canMove && game.time.now - this.timeOfLastHit > 1500){
        this.canMove = true;
        this.speed = 40 + (Math.random() * 20);
        if(Math.random() >= 0.5)    this.speed *= -1;
    }
    
    this.setPosition();
    this.move();

    this.scale.set(this.scale.x * 1.5);
}

function bossTakeDamage(direction){
    if(game.time.now - this.timeOfLastHit < this.timeBetweenHits)
        return;
    this.timeOfLastHit = game.time.now;

    this.hitSound.play();

    this.goBack(direction);
}

function resetBoss(){
    this.platformPosition = player.platformPosition;
    this.platformPosition = this.addAngularPosition(180);
    this.body.velocity.y = 20;
}

function addBossPauseTime(value){
    this.timeOfLastMove += value;
    this.timeOfLastHit += value;
}