package com.zhure.animals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

@ServletComponentScan
@ComponentScan(basePackages={"com.zhure.animals.common.config"})
@ComponentScan(basePackages={"com.zhure.animals.common"})
@SpringBootApplication
public class AnimalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimalsApplication.class, args);
	}

}
