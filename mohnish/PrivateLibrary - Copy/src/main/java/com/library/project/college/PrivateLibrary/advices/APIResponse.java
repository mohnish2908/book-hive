package com.library.project.college.PrivateLibrary.advices;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class APIResponse<T> {
    @JsonFormat(pattern = "hh-mm-ss dd-MM-yy")
    private LocalDateTime timeStamp;
    private T data;
    private APIError error;

    public APIResponse() {
        this.timeStamp = LocalDateTime.now();
    }

    public APIResponse(T data) {
        this();
        this.data = data;
    }

    public APIResponse(APIError err) {
        this();
        this.error = err;
    }
}
