package edu.eci.DragonWorld.model;

public class SphereFood extends Food {
    public final int score = 10;

    public SphereFood(double posX, double posy) {
        super.score = score;
        System.out.println(this.getPosY());
    }

}