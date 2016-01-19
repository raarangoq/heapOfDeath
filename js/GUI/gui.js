
function GUI(){

	// Objetos y Atributos
	
	this.lives_bar = addLivesBar();
	this.items_bar = new itemsBar();

	this.pause_menu = addPause();
	this.scoreText = addScore();

	this.timeText = addTimer();

	// Metodos
	this.update = updateGui;
	this.setDrawOrder = guiSetDrawOrder;

	this.pauseGame = guiPauseGame;
	this.upScore = guiUpScore;
	this.restartScore = restartScore;
	this.changeAbility = changeAbility;
	this.setAlive = guiSetAlive;

	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pauseGame, this);
}

function updateGui(){
	this.items_bar.update();
//	this.lives_bar.update();
//	this.pause_menu.update();
}

function guiUpScore(value){
	this.scoreText.upScore(value);
}

function restartScore(){
	this.scoreText.restart();
}

function guiPauseGame(){
	this.pause_menu.pauseGame();
}


// true for take a new item, false when de player uses a item or lose the item
function changeAbility(take, type){
	if(type == 'light')
		return;

	if (take)
		this.items_bar.setItemsBarAbility(type);
	else
		this.items_bar.useItemsBarAbility(type);
}

function guiSetDrawOrder(){
	this.pause_menu.setDrawOrder();
	this.items_bar.setDrawOrder();
	this.lives_bar.setDrawOrder();
	this.timeText.setDrawOrder();
	scoreText.setDrawOrder();
}

function guiSetAlive(value){
	this.items_bar.setAlive(value);
	this.lives_bar.setAlive(value);
	this.pause_menu.setAlive(value);
	this.scoreText.setAlive(value);
	this.timeText.setAlive(value);
}


