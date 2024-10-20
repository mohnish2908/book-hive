package com.library.project.college.PrivateLibrary.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OTPEntity {
    @Id
    private String email;

    private String otp;
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "member_Id", referencedColumnName = "memberId")
    private  MemberEntity member;


}
