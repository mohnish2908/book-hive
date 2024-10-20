package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long adminId;
    private  String name;
    private String gender;
    private String email;
    private  String address;
    private String password;
    private String contactNo;
    @OneToMany(mappedBy = "admin",cascade = CascadeType.ALL)
    private List<MemberEntity> members =  new ArrayList<>();
}
