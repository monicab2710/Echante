package com.enchante.apireservations.Repository;

import com.enchante.apireservations.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByDateAndTime(LocalDate date, String time);

    List<Reservation> findByEmailUser(String email);

    Boolean existsReservationByEmailUser(String email);

    List<Reservation> findByDateBetween(LocalDate startDate, LocalDate endDate);

}