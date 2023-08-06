package com.enchante.apireservations.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

    private String time;
    private String date;
    private int amountDiners;

}
