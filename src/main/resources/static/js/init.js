

//import MenuScene from "./scenes/MenuScene";
//import Phaser from "phaser";
const config = {
    //document.documentElement.clientWidth
    //document.documentElement.clientHeight
    width:document.documentElement.clientWidth-20,
    height: document.documentElement.clientHeight-20,
    parent: "container",
    type: Phaser.AUTO,
    
    scene: {
        menu: "menu",
        preload: preload,
        create: create,
        update: update
    },
    /*scene: [MenuScene],*/
    physics:{
        default: "arcade",
        arcade: {
        }
    }
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image ('fondo', 'images/cielo.jpg');
    this.load.image ('dragon1', 'images/dragon1.gif');
    this.load.image ('eat', 'images/circle2.png');
}
function create() {
    this.fondo=this.add.image(config.width/2,config.height/2, 'fondo');
    this.dragon=this.physics.add.image(config.width/2,config.height/2, 'dragon1')
    this.food=this.physics.add.image(100,config.height/2, 'eat')
    this.dragon.setScale(0.5);
    this.fondo.setScale(2.5);    
    this.food.setScale(0.5);
    this.food.setVelocityX(180);
    this.izquierda=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.derecha=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.arriba=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.abajo=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.space=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.dragon.setCollideWorldBounds(true);
    this.dragon.setCollideWorldBounds(true);
    
    // fisicas
    //this.physics.world.addcollider(this.dragon, this.food, );
}
function update(time, delta) {
    //console.log(delta,time);
    if(this.izquierda.isDown){
        this.dragon.x++;
    }if(this.derecha.isDown){
        this.dragon.x--;
    }if(this.abajo.isDown){
        this.dragon.y++;
    }if(this.arriba.isDown){
        this.dragon.y--;
    }
    if(this.space.isDown){
        
        if(this.izquierda.isDown){
            this.dragon.setVelocity(100,0);
        }if(this.derecha.isDown){
            this.dragon.setVelocity(-100,0);
        }if(this.abajo.isDown){
            this.dragon.setVelocity(0,100);
        }if(this.arriba.isDown){
            this.dragon.setVelocity(0,-100);
        }
    }if(this.space.isUp){
        this.dragon.setVelocity(0,0);
    }
    //this.physics.world.arcade.moveToPointer(this.dragon, 400);
    this.physics.world.collide(this.dragon, this.food, function (dragon, food){
    	food.destroy();
    });

     
}