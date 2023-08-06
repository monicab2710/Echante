package com.enchante.apireservations.Service;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.Model.Reservation;
import com.enchante.apireservations.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private static  final int MAX_TABLES=20;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository= reservationRepository;
    }
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Integer id) {
        return reservationRepository.findById(id);
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }
    public Reservation createReservation(ReservationDTO reservationDTO) {
        //Para saber si hay mesas disponibles.
        if (!isTimeAvailable(reservationDTO.getDate(), reservationDTO.getTime())) {
            throw new RuntimeException("No hay mesas disponibles para este día y hora.");
        }

        Reservation reservation = new Reservation();
        reservation.setTime(reservationDTO.getTime());
        reservation.setDate(reservationDTO.getDate());
        reservation.setAmountDiners(reservationDTO.getAmountDiners());

        return reservationRepository.save(reservation);
    }
    private boolean isTimeAvailable(String date, String time) {
        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);
        return reservations.size() < MAX_TABLES;
    }

}
