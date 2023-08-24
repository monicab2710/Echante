package com.enchante.apireservations.Service;

import com.enchante.apireservations.Controller.Payload.ReservationRequest;
import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.Model.Reservation;
import com.enchante.apireservations.Repository.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;
    private static final Integer MAX_TABLES = 20;

    public ReservationServiceImpl(ReservationRepository reservationRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReservationDTO getReservationById(Integer id) {

        Reservation reservation = reservationRepository.findById(id).orElse(null);

        if (reservation != null) {
            return modelMapper.map(reservation, ReservationDTO.class);
        }
        return null;
    }

    @Override
    public List<ReservationDTO> getAllReservations() {

        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> reservationsDTO = new ArrayList<>();

        for (Reservation reservation : reservations) {
            ReservationDTO rDTO = modelMapper.map(reservation, ReservationDTO.class);
            reservationsDTO.add(rDTO);
        }

        return reservationsDTO;
    }

    @Override
    public ReservationDTO createReservation(ReservationRequest reservation, String email) {

        Boolean reservationAvailable = isReservationAvailable(reservation.getDate(), reservation.getTime());
        if (!reservationAvailable) {
            return null;
        }

        Reservation r = modelMapper.map(reservation, Reservation.class);
        r.setStatus("CONFIRMED");
        r.setEmailUser(email);
        reservationRepository.save(r);
        return modelMapper.map(r, ReservationDTO.class);

    }

    @Override
    public ReservationDTO updateReservation(Integer id, ReservationRequest reservation, String email) {

        Reservation found = reservationRepository.findById(id).orElse(null);

        if (found != null) {

            Boolean reservationAvailable = isReservationAvailable(reservation.getDate(), reservation.getTime());

            if (!email.equals(found.getEmailUser()) || (!reservationAvailable)) {
                return null;
            }

            Reservation r = modelMapper.map(reservation, Reservation.class);
            r.setId(id);
            r.setStatus("CONFIRMED");
            r.setEmailUser(email);
            r = reservationRepository.save(r);
            return modelMapper.map(r, ReservationDTO.class);
        }

        return null;

    }

    @Override
    public void deleteReservation(Integer id) {

        reservationRepository.deleteById(id);
    }

    public Boolean isReservationAvailable(String date, String time) {

        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);

        return reservations.size() < MAX_TABLES;
    }

}