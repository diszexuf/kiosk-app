package com.diszexuf.kioskappbackend.controller;

import com.diszexuf.kioskappbackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.MessagesApi;
import org.openapitools.model.MessageRequest;
import org.openapitools.model.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class MessageController implements MessagesApi {

    private final MessageService messageService;

    @Override
    public ResponseEntity<MessageResponse> createMessage(MessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(messageService.createMessage(request));
    }

    @Override
    public ResponseEntity<MessageResponse> getCurrentMessage() {
        return ResponseEntity.ok(messageService.getCurrentMessage());
    }
}
