package com.mycompany.climate.controller;

import com.mycompany.climate.model.User;
import com.mycompany.climate.model.UserWithOutPassword;
import com.mycompany.climate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/save")
    public void addUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping(value = "/findAllUsers")
    public List<User> findAllUsers() {
        return userService.findAll();
    }

    @DeleteMapping(value = "/delete")
    public void deleteUser(@RequestBody User user) {
        userService.delete(user);
    }

    @DeleteMapping(value = "/deleteById")
    public void deleteUserById(@RequestBody Long id) {
        userService.deleteById(id);
    }

    @PatchMapping(value = "/updateFull")
    public void updateFull(@RequestBody User user) {
        userService.updateFull(user);
    }

    @PatchMapping(value = "/updateWithoutPassword")
    public void updateWithoutPassword(@RequestBody UserWithOutPassword user) {
        userService.updateWithOutPassword(user);
    }

}
