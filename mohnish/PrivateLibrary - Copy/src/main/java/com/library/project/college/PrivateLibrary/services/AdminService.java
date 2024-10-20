package com.library.project.college.PrivateLibrary.services;

import com.library.project.college.PrivateLibrary.dto.AdminDTO;
import com.library.project.college.PrivateLibrary.dto.LogInDTO;
import com.library.project.college.PrivateLibrary.entities.AdminEntity;
import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import com.library.project.college.PrivateLibrary.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private  final ModelMapper modelMapper;

    public AdminService(AdminRepository adminRepository, ModelMapper modelMapper) {
        this.adminRepository = adminRepository;
        this.modelMapper = modelMapper;
    }

    public AdminEntity createNewAdmin(AdminEntity admin) {
        return  adminRepository.save(admin);
    }

    public AdminDTO login(LogInDTO logInDTO) {
        String email = logInDTO.getEmail();
        String password = logInDTO.getPassword();
        Optional<AdminEntity> res = adminRepository.findByEmail(email);
        if(res.isEmpty())
            throw  new ResourceNotFoundException("email not registered");
        System.out.println("first");
        AdminEntity admin = res.get();

        if(admin.getPassword().equals(password)){
            AdminDTO resp =  modelMapper.map(admin,AdminDTO.class);
            return resp;
        }
        throw  new ResourceNotFoundException("password is incorrect");
    }
}
