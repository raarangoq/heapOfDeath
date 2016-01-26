
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

    platform.setAlive(true);
    hourGlass.revive();

    door.setAlive(true);
    door.reset();

    heap.restart();
//    heap.insert(16);
//    heap.insert(17);

//    items = addItem('light');
    

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
                hourGlass.bringToTop();
                heap.setDrawOrder();
                scorpions.setDrawOrder(true);
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
 //                   game.physics.arcade.overlap(player, boss, this.bossHitPlayer, null, this);
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

        if(scorpion.key == 'light'){
            if(scorpion.health <= 0){
                player.touchingSegment = scorpion;
                return;
            }
        }
        player.touchingSegment = null;

        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
            player.timeOfLastScorpionAttack = game.time.now;
        }
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

    bossHitPlayer: function(player, boss){
        player.hitPlayer(boss);
    },

    addAliens: function(){
        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
            player.timeOfLastScorpionAttack = game.time.now;
        }
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

    // Establecer la explosión
    setupExplosion: function(explosion) {
        
    },

    setAbility: function(player, item){
        items.takeItem();
    },

    render: function() {

textb.text = game.time.fps;
text.text = scorpions.array[0].speed + '\n' + scorpions.array[0].canMove;


    },

    restart: function() {
//        sound_backgroud.stop();

        if (player.alive){
            game.global.level++;
        }
        else{
            game.global.lives = 3;
            gui.restartScore();
            game.global.health = 100;
        }

        platform.setAlive(false);
        hourGlass.kill();
        door.setAlive(false);
        boss.kill();

        if(items)
            items.destroy();
        items = null;

//        stones.reset();
 //       stones.avalanche.visible = false;
        
        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();

        if(game.global.level <= 5)
            game.state.start('levels', false);
        else {
            player.kill();
            game.state.start('end', false);
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
