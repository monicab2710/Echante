package com.enchante.apireservations.Service;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.Model.Reservation;
import com.enchante.apireservations.Repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private static final Integer MAX_TABLES = 20;
    private static final LocalTime OPENING_TIME = LocalTime.of(19, 0);
    private static final LocalTime CLOSING_TIME = LocalTime.of(23, 30);

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
        if (!isTimeAvailable(reservationDTO.getDate(), reservationDTO.getTime())) {
            throw new RuntimeException("No hay mesas disponibles para este día y hora.");
        }

        validateReservationTime(reservationDTO.getTime());

        Reservation reservation = new Reservation();
        reservation.setTime(reservationDTO.getTime());
        reservation.setDate(reservationDTO.getDate());
        reservation.setAmountDiners(reservationDTO.getAmountDiners());
        // Estado Confirmed
        reservation.setStatus("CONFIRMED");
        reservation.setMessage(reservationDTO.getMessage());
        reservation.setEmailUser(reservationDTO.getEmailUser());

        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Integer id, ReservationDTO reservationDTO) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        Reservation reservation = reservationOptional.orElseThrow(() -> new RuntimeException("No se encontró la reserva"));

        reservation.setId(id);
        reservation.setTime(reservationDTO.getTime());
        validateReservationDate(reservationDTO.getDate());
        validateReservationTime(reservationDTO.getTime());

        reservation.setDate(reservationDTO.getDate());
        reservation.setAmountDiners(reservationDTO.getAmountDiners());
        reservation.setMessage(reservationDTO.getMessage());
        reservation.setEmailUser(reservationDTO.getEmailUser());

        return reservationRepository.save(reservation);
    }

    private boolean isTimeAvailable(String date, String time) {
        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);

        if (reservations.size() >= MAX_TABLES) {
            return false;
        }

        try {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate parsedDate = LocalDate.parse(date, dateFormatter);

            if (parsedDate.getDayOfWeek() == DayOfWeek.MONDAY || parsedDate.getDayOfWeek() == DayOfWeek.TUESDAY) {
                return false;
            }

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime parsedTime = LocalTime.parse(time, timeFormatter);

            Integer yearLimit = Year.now().getValue();
            if (parsedDate.getYear() > yearLimit || (parsedDate.getMonthValue() == 2 && parsedDate.getDayOfMonth() > 28)) {
                return false;
            }

            if (parsedTime.isBefore(OPENING_TIME) || parsedTime.isAfter(CLOSING_TIME)) {
                return false;
            }
        } catch (DateTimeParseException e) {
            return false;
        }

        return true;
    }

    private void validateReservationDate(String date) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate parsedDate = LocalDate.parse(date, dateFormatter);

        if (parsedDate.getDayOfWeek() == DayOfWeek.MONDAY || parsedDate.getDayOfWeek() == DayOfWeek.TUESDAY) {
            throw new RuntimeException("El restaurante no abre los lunes y martes.");
        }

        Integer yearLimit = Year.now().getValue();
        if (parsedDate.getYear() > yearLimit || (parsedDate.getMonthValue() == 2 && parsedDate.getDayOfMonth() > 28)) {
            throw new RuntimeException("Fecha no válida.");
        }
    }

    private void validateReservationTime(String time) {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime parsedTime = LocalTime.parse(time, timeFormatter);

        if (parsedTime.isBefore(OPENING_TIME) || parsedTime.isAfter(CLOSING_TIME)) {
            throw new RuntimeException("Horario no válido. El restaurante abre de " +
                    OPENING_TIME + " a " + CLOSING_TIME + ".");
        }
    }
}