var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function SceneB() {
		Phaser.Scene.call(this, 'sceneA');
		this.fondoInicio;
	},

	preload: function () {
		this.load.image('fInicio', 'images/fondo4.jpg');
		this.load.image('block', 'images/50x50-black.png');
	},

	create: function () {
		//this.fondoInicio = this.add.image(config.width / 2, config.height / 2, 'fInicio');
		this.add.image(config.width / 2, config.height / 2, 'fInicio');
		var blocks = this.add.group({ key: 'block', repeat: 210 });
		this.input.once('pointerdown', function () {
			this.scene.switch('sceneB');
		}, this);

	}
});

var SceneB = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function SceneB() {
		Phaser.Scene.call(this, 'sceneB');
		this.graphics;
		this.timerEvent;
		this.clockSize = 240;
	},

	preload: function () {
		this.load.image('fondo', 'images/fondo5.jpg');
		this.load.image('drag', 'images/dragon3.png');
		this.load.image('food', 'images/star.png');
		this.load.atlas('dragones', 'images/dragones.png', 'images/dragones.js');
	},

	create: function () {
		this.add.image(config.width / 2, config.height / 2, 'fondo');
	},
	preload: preload,
	create: create,
	update: update
});

const config = {
		type: Phaser.AUTO,
		width: document.documentElement.clientWidth - 20,
		height: document.documentElement.clientHeight - 20,
		backgroundColor: '#000000',
		parent: 'container',
		scene: [SceneA, SceneB],
		physics: {
		default: "arcade",
		arcade: {
			}
		},
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var foods;
var activo;

function preload() {
	this.load.image('fondo', 'images/fondo5.jpg');
	this.load.image('drag', 'images/dragon3.png');
	this.load.image('food', 'images/esfera3.png');
	this.load.atlas('dragones', 'images/dragones.png', 'images/dragones.js');
	this.load.atlas('fuegos', 'images/fuego1.png', 'images/fuego.js');

}
function create() {
	this.fondo = this.add.image((config.width / 2)-100, (config.height / 2)-100, 'fondo');
	this.fondo.setScale(1.3);
	this.anims.create({ key: 'dragon1', frames: this.anims.generateFrameNames('dragones', { prefix: 'dragon1_', end: 100, zeroPad: 4 }), repeat: -1 });
	this. f = this.anims.create({ key: 'fuego1', frames: this.anims.generateFrameNames('fuegos', { prefix: 'fuego_', end: 100, zeroPad: 4 }), repeat: 0 });
	//this.add.sprite(400, 100, 'dragones').play('dragon1');
	this.dragon = this.physics.add.sprite(400, 100, 'dragones').play('dragon1');    
	this.activo=true;
	this.foods =this.physics.add.group();
	for (var i = 0; i < 20; i++)
	{
		this.foods.create(Phaser.Math.FloatBetween(32, config.width - 32),Phaser.Math.FloatBetween(32, config.height - 32), 'food');
	}

	//this.food=this.physics.add.image(100,config.height/2, 'food');
	scoreText = this.add.text(150, 40, 'score: 0', { fontSize: '32px', fill: '#000' });
	//this.dragon.add.play;     
	//this.food.setVelocityX(180);
	
	this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	//this.dragon.setCollideWorldBounds(true);
	this.dragon.setCollideWorldBounds(true);

	// fisicas
	//this.physics.world.addcollider(this.dragon, this.food, );
	this.physics.add.collider(this.dragon, this.foods, collectFood, null, this);
	this.physics.add.overlap(this.dragon, this.foods, collectFood, null, this);
	this.input.on('pointerdown', function (pointer) {
		if(this.activo==true){
			this.activo=false;
			this.f = this.add.sprite(this.dragon.x, this.dragon.y, 'fuegos').play('fuego1');
			let cursor = pointer;
			//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
			let angleNow = (Math.atan2(this.dragon.y - cursor.y, this.dragon.x - cursor.x) * 180 / Math.PI);
			this.f.angle = angleNow-180;
			var time;
			//this.f.events.onInputDown.add(destroySprite, this);
			//this.f.time.destroy(1000);
			//this.f.destroy(2000);
			//event.gameObject.setActive(false);
			//
			//console.log(game);

			//this.add.tween(this.f).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
			/**var timedEvent = this.time.addEvent({
            delay: 5000,
            callback: fadePicture(this.f),
            callbackScope:this,
        	});*/
			timedEvent = this.time.delayedCall(250, onEvent, [], this);
		}
	}, this);
}




function onEvent (){
	console.log("as")
	this.f.setActive(false);
	this.f.setVisible(false);
	this.activo=true;
}

function update(time, delta) {

	if (this.space.isUp) {
		this.dragon.setVelocity(0, 0);
	}
	if (this.input.mousePointer.x == this.dragon.x && this.input.mousePointer.y == this.dragon.y) {
		this.dragon.setVelocity(0, 0);
	}
	//movimiento que siga el mouse
	this.physics.moveTo(this.dragon, this.input.mousePointer.x, this.input.mousePointer.y + 32, 200);

	//this.dragon.angle-=1;
	this.input.on('pointermove', function (pointer) {
		let cursor = pointer;
		//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
		let angleNow = (Math.atan2(this.dragon.y - cursor.y, this.dragon.x - cursor.x) * 180 / Math.PI);
		this.dragon.angle = angleNow;
	}, this);
	/*
      this.input.off('pointermove', function (pointer) {
          let cursor = pointer;
          this.physics.moveTo(this.dragon, cursor.x, cursor.y,100);
          let angle = Phaser.Math.Angle.Between(this.dragon.x, this.dragon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
      }, this);*/

}

function collectFood(dragon, food) {
	food.disableBody(true, true);
	this.foods.remove(food)
	score += 10;
	scoreText.setText('Score: ' + score);
	// si se acaba la comida, se vuelve a regenerar
	if (this.foods.children.entries.length <= 19) {
		this.foods.create(Phaser.Math.FloatBetween(150, config.width - 150),Phaser.Math.FloatBetween(100, config.height - 100), 'food');
	}
}

var animateButton = function (e) {

	e.preventDefault;
	//reset animation
	e.target.classList.remove('animate');

	e.target.classList.add('animate');
	setTimeout(function () {
		e.target.classList.remove('animate');
	}, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
	bubblyButtons[i].addEventListener('click', animateButton, false);
}