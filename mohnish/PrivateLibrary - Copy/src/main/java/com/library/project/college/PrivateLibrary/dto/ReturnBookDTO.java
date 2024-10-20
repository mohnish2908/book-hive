package com.library.project.college.PrivateLibrary.dto;

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
public class ReturnBookDTO {
    @NotNull(message =  "member id can't be empty")
    private String memberId;

    @NotNull(message = "please enter book id")
    private String bookId;
}
