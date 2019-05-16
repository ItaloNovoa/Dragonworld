package edu.eci.DragonWorld.services.impl;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import edu.eci.DragonWorld.model.Player;
import edu.eci.DragonWorld.model.Room;
import edu.eci.DragonWorld.services.ServicesDragon;

@Service
public class ServicesDragonImpl implements ServicesDragon {

    private ConcurrentHashMap<Integer, Room> rooms = new ConcurrentHashMap<Integer, Room>();

    @Override
    public void addNewRoom(Room room) {
        if (!rooms.containsKey(room.getNum())) {
            room.generateFood();
            rooms.put(room.getNum(), room);

        }
    }

    @Override
    public void addPlayerToRoom(Player player, int numRoom) {       
        if (rooms == null)
            System.out.println("ESTA NULL");

    //-----------------ARREGLAR
        try {
            if (!rooms.get(numRoom).getPlayers().containsKey(player.getNickName())) {
                rooms.get(numRoom).addPlayer(player);
                System.out.println(rooms.get(numRoom).playersJson());
            } else {
                // Excepcion que ya existe el nickname
                System.out.println("Ya existe un jugador con el mismo nickName");
            }
        } catch (Exception e) {
            //TODO: handle exception
        }
        
    }

    @Override
    public void endGamePlayer(Player player, int numRoom) {
        if (rooms.containsKey(numRoom)) {
            Room room = getRooms().get(numRoom);
            room.disconnectPlayer(player);
            rooms.replace(numRoom, room);
            /*
             * ConcurrentHashMap<String, Player> players = rooms.get(numRoom).getPlayers();
             * for (String n : players.keySet()) {
             * System.out.println(players.get(n).getState()); }
             */

        }
    }

    @Override
    public String deletePlayerOfRoom(Player player, int numRoom) {
        try{
            Player jugadorBorrado = rooms.get(numRoom).getPlayers().get(player.getNickName());
            if (rooms.containsKey(numRoom)) {
                rooms.get(numRoom).getPlayers().remove(player.getNickName());
            }
            return jugadorBorrado.getNickName();
        }catch (Exception e) {
            return null;
        }
    }

    @Override
    public ConcurrentHashMap<Integer, Room> getRooms() {
        return rooms;
    }

    @Override
    public void moveDragon(Player player, int numRoom) {
        try{
        rooms.get(numRoom).getPlayers().get(player.getNickName()).setPosX(player.getPosX());
        rooms.get(numRoom).getPlayers().get(player.getNickName()).setPosY(player.getPosY());
        rooms.get(numRoom).getPlayers().get(player.getNickName()).setAngle(player.getAngle());
        rooms.get(numRoom).getPlayers().get(player.getNickName()).setState(player.getState());
        }catch (Exception e) {
            // Block of code to handle errors
        }
    }

    @Override
    public Player getPlayerByNicknameRoom(int numRoom, String nickname) {
        return rooms.get(numRoom).getPlayers().get(nickname);
    }

    @Override
    public void eat(Player player, int numFood, int numRoom) {
        Room room = rooms.get(numRoom);
        Random r = new Random();
        double posx = 0.0 + (room.getAncho() - 0.0) * r.nextDouble();
        double posy = 0.0 + (room.getAlto() - 0.0) * r.nextDouble();
        rooms.get(numRoom).getFoods().get(numFood).setPosX(posx);
        rooms.get(numRoom).getFoods().get(numFood).setPosY(posy);
        //System.out.println("score antes de entrar a eat"+rooms.get(numRoom).getPlayers().get(player.getNickName()).getScore());
        rooms.get(numRoom).eatPlayer(player,numFood);
        //System.out.println("score al salir de eat"+rooms.get(numRoom).getPlayers().get(player.getNickName()).getScore());

    }
}