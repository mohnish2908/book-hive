package com.library.project.college.PrivateLibrary.services;

import com.library.project.college.PrivateLibrary.dto.LogInDTO;
import com.library.project.college.PrivateLibrary.dto.MemberDTO;
import com.library.project.college.PrivateLibrary.dto.PasswordDTO;
import com.library.project.college.PrivateLibrary.dto.ResponseDTO;
import com.library.project.college.PrivateLibrary.entities.MemberEntity;
import com.library.project.college.PrivateLibrary.entities.OTPEntity;
import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import com.library.project.college.PrivateLibrary.repository.MemberRepository;
import com.library.project.college.PrivateLibrary.repository.OTPRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private  final OTPRepository otpRepository;
    private  final  EmailService emailService;

    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper, OTPRepository otpRepository, EmailService emailService) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public MemberDTO convertToDTO(MemberEntity member){
        return  modelMapper.map(member,MemberDTO.class);
    }

    public MemberEntity convertToEntity (MemberDTO memberDTO){
        return  modelMapper.map(memberDTO,MemberEntity.class);
    }

    public List<MemberDTO> getAllMembers() {
        List<MemberEntity> allMembers = memberRepository.findAll();
        return  allMembers.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ResponseDTO deActivateMember(String memberId) {
        MemberEntity getMember = memberRepository.findById(memberId).get();
        getMember.setIsActive(false);
        memberRepository.save(getMember);
        return  ResponseDTO.builder()
                .message("Member Deactivated")
                .build();
    }

    public MemberDTO updateMemberDetails(MemberDTO memberDTO) {
        MemberEntity newState = convertToEntity(memberDTO);
        MemberEntity currentState = memberRepository.findById(newState.getMemberId()).get();
        currentState.setName(newState.getName());
        MemberEntity savedDetails = memberRepository.save(currentState);
        return  convertToDTO(savedDetails);
    }

    public ResponseDTO resetPassword(PasswordDTO passwordDTO , String email) {
        MemberEntity member = memberRepository.findByEmail(email).get();

        member.setPassword(passwordDTO.getPassword());
        memberRepository.save(member);

        return  ResponseDTO.builder()
                .message("Password reset successfully")
                .build();
    }


    public ResponseDTO sendOTP(String email) {
        Optional<MemberEntity> member = memberRepository.findByEmail(email);
        if(member.isEmpty())
            throw  new ResourceNotFoundException("member not register with given email");
        String otp= generateOtp();
        OTPEntity savedOTP = OTPEntity.builder()
                .email(email)
                .otp(otp)
                .member(member.get())
                .expiryDate(LocalDateTime.now().plusMinutes(5))
                .build();
        otpRepository.save(savedOTP);
        String subject = "Your OTP for Password Reset";
        String body = String.format(
                 "Dear member,"+

                 "your OTP for Password Reset is " +otp+ " please don not share this otp with anyone."+
                 "thank you");
        emailService.sendMail(email,subject,body);
        return  ResponseDTO.builder()
                .message("OTP sent Successfully")
                .build();
    }

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public ResponseDTO verifyOTP(String email,String otp) {
        Optional<OTPEntity> otpEntityOptional = otpRepository.findById(email);
        if (otpEntityOptional.isEmpty()) {
            throw new ResourceNotFoundException("No OTP found for the given email.");
        }
        OTPEntity otpEntity = otpEntityOptional.get();
        if (otpEntity.getExpiryDate().isBefore(LocalDateTime.now()))
            throw new IllegalArgumentException("OTP has expired. Please request a new one.");
        if (!otpEntity.getOtp().equals(otp))
            throw new IllegalArgumentException("Invalid OTP. Please try again.");

        otpRepository.deleteById(email);
        return ResponseDTO.builder()
                .message("OTP verified successfully. You can now reset your password.")
                .build();
    }

    public MemberDTO loginMember(LogInDTO logInDTO) {
        Optional<MemberEntity> member = memberRepository.findByEmail(logInDTO.getEmail());
        System.out.println("first");
        if(member.isEmpty())
            throw new ResourceNotFoundException("email not registered");
        System.out.println("second");
        if( !member.get().getIsActive())
            throw new ResourceNotFoundException("user deactivate ,please contact to Library");
        System.out.println("third");
        if(logInDTO.getPassword().equals(member.get().getPassword())) {
            MemberDTO memberDTO =  convertToDTO(member.get());
            memberDTO.setPassword(null);
            memberDTO.setAdminId(null);
            memberDTO.setAdminId(null);
            return  memberDTO;
        }
        System.out.println("last");
        throw new ResourceNotFoundException("Incorrect password");
    }
}
