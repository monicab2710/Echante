package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PutReservationById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/putReservationById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";
    String reservationsURL = "http://localhost:8087/api/v1/reservations/";

    @Test
    @Tag("Regression")
    public void putReservationPositive() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "cfoster@mail.com");
        request1.put("password", "Cfoster_789&");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Put de reserva Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request2 = new JSONObject();
        request2.put("time", "21:30");
        request2.put("date", "21/09/2023");
        request2.put("amountDiners", 4);
        request2.put("message", "message");

        System.out.println(request2.toJSONString());

        String reservationId = "6";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .contentType(ContentType.JSON)
                .body(request2.toJSONString())
                .when()
                .put(reservationsURL+reservationId)
                .then()
                .statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al modificar una reserva con Id existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}