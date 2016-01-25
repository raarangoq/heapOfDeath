
function addPlatform(){
	platform = game.add.sprite(0, 0, 'platform');
	platform.anchor.set(0.5);
	game.physics.enable(platform, Phaser.Physics.ARCADE);
	platform.body.immovable = true;
	platform.position.setTo(400, 400);
	platform.scale.setTo(1, 0.2);

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