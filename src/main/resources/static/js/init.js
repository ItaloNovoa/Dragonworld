//var stompClient = null;

var SceneA = new Phaser.Class({
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
		scene: [SceneA],
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
	this.foods =this.physics.add.group();
	this.listaDragones =this.physics.add.group();

	/*Fondo*/
	this.fondo = this.add.image((config.width / 2)-100, (config.height / 2)-100, 'fondo');
	this.fondo.setScale(1.3);

	/*Dragones*/
	this.anims.create({ key: 'dragon1', frames: this.anims.generateFrameNames('dragones', { prefix: 'dragon1_', end: 100, zeroPad: 4 }), repeat: -1 });
	this. fuegoSprite = this.anims.create({ key: 'fuego1', frames: this.anims.generateFrameNames('fuegos', { prefix: 'fuego_', end: 100, zeroPad: 4 }), repeat: 0 });	
	this.dragon = this.physics.add.sprite(400, 100, 'dragones').play('dragon1');  
	this.activo=true;
	this.dragon.setCollideWorldBounds(true);
	this.physics.add.collider(this.dragon, this.foods, collectFood, null, this);
	this.physics.add.overlap(this.dragon, this.foods, collectFood, null, this);
	this.input.on('pointerdown', function (pointer) {
		if(this.activo==true){
			this.activo=false;
			let cursor = pointer;
			//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
			let angleNow = (Math.atan2(this.dragon.y - cursor.y, this.dragon.x - cursor.x) * 180 / Math.PI);
			coseno=Math.cos(((angleNow-180)*-1) * Math.PI / 180);
			seno=Math.sin(((angleNow-180)*-1)* Math.PI / 180)
			this.fuegoSprite = this.add.sprite(this.dragon.x+(50*coseno), this.dragon.y-(50*seno), 'fuegos').play('fuego1');
						
			this.fuegoSprite.angle = angleNow-180;
			
			
			var time;			
			timedEvent = this.time.delayedCall(250, onEvent, [], this);
		}
	}, this);

	/*Comida*/
	for (var i = 0; i < 20; i++){
		this.foods.create(Phaser.Math.FloatBetween(32, config.width - 32),Phaser.Math.FloatBetween(32, config.height - 32), 'food');
	}
	
	/*Puntaje*/
	scoreText = this.add.text(150, 40, 'score: 0', { fontSize: '32px', fill: '#000' });	
	this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);	
}

function onEvent (){
	this.fuegoSprite.setActive(false);
	this.fuegoSprite.setVisible(false);
	this.activo=true;
}

function creteDragon(){
	dragon2 = this.physics.add.sprite(400, 100, 'dragones').play('dragon1');
	this.listaDragones.create(400, 100, dragon2);
}

function update(time, delta) {
	if (this.space.isUp) {
		this.dragon.setVelocity(0, 0);
	}
	if (this.input.mousePointer.x == this.dragon.x && this.input.mousePointer.y == this.dragon.y) {
		this.dragon.setVelocity(0, 0);
	}
	//movimiento del dragon que siga el mouse
	this.physics.moveTo(this.dragon, this.input.mousePointer.x, this.input.mousePointer.y + 32, 200);

	//stompClient.send("/topic/dragon", {}, JSON.stringify(this.dragon.x));
	this.input.on('pointermove', function (pointer) {
		let cursor = pointer;
		//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
		let angleNow = (Math.atan2(this.dragon.y - cursor.y, this.dragon.x - cursor.x) * 180 / Math.PI);
		this.dragon.angle = angleNow;
	}, this);
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

/***************************************************** STOMP ********************************************************************/

var app = (function () {

    class Point{
        constructor(x,y){
            this.x=x;
            this.y=y;
        }        
	}    
	
    var addPointToCanvas = function (point) {        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        //ctx.arc(point.x, point.y);
        ctx.stroke();
    };

    var connectAndSubscribe = function () {
		console.info('Connecting to WS...');
		var socket = new SockJS('/stompDragon');
		stompClient = Stomp.over(socket);	
		stompClient.connect({}, function (frame) {            
			console.log('Connected: ' + frame);
			stompClient.subscribe('/topic/dragon', function (eventbody) {
				var puntoJSON =  JSON.parse(eventbody.body);
				//var callback = mostrarMensaje;
				var callback = addPointToCanvas;
				mostrar(puntoJSON, callback);
			});
		});
	
		stompClient.connect({}, function (frame) {            
			console.log('Connected: ' + frame);
			var sala = document.getElementById("sala").value;     
			stompClient.subscribe('/topic/dragon/'+sala, function (eventbody) {
				var puntoJSON =  JSON.parse(eventbody.body);
				var callback = mostrarMensaje;
				//var callback = addPointToCanvas;
				mostrar(puntoJSON, callback);
			});            
		});
	};

    function mostrar(puntoJSON, callback){
        callback(puntoJSON);
    }
    
    function mostrarMensaje(puntoJSON){
        alert("Coordenada X: " + puntoJSON.x + ", Coordenada Y: "+ puntoJSON.y);
    }   

    return {
        init: function () {
			var can = document.getElementById("canvas");       
            //websocket connection
            connectAndSubscribe();
        },
        
        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },

        connectTopic: function(){
            connectAndSubscribe();
        }
    };

})();