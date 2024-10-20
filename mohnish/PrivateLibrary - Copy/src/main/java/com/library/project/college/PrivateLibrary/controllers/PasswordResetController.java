package com.library.project.college.PrivateLibrary.controllers;

import com.library.project.college.PrivateLibrary.dto.PasswordDTO;
import com.library.project.college.PrivateLibrary.dto.ResponseDTO;
import com.library.project.college.PrivateLibrary.services.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reset")
public class PasswordResetController {
    private final MemberService memberService;

    public PasswordResetController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/sendOTP/{email}")
    public ResponseEntity<ResponseDTO> sendOTP(@PathVariable String email){
        ResponseDTO response = memberService.sendOTP(email);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/verifyOTP/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOTP(@PathVariable String email ,@PathVariable String otp){
        ResponseDTO response = memberService.verifyOTP(email,otp);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/password/{email}")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestBody PasswordDTO passwordDTO , @PathVariable String email){
        ResponseDTO response = memberService.resetPassword(passwordDTO ,email);
        return  ResponseEntity.ok(response);
    }
}
