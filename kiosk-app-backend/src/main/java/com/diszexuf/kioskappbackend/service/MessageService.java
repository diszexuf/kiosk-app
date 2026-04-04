package com.diszexuf.kioskappbackend.service;

import org.openapitools.model.MessageRequest;
import org.openapitools.model.MessageResponse;

public interface MessageService {
    MessageResponse createMessage(MessageRequest messageRequest);
    MessageResponse getCurrentMessage();
}
