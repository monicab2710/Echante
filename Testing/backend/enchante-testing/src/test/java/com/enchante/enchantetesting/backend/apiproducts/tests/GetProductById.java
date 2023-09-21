package com.enchante.enchantetesting.backend.apiproducts.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GetProductById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/getProductById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productURL = "http://localhost:8081/api/v1/products/";

    @Test
    @Tag("Smoke")
    public void getProductByIdPositive() {
        test = extent.createTest("Get de Producto por Id Positivo");
        test.log(Status.INFO, "Inicia el test");

        String productId = "2";
        Response response = get(productURL+productId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar un producto con id existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getProductByIdPositive_bodyContains() {
        test = extent.createTest("Get de Producto por Id Positivo - Body contains");
        test.log(Status.INFO, "Inicia el test");

        String productId = "13";
        Response response = get(productURL+productId);

        String body = response.getBody().asString();
        System.out.println("Body: " + body);
        assertTrue(body.contains("Crème Brûlée"));

        test.log(Status.PASS, "Validación del contenido del Body por Id de un producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getProductByIdPositive_descriptionIsEqualTo() {
        test = extent.createTest("Get de Producto por Id Positivo - Description is equal to");
        test.log(Status.INFO, "Inicia el test");

        String productId = "13";
        Response response = get(productURL+productId);

        response
                .then()
                .assertThat()
                .body("description", equalTo("Crème brûlée con un toque de extracto de vainilla y caramelo dorado."))
                .log().all();

        test.log(Status.PASS, "Validación del campo 'description' por Id de un producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getProductByIdNegative() {
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

        test.log(Status.PASS, "Validación del código de estado 404 al solicitar un producto con Id inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}