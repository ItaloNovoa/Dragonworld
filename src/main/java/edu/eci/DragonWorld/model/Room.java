package edu.eci.DragonWorld.model;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Room {
	public int num;
	public ConcurrentHashMap<String, Player> players = new ConcurrentHashMap<String, Player>();
	public boolean available;

	public final int CAPACIDAD = 50;
	public float ancho;
	public float alto;
	public final int CAPACIDADFood = 100;
	// volver atomica

	public List<Food> alimentos;

	public Room() {

	}

	public Room(int num, float ancho, float alto) {
		this.num = num;
		this.ancho = ancho;
		this.alto = alto;
	}

	public void addPlayer(Player player) {
		/* Generar excepcion con el nickname para que no haya repetidos */
		players.put(player.getNickName(), player);
	}

	public void daletePlayer(Player player) {
		players.remove(player.getNickName());
	}

	public ConcurrentHashMap<String, Player> getPlayers() {
		return players;
	}

	public void setAvaliable() {
		available = true;
	}

	public boolean getAvaliable() {
		return available;
	}

	public String playersJson() {
		String resp = "[";
		for (String key : players.keySet()) {
			Player player = players.get(key);
			resp += "{\"nickName\":\"" + player.getNickName() + "\",\"posX\":" + player.getPosX() + ",\"posY\":"
					+ player.getPosY() + ",\"angle\":" + player.getAngle() + ",\"numRoomP\":" + player.getPosX() + "},";
		}
		resp = resp.substring(0, resp.length() - 1);
		resp += "]";
		System.out.println(resp);
		return resp;
	}

	/**
	 * ------------------------------------------------------------------------------------------
	 */

	public void rellenarFood() {
		/*
		 * int rr = CAPACITYFOOD - alimentos.size(); for (int i = 0; i < rr; i++) { Food
		 * c = new Food((int) (Math.random() * 20) + 1, (int) (Math.random() * ancho) +
		 * 1, (int) (Math.random() * largo) + 1); }
		 */
	}

	/**
	 * 
	 * @param j    jugador que ataca
	 * @param posx coordenada X del mouse
	 * @param posy coordenada Y del mouse
	 */
	public void atacar(Player j, int posx, int posy) {

	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public float getAncho() {
		return ancho;
	}

	public void setAncho(float ancho) {
		this.ancho = ancho;
	}

	public float getAlto() {
		return alto;
	}

	public void setAlto(float alto) {
		this.alto = alto;
	}

	public int getCAPACIDAD() {
		return CAPACIDAD;
	}

}
