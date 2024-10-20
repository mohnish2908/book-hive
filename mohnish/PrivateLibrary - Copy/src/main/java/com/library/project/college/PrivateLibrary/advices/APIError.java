package com.library.project.college.PrivateLibrary.advices;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.message.Message;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
public class APIError {
    private HttpStatus status;
    private String  message;

}
