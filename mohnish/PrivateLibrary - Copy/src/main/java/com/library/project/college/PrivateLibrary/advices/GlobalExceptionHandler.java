package com.library.project.college.PrivateLibrary.advices;

import com.library.project.college.PrivateLibrary.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse<?>> handleResourceNotFound(ResourceNotFoundException e) {
        APIError err = APIError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new APIResponse<>(err));
    }

    @ExceptionHandler(Exception.class)
    public  ResponseEntity<APIResponse<?>> exceptionHandler(Exception e){
        System.out.println(e);
        APIError err = APIError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new APIResponse<>(err));
    }
}
