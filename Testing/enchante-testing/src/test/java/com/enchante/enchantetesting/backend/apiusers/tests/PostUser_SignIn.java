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
import static org.hamcrest.Matchers.equalTo;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostUser_SignIn {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiusers/reports/signInUser.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/signin";

    @Test
    @Tag("Regression")
    public void signInPositive() {
        test = extent.createTest("Login de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("email", "cfoster@mail.com");
        request.put("password", "cfoster_789");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 loguearse con un usuario registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signInEqualToPositive() {
        test = extent.createTest("Login de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("email", "cfoster@mail.com");
        request.put("password", "cfoster_789");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                //.body(equalTo("User signed-in successfully!"))
                .body("message", Matchers.containsString("User signed-in successfully!"))
                .log().all();

        test.log(Status.PASS, "Validación de mensaje exitoso al loguearse con un usuario registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signInHeaderContainsPositive() {
        test = extent.createTest("Login de usuario Positivo - Bearer Token");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("email", "cfoster@mail.com");
        request.put("password", "cfoster_789");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .body("token", Matchers.containsString("Bearer "));
                //.then()
                //.header("Authorization", Matchers.containsString("Bearer "));

        test.log(Status.PASS, "Validación del tipo de token (Bearer) al loguearse con un usuario registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signInNegative_BadCredentials() {
        test = extent.createTest("Login de usuario Negativo - Credenciales inválidas");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("email", "cfoster@mail.com");
        request.put("password", "cfoster_7");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .statusCode(401).log().all();

        test.log(Status.PASS, "Validación del código de estado 401 al intentar loguearse con una password inválida");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void signInEqualToNegative() {
        test = extent.createTest("Login de usuario Negativo - Email no registrado");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("email", "carolinefoster@mail.com");
        request.put("password", "cfoster_789");

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(equalTo("Error: Email is not registered!"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar loguearse con un email no registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
