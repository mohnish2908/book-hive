package com.library.project.college.PrivateLibrary.controllers;

import com.library.project.college.PrivateLibrary.dto.MemberRegistrationDTO;
import com.library.project.college.PrivateLibrary.services.MemberRegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/newMember")
public class MemberRegistrationController {

    private final MemberRegistrationService memberRegistrationService;

    public MemberRegistrationController(MemberRegistrationService memberRegistrationService) {
        this.memberRegistrationService = memberRegistrationService;
    }
    @PostMapping("/create")
    public ResponseEntity<MemberRegistrationDTO> createNewMember( @Valid @RequestBody  MemberRegistrationDTO memberRegistrationDTO){
        System.out.println( "controller");
       MemberRegistrationDTO response = memberRegistrationService.createNewMember(memberRegistrationDTO);
        System.out.println( "controller2");
       return ResponseEntity.ok(response);
    }




}
