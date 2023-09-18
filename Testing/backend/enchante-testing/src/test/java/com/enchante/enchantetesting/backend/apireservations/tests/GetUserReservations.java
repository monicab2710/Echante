package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.response.Response;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.get;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetUserReservations {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getUserReservations.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationURL = "http://localhost:8087/api/v1/reservations/my-reservations?email=";

    @Test
    @Tag("Smoke")
    public void getUserReservationsPositive() {
        test = extent.createTest("Get de Reserva por Usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        String reservationEmail = "cfoster@mail.com";
        Response response = get(reservationURL+reservationEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar las reservas de un usuario logueado, que tiene alguna reserva hecha");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsNegative() {
        test = extent.createTest("Get de Reserva Negativo - User has no reservations");
        test.log(Status.INFO, "Inicia el test");

        String reservationEmail = "radams@mail.com";
        Response response = get(reservationURL+reservationEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat()
                .body(Matchers.containsString("User has no reservations"))
                .log().all();

        test.log(Status.PASS, "Validación de la respuesta al solicitar las reservas de un usuario que no tiene ninguna reserva hecha");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
