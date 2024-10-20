package com.library.project.college.PrivateLibrary.repository;

import com.library.project.college.PrivateLibrary.entities.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,String> {
    Boolean existsByEmail(String email);

    Optional<MemberEntity > findByEmail(String email);
}
