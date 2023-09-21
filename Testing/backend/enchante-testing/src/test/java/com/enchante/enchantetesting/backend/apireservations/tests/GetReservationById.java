package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.given;

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


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";
    String reservationURL = "http://localhost:8087/api/v1/reservations/";

    @Test
    @Tag("Smoke")
    public void getReservationByIdPositive() {

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


        test = extent.createTest("Get de Reserva por Id Positivo");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "6";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationId)
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar una reserva con Id existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getReservationByIdPositive_dateContains() {

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


        test = extent.createTest("Get de Reserva por Id Positivo - Date contains");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "6";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationId)
                .then()
                .assertThat()
                .body("date", Matchers.containsString("21/09/2023"))
                .log().all();

        test.log(Status.PASS, "Validación del contenido del Body por Id de una reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getReservationByIdPositive_timeIsEqualTo() {

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


        test = extent.createTest("Get de Reserva por Id Positivo - Time is equal to");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "3";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationId)
                .then()
                .assertThat()
                .body("time", Matchers.equalTo("22:00"))
                .log().all();

        test.log(Status.PASS, "Validación del campo 'time' por Id de reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getReservationByIdNegative() {

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


        test = extent.createTest("Get de Reserva por Id Negativo");
        test.log(Status.INFO, "Inicia el test");

        String reservationId = "80";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationId)
                .then()
                .assertThat().statusCode(404)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 404 al solicitar una reserva con Id inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}