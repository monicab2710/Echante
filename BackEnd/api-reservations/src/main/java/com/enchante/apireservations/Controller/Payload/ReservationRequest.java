package com.enchante.apireservations.Controller.Payload;

import lombok.Data;

@Data
public class ReservationRequest {

    private String time;
    private String date;
    private Integer amountDiners;
    private String message;

}