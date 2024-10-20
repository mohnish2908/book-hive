package com.library.project.college.PrivateLibrary.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {

    private  String bookId;

    @NotNull(message = "Book title can't be Null")
    @NotBlank(message = "Enter valid book title")
    private String title;

    @NotNull(message = "Author can't be Null")
    @NotBlank(message = "Enter valid author ")
    private String authorName;

    private String edition;

    @NotNull(message = "Book Language can't be Null")
    @NotBlank(message = "Enter valid Book Language ")
    private String language;

    @NotNull(message = "Please provide isbn")
    @NotBlank(message = "Enter valid ISBN ")
    private String isbn;

    @Positive(message = "please enter Valid number of Pages")
    @NotNull(message = "please provide total Pages")
    private Integer totalPages;

    @PastOrPresent(  message = "Enter Valid Publication Year")
    private LocalDate publicationYear;
    private  String category;
    private Boolean available;

    private PublisherDTO publisher;
}
