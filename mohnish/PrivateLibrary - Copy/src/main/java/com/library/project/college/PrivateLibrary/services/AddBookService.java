package com.library.project.college.PrivateLibrary.services;


import com.library.project.college.PrivateLibrary.dto.RequestBookDTO;
import com.library.project.college.PrivateLibrary.dto.ResponseDTO;
import com.library.project.college.PrivateLibrary.dto.ReturnBookDTO;
import com.library.project.college.PrivateLibrary.entities.*;
import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import com.library.project.college.PrivateLibrary.repository.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddBookService {
    private final RequestBookRepository requestBookRepository;
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    private final BookRepository bookRepository;
    private final AdminRepository adminRepository;
    private final ModelMapper modelMapper;

    public AddBookService(RequestBookRepository requestBookRepository, MemberRepository memberRepository, RecordRepository repository, BookRepository bookRepository, AdminRepository adminRepository, ModelMapper modelMapper) {
        this.requestBookRepository = requestBookRepository;
        this.memberRepository = memberRepository;
        this.recordRepository = repository;
        this.bookRepository = bookRepository;
        this.adminRepository = adminRepository;
        this.modelMapper = modelMapper;
    }
    public RequestBookDTO convetToRequestBookDTO(RequestBookEntity requestBookEntity) {
        RequestBookDTO dto = new RequestBookDTO();
        dto.setMemberId(requestBookEntity.getMember().getMemberId());
        dto.setBookId(List.of(requestBookEntity.getBook().getBookId()));
        return dto;
    }



    public ResponseDTO addBookRequest(RequestBookDTO addBookRequestDTO) {
        String memberId = addBookRequestDTO.getMemberId();
        MemberEntity member = memberRepository.findById(memberId).get();
        int prevRequests = requestBookRepository.countByMember(member);
        if(prevRequests > 0)
            throw new ResourceNotFoundException("can placed new Book Request , Previous Request Pending");
        int prevBorrows = recordRepository.countByMemberAndReturnDateIsNull(member);
        if(prevBorrows >= 5)
            throw    new ResourceNotFoundException("Book limit exceed");
        List<String> bookIds= addBookRequestDTO.getBookId();
        for (String bookId : bookIds) {
            BookEntity bookEntity = bookRepository.findById(bookId).get();

            bookEntity.setAvailable(false);
            bookRepository.save(bookEntity);
            RequestBookEntity recordBook =
                    RequestBookEntity.builder()
                            .book(bookEntity)
                            .member(member)
                            .localDate(LocalDate.now())
                            .build();

            requestBookRepository.save(recordBook);
        }
        return ResponseDTO.builder()
                .message("Request Placed, Collect your book within 10 Hours")
                .build();
    }

    @Scheduled(fixedRate = 10 * 60 * 60 * 1000)  // 10 hours in milliseconds
    @Transactional
    public void deleteOldPendingRequests() {
        List<RequestBookEntity> pendingRequests = requestBookRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        for (RequestBookEntity request : pendingRequests) {
            if (Duration.between(request.getLocalDate(), now).toHours() > 10) {
                BookEntity book = request.getBook();
                book.setAvailable(true);
                bookRepository.save(book);
                requestBookRepository.delete(request);
            }
        }
    }


    public ResponseDTO issueBookToMember(String memberId , Long adminId){
            MemberEntity member = memberRepository.findById(memberId).get();
            List<RequestBookEntity> allRequests = requestBookRepository.findALlByMember(member);

            for(RequestBookEntity  request  : allRequests){
                requestBookRepository.deleteByRequestId(request.getRequestId());
                System.out.println(request.getRequestId());
                BookEntity book = request.getBook();
                AdminEntity admin = adminRepository.findById(adminId).get();
                RecordEntity record = RecordEntity.builder()
                        .member(member)
                        .book(book)
                        .admin(admin)
                        .issueDate(LocalDate.now())
                        .build();
                recordRepository.save(record);

            }

            return  ResponseDTO.builder()
                .message("issues Successfully")
                .build();
    }

    public List<RequestBookDTO> getAllRequestBooks() {
        List<RequestBookEntity> allRequest = requestBookRepository.findAll();
        return  allRequest.stream()
                .map(this::convetToRequestBookDTO)
                .collect(Collectors.toList());
    }

    public ResponseDTO returnBook(ReturnBookDTO returnBookDTO) {
        String memberId = returnBookDTO.getMemberId();
        String bookId = returnBookDTO.getBookId();
        Optional<RecordEntity > record = recordRepository.findActiveRecordByMemberAndBook(memberId,bookId);
        if(record.isEmpty())
                throw new ResourceNotFoundException("issue Record not Found");
        RecordEntity record1 = record.get();
        int fine = (int)ChronoUnit.DAYS.between(record1.getIssueDate(), LocalDate.now()) - 30;
        fine = Math.max(fine, 0);
//         set book is available
        BookEntity book = bookRepository.findById(bookId).get();
        book.setAvailable(true);
        bookRepository.save(book);
//        save return date and fine in Record
        record1.setReturnDate(LocalDate.now());
        record1.setFine(fine);
        recordRepository.save(record1);
        return ResponseDTO.builder()
                .message("Please Pay fine  " + fine)
                .build();
    }
}
