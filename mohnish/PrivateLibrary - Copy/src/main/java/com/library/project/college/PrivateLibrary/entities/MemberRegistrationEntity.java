package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MemberRegistrationEntity {
    private static Integer currentId = 0;
    private static String PREFIX = "REG-";

    @Id
    private  String registrationId;
    @PrePersist
    public void generateId() {
        LocalDateTime now = LocalDateTime.now(); // Use LocalDateTime for date and time
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd"); // Date format
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss"); // Time format

        String formattedDate = now.format(dateFormatter); // Format the date
        String formattedTime = now.format(timeFormatter); // Format the time

        this.registrationId = PREFIX + formattedDate + formattedTime; // Generate the bookId
    }

    private String gender;
    private  String name;
    private String email;
    private  String address;
    private String contactNo;
    private String password;

}
