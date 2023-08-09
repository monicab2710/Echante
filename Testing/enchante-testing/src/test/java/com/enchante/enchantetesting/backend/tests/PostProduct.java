package com.enchante.enchantetesting.backend.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.enchante.enchantetesting.extentReports.ExtentFactory;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PostProduct {

    static ExtentSparkReporter spark = new ExtentSparkReporter("target/postProduct.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productsURL = "http://localhost:8081/api/v1/products";

    @Test
    public void postProductPositive() {
        test = extent.createTest("Post de productos Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Crème brûlée");
        request.put("description", "Especialidad de la repostería francesa.");
        request.put("imageUrl", "www.image.com");
        request.put("price", 7.89);
        request.put("categoryId", 2);

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
    public void postProductNegative() {
        test = extent.createTest("Post de productos Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Fondue");
        request.put("description", "Especialidad de la gastronomía francesa.");
        request.put("imageUrl", "www.image.com");
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

        test.log(Status.PASS, "Validación del código de estado 400 intentar al crear un producto con una request mal solicitada");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
