package com.enchante.apiusers.repository;

import com.enchante.apiusers.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Boolean existsUserByEmail(String email);

    Optional<User> findByEmail(String email);

}