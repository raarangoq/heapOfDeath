
var timeOfWinState;

var items;

var textb;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
endImage.visible = false; 

    background.revive();

    player.revive();
    player.restart();

    gui.setAlive(true);

 
//    stones.reset();
//    scorpions.reset();

    gear.revive();
    platform.setAlive(true);
    hourglassback.revive();
    hourGlass.revive();

    basket.revive();

    if(game.global.level == 5){
        boss.revive();
        boss.reset();
    }


    heap.restart();
    for(var i=0; i<heap.poolLenght[game.global.level] - 1; i++)
        heap.insert(heap.takeId());

//items = addItem('shield');
    

    timeOfWinState = game.time.now;

    sound_backgroud.play();
    dialog.kill();

game.time.advancedTiming = true;

    game.global.is_playing = true;
    gui.pauseGame();


    scorpions.attack();
    },

    update: function() {
        gui.update();

        game.physics.arcade.collide(player, floor);   

        if (!flags['winState']){
            if (player.alive){

            //    platform.setDrawOrder();
                scorpions.setDrawOrder(false);
                hourglassback.bringToTop();
                heap.setDrawOrder();
                hourGlass.bringToTop();
                scorpions.setDrawOrder(true);
                basket.bringToTop();
                player.setDrawOrder();
                if(items)
                    items.bringToTop();
                gui.setDrawOrder();
                winImage.bringToTop();
                endImage.bringToTop();
                loseImage.bringToTop();

                scorpions.update();
                
       //         game.physics.arcade.overlap(player, stones, this.playerHitStone, null, this);
                for(var i=0; i<scorpions.array.length; i++){
                    if(scorpions.array[i].alive){
                        this.playerHitScorpion(scorpions.array[i]);
                        this.attackHitScorpion(scorpions.array[i]);
                    }
                }

                game.physics.arcade.overlap(player, items, this.setAbility, null, this);

                if(game.global.level == 5){
                    if(boss.distanceToPlayer() <= 30){
                        this.bossHitPlayer();
                        this.attackHitBoss();
                    }
                }

                
                

                if( keyboard.enterKey() )
                    gui.pauseGame();
            }
            else{
                if( keyboard.enterKey() )
                    this.restart();
            }
        }
        else{
            this.playWinAnimation();
            if( keyboard.enterKey() )
                this.restart();
        }

 //       game.physics.arcade.collide(ground, boss);

        if(flags['winState'] || flags['timeOut']){
  //          game.physics.arcade.collide(stones, ground);
    //        game.physics.arcade.collide(stones);

            if(game.global.level == 5){
      //          game.physics.arcade.overlap(boss, stones, this.killBoss, null, this);
                    
                
            }
        }
    },

    playerHitScorpion: function(scorpion){
        if(scorpion.distanceToPlayer() > 30)
            return;

        if(!game.physics.arcade.overlap(player, scorpion))
            return;

        if(scorpion.key == 'redscorpion' && scorpion.health <= 0){
            player.touchingSegment = scorpion;
            return;
        }
        player.touchingSegment = null;

        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
        }
        scorpion.goBack();
    },

    attackHitScorpion: function(scorpion){
        if(!player.is_attacking || scorpion.distanceToPlayer() > 30)
            return;

        if(!game.physics.arcade.overlap(player.attack, scorpion))
            return;

        scorpion.takeDamage(player.hitDamage, player.direction);
    },

    killBoss: function(boss, stone){
        boss.killSound.play();
        boss.kill();
        this.addExplosion(boss.x, boss.y);
        this.addExplosion(boss.x + 80, boss.y);
        this.addExplosion(boss.x + 40, boss.y + 40);
    },

    bossHitPlayer: function(){
        if(!game.physics.arcade.overlap(player, boss))
            return;

        player.hitPlayer(boss);
        boss.goBack();
    },

    attackHitBoss: function(){
        if(!game.physics.arcade.overlap(player.attack, boss))
            return;

        boss.takeDamage(player.direction);
    },


    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

   
    playWinAnimation: function(){
        if (game.global.level <= 5){          
            if(game.time.now - timeOfWinState < 2000){ //wait
                player.body.velocity.x = 0;
                player.animations.stop();
            }
            else if(game.time.now - timeOfWinState < 6000){
                if(!flags['winAnimationPointA']){
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                        player.body.collideWorldBounds = false;
                    flags['winAnimationPointA'] = true;
                }
            }
            else if(game.time.now - timeOfWinState < 8000){
                if(!flags['winAnimationPointB']){
 //                   stones.startAvalanche();
                    flags['winAnimationPointB'] = true;
                }
            }
            else{
                winImage.visible = true;              
            }
        }
        else{
//         
        }
    },


    setAbility: function(player, item){
        items.takeItem();
    },

    render: function() {

//textb.text = game.time.fps;
textc.text = boss.platformPosition;
game.debug.body(boss);


    },

    restart: function() {
//        sound_backgroud.stop();

        if (player.alive){
            gui.upScore(game.global.level * 50);
            game.global.level++;
            gui.scoreText.setGlobalScore();
        }
        else{
            game.global.lives = 3;
            gui.restartScore();
            game.global.health = 100;
        }

        platform.setAlive(false);
        gear.kill();
        hourglassback.kill();
        hourGlass.kill();
        boss.kill();

        if(items)
            items.destroy();
        items = null;

        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();

        if(game.global.level <= 5)
            game.state.start('levels', false);
        else {
            //player.kill();
            //game.state.start('end', false);
            game.global.level = 1;
            game.state.start('levels', false);
        }

    },

    restartFlags: function(){
        flags['winAnimationPointA'] = false;
        flags['winAnimationPointB'] = false;
        flags['winState'] = false;
        flags['timeOut'] = false;
        flags['inDark'] = false;

        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;
    },




}
