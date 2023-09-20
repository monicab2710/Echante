package com.enchante.apireservations.Controller;

import com.enchante.apireservations.Controller.Payload.ReservationRequest;
import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.enchante.apireservations.PDF.PDFGenerator;
import com.enchante.apireservations.Security.AppUser;
import com.enchante.apireservations.Service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private static final LocalTime OPENING_TIME = LocalTime.of(19, 0);
    private static final LocalTime CLOSING_TIME = LocalTime.of(23, 30);

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("")
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {

        return ResponseEntity.ok().body(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Integer id) {

        ReservationDTO response = reservationService.getReservationById(id);

        if (response != null) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequest r) {

        Boolean dateAndTimeValid = isDateAndTimeValid(r.getDate(), r.getTime());
        if (!dateAndTimeValid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date and/or time");
        }

        Boolean openRestaurant = isRestaurantOpen(r.getDate(), r.getTime());
        if (!openRestaurant) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid schedule\n" +
                    "The restaurant opens from Wednesday to Sunday, with reservations from 7:00 p.m. to 11:30 p.m.");
        }

        if (r.getAmountDiners() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The number of people must be greater than 0");
        }

        if (!isMessageValid(r.getMessage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The message cannot contain more than 255 characters");
        }

        AppUser userDetails = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ReservationDTO reservation = reservationService.createReservation(r, userDetails.getEmail());

        if (reservation != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no reservations available for this date and time");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable Integer id, @RequestBody ReservationRequest r) {

        Boolean dateAndTimeValid = isDateAndTimeValid(r.getDate(), r.getTime());
        if (!dateAndTimeValid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date and/or time");
        }

        Boolean openRestaurant = isRestaurantOpen(r.getDate(), r.getTime());
        if (!openRestaurant) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid schedule\n" +
                    "The restaurant opens from Wednesday to Sunday, with reservations from 7:00 p.m. to 11:30 p.m.");
        }

        if (r.getAmountDiners() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The number of people must be greater than 0");
        }

        if (!isMessageValid(r.getMessage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The message cannot contain more than 255 characters");
        }

        AppUser userDetails = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ReservationDTO reservation = reservationService.updateReservation(id, r, userDetails.getEmail());

        if (reservation != null) {
            return ResponseEntity.ok().body(reservation);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Integer id) {

        ReservationDTO reservation = reservationService.getReservationById(id);

        if (reservation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation with ID " + id + " not found");
        }

        reservationService.deleteReservation(id);
        return ResponseEntity.ok().body("Reservation deleted successfully");

    }

    @GetMapping("/my-reservations")
    public ResponseEntity<?> getUserReservations(@RequestParam String email) {

        if (!validEmail(email)) {
            return ResponseEntity.badRequest().body("Invalid email");
        }

        List<ReservationDTO> userReservations = reservationService.getReservationsByUserEmail(email);

        if (userReservations == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User has no reservations");
        }

        return ResponseEntity.ok().body(userReservations);
    }

    @GetMapping("/my-reservations/export")
    public ResponseEntity<?> exportPDF(HttpServletResponse response, @RequestParam String email) {

        if (!validEmail(email)) {
            return ResponseEntity.badRequest().body("Invalid email");
        }

        List<ReservationDTO> userReservations = reservationService.getReservationsByUserEmail(email);

        if (userReservations == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User has no reservations");
        }

        try {

            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=reservations_" + email + ".pdf";
            //String headerValue = "inline; filename=reservations_" + email + ".pdf";
            response.setHeader(headerKey, headerValue);

            PDFGenerator generator = new PDFGenerator();
            generator.setUserReservations(userReservations);
            generator.generate(response);

            return ResponseEntity.ok().build();

        } catch (Exception e) {

            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservationDTO>> getReservationHistory(@RequestParam(defaultValue = "01/01/2022") String startDate, @RequestParam(defaultValue = "31/12/2024") String endDate) {

        Boolean startDateValid = isDateValid(startDate);
        Boolean endDateValid = isDateValid(endDate);
        if (!startDateValid || !endDateValid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate fromDate = LocalDate.parse(startDate, formatter);
        LocalDate toDate = LocalDate.parse(endDate, formatter);

        List<ReservationDTO> history = reservationService.getReservationHistory(fromDate, toDate);

        if (history.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(history);
        }
    }

    public Boolean stringArrayToIntegerValid(String[] array) {

        for (String s : array) {
            try {
                Integer.valueOf(s);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        return true;
    }

    public Boolean isDateAndTimeValid(String date, String time) {

        String[] dateArray = date.split("/");
        String[] timeArray = time.split(":");

        if ((dateArray.length != 3) || (timeArray.length != 2)) {
            return false;
        }

        Boolean validDateNumbers = stringArrayToIntegerValid(dateArray);
        Boolean validTimeNumbers = stringArrayToIntegerValid(timeArray);

        if (!validDateNumbers || !validTimeNumbers) {
            return false;
        }

        String validDateFormat = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        try {
            LocalDate.parse(validDateFormat);
            LocalTime.parse(time);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }

    }

    public Boolean isRestaurantOpen(String date, String time) {

        LocalDate checkDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        LocalTime checkTime = LocalTime.parse(time);

        if ((checkDate.getDayOfWeek() == DayOfWeek.MONDAY) || (checkDate.getDayOfWeek() == DayOfWeek.TUESDAY) || (checkTime.isBefore(OPENING_TIME)) || (checkTime.isAfter(CLOSING_TIME))) {
            return false;
        }
        return true;
    }

    public Boolean validEmail(String email) {

        String regexPatter = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

        return Pattern.compile(regexPatter).matcher(email).matches();
    }

    public Boolean isDateValid(String date) {

        String[] dateArray = date.split("/");

        if (dateArray.length != 3) {
            return false;
        }

        Boolean validDateNumbers = stringArrayToIntegerValid(dateArray);

        if (!validDateNumbers) {
            return false;
        }

        String validDateFormat = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        try {
            LocalDate.parse(validDateFormat);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }

    }

    public Boolean isMessageValid(String message) {

        return message.length() <= 255;
    }

}