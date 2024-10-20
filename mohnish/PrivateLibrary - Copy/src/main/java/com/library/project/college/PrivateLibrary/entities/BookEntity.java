package com.library.project.college.PrivateLibrary.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookEntity {
//    private static Integer currentId = 0;
    private static String PREFIX = "BOOK-";
//    @Id
//    private  String bookId;
//    @PrePersist
//    public void generateId() {
//        currentId++;
//        LocalDate today = LocalDate.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
//        String formattedDate = today.format(formatter);
//        this.bookId= PREFIX + formattedDate + currentId;
//    }

//    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use IDENTITY for auto-increment
//    private Long id; // Use a numeric type for the ID

    @Id
    private String bookId;

    @PrePersist
    public void generateId() {
        LocalDateTime now = LocalDateTime.now(); // Use LocalDateTime for date and time
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd"); // Date format
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss"); // Time format

        String formattedDate = now.format(dateFormatter); // Format the date
        String formattedTime = now.format(timeFormatter); // Format the time

        this.bookId = PREFIX + formattedDate + formattedTime; // Generate the bookId
    }

    private String title;
    private String authorName;
    private String edition;
    private String language;
    private String isbn;
    private Integer totalPages;
    private LocalDate publicationYear;
    private  String category;
    private Boolean available;
    @ManyToOne
    @JoinColumn(name = "publisher_id", referencedColumnName = "publisherId")
    private PublisherEntity publisher;

    @OneToOne(mappedBy = "book",cascade = CascadeType.ALL)
    @JsonIgnore
    private  RequestBookEntity requestBooks;

}
