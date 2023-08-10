package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetReservationById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getReservationById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationURL = "http://localhost:8087/api/v1/reservations/";

    @Test
    public void getReservationStatusPositive() {
        test = extent.createTest("Get de Reserva por Id Positivo - Básico");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "1";
        Response response = get(reservationURL+reservationId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void getReservationContainsPositive() {
        test = extent.createTest("Get de Reserva por Id Positivo - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "1";
        Response response = get(reservationURL+reservationId);

        String body = response.getBody().asString();
        System.out.println("Body: " + body);
        assertTrue(body.contains("2023-08-10"));

        test.log(Status.PASS, "Validación del contenido del Body por Id de una reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void getReservationEqualToPositive() {
        test = extent.createTest("Get de Reserva por Id Positivo - Equals");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "1";
        Response response = get(reservationURL+reservationId);

        response
                .then()
                .assertThat()
                .body("time", equalTo("18:00"))
                .log().all();

        test.log(Status.PASS, "Validación del campo 'time' por Id de reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void getProductStatusNegative() {
        test = extent.createTest("Get de Reserva por Id Negativo");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "15";
        Response response = get(reservationURL+reservationId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .statusCode(404)
                .assertThat().statusLine("HTTP/1.1 404 ")
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 404");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
