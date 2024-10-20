package com.library.project.college.PrivateLibrary.services;

import com.library.project.college.PrivateLibrary.dto.PublisherDTO;
import com.library.project.college.PrivateLibrary.entities.PublisherEntity;
import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import com.library.project.college.PrivateLibrary.repository.PublisherRepository;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublisherService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PublisherRepository publisherRepository;

    private PublisherDTO convertToDTO(PublisherEntity publisherEntity) {
        return modelMapper.map(publisherEntity, PublisherDTO.class);
    }

    private PublisherEntity convertToEntity(PublisherDTO publisherDTO) {
        return modelMapper.map(publisherDTO, PublisherEntity.class);
    }

    public List<PublisherDTO> getAllPublishers() {
        return publisherRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public PublisherDTO deletePublisherById(String id) {
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if(publisher.isEmpty())
                throw  new ResourceNotFoundException("publisher not found");
        publisherRepository.deleteById(id);
       return  convertToDTO(publisher.get());
    }

    public PublisherDTO addNewPublisher(@Valid PublisherDTO publisherDTO) {
        Optional<PublisherEntity> existingPublisher = publisherRepository.findByEmail(publisherDTO.getEmail());
        if (existingPublisher.isPresent()) {
            throw new ResourceNotFoundException("Publisher already registered with email: " + publisherDTO.getEmail());
        }
        PublisherEntity publisher = convertToEntity(publisherDTO);
        PublisherEntity savedResponse = publisherRepository.save(publisher);
        return convertToDTO(savedResponse);
    }

    public PublisherDTO getPublisherById(String id) {
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if(publisher.isEmpty())
            throw new ResourceNotFoundException("publisher Not Found :" + id);
        return  convertToDTO(publisher.get());
    }

    public PublisherDTO updatePublisher( PublisherDTO publisherDTO, String id) {
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if(publisher.isEmpty())
            throw new ResourceNotFoundException("publisher Not Found :" + id);
        System.out.println("i m here");
        PublisherEntity prevState = publisher.get();
        PublisherEntity currState = convertToEntity(publisherDTO);

        prevState.setName(currState.getName());
        prevState.setEmail(currState.getEmail());

        return  convertToDTO(publisherRepository.save(prevState));
    }
}
