

var dialog;
var link;
var cloud1;
var cloud2;
var cloud3;

var time;

var texta;

intro_video = {
	create: function(){
		sky.revive();

		cloud1 = game.add.sprite(300, 100, 'cloud');
		cloud1.scale.setTo(0.3, 0.5);
		game.physics.enable(cloud1, Phaser.Physics.ARCADE);
		cloud1.body.velocity.x= 2;
		cloud2 = game.add.sprite(-30, 130, 'cloud');
		cloud2.scale.setTo(0.7, 0.3);
		game.physics.enable(cloud2, Phaser.Physics.ARCADE);
		cloud2.body.velocity.x= 3;
		cloud3 = game.add.sprite(400, 50, 'cloud');
		cloud3.scale.setTo(0.1, 0.1);
		game.physics.enable(cloud3, Phaser.Physics.ARCADE);
		cloud3.body.velocity.x= 3;

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
			texta.text = 'Rumores dicen que en estas cuevas se encuentran objetos de gran valor.';
		}
		else if(value ==2){
			dialog.position.setTo(230, 330);
			texta.text = 'Entra en la cueva y busca esos objetos.';
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


		cloud1.destroy();
		cloud2.destroy();
		cloud3.destroy();
		
		game.state.start('levels', false);
	}, 

	render: function(){
	}
}