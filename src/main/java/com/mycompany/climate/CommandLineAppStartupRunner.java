package com.mycompany.climate;

import com.mycompany.climate.model.User;
import com.mycompany.climate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
/*Данный класс отвечает за проверку существующего admin пользователя и создания его в случае отсутствия*/
@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Override
    public void run(String... args) throws Exception {
        if(userService.findUserByUsername("admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("010802");
            admin.setRole("ROLE_ADMIN");
            userService.save(admin);
        }

    }
}
