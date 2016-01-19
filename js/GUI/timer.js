
function addTimer(){

    var timer = game.add.text(500, 10, 'Restante: ', { font: '34px ferney', fill: '#fff' });
    timer.stroke = '#000000';
    timer.strokeThickness = 6;
    timer.timerString = 'Restante: ';
    timer.initLevelTime = game.time.now;
    timer.levelTime = 60000;

    timer.setDrawOrder = timerSetDrawOrder;
    timer.setAlive = timerSetAlive;
    timer.restart = restartTimer;
    timer.update = updateTimer;

    return timer;
}


function updateTimer(){
    if(game.physics.arcade.isPaused || game.global.lives <= 0 || game.global.level > 5)
        return;

    this.text = this.timerString;

    var time = Math.floor((this.levelTime - (game.time.now - this.initLevelTime)) / 1000);
    if(time > 0){
    	if (!flags['winState'])
    		this.text += time;
    	else
    		this.text += '0';
    }
    else{
    	this.text += '0';
    	flags['timeOut'] = true;
//    	stones.startAvalanche();
    }
}

function timerSetDrawOrder(){
	this.bringToTop();
}

function timerSetAlive(value){
    if (value){
        this.revive();
        this.restart();
    }
    else {
        this.kill();
    }
}

function restartTimer(){
    this.initLevelTime = game.time.now;
    flags['timeOut'] = false;
    this.levelTime = 120000 + (game.global.level * 20000);

    if(game.global.level >= 3)
        this.levelTime += 120000;
    if(game.global.level >= 5)
        this.levelTime += 120000;
}