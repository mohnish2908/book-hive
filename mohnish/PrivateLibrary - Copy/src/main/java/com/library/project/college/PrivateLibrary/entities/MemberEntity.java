package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class MemberEntity {

    private static final  String PREFIX = "MEM-";

    @Id
    private  String  memberId;

    @PrePersist
    public void generateId() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

        String formattedDate = now.format(dateFormatter);
        String formattedTime = now.format(timeFormatter);

        this.memberId = PREFIX + formattedDate + formattedTime;
    }
    private  String name;
    private String gender;
    private String email;
    private  String address;
    private String password;
    private String contactNo;
    private Boolean isActive;
    @ManyToOne
    @JoinColumn(name = "admin_id" , referencedColumnName = "adminId")
    private AdminEntity admin;
    @OneToOne
    @JoinColumn(name = "registrationID")
    private MemberRegistrationEntity registrationId;

    @OneToMany(mappedBy = "member" ,cascade = CascadeType.ALL)
    private List<RequestBookEntity> requestBooks;
}
