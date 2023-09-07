package com.enchante.enchantetesting.backend.apiusers.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostUser_ForgotPassword {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiusers/reports/forgotPassword.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String usersURL = "http://localhost:8082/api/v1/users/auth/forgot-password";

    @Test
    @Tag("Regression")
    public void forgotPasswordPositive() {
        test = extent.createTest("Olvido de contraseña - Email registrado");
        test.log(Status.INFO, "Inicia el test");

        String email = "fkelley@mail.com";

        given()
                .header("Content-type","application/json")
                .with()
                .queryParam("email", email)
                .when()
                .post(usersURL)
                .then()
                .assertThat().statusCode(200)
                .and().log().body();

        test.log(Status.PASS, "Validación del código de estado 200 al enviar la solicitud de olvido de contraseña con un email registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void forgotPasswordResponsePositive() {
        test = extent.createTest("Olvido de contraseña - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String email = "fkelley@mail.com";

        given()
                .header("Content-type","application/json")
                .with()
                .queryParam("email", email)
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(Matchers.containsString("We have sent a reset password link to your email. Please check."))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de respuesta al enviar la solicitud de olvido de contraseña con un email registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void forgotPasswordResponseNegative() {
        test = extent.createTest("Olvido de contraseña - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String email = "anasinger@mail.com";

        given()
                .header("Content-type","application/json")
                .with()
                .queryParam("email", email)
                .when()
                .post(usersURL)
                .then()
                .assertThat()
                .body(Matchers.containsString("Error: Email is not registered!"))
                .log().all();

        test.log(Status.PASS, "Validación del mensaje de respuesta al enviar la solicitud de olvido de contraseña con un email no registrado");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
