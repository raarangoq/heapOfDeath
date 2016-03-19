
function addScorpion(type){

    var scorpion;
    if(!type)
        scorpion = game.add.sprite(0, 0, 'scorpion');
    else if(type == 'red')
        scorpion = game.add.sprite(0, 0, 'redscorpion');
    else if(type == 'boss')
        scorpion = game.add.sprite(0, 0, 'redscorpion');

    game.physics.enable(scorpion, Phaser.Physics.ARCADE);

    scorpion.anchor.setTo(0.5, 0.5);

    scorpion.health = 10;
    scorpion.speed = 20;
    scorpion.reverseSpeed = 30;
    scorpion.canMove = true;
    scorpion.damage = 15;
    scorpion.timeOfLastHit = game.time.now;
    scorpion.timeOfLastMove = game.time.now;
    scorpion.platformPosition = 0;

    scorpion.move = moveScorpion;
    scorpion.goBack = moveScorpionBack;
    scorpion.setPosition = setScorpionPosition;
    scorpion.takeDamage = scorpionTakeDamage;
    scorpion.die = scorpionDies;
    scorpion.update = updateScorpion;
    scorpion.distanceToPlayer = distanceToPlayer;

    scorpion.addAngularPosition = addAngularPosition;

    return scorpion;
}

function distanceToPlayer(){
    var dist1 = Math.abs(player.platformPosition - this.platformPosition);
    var dist2 = 360 - dist1;

    return Math.min(dist1, dist2);
}

function addAngularPosition(value){
    var angularPosition = this.platformPosition + value;
    if(angularPosition >= 360)
        angularPosition -= 360;
    if(angularPosition < 0)
        angularPosition += 360;

    return angularPosition;
}

function moveScorpionBack(direction){
    if(direction === undefined){
        if(this.x < 400)    {direction = 'left';}
        else                {direction = 'right';}
    }
    this.timeOfLastHit = game.time.now;

    this.canMove = false;
    this.speed = this.reverseSpeed;
    if(direction == 'left')
        this.speed *= -1;
}

function moveScorpion(){
    var time = game.time.now - this.timeOfLastMove;
    time /= 1000;

    this.platformPosition = this.addAngularPosition(this.speed * time);

    this.timeOfLastMove = game.time.now;
}

function setScorpionPosition(){
    var local_position = this.addAngularPosition(-player.platformPosition);
    
    local_position = Math.PI * local_position / 180;

    var x = 250 * Math.sin(local_position) * 1.3;
    var y = 250 * Math.cos(local_position) * 1.3;

    y*=0.2;

    this.scale.set(1 + ( Math.cos(local_position) / 5  ));

    this.position.setTo(400 + x, 380 + y);
}


function updateScorpion(){
    if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
        return;

    if(this.y < 280){
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


    if(!this.canMove && game.time.now - this.timeOfLastHit > 1500){
        this.canMove = true;
        this.speed = 30 + (Math.random() * 10);
        if(Math.random() >= 0.5){
            this.speed *= -1;
        }
    }

    this.setPosition();
    this.move();
}

function scorpionDies(){
    gui.upScore(15);
    if(this.key == 'redscorpion')
        gui.upScore(15);

    this.y = 0;

    var prob = Math.random();
    if(items == null){
        if(prob <= 0.1)         items = addItem('shield');
        else if( prob <= 0.2)   items = addItem('velocity');
    }

    
    this.kill();
}

function scorpionTakeDamage(damage){
    this.health -= damage;
    if(this.health > 0)
        return;

    scorpions.killSound.play();
    this.speed = 20 + (Math.random() * 10);
    this.die();
}
