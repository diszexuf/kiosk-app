package com.diszexuf.kioskappbackend.utility;

import com.diszexuf.kioskappbackend.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.MessageRequest;
import org.openapitools.model.MessageResponse;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Message toEntity(MessageRequest request);

    MessageResponse toResponse(Message message);

}
