package com.diszexuf.kioskappbackend.service;

import com.diszexuf.kioskappbackend.exception.MessageNotFoundException;
import com.diszexuf.kioskappbackend.model.Message;
import com.diszexuf.kioskappbackend.repository.MessageRepository;
import com.diszexuf.kioskappbackend.utility.MessageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.model.MessageRequest;
import org.openapitools.model.MessageResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;

    @Override
    public MessageResponse createMessage(MessageRequest request) {
        Message message = messageMapper.toEntity(request);
        Message saved = messageRepository.save(message);
        log.info("Created new message with id: {}", saved.getId());
        return messageMapper.toResponse(saved);
    }

    @Override
    public MessageResponse getCurrentMessage() {
        return messageRepository.findFirstByOrderByCreatedAtDesc()
                .map(messageMapper::toResponse)
                .orElseThrow(MessageNotFoundException::new);
    }
}
