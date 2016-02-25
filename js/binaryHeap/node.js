
function addNode(id){
	var node = game.add.sprite(400, 200, 'node');
	game.physics.enable(node, Phaser.Physics.ARCADE);
	node.anchor.set(0.5);
	node.scale.set(1.2);
	node.id = id;
	this.xTarget = 400;
	this.yTarget = 200;

	var textId = game.add.text(0, 0, id, 
        { font: "10pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3 });
    var child = node.addChild(textId);
    child.anchor.set(0.5);
//    game.physics.enable(child, Phaser.Physics.ARCADE);


    node.update = updateNode;
    node.move = moveNode;


    return node;
}

function updateNode(){

	if(game.physics.arcade.distanceToXY(this, this.xTarget, this.yTarget) < 10){
		this.body.velocity.setTo(0, 0);
		this.x = this.xTarget;
		this.y = this.yTarget;
	}
}

function moveNode(x, y){
	this.xTarget = x;
	this.yTarget = y;
	game.physics.arcade.moveToXY(this, x, y, heap.speed);
}