package edu.eci.DragonWorld.model;

public abstract class Food {
	public boolean comido = false;
	public int score;
	public double posX;
	public double posY;

	public Food() {

	}

	public Food(int score, double posX, double posY) {
		this.score = score;
		this.posX = posX;
		this.posY = posY;
	}

	public boolean isComido() {
		return comido;
	}

	public void setComido(boolean comido) {
		this.comido = comido;
	}

	public int getScore() {
		return score;
	}

	public void setExp(int score) {
		this.score = score;
	}

	public double getPosX() {
		return posX;
	}

	public void setPosX(double posX) {
		this.posX = posX;
	}

	public double getPosY() {
		return posY;
	}

	public void setPosY(double posY) {
		this.posY = posY;
	}

}
