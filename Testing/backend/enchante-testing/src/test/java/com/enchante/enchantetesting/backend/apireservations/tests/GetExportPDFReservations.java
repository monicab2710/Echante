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
public class GetExportPDFReservations {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getExportPDFReservations.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationsURL = "http://localhost:8087/api/v1/reservations/my-reservations/export?email=";

    @Test
    @Tag("Smoke")
    public void getUserReservationsPositive() {
        test = extent.createTest("Get Export de Reservas por Usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "tacosta98@gmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar el export de las reservas de un usuario que ya ha realizado alguna reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsPositive_headerContentType() {
        test = extent.createTest("Get Export de Reservas por Usuario Positivo - Header Content-Type");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "tacosta98@gmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat()
                .contentType(Matchers.containsString("application/pdf"));

        test.log(Status.PASS, "Validación del Content-Type 'application/pdf' al solicitar el export de las reservas de un usuario que ya ha realizado alguna reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsNegative() {
        test = extent.createTest("Get Export de Reservas por Usuario Negativo - Not Found");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "prueba@gmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(404)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 404 al solicitar el export de las reservas de un usuario que todavía no ha realizado ninguna reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsNegative_messageContains() {
        test = extent.createTest("Get Export de Reservas por Usuario Negativo - No reservations");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "prueba@gmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat()
                .body(Matchers.containsString("User has no reservations"))
                .and().log().all();


        test.log(Status.PASS, "Validación del mensaje de error al solicitar el export de las reservas de un usuario que todavía no ha realizado ninguna reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsNegative_invalidEmail() {
        test = extent.createTest("Get Export de Reservas por Usuario Negativo - Invalid email");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "pruebagmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(400)
                .and().log().all();


        test.log(Status.PASS, "Validación del código de estado 400 al solicitar el export de las reservas de un usuario con un formato de mail inválido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationsNegative_invalidEmailMessageContains() {
        test = extent.createTest("Get Export de Reservas por Usuario Negativo - Invalid email");
        test.log(Status.INFO, "Inicia el test");

        String reservationsEmail = "pruebagmail.com";
        Response response = get(reservationsURL+reservationsEmail);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat()
                .body(Matchers.containsString("Invalid email"))
                .and().log().all();


        test.log(Status.PASS, "Validación del mensaje de error al solicitar el export de las reservas de un usuario con un formato de mail inválido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}