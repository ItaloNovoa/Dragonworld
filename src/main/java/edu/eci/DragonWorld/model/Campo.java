package edu.eci.DragonWorld.model;

import java.util.List;
import java.util.Random;

public class Campo {
	public int id;
	public final int CAPACIDAD=50;
	public int ancho,largo;
	public final int CAPACIDADCOMIDA=100;
	//volver atomica
	public List<Jugador> players;
	public List<Comida> alimentos;
		
	public Campo() {
	}

	public Campo(int id, int ancho, int largo) {
		this.id = id;
		this.ancho = ancho;
		this.largo = largo;
	}
	
	
	public void rellenarComida() {
		int rr=CAPACIDADCOMIDA-alimentos.size();
		for (int i=0;i<rr;i++) {
			Comida c= new Comida((int) (Math.random() * 20) + 1, (int) (Math.random() * ancho) + 1, (int) (Math.random() * largo) + 1);
		}
	}
	
	/**
	 * 
	 * @param j jugador que ataca
	 * @param posx coordenada X del mouse
	 * @param posy coordenada Y del mouse
	 */
	public void atacar(Jugador j,int posx,int posy) {
		
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
