package edu.eci.DragonWorld.model;

public class SphereFood extends Food {
    public final int score = 10;

    public SphereFood(double posx, double posy) {
        super.score = score;
        this.posX = posx;
        this.posY = posy;
        System.out.println(this.getPosY());
    }

}