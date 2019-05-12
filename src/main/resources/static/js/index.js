var nickName;
var numRoom;
var numFood = 1;
var objPlayer;

apimock = (function () {
    return {
        getNicknameIndex: function (callback) {
            var nickName;
            nickName = document.getElementById("nickname").value;
            callback(nickName);
        },
        getRoom: function (callback) {
            var room;
            room = document.getElementById("sala").value;
            callback(room);
        }
    };

})();

/*
window.onbeforeunload = function(){ 
    c = confirm('Are you sure?'); 
    if(c == true){ 
        appGame.cerrar();
        return true; 
    }             
} */

function cerrarWindow() {    
    appGame.cerrar();   
}

var appGame = (function () {
    var stompClient = null;
    var nickName1;
    var addGameToCanvas = function (game) {
        var room = new Room(game.id, game.ancho, game.alto);
        room.setPlayers(game.players);
        createDragons(room);
    };

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompDragon');
        stompClient = Stomp.over(socket);
        //stompClient.connect("skieprkh", "3qg80KHy7MJAC9MH4kWzFANGNbg-Qjki", function (frame) {
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newGame.' + numRoom, function (eventbody) {
                var gameObj = JSON.parse(eventbody.body);
                alert(eventbody);
                // Se cambiaba de página cuando empezaba el juego. Por el momento se quita el div de inicio y se muestra en el index
                setTimeout(function () {
                    init.startGame(gameObj);
                }, 60);
            });
            stompClient.subscribe('/topic/createFood.' + numRoom, function (eventbody) {
                var foodObj = JSON.parse(eventbody.body);
                setTimeout(function () {
                    init.startFood(foodObj);
                }, 50);
            });
            stompClient.subscribe('/topic/movePlayer.' + numRoom, function (eventbody) {
                //console.log("moviendo");
                var gameObj = JSON.parse(eventbody.body);
                init.updateDragons(gameObj);

            });
            stompClient.subscribe('/topic/eat/' + numRoom + "/food."+numFood, function (eventbody) {
                //console.log("moviendo");
                //var gameObj = JSON.parse(eventbody.body);
                init.eat(numFood);

            });
            stompClient.subscribe('/topic/deletePlayer.' + numRoom, function (eventbody) {                
                var gameObj = JSON.parse(eventbody.body);
                init.endGame(gameObj);
                appGame.disconnect();
            });
            init.initializeGame(numRoom);
        });
    };

    function mostrar(gameJSON, callback) {
        callback(gameJSON);
    }

    return {
        conectar: function () {
            nickName = document.getElementById("nickname").value;
            numRoom = document.getElementById("sala").value;
            if (nickName=="" || numRoom==""){
                alert("Ingrese el Nickname o numero de SALA");
            }else if( numRoom<0 || numRoom>10){
                alert("la sala debe estar entre 0 y 10");
            }else{
                connectAndSubscribe();
            }
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }           
        },

        initializeGame: function (numRoomSend, player, room) {
            objPlayer = player;
            stompClient.send("/app/newRoom", {}, JSON.stringify(room));
            setTimeout(function () {
                stompClient.send("/app/newPlayer." + numRoomSend, {}, JSON.stringify(player)); //convierte obje
                init.getNickName(nickName);
            }, 50);
        },

        moveDragon: function (player) {
            stompClient.send("/app/movePlayer." + numRoom, {}, JSON.stringify(player)); //convierte obje
        },

        cerrar: function () {
            stompClient.send("/app/disconnect." + numRoom, {}, JSON.stringify(objPlayer));

        },

        eat: function (numFood) {
            stompClient.send("/app/eat/" + numRoom + "/food."+numFood, {}, JSON.stringify(objPlayer));
        },

        connectTopic: function () {
            connectAndSubscribe();
        }
    };
})();