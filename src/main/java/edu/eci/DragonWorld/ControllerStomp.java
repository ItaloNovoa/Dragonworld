package edu.eci.DragonWorld;

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
        System.out.println("########################################");
        System.out.println("Nuevo jugador recibido en el servidor!:");
        // Al crear un nuevo jugador, verificar que no exista alguno con el mismo
        servicesDragon.addPlayerToRoom(player, numRoom);
        if (servicesDragon.getRooms().get(numRoom).getPlayers().size() >= 1) {
            System.out.println("-------------------------- #Jugadores"
                    + servicesDragon.getRooms().get(numRoom).getPlayers().size());
            System.out.println("-------------------------- Nickaname" + player.getNickName());
            msgt.convertAndSend("/topic/newGame." + numRoom, servicesDragon.getRooms().get(numRoom).playersJson());
        }
    }

    @MessageMapping("/newRoom")
    public void handleRoomEvent(Room roomObj) throws Exception {
        int numRoom = roomObj.getNum();
        if (!servicesDragon.getRooms().containsKey(numRoom)){
            System.out.println("Nueva sala!:");
            // Al crear un nuevo jugador, verificar que no exista alguno con el mismo
            System.out.println("--------------------------numero de sala: " + roomObj.getNum());
            servicesDragon.addNewRoom(roomObj);
        }
        
    }

    @MessageMapping("/movePlayer.{numRoom}")
    public void handlePlayerMoveEvent(Player player, @DestinationVariable Integer numRoom) throws Exception {

        System.out.println("El jugador se esta moviendo!:");
        servicesDragon.moveDragon(player, numRoom);
        msgt.convertAndSend("/topic/movePlayer." + numRoom, servicesDragon.getRooms().get(numRoom).playersJson());
    }

}
