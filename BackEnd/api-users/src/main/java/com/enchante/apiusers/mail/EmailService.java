package com.enchante.apiusers.mail;

public interface EmailService {

    void sendMail(EmailDetails details);

    void forgotPasswordMail(String name, String email, String link);

}