package com.enchante.apireservations.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

    private Integer id;
    private String time;
    private String date;
    private Integer amountDiners;
    private String message;
    private String status;
    private String emailUser;

}