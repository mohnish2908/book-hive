package com.library.project.college.PrivateLibrary.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRegistrationDTO {

//    @NotNull(message = "member name can't be Null")
    @NotBlank(message = "please enter valid member name ")
    private  String name;

    private  String registrationId;

    @NotBlank(message = "User gender can't be blank")
    @Pattern(regexp = "^(?i)(male|female)$", message = "Gender must be either 'male' or 'female'")
    private String gender;

    @NotNull(message = "email can't be Null")
    @Email(message = "enter valid email ")
    private String email;

    @NotNull(message = "please enter member Address")
    private  String address;

    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be 10 digits")
    private String contactNo;
}
