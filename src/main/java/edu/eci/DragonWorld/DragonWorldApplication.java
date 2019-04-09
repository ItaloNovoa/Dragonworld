package edu.eci.DragonWorld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "edu.eci.DragonWorld" })
public class DragonWorldApplication {

	public static void main(String[] args) {
		SpringApplication.run(DragonWorldApplication.class, args);
	}

}
