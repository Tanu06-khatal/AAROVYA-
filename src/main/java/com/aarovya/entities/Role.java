package com.aarovya.entities;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(nullable = false, unique = true, length = 30)
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();
}
