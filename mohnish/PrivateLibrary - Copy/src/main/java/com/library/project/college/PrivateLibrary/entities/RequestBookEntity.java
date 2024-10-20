package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.*;
import lombok.*;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class RequestBookEntity {

    private final  static  String PREFIX = "REQ-" ;
    private static Long  currentId = 0L;
    @Id
    private String requestId;
    @PrePersist
    public void generateId() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");
        String formattedDate = now.format(dateFormatter);
        String formattedTime = now.format(timeFormatter);
        this.requestId = PREFIX + formattedDate + formattedTime;
    }

    private LocalDate localDate;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "member_id" , nullable = false)
    private  MemberEntity member;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "book_id", nullable = false)
    private  BookEntity book;
}
