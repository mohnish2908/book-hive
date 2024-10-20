package com.library.project.college.PrivateLibrary.controllers;

import com.library.project.college.PrivateLibrary.dto.*;
import com.library.project.college.PrivateLibrary.entities.AdminEntity;
import com.library.project.college.PrivateLibrary.entities.RequestBookEntity;
import com.library.project.college.PrivateLibrary.services.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {
    private  final  MemberService memberService;
    private  final MemberRegistrationService memberRegistrationService;
    private final BookService bookService;
    private  final PublisherService publisherService;
    private final AdminService adminService;
    private final  AddBookService addBookService;

    @PostMapping("/createAdmin")
    public AdminEntity createNewAdmin(@RequestBody AdminEntity admin){
        return adminService.createNewAdmin(admin);
    }

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestBody LogInDTO logInDTO){
        AdminDTO RESPONSE = adminService.login(logInDTO);
        return ResponseEntity.ok(RESPONSE);
    }

    public AdminController(MemberService memberService, MemberRegistrationService memberRegistrationService, BookService bookService, PublisherService publisherService, AdminService adminService, AddBookService addBookService) {
        this.memberService = memberService;
        this.memberRegistrationService = memberRegistrationService;
        this.bookService = bookService;
        this.publisherService = publisherService;
        this.adminService = adminService;
        this.addBookService = addBookService;
    }


// Members
    @GetMapping("/getAllMembers")
    public ResponseEntity<List<MemberDTO>> getAllMembers(){
        List<MemberDTO> allMembers = memberService.getAllMembers();
        return new ResponseEntity<>(allMembers, HttpStatus.FOUND);
    }

    @DeleteMapping("/deActivateMember/{memberId}")
    public ResponseEntity<ResponseDTO> deActivateMember(@PathVariable String memberId){
      ResponseDTO deleteMember = memberService.deActivateMember(memberId);
        return  ResponseEntity.ok(deleteMember);
    }

// Member Registration Requests

    @GetMapping("/getAllMemberRequest")
    public ResponseEntity<List<MemberRegistrationDTO>> getAllRequest(){
        List<MemberRegistrationDTO> allRequests = memberRegistrationService.getAllRequests();
        return  ResponseEntity.ok(allRequests);
    }

    @PostMapping("/{adminId}/approveMember/{registrationId}")
    public ResponseEntity<ResponseDTO> approveMemberRequest(@PathVariable String registrationId , @PathVariable Long adminId){
       ResponseDTO approvedMember = memberRegistrationService.approvedMemberRequests(registrationId,adminId);
       return ResponseEntity.ok(approvedMember);
    }

    @DeleteMapping("/rejectMember/{registrationId}")
    private ResponseEntity<ResponseDTO> rejectMemberRequest(@PathVariable String registrationId){
       ResponseDTO mem =  memberRegistrationService.rejectMemberRequest(registrationId);
        return ResponseEntity.ok(mem);
    }
// Books Activities
    @GetMapping("/getAllBooks")
    public ResponseEntity<Page<BookDTO>> getAllBooks(@RequestParam (defaultValue = "0") Integer page) {
        Page<BookDTO> allBooks = bookService.getAllBooks(page);
        return new ResponseEntity<>(allBooks, HttpStatus.OK);
    }

    @PutMapping("/updateBook/{id}")
    public ResponseEntity<BookDTO> updateBook(@Valid @RequestBody BookDTO bookDTO , @PathVariable String id) {
        BookDTO book = bookService.updateBook(bookDTO,id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @DeleteMapping("/deleteBook/{id}")
    public  ResponseEntity<BookDTO> deleteBook(@PathVariable String id){
        BookDTO bookDTO = bookService.deleteBook(id);
        return  ResponseEntity.ok(bookDTO);

    }

    @PostMapping("addBook/{id}")
    public ResponseEntity<BookDTO> addNewBook(@Valid @RequestBody BookDTO bookDTO, @PathVariable String id) {
        bookDTO.setTitle(bookDTO.getTitle().trim());
        BookDTO response = bookService.addNewBook(bookDTO, id);
        return ResponseEntity.ok(response);
    }

    // -> Publisher Activities

    @PostMapping("/addPublisher")
    public ResponseEntity<PublisherDTO> addNewPublisher(@Valid @RequestBody PublisherDTO publisherDTO) {
        PublisherDTO newPublisherResponse = publisherService.addNewPublisher(publisherDTO);
        return new ResponseEntity<>(newPublisherResponse, HttpStatus.CREATED);
    }


    @GetMapping("/getAllPublisher")
    public ResponseEntity<List<PublisherDTO>> getAllPublishers() {
        List<PublisherDTO> response = publisherService.getAllPublishers();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/updatePublisher/{id}")
    public ResponseEntity<PublisherDTO> updatePublisher(@Valid @RequestBody PublisherDTO publisherDTO,@PathVariable String id){
        PublisherDTO publisherDTO1 = publisherService.updatePublisher(publisherDTO,id);
        return  ResponseEntity.ok(publisherDTO1);
    }

    @DeleteMapping("/deletePublisher/{id}")
    public ResponseEntity<PublisherDTO> deletePublisherById(@PathVariable String id) {
        PublisherDTO newPublisherResponse = publisherService.deletePublisherById(id);
        return ResponseEntity.ok(newPublisherResponse);
    }

    @GetMapping("/getPublisher/{id}")
    public  ResponseEntity<PublisherDTO> getPublisher(@PathVariable String id){
        PublisherDTO publisherDTO = publisherService.getPublisherById(id);
        return  ResponseEntity.ok(publisherDTO);
    }

//    request Booked
    @PostMapping("/issueBook/{memberId}/{adminId}")
    public ResponseEntity<ResponseDTO> issueBook(@PathVariable String memberId , @PathVariable Long adminId){
        ResponseDTO response = addBookService.issueBookToMember(memberId,adminId);
        return  ResponseEntity.ok(response);
    }

    @GetMapping ("/getAllBookRequest")
    public ResponseEntity<List<RequestBookDTO>> getAllRequestedBooks(){
        List<RequestBookDTO> response = addBookService.getAllRequestBooks();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/returnBook")
    public  ResponseEntity<ResponseDTO> returnBook(@RequestBody ReturnBookDTO returnBookDTO){
        ResponseDTO res = addBookService.returnBook(returnBookDTO);
        return  ResponseEntity.ok(res);
    }

}
