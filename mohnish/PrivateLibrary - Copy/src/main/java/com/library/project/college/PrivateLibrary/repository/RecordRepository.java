package com.library.project.college.PrivateLibrary.repository;

import com.library.project.college.PrivateLibrary.entities.MemberEntity;
import com.library.project.college.PrivateLibrary.entities.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordRepository  extends JpaRepository<RecordEntity,Long> {
    int countByMemberAndReturnDateIsNull(MemberEntity member);
    @Query("SELECT r FROM RecordEntity r WHERE r.member.memberId = :memberId AND r.book.bookId = :bookId AND r.returnDate IS NULL")
    Optional<RecordEntity> findActiveRecordByMemberAndBook(String memberId, String bookId);
}
