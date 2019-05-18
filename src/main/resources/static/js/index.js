var nickName;
var numRoom;
var numFood = 1;
var objPlayer;
var color="rojo";

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
function select() {
    $('#carouselColor').on('slid.bs.carousel', function (e){      
        color = e.relatedTarget.id;
    });
}

function cerrarWindow() {
    appGame.cerrar();
}

var appGame = (function () {
    var stompClient = null;
    var addGameToCanvas = function (game) {
        var room = new Room(game.id, game.ancho, game.alto);
        room.setPlayers(game.players);
        createDragons(room);
    };

    var connectAndSubscribe = function () {
        var socket = new SockJS('/stompDragon');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {            
            stompClient.subscribe('/topic/newGame.' + numRoom, function (eventbody) {
                var gameObj = JSON.parse(eventbody.body);
                // Se cambiaba de página cuando empezaba el juego. Por el momento se quita el div de inicio y se muestra en el index
                setTimeout(function () {
                    init.startGame(gameObj);
                }, 60);
            });
            stompClient.subscribe('/topic/createFood.' + numRoom, function (eventbody) {
                var foodObj = JSON.parse(eventbody.body);
                //setTimeout(function () {
                init.startFood(foodObj);
                //}, 50);

            });
            stompClient.subscribe('/topic/movePlayer.' + numRoom, function (eventbody) {
                var gameObj = JSON.parse(eventbody.body);
                init.updateDragons(gameObj);
            });
            stompClient.subscribe('/topic/deletePlayer.' + numRoom, function (eventbody) {
                var gameObj = JSON.parse(eventbody.body);
                init.endGame(gameObj);
                //appGame.disconnect();
            });
            stompClient.subscribe('/topic/eat.' + numRoom, function (eventbody) {
                var Comida = JSON.parse(eventbody.body);
                //alert(JSON.stringify(Comida));
                init.updateFood(Comida);
            });
            stompClient.subscribe('/topic/ataca.' + numRoom, function (eventbody) {
                var nombre = JSON.parse(eventbody.body);
                init.ataco(nombre);
            });
            stompClient.subscribe('/topic/redirigir.' + numRoom, function (eventbody) {
                var jugador = JSON.parse(eventbody.body);
                if(jugador[0].nickName===nickName){
                    //no se hace el alert
                    alert("Felicidades su puntaje a sido"+jugador[0].score);     
                    setTimeout(function () {
                        location.href =window.location; 
                    }, 400);               
                }
            });
            init.initializeGame(numRoom, color);
        });
    };

    function mostrar(gameJSON, callback) {
        callback(gameJSON);
    }
    return {
        conectar: function () {
            nickName = document.getElementById("nickname").value;
            numRoom = document.getElementById("sala").value;
            if (nickName == "" || numRoom == "") {
                alert("Ingrese el Nickname o numero de SALA");
            } else if (numRoom < 0 || numRoom > 10) {
                alert("la sala debe estar entre 0 y 10");
            } else {
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
            stompClient.send("/app/eat/" + numRoom + "/food." + numFood, {}, JSON.stringify(objPlayer));
        },
        ataque: function () {
            stompClient.send("/app/ataca/" + numRoom, {}, JSON.stringify(objPlayer));
        }, muere: function (nombre) {
            stompClient.send("/app/muere/" + numRoom + "/" + nombre);
        },
        connectTopic: function () {
            connectAndSubscribe();
        }
    };
})();