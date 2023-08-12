package com.enchante.enchantetesting.backend.apiproducts.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static io.restassured.RestAssured.when;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DeleteProductById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/deleteProductById.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productURL = "http://localhost:8081/api/v1/products/";

    @Test
    public void deleteProductStatusPositive() {
        test = extent.createTest("Delete de productos Positivo");
        test.log(Status.INFO, "Inicia el test");

        String productId = "9";

        when().
                delete(productURL+productId).
                then().
                statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al eliminar un producto por Id");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
