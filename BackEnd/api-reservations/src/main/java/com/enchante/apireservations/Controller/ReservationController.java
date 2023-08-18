package com.enchante.apireservations.Controller;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.Model.Reservation;
import com.enchante.apireservations.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = reservationService.createReservation(reservationDTO);
        ReservationDTO createdReservationDTO = new ReservationDTO(reservation.getId(), reservation.getTime(), reservation.getDate(), reservation.getAmountDiners());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReservationDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Integer id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        if (reservation.isPresent()) {
            ReservationDTO reservationDTO = new ReservationDTO(reservation.get().getId(), reservation.get().getTime(), reservation.get().getDate(), reservation.get().getAmountDiners());
            return ResponseEntity.ok(reservationDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("")
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        for (Reservation reservation : reservations) {
            reservationDTOS.add(new ReservationDTO(reservation.getId(), reservation.getTime(), reservation.getDate(), reservation.getAmountDiners()));
        }
        return ResponseEntity.ok(reservationDTOS);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Integer id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().body("La reserva se eliminó exitosamente.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Integer id, @RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = reservationService.updateReservation(id, reservationDTO);
        ReservationDTO updatedReservationDTO = new ReservationDTO(reservation.getId(), reservation.getTime(), reservation.getDate(), reservation.getAmountDiners());
        return ResponseEntity.ok(updatedReservationDTO);
    }
}

