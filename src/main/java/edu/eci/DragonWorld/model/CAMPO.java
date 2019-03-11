package edu.eci.DragonWorld.model;

import java.util.List;
import java.util.Random;

public class CAMPO {
	public int id;
	public final int CAPACIDAD=50;
	public int ancho,largo;
	public final int CAPACIDADCOMIDA=100;
	public List<Player> players;
	public List<comida> alimentos;
		
	public CAMPO() {
	}

	public CAMPO(int id, int ancho, int largo) {
		this.id = id;
		this.ancho = ancho;
		this.largo = largo;
	}
	
	
	public void rellenarComida() {
		int rr=CAPACIDADCOMIDA-alimentos.size();
		for (int i=0;i<rr;i++) {
			comida c= new comida(false, (int) (Math.random() * 20) + 1, (int) (Math.random() * ancho) + 1, (int) (Math.random() * largo) + 1);
		}
	}
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAncho() {
		return ancho;
	}
	public void setAncho(int ancho) {
		this.ancho = ancho;
	}
	public int getLargo() {
		return largo;
	}
	public void setLargo(int largo) {
		this.largo = largo;
	}
	public int getCAPACIDAD() {
		return CAPACIDAD;
	}
	
	
	
	
}
