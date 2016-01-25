
function addPause(){
	var pause_menu = game.add.sprite(0, 0, 'pause');
	pause_menu.fixedToCamera = true;
	pause_menu.visible = false;

	pause_menu.timeLastPause = game.time.now;


	pause_menu.setDrawOrder = pauseMenuSetDrawOrder;
	pause_menu.setAlive = pauseMenuSetAlive;
	pause_menu.update = pauseMenuUpdate;
	pause_menu.pauseGame = pauseGame;

	return pause_menu;
}

function pauseMenuUpdate(){
	
}

function pauseGame(){
	if(!game.global.is_playing)
		return;

	if(game.time.now - this.timeLastPause > 500){
		if(game.physics.arcade.isPaused){
			this.visible = false;
			game.physics.arcade.isPaused = false;
			
			gui.timeText.initLevelTime += (game.time.now - this.timeLastPause);
			player.timeOfLastMove += (game.time.now - this.timeLastPause);


			scorpions.addPauseTime(game.time.now - this.timeLastPause);
		}
		else{
			this.visible = true;
			game.physics.arcade.isPaused = true;
		}
		this.timeLastPause = game.time.now;
	}
}

function pauseMenuSetDrawOrder(){
	this.bringToTop();
}

function pauseMenuSetAlive(value){
    if (value){
        this.revive();
    }
    else {
        this.kill();
    }
    this.visible = false;
}

