var init = (function () {
	var roomADibujar;
	var updateRoom;
	var nickNamePlayer;
	var activo;

	class Room {
		constructor(num, ancho, alto) {
			this.num = num;
			this.ancho = ancho;
			this.alto = alto;
		}

		setPlayers(playersJson) {
			this.players;
			for (var i = 0; i < playersJson.length; i++) {
				var p = new Player(playersJson.nickName, playersJson.posX, playersJson.posY);
				players.add(p);
			}
		}
	}

	class Player {
		constructor(nickName, posX, posY, angle, state, numRoomP) {
			this.nickName = nickName;
			this.posX = posX;
			this.posY = posY;
			this.numRoom = numRoomP;
			this.angle = angle;
			this.state = state;
		}

		setPosX(posx){
			this.posX = posx;
		}
		setPosY(posy){
			this.posY = posy;
		}
		setAngle(angle){
			this.angle = angle;
		}
		setActive(active){
			this.active = active;
		}
		setGraphic(graphic) {
			this.graphic = graphic;
		}
	}	

	const config = {		
		type: Phaser.AUTO,
		width: document.documentElement.clientWidth - 20,
		height: document.documentElement.clientHeight - 20,		
		parent: 'container',
		transparent: true,
		"render.transparent": true,
		"render.autoResize": true,		
		scene: {
			preload: preload,
			create: create,
			update: update
		},
		physics: {
			default: "arcade",
			arcade: {
			}
		},
	};
	var mapJugadores = new Map(); //hasmap de gráficas excepto la de este dragon
	var player;
	var game;
	var score = 0;
	var scoreText;
	var foods;
	var activo;
	var dragon;

	function preload() { //funcion que carga recursos	
		this.load.image('dragonImg', 'images/dragon3.png');
		this.load.image('foodImg', 'images/esfera3.png');
		this.load.atlas('dragonesAtlas', 'images/dragones.png', 'images/dragones.js');
		this.load.atlas('fireAtlas', 'images/fuego1.png', 'images/fuego.js');
	}

	function create() {//muesta imagenes, sprites etc
		/*
		this.input.once('pointerup', function () {
			dragon.destroy();
		});*/
		
		this.registry.events.on('endGameEvent', ()=> {
			//this.physics.destroy(dragon,true);
			//dragon.setVisible(false);
		});
		

		this.anims.create({ key: 'dragonSprite', frames: this.anims.generateFrameNames('dragonesAtlas', { prefix: 'dragon1_', end: 100, zeroPad: 4 }), repeat: -1 });	
		console.log(roomADibujar);
		for (var i = 0; i < roomADibujar.length; i++) {
			//Dibujar este dragon
			console.log("ESTATEEEEEEEEEE: ",roomADibujar[i].state);
			if(roomADibujar[i].nickName == nickNamePlayer){				
				dragon = this.physics.add.sprite(roomADibujar[i].posX, roomADibujar[i].posY, 'dragonesAtlas').play('dragonSprite');
				dragon.setCollideWorldBounds(true);
			}else if (roomADibujar[i].state != "inactivo"){ //Dibujar los dragones diferentes al creado aqui
				var graphicDragon = this.physics.add.sprite(roomADibujar[i].posX, roomADibujar[i].posY, 'dragonesAtlas').play('dragonSprite');
				graphicDragon.setCollideWorldBounds(true); //para que el dragon n os salga de la pantalla
				//mapJugadores[roomADibujar[i].nickName] = graphicDragon;
				mapJugadores.set(roomADibujar[i].nickName,graphicDragon);
			}
			console.log("despues de grafica");
		}
	}


	function update(time, delta) {
		if(activo == false){
			//this.setVisible(false);
			//alert("eliminado");
			//dragon.setVisible(false);
			//this.emit(Events.DESTROY, dragon);
			//this.physics.destroy();
			this.registry.events.emit('endGameEvent');	
			//this.physics.delete(dragon);
			//this.physics.destroy(dragon,true);
		}
		console.log("activo");
		//movimiento del dragon que siga el mouse
		this.physics.moveTo(dragon, this.input.mousePointer.x, this.input.mousePointer.y + 32, 200);
		
		this.input.on('pointermove', function (pointer) {
			let cursor = pointer;
			//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
			let angleNow = (Math.atan2(dragon.y - cursor.y, dragon.x - cursor.x) * 180 / Math.PI);
			dragon.angle = angleNow;
			
		}, this);
		//Guardar informacion de jugador
		player.setAngle(dragon.angle);
		player.setPosX(dragon.x);
		player.setPosY(dragon.y);
		
		appGame.moveDragon(player); //si detecta movimiento de este jugador se actualiza el servidor

		if(typeof updateRoom !== 'undefined'){
			for (var i = 0; i < updateRoom.length; i++){
				var diseñoDeDragonI;
				console.log("Esta activo?  ####### ", updateRoom[i].state);
				if(updateRoom[i].state == "inactivo"){
					console.log("eliminando " + updateRoom[i].nickName );
					diseñoDeDragonI=mapJugadores.get(updateRoom[i].nickName);
					diseñoDeDragonI.setVisible(false);					
				}
				else if(updateRoom[i].nickName != nickNamePlayer && mapJugadores.has(updateRoom[i].nickName)){
					diseñoDeDragonI=mapJugadores.get(updateRoom[i].nickName);
					this.physics.moveTo(diseñoDeDragonI, updateRoom[i].posX, updateRoom[i].posY, 200);
					diseñoDeDragonI.setAngle(updateRoom[i].angle);
					
				} else if (updateRoom[i].nickName != nickNamePlayer){ //nuevos dragones
					//alert(updateRoom[i].nickName);
					diseñoDeDragonI = this.physics.add.sprite(updateRoom[i].posX, updateRoom[i].posY, 'dragonesAtlas').play('dragonSprite');
					diseñoDeDragonI.setCollideWorldBounds(true); 
					mapJugadores.set(updateRoom[i].nickName,diseñoDeDragonI); //agregar nuevo dragon al hasmap de gráficas
				}
			}
		}
	}

	function deleteDragon(){

	}


	return {
		initializeGame: function (numRoomInit) {
			var ancho = config.width;
			var alto = config.height;
			var room = new Room(numRoomInit, ancho, alto);			
			var posX = Phaser.Math.FloatBetween(32, config.width - 32);
			var posY = Phaser.Math.FloatBetween(32, config.height - 32);
			player = new Player(nickName, posX, posY, 0, "activo", numRoomInit);
			appGame.initializeGame(numRoomInit, player, room);
		},
		startGame: function(room){
			roomADibujar = room;
			$('#divInicio').hide();
			if (game == null){
				game = new Phaser.Game(config);
			}
		}, 
		getNickName: function(nickNameP){
			nickNamePlayer = nickNameP;
		},
		updateDragons: function (dragons){
			updateRoom = dragons;
		},
		endGame: function(dragonsR){				
			activo = false;
			for (var i = 0; i < dragonsR.length; i++){	
				if(dragonsR[i].state == "inactivo"){
					console.log("eliminando " + dragonsR[i].nickName );
					diseñoDeDragonI=mapJugadores.get(dragonsR[i].nickName);
					diseñoDeDragonI.setVisible(false);
				}					
			}
			//updateRoom = dragons;
		}
	};
})();