package com.enchante.enchantetesting.backend.apireservations.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static io.restassured.RestAssured.get;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetAllReservations {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apireservations/reports/getAllReservations.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String reservationsURL = "http://localhost:8087/api/v1/reservations";
    Response response = get(reservationsURL);

    @Test
    public void getReservations() {
        test = extent.createTest("Get de reservas Positivo");
        test.log(Status.INFO, "Inicia el test");

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
