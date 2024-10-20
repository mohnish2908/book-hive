package com.library.project.college.PrivateLibrary.controllers;

import com.library.project.college.PrivateLibrary.dto.*;
import com.library.project.college.PrivateLibrary.services.AddBookService;
import com.library.project.college.PrivateLibrary.services.BookService;
import com.library.project.college.PrivateLibrary.services.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/member")
public class MemberController {
    final private BookService bookService;
    final  private MemberService memberService;
    final private AddBookService addBookService;

    public MemberController(BookService bookService, MemberService memberService, AddBookService addBookService) {
        this.bookService = bookService;
        this.memberService = memberService;
        this.addBookService = addBookService;
    }

    @GetMapping("/getBookByTitle/{title}")
    public ResponseEntity<BookDTO> getBookByName(@PathVariable String title){
        title = title.toLowerCase();
        BookDTO  book = bookService.getBookByName(title);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<Page<BookDTO>> getAllBooks(@RequestParam(defaultValue = "0") Integer page) {
        Page<BookDTO> allBooks = bookService.getAllBooks(page);
        return new ResponseEntity<>(allBooks, HttpStatus.OK);
    }

    @PutMapping("/updateMember")
    public ResponseEntity<MemberDTO> updateMemberDetails(@RequestBody MemberDTO memberDTO){
        MemberDTO response = memberService.updateMemberDetails(memberDTO);
        return  ResponseEntity.ok(response);
    }

    @PostMapping("/addBookRequest")
    public ResponseEntity<ResponseDTO> addBookRequest(@RequestBody RequestBookDTO requestBookDTO ){
        ResponseDTO response = addBookService.addBookRequest(requestBookDTO);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<MemberDTO> loginMember(@RequestBody LogInDTO logInDTO){
        MemberDTO member = memberService.loginMember( logInDTO);
        return  ResponseEntity.ok(member);
    }


}
