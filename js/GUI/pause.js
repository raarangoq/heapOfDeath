
function addPause(){
	var pause_menu = game.add.sprite(0, 0, 'blankpause');
	pause_menu.fixedToCamera = true;
	pause_menu.visible = false;

	pause_menu.timeLastPause = game.time.now;

	pause_menu.actualPage = 0;
	pause_menu.lastChange = game.time.now;

	pause_menu.pages = [];
	pause_menu.pages[0] = addPausePage0();
	pause_menu.pages[1] = addPausePage1();
	pause_menu.pages[2] = addPausePage2();

	pause_menu.showPage = showPausePage;

	pause_menu.setDrawOrder = pauseMenuSetDrawOrder;
	pause_menu.setAlive = pauseMenuSetAlive;
	pause_menu.update = pauseMenuUpdate;
	pause_menu.pauseGame = pauseGame;

	return pause_menu;
}

function pauseMenuUpdate(){
	this.pages[0].children[0].text = 'Segmento ' + heap.size + ' de ' + heap.poolLenght[game.global.level];

	if(!game.physics.arcade.isPaused)
		return;

	if(game.time.now - this.lastChange > 500){
		if(keyboard.leftKey())
			this.showPage(this.actualPage - 1);
		if(keyboard.rightKey())
			this.showPage(this.actualPage + 1);
	}
}

function showPausePage(page){
	if(page < 0)
		page = this.pages.length - 1;
	if(page > this.pages.length - 1)
		page = 0;

	this.lastChange = game.time.now;

	this.pages[this.actualPage].setAlive(false);
	this.actualPage = page;
	this.pages[this.actualPage].setAlive(true);
}

function pauseGame(){
	if(!game.global.is_playing)
		return;

	if(game.time.now - this.timeLastPause > 500){
		if(game.physics.arcade.isPaused){
			this.visible = false;
			this.pages[this.actualPage].setAlive(false);
			game.physics.arcade.isPaused = false;
			
			gui.timeText.initLevelTime += (game.time.now - this.timeLastPause);
			player.timeOfLastMove += (game.time.now - this.timeLastPause);


			scorpions.addPauseTime(game.time.now - this.timeLastPause);
		}
		else{
			this.visible = true;
			game.physics.arcade.isPaused = true;
			this.showPage(0);
		}
		this.timeLastPause = game.time.now;
	}
}

function pauseMenuSetDrawOrder(){
	this.bringToTop();
	for(var i=0; i<this.pages.length; i++)
		this.pages[i].bringToTop();
}

function pauseMenuSetAlive(value){
    if (value){
        this.revive();
        this.pages[0].text = 'Level ' + game.global.level;
    }
    else {
        this.kill();
        for(var i=0; i<this.pages.length; i++){
        	this.pages[i].kill();
        }
    }
    this.visible = false;
}

