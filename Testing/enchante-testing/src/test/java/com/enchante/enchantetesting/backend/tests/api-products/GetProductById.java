package com.enchante.enchantetesting.backend.tests;

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
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetProductById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("target/getProductById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productURL = "http://localhost:8081/api/v1/products/";

    @Test
    public void getProductStatusPositive() {
        test = extent.createTest("Get de Producto por Id Positivo - Básico");
        test.log(Status.INFO, "Inicia el test");

        String productId = "2";
        Response response = get(productURL+productId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void GetProductContainsPositive() {
        test = extent.createTest("Get de Producto por Id Positivo - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String productId = "2";
        Response response = get(productURL+productId);

        String body = response.getBody().asString();
        System.out.println("Body: " + body);
        assertTrue(body.contains("Croissant"));

        test.log(Status.PASS, "Validación del contenido del Body por Id de producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void GetProductEqualToPositive() {
        test = extent.createTest("Get de Producto por Id Positivo - Equals");
        test.log(Status.INFO, "Inicia el test");

        String productId = "3";
        Response response = get(productURL+productId);

        response
                .then()
                .assertThat()
                .body("description", equalTo("Delgadas y suaves, con chocolate y mix de frutas, además de una pisca de miel para deleitarlos."))
                .log().all();

        test.log(Status.PASS, "Validación del campo 'description' por Id de producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void getProductStatusNegative() {
        test = extent.createTest("Get de Producto por Id Negativo");
        test.log(Status.INFO, "Inicia el test");

        String productId = "25";
        Response response = get(productURL+productId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .statusCode(404)
                .assertThat().statusLine("HTTP/1.1 404 ")
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
