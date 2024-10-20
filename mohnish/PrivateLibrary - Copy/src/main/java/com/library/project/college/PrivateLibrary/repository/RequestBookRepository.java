package com.library.project.college.PrivateLibrary.repository;

import com.library.project.college.PrivateLibrary.entities.BookEntity;
import com.library.project.college.PrivateLibrary.entities.MemberEntity;
import com.library.project.college.PrivateLibrary.entities.RequestBookEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestBookRepository extends JpaRepository<RequestBookEntity,String> {
    List<RequestBookEntity> findALlByMember(MemberEntity member);
    int countByMember(MemberEntity member);
    @Modifying
    @Transactional
    @Query("DELETE FROM RequestBookEntity r WHERE r.requestId = :requestId")
    void deleteByRequestId(String requestId);

}
