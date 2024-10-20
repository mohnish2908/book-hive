package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class RecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @ManyToOne
    @JoinColumn(name = "managedBy" ,referencedColumnName = "adminId")
    private AdminEntity admin;

    @ManyToOne
    @JoinColumn(name = "memberId" ,referencedColumnName = "memberId")
    private MemberEntity member;

    @ManyToOne
    @JoinColumn(name = "bookId",referencedColumnName = "bookId")
    private BookEntity book;

    private LocalDate issueDate;
    private int fine;
    private LocalDate returnDate;

}
