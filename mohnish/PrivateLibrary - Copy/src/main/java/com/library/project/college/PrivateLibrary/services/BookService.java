package com.library.project.college.PrivateLibrary.services;

import com.library.project.college.PrivateLibrary.dto.BookDTO;
import com.library.project.college.PrivateLibrary.entities.BookEntity;
import com.library.project.college.PrivateLibrary.entities.PublisherEntity;
import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import com.library.project.college.PrivateLibrary.repository.BookRepository;
import com.library.project.college.PrivateLibrary.repository.PublisherRepository;
import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private  final int PAGE_SIZE = 6;

    private final PublisherRepository publisherRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    public BookService(PublisherRepository publisherRepository, BookRepository bookRepository, ModelMapper modelMapper) {
        this.publisherRepository = publisherRepository;
        this.bookRepository = bookRepository;
        this.modelMapper = modelMapper;
    }

    public BookEntity convertToEntity(BookDTO bookDTO) {
        return modelMapper.map(bookDTO, BookEntity.class);
    }

    public BookDTO convertToDTO(BookEntity bookEntity) {
        return modelMapper.map(bookEntity, BookDTO.class);
    }

    public BookDTO addNewBook(@Valid BookDTO bookDTO, String publisherId) {
        PublisherEntity publisher = publisherRepository.findById(publisherId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid publisher ID: " + publisherId));

        BookEntity newBook = convertToEntity(bookDTO);
        String title = bookDTO.getTitle().toLowerCase();
        newBook.setTitle(title);
        newBook.setPublisher(publisher);
        newBook.setAvailable(true);
        BookEntity savedBook = bookRepository.save(newBook);
        publisher.getMyBooks().add(newBook);
        return convertToDTO(savedBook);
    }

    public Page<BookDTO> getAllBooks(Integer page) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);
        Page<BookEntity> bookPage = bookRepository.findAllDistinctByIsbn(pageable);
        return bookPage.map(this::convertToDTO);
    }

    public BookDTO updateBook(@Valid BookDTO bookDTO, String id) {
        Optional<BookEntity> exist = bookRepository.findById(id);
        if(exist.isEmpty())
            throw new ResourceNotFoundException("book not found with given id "+ id);

        BookEntity prevState = exist.get();
        BookEntity currentState = convertToEntity(bookDTO);
        prevState.setTitle(currentState.getTitle());
        prevState.setLanguage(currentState.getLanguage());
        BookEntity update = bookRepository.save(prevState);
        return  convertToDTO(update);
    }

    public BookDTO deleteBook(String id) {
        Optional<BookEntity> exist = bookRepository.findById(id);
        if(exist.isEmpty())
            throw new ResourceNotFoundException("book not found with given id "+ id);
        bookRepository.deleteById(id);
        return  convertToDTO(exist.get());
    }

    public BookDTO getBookByName(String name) {
        List<BookEntity> response = bookRepository.findAvailableBooksByTitle(name);
        if(response.isEmpty())
            throw  new ResourceNotFoundException("book not found with Given title: " + name);
        return convertToDTO(response.getFirst());
    }
}
