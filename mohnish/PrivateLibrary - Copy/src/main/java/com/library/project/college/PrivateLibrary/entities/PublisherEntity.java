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
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PublisherEntity {
    private static Integer currentId = 0;
    private static String PREFIX = "PUB-";
    @Id
    private  String publisherId;
    @PrePersist
    public void generateId() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

        String formattedDate = now.format(dateFormatter);
        String formattedTime = now.format(timeFormatter);

        this.publisherId = PREFIX + formattedDate + formattedTime;
    }
    private String email;
    private String name;
    private String address;

    @OneToMany(mappedBy = "publisher",cascade = CascadeType.ALL)
    private List<BookEntity> myBooks =  new ArrayList<>();
}
