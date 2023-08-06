package com.enchante.apireservations.Repository;

import com.enchante.apireservations.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository <Reservation,Integer> {


    List<Reservation>findByDate (String date);
    List<Reservation>findByTime (String time);
    List<Reservation>findByDateAndTime (String date, String time);

    //Por si la reserva no es encontrada
    Optional<Reservation> findById (int id);


}
