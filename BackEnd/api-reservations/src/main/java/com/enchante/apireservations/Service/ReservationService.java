package com.enchante.apireservations.Service;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.Model.Reservation;
import com.enchante.apireservations.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private static final Integer MAX_TABLES = 20;


    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
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
        // Check if there are available tables
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

        if (reservations.size() >= MAX_TABLES) {
            return false;
        }

        try {
            //Verificar con front como van a manejar este formato.
            //LocalDate esta en (año, mes y día)
            LocalDate.parse(date);
            //LocalTime esta en (hora, minuto, segundo)
            LocalTime.parse(time);
        } catch (DateTimeParseException e) {
            return false;
        }

        return true;
    }

    public Reservation updateReservation(Integer id, ReservationDTO reservationDTO) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isEmpty()) {
            throw new RuntimeException("No se encontró la reserva");
        }

        Reservation reservation = reservationOptional.get();
        reservation.setTime(reservationDTO.getTime());
        reservation.setDate(reservationDTO.getDate());
        reservation.setAmountDiners(reservationDTO.getAmountDiners());

        return reservationRepository.save(reservation);
    }

}
