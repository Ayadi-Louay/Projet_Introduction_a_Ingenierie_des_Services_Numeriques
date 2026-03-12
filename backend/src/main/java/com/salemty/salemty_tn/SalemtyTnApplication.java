package com.salemty.salemty_tn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SalemtyTnApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalemtyTnApplication.class, args);
		System.out.println("========================================");
		System.out.println("SalemtyTN Application Started Successfully");
		System.out.println("Running on Java 21 with Spring Boot 3.5.11");
		System.out.println("========================================");
	}

}
