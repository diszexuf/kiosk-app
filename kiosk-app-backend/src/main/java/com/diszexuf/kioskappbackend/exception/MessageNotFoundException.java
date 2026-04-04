package com.diszexuf.kioskappbackend.exception;

public class MessageNotFoundException extends RuntimeException {
    public MessageNotFoundException() {
        super("Message not found");
    }
}
