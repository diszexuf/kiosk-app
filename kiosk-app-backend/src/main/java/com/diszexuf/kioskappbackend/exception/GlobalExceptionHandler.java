package com.diszexuf.kioskappbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.openapitools.model.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<Void> messageNotFoundExceptionHandler(MessageNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {

        String message = e.getBindingResult().getFieldErrors().stream()
                .map(field -> {
                    String code = field.getCode();
                    if (code == null) return "Ошибка валидации";

                    return switch (code) {
                        case "Pattern" -> "Сообщение не может быть пустым или начинаться с пробела";
                        case "Size" -> "Длина сообщения должна быть от 1 до 2000 символов";
                        case "NotNull" -> "Поле content обязательно";
                        default -> {
                            String defaultMessage = field.getDefaultMessage();
                            yield defaultMessage != null ? defaultMessage : "Ошибка валидации";
                        }
                    };
                })
                .findFirst()
                .orElse("Ошибка валидации");

        ErrorResponse error = new ErrorResponse()
                .status(400)
                .message(message)
                .timestamp(OffsetDateTime.now());
        return ResponseEntity.badRequest().body(error);
    }

}
