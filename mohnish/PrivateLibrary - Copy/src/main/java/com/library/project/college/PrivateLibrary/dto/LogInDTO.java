package com.library.project.college.PrivateLibrary.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LogInDTO {
    @NotNull(message = "please enter  password")
    @NotBlank(message = "please enter valid password")
    private String password;
    @NotNull(message = "please Provide email")
    @Email(message = "please enter Valid email")
    private String email;
}
