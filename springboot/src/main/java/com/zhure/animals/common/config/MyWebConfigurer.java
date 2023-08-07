package com.zhure.animals.common.config;

import com.zhure.animals.common.LoginInterceptor;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;


@Configuration
public class MyWebConfigurer implements WebMvcConfigurer {

    @CrossOrigin
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getLoginInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/administration/login", "/login", "/imserver/**");
    }

    @Bean
    public LoginInterceptor getLoginInterceptor() {
        return new LoginInterceptor();
    }

    @CrossOrigin
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        ApplicationHome h = new ApplicationHome(getClass());
        File jarF = h.getSource();
        String dirPath = jarF.getParentFile().toString()+"/files/";

        registry.addResourceHandler("/images/**").
                addResourceLocations("file:///" + System.getProperty("user.dir") + "/springboot/src/main/resources/files/");
        //如果不知道如何以file开头就用浏览器打开该图片
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .maxAge(3600);
    }
}
