package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.when;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DeleteReservationById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/deleteReservationById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationURL = "http://localhost:8087/api/v1/reservations/";

    @Test
    @Tag("Smoke")
    public void deleteReservationStatusPositive() {
        test = extent.createTest("Delete de reserva Positivo");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "8";

        when().
                delete(reservationURL +reservationId).
                then().
                statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al eliminar una reserva por Id existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
