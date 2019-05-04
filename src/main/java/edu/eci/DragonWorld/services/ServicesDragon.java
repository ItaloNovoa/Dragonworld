package edu.eci.DragonWorld.services;

import java.util.concurrent.ConcurrentHashMap;

import edu.eci.DragonWorld.model.Player;
import edu.eci.DragonWorld.model.Room;

public interface ServicesDragon {
    public ConcurrentHashMap<Integer, Room> rooms = new ConcurrentHashMap<Integer, Room>();

    public void addNewRoom(Room room);

    public void addPlayerToRoom(Player player, int numRoom);

    public void moveDragon(Player player, int numRoom);

    // public void deletePlayerOfRoom(Player player, int numRoom);

    public void endGamePlayer(Player player, int numRoom);

    public void updateRoom(int numRoom, Room room);

    public ConcurrentHashMap<Integer, Room> getRooms();

    public Player getPlayerByNicknameRoom(int numRoom, String nickname);
}