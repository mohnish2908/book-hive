package com.library.project.college.PrivateLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
    private  Long adminId;
    private  String name;
    private String gender;
    private String email;
    private  String address;
    private String contactNo;
}
