var init = (function () {
	var roomADibujar;
	var updateRoom;
	var nickNamePlayer;
	var activo;

	class Room {
		constructor(num, ancho, alto, foods) {
			this.num = num;
			this.ancho = ancho;
			this.alto = alto;
			this.foods = foods;			
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
	var mapPlayersG = new Map(); //hasmap de gráficas excepto la de este dragon
	var mapTextJugadores = new Map(); //hasmap de nombres de dragones	

	var foodsO;  //hasmap de objetos de esferas
	var firstfood;
	var player;
	var game;
	var score = 0;
	var scoreText;
	var fuegoActivo=true;
	var dragon;
	var foodsJugador;
	var mapFood = new Map();
	var updateFoods = true;

	function preload() { //funcion que carga recursos	
		this.load.image('dragonImg', 'images/dragon3.png');
		this.load.atlas('dragonesAtlas', 'images/dragones.png', 'images/dragones.js');
		this.load.json('dragonesf_anim', 'images/dragonesf_anim.json');
		this.load.atlas('fireAtlas', 'images/fuego1.png', 'images/fuego.js');
		this.load.atlas('dragonesf', 'images/dragonesf.png', 'images/dragonesf_atlas.json');
		this.load.image('foodImg', 'images/esfera3.png');
		}

	function create() {//muesta imagenes, sprites etc
		this.anims.create({ key: 'dragonSprite', frames: this.anims.generateFrameNames('dragonesAtlas', { prefix: 'dragon1_', end: 100, zeroPad: 4 }), repeat: -1 });		
		for (var i = 0; i < roomADibujar.length; i++) {
			//Dibujar este dragon
			if(roomADibujar[i].nickName == nickNamePlayer){				
				dragon = this.physics.add.sprite(roomADibujar[i].posX, roomADibujar[i].posY, 'dragonesAtlas').play('dragonSprite');
				this.txt = this.add.text(roomADibujar[i].posX, roomADibujar[i].posY + 50, nickNamePlayer);				
				dragon.setCollideWorldBounds(true);
			}else if (roomADibujar[i].state != "inactivo"){ //Dibujar los dragones diferentes al creado aqui
				var graphicDragon = this.physics.add.sprite(roomADibujar[i].posX, roomADibujar[i].posY, 'dragonesAtlas').play('dragonSprite');
				graphicDragon.setCollideWorldBounds(true); //para que el dragon n os salga de la pantalla


				//this.physics.add.collider(graphicDragon, foodsJugador, eatFood, null, this);
				//this.physics.add.overlap(graphicDragon, foodsJugador, eatFood, null, this);
				
				mapPlayersG.set(roomADibujar[i].nickName,graphicDragon);
				var txtDragon = this.add.text(roomADibujar[i].posX, roomADibujar[i].posY + 50, roomADibujar[i].nickName);
				mapTextJugadores.set(roomADibujar[i].nickName, txtDragon);				
			}
			console.log("despues de grafica");
		}
		//Crear comida
		foodsJugador = this.physics.add.group();
		
		for (var i = 0; i < foodsO.length; i++){
			
			var foodG = foodsJugador.create(foodsO[i].posX, foodsO[i].posY, 'foodImg');
			foodG.name=i;
			//alert("tipeOF name"+typeof foodG.name);
			//alert("tipeOf foos"+ typeof foodsO[i].id);
			mapFood.set(foodsO[i].id, foodG);
		}
		this.physics.add.collider(dragon, foodsJugador, collectFood, null, this);
		this.physics.add.overlap(dragon, foodsJugador, collectFood, null, this);

		//mouse and fire
		this.fuegoSprite = this.anims.create({ key: 'fuego1', frames: this.anims.generateFrameNames('fireAtlas', { prefix: 'fuego_', end: 100, zeroPad: 4 }), repeat: 0 });
		this.input.on('pointerdown', function (pointer) {
			if (pointer.buttons == 1 && fuegoActivo) {
				fuegoActivo=false;
				let cursor = pointer;
				//calcular el angulo entre el dragon y el mouse (tomando la esquina del sprite (--arreglar eso))
				let angleNow = (Math.atan2(dragon.y - cursor.y, dragon.x - cursor.x) * 180 / Math.PI);
				coseno = Math.cos(((angleNow - 180) * -1) * Math.PI / 180);
				seno = Math.sin(((angleNow - 180) * -1) * Math.PI / 180)
				this.fuegoSprite = this.add.sprite(dragon.x + (50 * coseno), dragon.y - (50 * seno), 'fuegos').play('fuego1');
				this.fuegoSprite.angle = angleNow - 180;
				var time;			
				timedEvent = this.time.delayedCall(250, onEvent, [], this);
			}
		}, this);
		
	}

	function onEvent (){
		this.fuegoSprite.destroy();
		fuegoActivo=true;
	}

	function update(time, delta) {
		//movimiento del dragon que siga el mouse
		this.physics.moveTo(dragon, this.input.mousePointer.x, this.input.mousePointer.y + 32, 200);		
		//Cambio de la posicion del nombre
		this.txt.x = dragon.x - 20;
		this.txt.y = dragon.y + 40;

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
		
		//if (updateFoods){
			for (var i = 0; i < foodsO.length; i++){	
				
				var comida=mapFood.get(foodsO[i].id);
				if (comida.x!=foodsO[i].posX || comida.y!=foodsO[i].posY){
					//alert(foodsO[i].id+"donde esta"+comida.x+"donde deberia "+foodsO[i].posX);
					//comida.disableBody(true, true);
					//foodsJugador.remove(foodsJugador.children.entries[foodsO[i].id]);
					//comida.reset(foodsO[i].posX ,foodsO[i].posY);
					comida.setX(foodsO[i].posX);
					comida.setY(foodsO[i].posY);
					//comida.disableBody(false, false);
					//alert("ahora"+foodsO[i].id+"donde esta"+comida.x+"donde deberia "+foodsO[i].posX);
					


				}
			}
			updateFoods=false;
		//}
		

		if(typeof updateRoom !== 'undefined'){
			for (var i = 0; i < updateRoom.length; i++){
				var diseñoDeDragonI;
				var textDragonI;		
				if(updateRoom[i].nickName != nickNamePlayer && mapPlayersG.has(updateRoom[i].nickName)){
					diseñoDeDragonI=mapPlayersG.get(updateRoom[i].nickName);
					this.physics.moveTo(diseñoDeDragonI, updateRoom[i].posX, updateRoom[i].posY, 200);
					diseñoDeDragonI.setAngle(updateRoom[i].angle);
					textDragonI = mapTextJugadores.get(updateRoom[i].nickName);					
					textDragonI.x = updateRoom[i].posX - 20;
					textDragonI.y = updateRoom[i].posY + 40;					
					//this.physics.add.collider(diseñoDeDragonI, foodsJugador, eatFood, null, this);
					//this.physics.add.overlap(diseñoDeDragonI, foodsJugador, eatFood, null, this);
					
				} else if (updateRoom[i].nickName != nickNamePlayer){ //nuevos dragones					
					diseñoDeDragonI = this.physics.add.sprite(updateRoom[i].posX, updateRoom[i].posY, 'dragonesAtlas').play('dragonSprite');
					diseñoDeDragonI.setCollideWorldBounds(true); 
					mapPlayersG.set(updateRoom[i].nickName,diseñoDeDragonI); //agregar nuevo dragon al hasmap de gráficas
					textDragonI = this.add.text(updateRoom[i].posX-20, updateRoom[i].posY + 50, updateRoom[i].nickName);
					mapTextJugadores.set(updateRoom[i].nickName, textDragonI);
					//this.physics.add.collider(diseñoDeDragonI, foodsJugador, eatFood, null, this);
					//this.physics.add.overlap(diseñoDeDragonI, foodsJugador, eatFood, null, this);				
				}
			}
		}
	}

	//####################CORREGIR !
	//No se sabe como obtener la posicion en el arreglo (foodsO) para enviarla al servidor y despues actualizarla visualmente
	function collectFood(dragon, food) {
		//alert("como "+food.name+" donde esta" + food.x);
		var id = food.name;
		var comida=mapFood.get(foodsO[id].id);
		//comida.disableBody(true, true);
		/*var id = food.name;	
		var comida=mapFood.get(foodsO[id].id);
		
		food.disableBody(true, true);
		foodsJugador.remove(food);*/
		appGame.eat(food.name);
		/*
		
		var foodG = foodsJugador.create(foodsO[id].posX, foodsO[id].posY, 'foodImg');
		foodG.name=foodsO[id].id;
		alert("pongo "+foodsO[id].id+" donde deberia" + foodsO[id].posX);
		mapFood.set(foodsO[id].id,foodG);*/
		//comida.disableBody(false, false);
		//food.setX(foodsO[food.name].posX);
		//food.setY(foodsO[food.name].posY);
		
			
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
		startFood: function(foods){
			foodsO = foods;			
			//alert(JSON.stringify(foodsO));		
		},
		updateFood: function(foods){
			foodsO = foods;			
			//updateFoods = true;
			//alert(JSON.stringify(foodsO));		
		},
		getNickName: function(nickNameP){
			nickNamePlayer = nickNameP;
		},
		updateDragons: function (dragons){
			updateRoom = dragons;
		},
		endGame: function(dragonsR){
			
			for (var i = 0; i < updateRoom.length; i++){
				if(!dragonsR.includes(updateRoom[i])){
					var textDragonI = mapTextJugadores.get(updateRoom[i].nickName);						
					diseñoDeDragonI=mapPlayersG.get(updateRoom[i].nickName);
					try {
						diseñoDeDragonI.setVisible(false);
						diseñoDeDragonI.setActive(false);
						textDragonI.setVisible(false);						
					}catch(err) {
					}
					try{
						mapTextJugadores.delete(updateRoom[i].nickName);
						mapPlayersG.delete(updateRoom[i].nickName);
					}catch(err){

					}				
					
				}	
			}
			try{
				appGame.deletePlayer();
			}catch(err){}
		},
		eat: function(food){
			eatFood(food);
		}
		/** comidaNueva: function(comida){
			foods1=comida;
		}*/
	};
})();