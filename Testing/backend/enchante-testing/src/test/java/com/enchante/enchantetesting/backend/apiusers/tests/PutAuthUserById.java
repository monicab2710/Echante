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
public class PutAuthUserById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiusers/reports/putUser.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/update/";

    @Test
    @Tag("Smoke")
    public void putUserPositive() {
        test = extent.createTest("Put de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Emma");
        request.put("lastName", "Colleman");
        request.put("userName", "ecolleman");
        request.put("email", "ecolleman@mail.com");

        System.out.println(request.toJSONString());

        String userId = "8";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al modificar un usuario");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putUserContainsPositive() {
        test = extent.createTest("Put de usuario Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Emma");
        request.put("lastName", "Colleman");
        request.put("userName", "emmacolleman");
        request.put("email", "emmacolleman@mail.com");

        System.out.println(request.toJSONString());

        String userId = "8";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .assertThat()
                .body(equalTo("You have successfully changed your profile."))
                .log().all();

        test.log(Status.PASS, "Validación de mensaje exitoso al modificar un usuario");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putUserIdNegative() {
        test = extent.createTest("Put de usuario Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Emma");
        request.put("lastName", "Colleman");
        request.put("userName", "emmacolleman");
        request.put("email", "emmacolleman@mail.com");

        System.out.println(request.toJSONString());

        String userId = "10";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .assertThat()
                .body(equalTo("Invalid ID. User Not Found"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar modificar un usuario con id inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putUserEmailNegative() {
        test = extent.createTest("Put de usuario Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Fernanda");
        request.put("lastName", "Kelley");
        request.put("userName", "ferkelley");
        request.put("email", "fkelley@gmail.com");

        System.out.println(request.toJSONString());

        String userId = "8";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .assertThat()
                .body(equalTo("Error: Email is already in use!"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar modificar el email de un usuario por uno ya registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putUserInvalidEmailNegative() {
        test = extent.createTest("Put de usuario Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Emma");
        request.put("lastName", "Colleman");
        request.put("userName", "emmacolleman");
        request.put("email", "emmacolleman");

        System.out.println(request.toJSONString());

        String userId = "8";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .assertThat()
                .body(equalTo("Invalid email"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar modificar un usuario con un mail que no cumple con el formato adecuado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putUserInvalidNameNegative() {
        test = extent.createTest("Put de usuario Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "2");
        request.put("lastName", "Colleman");
        request.put("userName", "emmacolleman");
        request.put("email", "emmacolleman@gmail.com");

        System.out.println(request.toJSONString());

        String userId = "8";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(usersURL+userId)
                .then()
                .assertThat()
                .body(equalTo("Invalid name and/or last name"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de error al intentar modificar un usuario con un nombre que no cumple con el formato adecuado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
