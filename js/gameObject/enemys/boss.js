

function addBoss(){
	boss = game.add.sprite(500, 330, 'boss');
	game.physics.enable(boss, Phaser.Physics.ARCADE);
	boss.body.gravity.y = 100;

	boss.scale.setTo(0.4, 0.4);
	boss.speed = 100;
	boss.PointA = 150;
    boss.PointB = 650;
    if (Math.random() < 0.5)
        boss.target = boss.PointB;
    else
        boss.target = boss.PointA;

    boss.damage = 25;

    boss.killSound = game.add.audio('creature');
    boss.sound = game.add.audio('boss');

    boss.move = moveBossToTarget;
    boss.update = updateBoss;
    boss.reset = resetBoss;

    game.physics.arcade.moveToXY(boss, boss.target, boss.y, boss.speed);
}

function moveBossToTarget(target){
	this.target = target;
    game.physics.arcade.moveToXY(this, this.target, this.y, this.speed);
    this.sound.play();
}


function updateBoss(){
	if(	Math.abs(this.x - this.PointA) <= 10 ){
		this.move( this.PointB );
	}

    if( Math.abs(this.x - this.PointB) <= 10 ){
        this.move( this.PointA );
    }
}

function resetBoss(){ 
	boss.y = 330;
    boss.x = 500;
}