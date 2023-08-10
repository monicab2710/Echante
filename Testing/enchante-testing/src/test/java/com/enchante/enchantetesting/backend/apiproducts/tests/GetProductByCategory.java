package com.enchante.enchantetesting.backend.apiproducts.tests;

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
public class GetProductByCategory {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/getProductByCategory.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productURL = "http://localhost:8081/api/v1/products/category/";

    @Test
    public void getProductbyCategoryPositive() {
        test = extent.createTest("Get de Producto por Categoría Positivo");
        test.log(Status.INFO, "Inicia el test");

        String category = "desayuno";
        Response response = get(productURL+category);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(200)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al buscar un producto por categoría");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    public void getProductbyCategoryNegative() {
        test = extent.createTest("Get de Producto por Categoría Negativo");
        test.log(Status.INFO, "Inicia el test");

        String category = "merienda";
        Response response = get(productURL+category);

        int statusCode = response.getStatusCode();
        System.out.println("Response status is: " + statusCode);

        response
                .then()
                .assertThat().statusCode(404)
                .and().log().all();

        test.log(Status.PASS, "Validación del código de estado 404 al buscar un producto por categoría inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
