
var time;
end = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    sky.revive();
    sky.visible = false;


    dialog.revive();
    dialog.visible = false;
    texta.revive();
    texta.fontSize = 16;
    texta.text = '';

    link.revive();
    link.position.setTo(550, 350);
    link.scale.setTo(0.5, 0.5);
    link.animations.play('go');

    linkfail.revive();
    linkfail.position.setTo(550, 350);
    linkfail.scale.setTo(0.2, 0.2);
    linkfail.visible = false;


    wall.revive();
    ground.revive();


    medusa.revive();
    medusa.position.setTo(100, 250);
    medusa.visible = false;
    
    background.revive();

    sound_backgroud.play();


    time = game.time.now;
    },

    update: function(){
        if(keyboard.enterKey()){
            this.restartGame();
        }

        this.playEnd();
    },

    playEnd: function(){
        var local_time = game.time.now - time;

        if( game.physics.arcade.distanceToXY(medusa, 450, 200) <= 10 )
            medusa.body.velocity.setTo(0, 0);

        if(local_time < 2000 )
            return
        else if(local_time < 7000){
            if(!flags['playedA']){
                
                this.setText(1);
                flags['playedA'] = true;
            }
        }
        else if(local_time < 10000){
            if(!flags['playedB']){
                flags['playedB'] = true;
                medusa.visible = true;
                this.setText(-1);
                game.physics.arcade.moveToXY(medusa, 450, 200, 350);
                medusa.animations.play('normal');
                medusa_sound.play();
            }
        }
        else if(local_time < 15000){
            if(!flags['playedC']){
                flags['playedC'] = true;
                this.setText(2);
            }
        }
        else if(local_time < 16000){
            if(!flags['playedD']){
                flags['playedD'] = true;
                this.setText(-1);
                medusa.animations.play('attack');
            }
        }
        else if(local_time < 21000){
            if(!flags['playedE']){
                flags['playedE'] = true;
                medusa.animations.play('normal');

                linkfail.hit_sound.play();
                linkfail.scream_sound.play();
                
                link.kill();
                linkfail.visible = true;;
                linkfail.animations.play('fly');
                game.add.tween(linkfail.scale).to({ x:2, y:2 }, 4000, Phaser.Easing.Linear.None, true);
                game.add.tween(linkfail.position).to({ x:100, y:200 }, 4000, Phaser.Easing.Linear.None, true);
            }

            if(!flags['playedF']){
                if(linkfail.scale.x == 2){
                    linkfail.animations.stop();
                    linkfail.frame = 9;
                    linkfail.scream_sound.stop();
                    linkfail.hit_sound.play();
                    flags['playedF'] = true;
                }
            }
        }
        else{ 
            endImage.visible = true;
            this.setText(3);
        }
        
    },

    setText: function(value){
        if(value == -1){
            dialog.visible = false;
            texta.text = '';
        }
        else{
            dialog.visible = true;
        }

        if(value == 1){
            dialog.visible = true;
            texta.text = 'Por fin he llegado al final de la cueva, es hora de buscar esos tesoros.';
        }
        else if(value == 2){
            dialog.position.setTo(230, 330);
            texta.text = 'Humano, tu no debes estar aquí. \n!Vete¡';
        }
        else if(value == 3){
            texta.text = 'Ganaste!!!\nEs una lástima que esa bruja te expulsara de la torre';
            texta.fontSize = 32;
            dialog.position.setTo(300, 200);
        }

        texta.position.setTo(dialog.x + dialog.width / 2 + 4, dialog.y + dialog.height / 2);
        
        
    },

    restartGame: function(){
        link.kill();
        linkfail.kill();
        medusa.kill();
        dialog.kill();
        texta.kill();
        sky.kill();
        endImage.visible = false;

        game.global.level = 1;


        game.state.start('levels', false);
    },


}