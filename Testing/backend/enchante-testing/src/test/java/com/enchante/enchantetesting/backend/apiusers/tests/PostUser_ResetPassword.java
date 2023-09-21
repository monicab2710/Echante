package com.enchante.enchantetesting.backend.apiusers.tests;

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
public class PostUser_ResetPassword {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiusers/reports/resetPassword.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/reset-password";

    @Test
    @Tag("Regression")
    public void resetPasswordPositive() {
        test = extent.createTest("Reseteo de contraseña Positivo - Token válido");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("token", "7d2279c5-d052-47ac-a2c7-346acaae45a4");
        request.put("password", "Carina_789&");

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar reseteo de contraseña con un token válido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void resetPasswordPositive_response() {
        test = extent.createTest("Reseteo de contraseña Positivo - Mensaje exitoso");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("token", "6fe9a95e-8aa4-48f7-bf44-3d5d04cf5fba");
        request.put("password", "Carina@789");

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(Matchers.containsString("You have successfully changed your password."))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de respuesta al solicitar reseteo de contraseña con un token válido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void resetPasswordNegative() {
        test = extent.createTest("Reseteo de contraseña Negativo - Invalid Token");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("token", "6fe9a95e-8aa4-48f7-bf44-3d5d04cf5fba");
        request.put("password", "Carina@789&");

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(Matchers.containsString("Invalid Token"))
                .log().all();

        test.log(Status.PASS, "Validación de la respuesta al solicitar reseteo de contraseña con un token vencido/inválido");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}