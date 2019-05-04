package edu.eci.DragonWorld;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import edu.eci.DragonWorld.model.Player;
import edu.eci.DragonWorld.model.Room;
import edu.eci.DragonWorld.services.ServicesDragon;

@Controller
public class ControllerStomp {
    @Autowired
    private ServicesDragon servicesDragon;

    @Autowired
    SimpMessagingTemplate msgt;

    @MessageMapping("/newPlayer.{numRoom}")
    public void handlePlayerEvent(Player player, @DestinationVariable Integer numRoom) throws Exception {
        // Al crear un nuevo jugador, verificar que no exista alguno con el mismo
        servicesDragon.addPlayerToRoom(player, numRoom);
        if (servicesDragon.getRooms().get(numRoom).getPlayers().size() >= 1) {
            String playersJson = servicesDragon.getRooms().get(numRoom).playersJson();

            msgt.convertAndSend("/topic/newGame." + numRoom, playersJson);
        }
    }

    @MessageMapping("/newRoom")
    public void handleRoomEvent(Room roomObj) throws Exception {
        int numRoom = roomObj.getNum();
        if (!servicesDragon.getRooms().containsKey(numRoom)) {
            // System.out.println("Nueva sala!:");
            // Al crear un nuevo jugador, verificar que no exista alguno con el mismo
            // System.out.println("--------------------------numero de sala: " +
            // roomObj.getNum());
            servicesDragon.addNewRoom(roomObj);
        }

    }

    @MessageMapping("/movePlayer.{numRoom}")
    public void handlePlayerMoveEvent(Player player, @DestinationVariable Integer numRoom) throws Exception {
        servicesDragon.moveDragon(player, numRoom);
        // System.out.println("#Jugadores: " +
        // servicesDragon.getRooms().get(numRoom).getPlayers().size());
        msgt.convertAndSend("/topic/movePlayer." + numRoom, servicesDragon.getRooms().get(numRoom).playersJson());
    }

    @MessageMapping("/disconnectp.{numRoom}")
    public void handlePlayerDisconnectEvent(Player player, @DestinationVariable Integer numRoom) throws Exception {
        servicesDragon.endGamePlayer(player, numRoom);
        // System.out.println(servicesDragon.getRooms().get(numRoom).getPlayers().get(player.getNickName()).getState());
        msgt.convertAndSend("/topic/disconnectPlayer." + numRoom, servicesDragon.getRooms().get(numRoom).playersJson());
        System.out.println("DESCONECTADO");
        System.out.println("#Jugadores: " + servicesDragon.getRooms().get(numRoom).getPlayers().size());
    }
    /*
     * @MessageMapping("/delete.{numRoom}") public void
     * handlePlayerDeleteEvent(Player player, @DestinationVariable Integer numRoom)
     * throws Exception { servicesDragon.deletePlayerOfRoom(player, numRoom);
     * msgt.convertAndSend("/topic/deletePlayer." + numRoom); }
     */

}