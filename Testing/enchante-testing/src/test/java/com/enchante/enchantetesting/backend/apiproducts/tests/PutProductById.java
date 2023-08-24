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
public class PutProductById {

    static ExtentSparkReporter spark = new ExtentSparkReporter("src/test/java/com/enchante/enchantetesting/backend/apiproducts/reports/putProduct.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeAll
    public void setUp() {
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
    }


    String productsURL = "http://localhost:8081/api/v1/products/";

    @Test
    @Tag("Smoke")
    public void putProductPositive() {
        test = extent.createTest("Put de producto Positivo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Croque monsieur");
        request.put("description", "Especialidad de la gastronomía francesa.");
        request.put("imageUrl", "www.image.com");
        request.put("price", 6.89);
        request.put("categoryId", 2);

        System.out.println(request.toJSONString());

        String productId = "1";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(productsURL+productId)
                .then()
                .statusCode(200).log().all();

        test.log(Status.PASS, "Validación del código de estado 200 al modificar un producto");
        test.log(Status.INFO, "Finaliza el test");
    }

    @Test
    @Tag("Smoke")
    public void putProductNegative() {
        test = extent.createTest("Put de producto Negativo");
        test.log(Status.INFO, "Inicia el test");

        JSONObject request = new JSONObject();
        request.put("name", "Crepes");
        request.put("description", "Especialidad de la gastronomía francesa.");
        request.put("imageUrl", "www.image.com");
        request.put("price", 7.89);
        request.put("categoryId", 2);

        System.out.println(request.toJSONString());

        String productId = "89";
        given()
                .header("Content-type","application/json")
                .contentType(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put(productsURL+productId)
                .then()
                .statusCode(400).log().all();

        test.log(Status.PASS, "Validación del código de estado 400 al intentar modificar un producto con id inexistente");
        test.log(Status.INFO, "Finaliza el test");
    }

    @AfterAll
    public void quit() {
        extent.flush();
    }
}
