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
import static org.hamcrest.Matchers.*;

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


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";
    String reservationsURL = "http://localhost:8087/api/v1/reservations";

    @Test
    @Tag("Regression")
    public void postReservationPositive() {

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

        test = extent.createTest("Post de reserva Positivo - Día y horario correctos");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request2 = new JSONObject();
        request2.put("time", "21:00");
        request2.put("date", "21/09/2023");
        request2.put("amountDiners", 6);
        request2.put("message", "message");

        System.out.println(request2.toJSONString());

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .contentType(ContentType.JSON)
                .body(request2.toJSONString())
                .when()
                .post(reservationsURL)
                .then()
                .statusCode(201).log().all();

        test.log(Status.PASS, "Validación del código de estado 201 al crear una reserva en día y horario correctos");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void postReservationNegative_Hour() {

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

        test = extent.createTest("Post de reserva Negativo - Horario incorrecto");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request2 = new JSONObject();
        request2.put("time", "18:00");
        request2.put("date", "21/09/2023");
        request2.put("amountDiners", 4);
        request2.put("message", "message");

        System.out.println(request2.toJSONString());

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .contentType(ContentType.JSON)
                .body(request2.toJSONString())
                .when()
                .post(reservationsURL)
                .then()
                .statusCode(400).log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al intentar realizar una reserva en horario incorrecto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void postReservationNegative_Day() {

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

        test = extent.createTest("Post de reserva Negativo - Día incorrecto");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request2 = new JSONObject();
        request2.put("time", "22:00");
        request2.put("date", "25/09/2023");
        request2.put("amountDiners", 4);
        request2.put("message", "message");

        System.out.println(request2.toJSONString());

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .contentType(ContentType.JSON)
                .body(request2.toJSONString())
                .when()
                .post(reservationsURL)
                .then()
                .assertThat()
                .body(equalTo("Invalid schedule\n" +
                        "The restaurant opens from Wednesday to Sunday, with reservations from 7:00 p.m. to 11:30 p.m."))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar realizar una reserva en día incorrecto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
