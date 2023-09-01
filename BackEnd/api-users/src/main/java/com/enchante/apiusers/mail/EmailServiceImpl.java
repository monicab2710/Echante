package com.enchante.apiusers.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String sender;
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    @Override
    public void sendMail(EmailDetails details) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());

            Context context = new Context();
            context.setVariable("name", details.getName());
            context.setVariable("lastName", details.getLastName());

            String htmlContent = templateEngine.process("index", context);
            mimeMessageHelper.setText(htmlContent, true);

            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);

            logger.info("Mail Sent Successfully...");

        } catch (MessagingException e) {

            logger.error("Error while Sending Mail");
        }
    }

    @Async
    @Override
    public void forgotPasswordMail(String email, String link) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(email);

            Context ctx = new Context();
            ctx.setVariable("link", link);

            String htmlContent = templateEngine.process("password-email", ctx);

            mimeMessageHelper.setText(htmlContent, true);
            mimeMessageHelper.setSubject("Here's the link to reset your password");

            javaMailSender.send(mimeMessage);

            logger.info("Mail Sent Successfully...");

        } catch (MessagingException e) {

            logger.error("Error while Sending Mail");
        }

    }

}