package com.library.project.college.PrivateLibrary.repository;

import com.library.project.college.PrivateLibrary.entities.MemberRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRegistrationRepository extends JpaRepository<MemberRegistrationEntity,String> {
    Boolean existsByEmail(String email);
}
