package edu.eci.DragonWorld.model;

public class Player {
	public String nickName;
	// public String nombre;
	// public long exp;
	public float posX;
	public float angle;
	public float posY;
	public String state;
	public int numRoomP;

	public Player() {

	}

	public Player(String nickName, float posX, float posY, float angle, String state, int numRoomP) {
		this.nickName = nickName;
		this.posX = posX;
		this.posY = posY;
		this.numRoomP = numRoomP;
		this.angle = angle;
		this.state = state;
	}

	/*
	 * public Player(String nickName, String nombre, long exp, float posX, float
	 * posY, boolean vivo) { super(); this.nickName = nickName; this.nombre =
	 * nombre; this.exp = exp; this.posX = posX; this.posY = posY; this.vivo = vivo;
	 * }
	 */

	public void mover(float x, float y) {

	}

	public void evolucionar() {

	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getNickName() {
		return nickName;
	}

	/*
	 * public String getNombre() { return nombre; }
	 * 
	 * public void setNombre(String nombre) { this.nombre = nombre; }
	 * 
	 * 
	 * public long getExp() { return exp; }
	 * 
	 * public void setExp(long exp) { this.exp = exp; }
	 */
	public float getPosX() {
		return posX;
	}

	public void setPosX(float posX) {
		this.posX = posX;
	}

	public float getPosY() {
		return posY;
	}

	public void setAngle(float angle) {
		this.angle = angle;
	}

	public float getAngle() {
		return angle;
	}

	public void setPosY(float posY) {
		this.posY = posY;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
