package edu.eci.DragonWorld.model;

public class comida {
	
	public boolean comido;
	public int exp;
	public int posX;
	public int posY;
		
	public comida() {
		
	}
	
	public comida(boolean comido, int exp, int posX, int posY) {
		this.comido = comido;
		this.exp = exp;
		this.posX = posX;
		this.posY = posY;
	}
	public boolean isComido() {
		return comido;
	}
	public void setComido(boolean comido) {
		this.comido = comido;
	}
	public int getExp() {
		return exp;
	}
	public void setExp(int exp) {
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
	
	

}
