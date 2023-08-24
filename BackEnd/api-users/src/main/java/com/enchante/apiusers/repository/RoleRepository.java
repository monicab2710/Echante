package com.enchante.apiusers.repository;

import com.enchante.apiusers.model.Role;
import com.enchante.apiusers.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findRoleByName(RoleName name);

}