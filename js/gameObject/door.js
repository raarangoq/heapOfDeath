


function addDoor(){
	var door = game.add.sprite(710, -90, 'door-2');
	game.physics.enable(door, Phaser.Physics.ARCADE);
	door.body.immovable = true;

	door.yTarget = -220;
	
	door.sound = game.add.audio('door');

	door.visible = false;

	door.move = moveDoor;
	door.update = updateDoor;
	door.setAlive = setDoorAlive;
	door.reset = resetDoor;

	return door;
}


function moveDoor(){
//alert('entra');	
	game.physics.arcade.moveToXY(this, this.x, this.yTarget, 60);
	this.sound.play();
}

function updateDoor(){
	if(Math.abs(this.yTarget - this.y) < 10){
		this.body.velocity.y = 0;
	}
}

function setDoorAlive(value){
	if(value){
		this.revive();
		this.visible = true;
	}
	else{
		this.kill();
	}
}

function resetDoor(){
	this.y = -90;
	this.body.velocity.setTo(0, 0);
}