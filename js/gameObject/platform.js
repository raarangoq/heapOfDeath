
function addPlatform(){
	platform = game.add.sprite(400, 400, 'platform');
	platform.anchor.set(0.5);
platform.scale.set(1.3);	
	game.physics.enable(platform, Phaser.Physics.ARCADE);
	platform.body.immovable = true;

	platform.animations.add('walk', [0, 1, 2], 6);

	platform.update = updatePlatform;
	platform.setAlive = setPlatformAlive;
	platform.setDrawOrder = setPlatformDrawOrder;
}

function updatePlatform(){

}

function setPlatformAlive(value){
	if(value){
		this.revive();
	}
	else{
		this.kill();
	}
}

function setPlatformDrawOrder(){
	this.bringToTop();
}

/////////////////////////////////////////////
/// 	Add the plarform's gear

function addGear(){
	gear = game.add.sprite(400, 500, 'gear');
	gear.anchor.set(0.5);
	gear.scale.set(1.3);
	gear.animations.add('right', [0, 1, 2, 3, 4, 5, 6], 6);
	gear.animations.add('left', [6, 5, 4, 3, 2, 1, 0], 6);
}