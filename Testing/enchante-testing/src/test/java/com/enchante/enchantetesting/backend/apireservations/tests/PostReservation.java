package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostReservation {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/postReservation.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationsURL = "http://localhost:8087/api/v1/reservations";

    @Test
    public void postReservationPositive() {
        test = extent.createTest("Post de reserva Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("time", "20:00");
        request.put("date", "2023-09-10");
        request.put("amountDiners", 4);

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(reservationsURL)
                .then()
                .statusCode(201).log().all();

        test.log(Status.PASS, "Validación del código de estado 201 al crear una reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
