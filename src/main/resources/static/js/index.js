var nickName;
var numRoom;

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
        stompClient.connect("skieprkh", "3qg80KHy7MJAC9MH4kWzFANGNbg-Qjki", function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newGame.' + numRoom, function (eventbody) {
                alert("subscribe");
                alert(eventbody);
                alert(eventbody.body);
                var gameObj = JSON.parse(eventbody.body);
                alert(eventbody);
                /* Se cambiaba de página cuando empezaba el juego. Por el momento e ovuta el vdiv de inicio y se muestra en el index
                setTimeout(function() {
                    window.open("../juego.html");
                }, 100);*/
                setTimeout(function() {
                    init.startGame(gameObj);
                }, 50);                              
            });
            stompClient.subscribe('/topic/movePlayer.' + numRoom, function (eventbody) {
                console.log("moviendo");
                console.log(eventbody);
                var gameObj = JSON.parse(eventbody.body);
                init.updateDragons(gameObj);
                                            
            });
            init.initializeGame(numRoom);
        } , 
        function(error){
            console.info("error"+error);
        }

        , "skieprkh");
        /*
        setTimeout(function() {
            init.initializeGame(numRoom);
        }, 100);*/
        
    };

    function mostrar(gameJSON, callback) {
        callback(gameJSON);
    }

    return {
        /*init: function () {
        },*/

        conectar: function () {
            nickName = document.getElementById("nickname").value;
            numRoom = document.getElementById("sala").value;
            connectAndSubscribe();
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },

        initializeGame: function (numRoomSend, player, room) {
            stompClient.send("/app/newRoom", {}, JSON.stringify(room));
            setTimeout(function() {
                stompClient.send("/app/newPlayer." + numRoomSend, {}, JSON.stringify(player)); //convierte obje
                init.getNickName(nickName);
            }, 50);
        },

        moveDragon: function (player) {
            console.log("move dragon");
            console.log("########: "+numRoom);
            console.log( JSON.stringify(player));
            stompClient.send("/app/movePlayer." +numRoom, {}, JSON.stringify(player)); //convierte obje

        },

        connectTopic: function () {
            connectAndSubscribe();
        }
    };

})();