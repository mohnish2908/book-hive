package com.library.project.college.PrivateLibrary.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class RequestBookDTO {
    @NotNull(message =  "member id can't be empty")
    private String memberId;
    @Size(min = 1 ,max = 5, message = "please add books in your limits")
    private List<String> bookId= new ArrayList<>();
}
