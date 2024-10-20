package com.library.project.college.PrivateLibrary.repository;

import com.library.project.college.PrivateLibrary.entities.OTPEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends JpaRepository<OTPEntity,String> {
}
