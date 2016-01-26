
function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);

	var text = game.add.text(0, 100, 'Segmento ' + heap.size + ' de ' + heap.poolLenght[game.global.level],
		{ font: "18pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	text = game.add.text (-0, 200, 
		'Toma los escorpiones rojos e introducelos en el reloj antes de agotado el tiempo.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}


function addPausePage1(){
	var page = game.add.sprite(0, 0, 'input');


	page.setAlive = setPageAlive;

	return page;
}

function addPausePage2(){
	var page = game.add.sprite(100, 130, 'scorpion');
	var text = game.add.text(50, 0, 
		'Escorpion: pequeño bicho que inflinge daño leve, con un solo ataque puedes destruirlo.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'light');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Escorpion Rojo: Bicho que inflinge daño moderado, con tres ataques lo conviertes en un caparazon.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'light');
	page.addChild(image);
	text = game.add.text(50, 200, 
		'Caparazon: Escorpion rojo que se defiende de los ataques. Tomalo con ESPACIO, luego salta, y cuando estes en lo más alto, preciona ESPACIO para introducirlo en el reloj de arena.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function setPageAlive(value){
	if(value){
		this.revive();
	}
	else
		this.kill();
}