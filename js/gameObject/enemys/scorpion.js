

/*********************************************
            Group of scorpions
********************************************/
function addScorpion(type){

    var scorpion;
    if(!type)
        scorpion = game.add.sprite(0, 0, 'scorpion');
    else if(type == 'red')
        scorpion = game.add.sprite(0, 0, 'light');

    game.physics.enable(scorpion, Phaser.Physics.ARCADE);

    scorpion.anchor.setTo(0.5, 0.5);

    scorpion.health = 10;
    scorpion.speed = 20;
    scorpion.damage = 10;
    scorpion.timeOfLastMove = game.time.now;
    scorpion.platformPosition = 0;

    scorpion.move = moveScorpion;
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


function moveScorpion(){
    var time = game.time.now - this.timeOfLastMove;
    time /= 1000;

    this.platformPosition = this.addAngularPosition(this.speed * time);

    this.timeOfLastMove = game.time.now;
}

function setScorpionPosition(){
    var local_position = this.addAngularPosition(-player.platformPosition);
    
    local_position = Math.PI * local_position / 180;

    var x = 250 * Math.sin(local_position);
    var y = 250 * Math.cos(local_position);

    y*=0.2;

    this.position.setTo(400 + x, 380 + y);
}


function updateScorpion(){
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

    this.setPosition();
    this.move();
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

function scorpionTakeDamage(damage){
    this.health -= damage;
    if(this.health > 0)
        return;

    this.die();
}
