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
public class GetUserReservations {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getUserReservations.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";
    String reservationURL = "http://localhost:8087/api/v1/reservations/my-reservations?email=";

    @Test
    @Tag("Smoke")
    public void getLoggedInUserReservationsPositive() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "fkelley@mail.com");
        request1.put("password", "fkelley_989");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de Reserva por Usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        String reservationEmail = "fkelley@mail.com";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationEmail)
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar las reservas de un usuario logueado, que tiene alguna reserva hecha");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getNotLoggedInUserReservationsNegative() {

        test = extent.createTest("Get de Reserva por Usuario Negativo");
        test.log(Status.INFO, "Inicia el test");

        String reservationEmail = "fkelley@mail.com";

        given()
                .header("Content-type","application/json")
                //.header("Authorization",token)
                .when()
                .get(reservationURL+reservationEmail)
                .then()
                .assertThat().statusCode(401)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 401 al solicitar las reservas de un usuario no logueado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getUserReservationResponsePositive() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "radams@gmail.com");
        request1.put("password", "radams_789");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de Reserva por Usuario sin reservas - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String reservationEmail = "radams@mail.com";

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(reservationURL+reservationEmail)
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
