package cl.dimade.Dimade_Back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

//archivo principal de la aplicación Spring Boot
// Aquí se configura el escaneo de componentes y repositorios de MongoDB
@SpringBootApplication
@EnableMongoRepositories(basePackages = "cl.dimade.Dimade_Back.repository")
@ComponentScan(basePackages = "cl.dimade.Dimade_Back")
public class DimadeBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(DimadeBackApplication.class, args);
	}

}
