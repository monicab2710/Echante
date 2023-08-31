package com.enchante.apiusers.mail;

public interface EmailService {

    void sendMail(EmailDetails details);

    void forgotPasswordMail(String email, String link);

}