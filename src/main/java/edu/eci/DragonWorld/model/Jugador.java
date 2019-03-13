package edu.eci.DragonWorld.model;

public class Jugador {
	public int id;
	public String nombre;
	public long exp;
	public int posX;
	public int posY;
	public boolean vivo;
	
	
	public Jugador() {
		
	}

	public Jugador(int id, String nombre, long exp, int posX, int posY, boolean vivo) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.exp = exp;
		this.posX = posX;
		this.posY = posY;
		this.vivo = vivo;
	}
	
	public int getId() {
		return id;
	}
	
	public void mover(int x,int y) {
		
	}
	
	public void evolucionar() {
		
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public long getExp() {
		return exp;
	}
	public void setExp(long exp) {
		this.exp = exp;
	}
	public int getPosX() {
		return posX;
	}
	public void setPosX(int posX) {
		this.posX = posX;
	}
	public int getPosY() {
		return posY;
	}
	public void setPosY(int posY) {
		this.posY = posY;
	}
	public boolean isVivo() {
		return vivo;
	}
	public void setVivo(boolean vivo) {
		this.vivo = vivo;
	}
	
	
	

}
