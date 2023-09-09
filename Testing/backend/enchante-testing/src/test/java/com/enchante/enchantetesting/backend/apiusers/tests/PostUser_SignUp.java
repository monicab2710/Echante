package com.enchante.enchantetesting.backend.apiusers.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostUser_SignUp {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiusers/reports/signUpUser.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/signup";

    @Test
    @Tag("Regression")
    public void signUpPositive() {
        test = extent.createTest("Registro de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Caroline");
        request.put("lastName", "Foster");
        request.put("userName", "cfoster");
        request.put("email", "cfoster@mail.com");
        request.put("password", "Cfoster_789&");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .statusCode(201).log().all();

        test.log(Status.PASS, "Validación del código de estado 201 al registrar un usuario con los campos y tipos de datos adecuados");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signUpEqualToPositive() {
        test = extent.createTest("Registro de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Rose");
        request.put("lastName", "Adams");
        request.put("userName", "radams");
        request.put("email", "radams@mail.com");
        request.put("password", "Radams_789&");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(equalTo("User registered successfully!"))
                .log().all();

        test.log(Status.PASS, "Validación de mensaje exitoso al registrar un usuario");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signUpNegative() {
        test = extent.createTest("Registro de usuario Negativo - Email ya registrado");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Caroline");
        request.put("lastName", "Foster");
        request.put("userName", "cfoster");
        request.put("email", "cfoster@mail.com");
        request.put("password", "Cfoster_789&");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .statusCode(400).log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al intentar registrar un usuario con mail ya existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signUpEqualToNegative() {
        test = extent.createTest("Registro de usuario Negativo - Email ya registrado");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Caroline");
        request.put("lastName", "Foster");
        request.put("userName", "cfoster");
        request.put("email", "cfoster@mail.com");
        request.put("password", "Cfoster_789&");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(equalTo("Error: Email is already in use!"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar registrar un usuario con mail ya existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
