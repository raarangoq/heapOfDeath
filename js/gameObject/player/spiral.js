

function addSpiral () {
	var spiral = game.add.sprite(35, 0, 'spiral');
	game.physics.enable(spiral, Phaser.Physics.ARCADE);
	spiral.anchor.setTo(0.5, 0.5);
	spiral.scale.setTo(0.2, 0.2);
	spiral.body.angularVelocity = 270;

	spiral.visible = false;

	return spiral;
}