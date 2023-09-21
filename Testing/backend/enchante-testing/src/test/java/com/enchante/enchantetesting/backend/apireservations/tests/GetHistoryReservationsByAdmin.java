package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetHistoryReservationsByAdmin {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getHistoryReservationsByAdmin.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";

    @Test
    @Tag("Smoke")
    public void getReservationsPositive() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "emilycooper@gmail.com");
        request1.put("password", "Emily@02");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de historial de reservas Positivo - 'ROLE_ADMIN'");
        test.log(Status.INFO, "Inicia el test");

        String startDate = "15/09/2023";
        String endDate = "08/10/2023";
        String historyReservationsURL = "http://localhost:8087/api/v1/reservations/history?startDate="+startDate+"&endDate="+endDate;

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(historyReservationsURL)
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar el historial de reservas de los usuarios como usuario administrador");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getReservationsNegative() {

        test = extent.createTest("Get de historial de reservas Negativo - 'ROLE_USER'");
        test.log(Status.INFO, "Inicia el test");

        String startDate = "15/09/2023";
        String endDate = "08/10/2023";
        String historyReservationsURL = "http://localhost:8087/api/v1/reservations/history?startDate="+startDate+"&endDate="+endDate;

        Response response = get(historyReservationsURL);

        response
                .then()
                .assertThat().statusCode(401)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 401 al intentar acceder al historial de reservas sin loguearse como usuario administrador");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getReservationsNegative_invalidDate() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "emilycooper@gmail.com");
        request1.put("password", "Emily@02");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de historial de reservas Negativo - Fecha inválida");
        test.log(Status.INFO, "Inicia el test");

        String startDate = "test";
        String endDate = "08/10/2023";
        String historyReservationsURL = "http://localhost:8087/api/v1/reservations/history?startDate="+startDate+"&endDate="+endDate;

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(historyReservationsURL)
                .then()
                .assertThat().statusCode(400)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al solicitar el historial de reservas con una fecha inválida");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getReservationsNegative_invalidDateFormat() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "emilycooper@gmail.com");
        request1.put("password", "Emily@02");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de historial de reservas Negativo - Formato de fecha inválido");
        test.log(Status.INFO, "Inicia el test");

        String startDate = "09-10-2023";
        String endDate = "08/10/2023";
        String historyReservationsURL = "http://localhost:8087/api/v1/reservations/history?startDate="+startDate+"&endDate="+endDate;

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(historyReservationsURL)
                .then()
                .assertThat().statusCode(400)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al solicitar el historial de reservas con un formato de fecha inválido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void getReservationsNegative_noContent() {

        JSONObject request1 = new JSONObject();
        request1.put("email", "emilycooper@gmail.com");
        request1.put("password", "Emily@02");

        String token =
                given()
                        .header("Content-type", "application/json")
                        .contentType(ContentType.JSON)
                        .body(request1.toJSONString())
                        .when()
                        .post(usersURL)
                        .then().extract().path("token").toString();


        test = extent.createTest("Get de historial de reservas Negativo - No Content");
        test.log(Status.INFO, "Inicia el test");

        String startDate = "08/06/2023";
        String endDate = "08/09/2023";
        String historyReservationsURL = "http://localhost:8087/api/v1/reservations/history?startDate="+startDate+"&endDate="+endDate;

        given()
                .header("Content-type","application/json")
                .header("Authorization",token)
                .when()
                .get(historyReservationsURL)
                .then()
                .assertThat().statusCode(204)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 204 al solicitar el historial de reservas para un período que no posee ninguna reserva");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}