package edu.eci.DragonWorld.model;

import java.util.List;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

public class Room {
	public int num;
	public ConcurrentHashMap<String, Player> players = new ConcurrentHashMap<String, Player>();
	public ConcurrentHashMap<Integer, Food> foods = new ConcurrentHashMap<Integer, Food>();
	public boolean available;
	public final int CAPACIDAD = 50;
	public float ancho;
	public float alto;
	public final int CAPACIDADFOOD = 10;

	public List<Food> alimentos;

	public Room() {

	}

	public Room(int num, float ancho, float alto) {
		this.num = num;
		this.ancho = ancho;
		this.alto = alto;
		generateFood();
	}

	public void addPlayer(Player player) {
		/* Generar excepcion con el nickname para que no haya repetidos */
		players.put(player.getNickName(), player);
	}

	public void daletePlayer(Player player) {
		players.remove(player.getNickName());
	}

	public void disconnectPlayer(Player player) {
		player.setState("inactivo");
		players.replace(player.getNickName(), player);
	}

	public ConcurrentHashMap<String, Player> getPlayers() {
		return players;
	}

	public String playersJson() {
		String resp = "[";
		for (String key : players.keySet()) {
			Player player = players.get(key);
			resp += "{\"nickName\":\"" + player.getNickName() + "\",\"posX\":" + player.getPosX() + ",\"posY\":"
					+ player.getPosY() + ",\"angle\":" + player.getAngle() + ",\"state\":\"" + player.getState()
					+ "\"},";
		}
		resp = resp.substring(0, resp.length() - 1);
		resp += "]";
		// System.out.println(resp);
		return resp;
	}

	public void generateFood() {
		for (int i = 0; i < CAPACIDADFOOD; i++) {
			Random r = new Random();
			double posX = 0.0 + (ancho - 0.0) * r.nextDouble();
			double posy = 0.0 + (alto - 0.0) * r.nextDouble();
			SphereFood food = new SphereFood(posX, posy);
			foods.put(i, food);
		}
	}

	public ConcurrentHashMap<Integer, Food> getFoods() {
		return foods;
	}

	public void setAvaliable() {
		available = true;
	}

	public boolean getAvaliable() {
		return available;
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
