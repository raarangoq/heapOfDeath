
function addScorpionsGroup(){
	
	this.timeOfLastScorpion = game.time.now + 2000;
    this.timeBetweenScorpions = 7000 - (600 * game.global.level);

    this.array = [];
    this.array[0] = addRedScorpion();
    for(var i=1; i<=7; i++){
    	this.array[i] = addScorpion();
    }
    
    this.limit = [0, 3, 4, 5, 6, 7];

    this.killSound = game.add.audio('rugido');
    this.newSound = game.add.audio('scorpion');

    this.attack = scorpionsGroupAttack;
    this.update = updateScorpionsGroup;
    this.addPauseTime = addScorpionsPauseTime;
    this.reset = resetScorpions;
    this.setAlive = setScorpionsGroupAlive;

    this.setDrawOrder = setScorpionsDrawOrder;

}

function setScorpionsGroupAlive(value) {
	for(var i=0; i<this.array.length; i++){
		if(value)
			this.array[i].revive();
		else
			this.array[i].kill();
	}
}

function updateScorpionsGroup(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;
	
	if( game.time.now - this.timeOfLastScorpion > this.timeBetweenScorpions){
		this.timeOfLastScorpion = game.time.now;
		this.attack();
	}
}

function resetScorpions(){
    this.timeOfLastScorpion = game.time.now + 2000;
    for(var i=0; i<this.array.length; i++)
    	this.array[i].kill();

    this.timeBetweenScorpions = 7000 - (600 * game.global.level);
}

function scorpionsGroupAttack(){
	var scorpion = null;
	var i=0;
	while( !scorpion && i<=this.limit[game.global.level] ){
		i++;
		var pos = Math.floor(Math.random() * (this.limit[game.global.level] + 0.5) );
		if(!this.array[pos].alive){
			scorpion = this.array[pos];
			scorpion.revive();
		}
	}
	if(!scorpion)
		return;

    scorpion.reset(400, 0);
    scorpion.body.velocity.y = 20;
    scorpion.body.acceleration.y = 20;
    scorpion.scale.set(0.8);
    scorpion.platformPosition = 0;
    scorpion.health = 10;
    

    this.timeOfLastScorpion = game.time.now;
    this.newSound.play();

    if(scorpion.key == 'redscorpion'){
        scorpion.healthBar.revive();
        scorpion.health = 30;
        scorpion.healthBar.width = 32;
        scorpion.body.rotation = 0;
        scorpion.speed = 30;
        scorpion.play('walk');
    }

    if(Math.random() <= 0.5)
        scorpion.speed *= -1;
    
}

function setScorpionsDrawOrder(value){
	for(var i=0; i<this.array.length; i++){
	    if(value){
	        if(this.array[i].y >= 380 || this.array[i].body.velocity.y < 0)
	            this.array[i].bringToTop();
	    }
	    else{
	        if(this.array[i].y < 380 || this.array[i].body.velocity.y > 0)
	            this.array[i].bringToTop();
	    }
	}



	if(game.global.level == 5){
		if(value){
			if(boss.y >= 380)	boss.bringToTop();
		}
		else
			if(boss.y < 380)	boss.bringToTop();
	}

}

function addScorpionsPauseTime(value){
	this.timeOfLastScorpion += value;
	for(var i=0; i<this.array.length; i++){
    	this.array[i].timeOfLastMove += value;
    	if(this.array[i].key == 'redscorpion')
    		this.array[i].timeDeath += value;
	}

	if(game.global.level == 5)
		boss.addPauseTime(value);
}