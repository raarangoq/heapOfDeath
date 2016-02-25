

function addSpiral () {
	var spiral = game.add.sprite(35, 0, 'spiral');
	spiral.animations.add('turn', [0, 1, 2, 3, 4, 5, 6], 9, true);
	spiral.play('turn');
	spiral.anchor.setTo(0.5, 0.5);

	spiral.visible = false;

	return spiral;
}


///////////////////////////////
////     When the player takes dagame, he bleeds

function addBlood(){
	var blood = game.add.sprite(-15, -10, 'blood');
	blood.initTime = game.time.now;
	blood.animations.add('bleed', [0, 1, 2, 3, 4], 9, true);
	blood.play('bleed');

	blood.playBleed = playBloodAnimation;
	blood.update = updateBlood;

	return blood;
}

function playBloodAnimation(){
	this.initTime = game.time.now;
	this.visible = true;
}

function updateBlood(){
	if(game.time.now - this.initTime > 1000){
	//	alert('entra');
		this.visible = false;
	}
}