

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
var score = 0;
var scoreText;

function preload() {
    this.load.image ('fondo', 'images/cielo.jpg');
    this.load.image ('dragon1', 'images/dragon1.gif');
    this.load.image ('food', 'images/star.png');
    /*this.load.spritesheet('dragon1', 
        'images/dragonMove3',
        { frameWidth: 32, frameHeight: 48 }
    );*/
}
function create() {
    this.fondo=this.add.image(config.width/2,config.height/2, 'fondo');
    this.dragon=this.physics.add.image(config.width/2,config.height/2, 'dragon1')
    this.food = this.physics.add.group({
        key: 'food',
        repeat: 14,
        //setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    this.food.children.iterate(function (child) {
        child.setX(Phaser.Math.FloatBetween(32, config.width - 32));
        child.setY(Phaser.Math.FloatBetween(32, config.height - 32));
        
        //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });
    //this.food=this.physics.add.image(100,config.height/2, 'food');
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.dragon.setScale(0.5);
    this.fondo.setScale(2.5);  
    //this.food.setScale(1);
    //this.food.setVelocityX(180);
    this.izquierda=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.derecha=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.arriba=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.abajo=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.space=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.dragon.setCollideWorldBounds(true);
    this.dragon.setCollideWorldBounds(true);
    
    // fisicas
    //this.physics.world.addcollider(this.dragon, this.food, );
    this.physics.add.collider(this.dragon, this.food, collectFood, null, this);
    this.physics.add.overlap(this.dragon,  this.food, collectFood, null, this);
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
    //movimiento que siga el mouse
    this.physics.moveTo(this.dragon, this.input.mousePointer.x,this.input.mousePointer.y,200);
    
    //this.dragon.angle-=1;
    this.input.on('pointermove', function (pointer) {
        let cursor = pointer;
        //calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
        let angleNow = (Math.atan2(this.dragon.y - cursor.y, this.dragon.x - cursor.x) * 180 / Math.PI);
        this.dragon.angle=angleNow;
  }, this);
  /*
    this.input.off('pointermove', function (pointer) {
        let cursor = pointer;
        this.physics.moveTo(this.dragon, cursor.x, cursor.y,100);
        let angle = Phaser.Math.Angle.Between(this.dragon.x, this.dragon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
    }, this);*/

}

function collectFood (dragon, food)
{
    food.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    // si se acaba la comida, se vuelve a regenerar
    if (this.food.countActive(true) === 0)
    {
        this.food.children.iterate(function (child) {

            child.enableBody(true, Phaser.Math.FloatBetween(32, config.width - 32), Phaser.Math.FloatBetween(32, config.height - 32), true, true);

        });
    }   
}


