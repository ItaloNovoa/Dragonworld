package edu.eci.DragonWorld.services.impl;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import edu.eci.DragonWorld.model.Player;
import edu.eci.DragonWorld.model.Room;
import edu.eci.DragonWorld.services.ServicesDragon;

@Service
public class ServicesDragonImpl implements ServicesDragon {

    @Override
    public void addNewRoom(Room room) {
        if (!rooms.containsKey(room.getNum())) {
            rooms.put(room.getNum(), room);
        }
    }

    @Override
    public void addPlayerToRoom(Player player, int numRoom) {
        System.out.println("ADD PLAYER ---------------");
        if (rooms == null)
            System.out.println("ESTA NULL");
        if (!rooms.get(numRoom).getPlayers().containsKey(player.getNickName())) {
            rooms.get(numRoom).addPlayer(player);
            System.out.println(rooms.get(numRoom).playersJson());
        } else {
            // Excepcion que ya existe el nickname
            System.out.println("Ya existe un jugador con el mismo nickName");
        }

    }

    @Override
    public void deletePlayerOfRoom() {

    }

    @Override
    public ConcurrentHashMap<Integer, Room> getRooms() {
        return rooms;
    }

    @Override
    public void moveDragon(Player player, int numRoom) {
        rooms.get(numRoom).getPlayers().replace(player.getNickName(), player);
    }

}