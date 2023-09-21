package com.enchante.enchantetesting.backend.apiproducts.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostProduct {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/postProduct.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productsURL = "http://localhost:8081/api/v1/products";

    @Test
    @Tag("Smoke")
    public void postProductPositive() {
        test = extent.createTest("Post de producto Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Crème brûlée");
        request.put("description", "Especialidad de la repostería francesa.");
        request.put("imageUrl", "https://www.sabornamesa.com.br/media/k2/items/cache/fe77b047cf65bbf66915926fa3c00c93_XL.jpg");
        request.put("price", 7.89);
        request.put("categoryId", 3);

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(productsURL)
                .then()
                .statusCode(201).log().all();

        test.log(Status.PASS, "Validación del código de estado 201 al crear un producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void postProductNegative() {
        test = extent.createTest("Post de producto Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Fondue");
        request.put("description", "Especialidad de la gastronomía francesa.");
        request.put("imageUrl", "https://i.blogs.es/3ce8f0/fondue3/1366_2000.jpg");
        request.put("price", 8.89);
        request.put("categoryId", 20);

        System.out.println(request.toJSONString());

        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post(productsURL)
                .then()
                .statusCode(400).log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al intentar crear un producto con una categoría inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}