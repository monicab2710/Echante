package com.enchante.apireservations.Service;

import com.enchante.apireservations.Controller.Payload.ReservationRequest;
import com.enchante.apireservations.Model.DTO.ReservationDTO;

import java.util.List;

public interface ReservationService {

    ReservationDTO getReservationById(Integer id);

    List<ReservationDTO> getAllReservations();

    ReservationDTO createReservation(ReservationRequest reservation, String email);

    ReservationDTO updateReservation(Integer id, ReservationRequest reservation, String email);

    void deleteReservation(Integer id);

    List<ReservationDTO> getReservationsByUserEmail(String emailUser);

}