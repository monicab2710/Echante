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
public class GetCategoryById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/getCategoryById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String categoryURL = "http://localhost:8081/api/v1/categories/";

    @Test
    @Tag("Smoke")
    public void getCategoryStatusPositive() {
        test = extent.createTest("Get de Categoría por Id Positivo - Básico");
        test.log(Status.INFO, "Inicia el test");

        String categoryId = "1";
        Response response = get(categoryURL+categoryId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al solicitar una categoría con Id existente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getCategoryContainsPositive() {
        test = extent.createTest("Get de Categoría por Id Positivo - Contiene");
        test.log(Status.INFO, "Inicia el test");

        String categoryId = "2";
        Response response = get(categoryURL+categoryId);

        String body = response.getBody().asString();
        System.out.println("Body: " + body);
        assertTrue(body.contains("Plato Principal"));

        test.log(Status.PASS, "Validación del contenido del body por Id de una categoría");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getCategoryEqualToPositive() {
        test = extent.createTest("Get de Categoría por Id Positivo - Equals");
        test.log(Status.INFO, "Inicia el test");

        String categoryId = "2";
        Response response = get(categoryURL+categoryId);

        response
                .then()
                .assertThat()
                .body("description", equalTo("Nuestros platillos principales son un viaje a través de los sabores auténticos de Francia. Cada plato es una obra maestra cuidadosamente elaborada para cautivar tus sentidos."))
                .log().all();

        test.log(Status.PASS, "Validación del campo 'description' por Id de una categoría");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Regression")
    public void getCategoryStatusNegative() {
        test = extent.createTest("Get de Categoría por Id Negativo");
        test.log(Status.INFO, "Inicia el test");

        String categoryId = "18";
        Response response = get(categoryURL+categoryId);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .statusCode(404)
                .assertThat().statusLine("HTTP/1.1 404 ")
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 404 al solicitar una categoría inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
