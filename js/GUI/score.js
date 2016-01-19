
function addScore(){

    var scoreText = game.add.text(10, 10, 'Puntaje: ', { font: '34px ferney', fill: '#fff' });
    scoreText.stroke = '#000000';
    scoreText.strokeThickness = 6;
    scoreText.scoreString = 'Puntaje: ';
    scoreText.score = 0;

    scoreText.upScore = upScore;
    scoreText.setDrawOrder = scoreSetDrawOrder;
    scoreText.setAlive = scoreSetAlive;
    scoreText.restart = restartScoreText;
    scoreText.update = updateScoreText;

    return scoreText;
}

function updateScoreText(){
    this.text = this.scoreString + this.score;
}


function upScore(value){
	this.score += value;
    this.text = this.scoreString + this.score;
}

function scoreSetDrawOrder(){
	this.bringToTop();
}

function scoreSetAlive(value){
    if (value){
        this.revive();
    }
    else {
        this.kill();
    }
}

function restartScoreText(){
    this.score = 0;
}