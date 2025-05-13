package com.mycompany.climate.service;
import com.mycompany.climate.model.MyUserDetails;
import com.mycompany.climate.model.User;
import com.mycompany.climate.model.UserWithOutPassword;
import com.mycompany.climate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = repository.findByUsername(username);
        return user.map(MyUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
    }

    public User findUserByUsername(String username) {
        Optional<User> user = repository.findByUsername(username);
        try {
            return user.get();
        }
        catch (Exception e) {
            return null;
        }
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User t = repository.save(user);
        System.out.println(t);
        return repository.save(user);
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public void delete(User user) {
        repository.delete(user);
    }

    public void deleteById(Long id) {
        if(!repository.findById(id).get().getUsername().equals("admin")) {
            repository.deleteById(id);
        }
    }

    public User updateFull(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    public User updateWithOutPassword(UserWithOutPassword userWithOutPassword) {
        User user = repository.findById(userWithOutPassword.getId()).get();
        user.setUsername(userWithOutPassword.getUsername());
        user.setRole(userWithOutPassword.getRole());
        return repository.save(user);
    }

}
