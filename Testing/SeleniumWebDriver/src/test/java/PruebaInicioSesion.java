import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;

public class PruebaInicioSesion {
    public static void main(String[] args) throws InterruptedException {
        // Establecer la ubicación del controlador de ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Crear una instancia de WebDriver
        WebDriver driver = new ChromeDriver();

        // Abrir la página local
        driver.get("http://localhost:3000/");

        //Busca el botón "Ingresar" usando su CssSelector
        WebElement ingresarButton = driver.findElement(By.cssSelector("a[href=\"/signin\"]"));

        // Verifica si el botón "Ingresar" se muestra en la página
        if (ingresarButton.isDisplayed()) {
            System.out.println("El botón 'Ingresar' está presente en la página.");
        } else {
            System.out.println("El botón 'Ingresar' no está presente en la página.");
        }

        // Realizar acciones de prueba aquí
        WebElement ingresoButton = driver.findElement(By.cssSelector("a[href=\"/signin\"]"));
        ingresoButton.click();

        //Tiempo para que cargue
        Thread.sleep(1000);

        // Ingresar los datos en los campos correspondientes

        WebElement emailInput = driver.findElement(By.xpath("//input[@placeholder='Ingresa tu Email']"));
        emailInput.sendKeys("vicky@hotmail.com");

        // Verificar que los campos no superen el limite de caracteres
        String emailInputString = emailInput.getAttribute("value");
        assert emailInputString.length() <= 36 : "El campo no debe superar los 36 caracteres";

        WebElement contraseñaInput = driver.findElement(By.cssSelector("[type=password]"));
        contraseñaInput.sendKeys("password123");

        //Mantener Sesión
        WebElement confirmarCheckbox = driver.findElement(By.xpath("//div[@class='box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10']"));
        confirmarCheckbox.click();

        Thread.sleep(1000);

        WebElement iniciarSesionButtonConfirmar = driver.findElement(By.xpath("//div[@class='box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10']"));
        iniciarSesionButtonConfirmar.click();

        // Verificar que los campos no estén vacíos utilizando assertions
        Assert.assertFalse(emailInput.getAttribute("value").isEmpty(), "El campo email está vacío");
        Assert.assertFalse(contraseñaInput.getAttribute("value").isEmpty(), "El campo contraseña está vacío");

        // Cerrar el navegador
        driver.quit();
    }
}
