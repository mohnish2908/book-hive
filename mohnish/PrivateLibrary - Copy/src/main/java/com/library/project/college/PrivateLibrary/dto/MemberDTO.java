package com.library.project.college.PrivateLibrary.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {

    private  String  memberId;
    @NotNull(message = "member name can't be Null")
    @NotBlank(message = "please enter valid member name ")
    private  String name;
    @NotNull(message = "please enter member gender")
    @NotBlank(message = "User gender can't be blank ")
    private String gender;
    @NotNull(message = "email can't be Null")
    @Email(message = "enter valid email ")
    private String email;
    @NotNull(message = "please enter member Address")
    private  String address;
    @NotNull(message = "password can't be Null")
    private String password;
    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be 10 digits")
    private String contactNo;
    private Long adminId;
    private  Boolean isActive;
}
