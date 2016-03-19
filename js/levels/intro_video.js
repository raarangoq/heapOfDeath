

var dialog;
var link;
var time;

var texta;

intro_video = {
	create: function(){
		sky.revive();

		dialog.revive();
		dialog.visible = false;

		link.revive();
		link.animations.play('go');

		game.physics.enable(link, Phaser.Physics.ARCADE);
		game.physics.arcade.moveToXY(link, 550, 350, 350);

		game.global.is_playing = false;
		time = game.time.time;
		
		sound_backgroud.play();

		texta.revive();
		textb = game.add.text(40, 300, '');

	},

	update: function(){
		if(keyboard.enterKey()){
			this.playGame();
		}

		this.playIntro();

	},

	setText: function(value){
		if(value == 1){
			dialog.visible = true;
			texta.text = 'Un gran grupo de bestias ha escapado de sus celdas.';
		}
		else if(value ==2){
			dialog.position.setTo(230, 330);
			texta.text = 'Debes derrotarlas y volver a encerrarlas antes de que sea demasiado tarde.';
		}

		texta.position.setTo(dialog.x + dialog.width / 2 + 4, dialog.y + dialog.height / 2);
		
	},


	playIntro: function(){
		if(!link.body)
			return;

		var local_time = game.time.time - time;

		if( game.physics.arcade.distanceToXY(link, 550, 350) <= 10 )
			link.body.velocity.setTo(0, 0);

		if(local_time < 3000){
			return;
		}
		else if(local_time < 10000){
			this.setText(1);
		}
		else if(local_time < 20000){
			this.setText(2);
		}
		else if(local_time < 25000){
			dialog.visible = false;
			texta.text = '';
			game.physics.arcade.moveToXY(link, 1200, 1000, 300);
		} 
	},

	playGame: function(){
		sky.kill();	
		dialog.kill();
		link.body.velocity.setTo(0, 0);
		link.kill();
		texta.kill();

		game.state.start('levels', false);
	}, 

	render: function(){
	}
}