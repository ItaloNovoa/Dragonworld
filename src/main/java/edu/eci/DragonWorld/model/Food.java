package edu.eci.DragonWorld.model;

public class Food {

	public boolean comido = false;
	public int exp;
	public int posX;
	public int posY;

	public Food() {

	}

	public Food(int exp, int posX, int posY) {
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
