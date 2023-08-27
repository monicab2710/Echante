import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.util.regex.Pattern;

public class PruebaRegistro {

    public static void main(String[] args) throws InterruptedException {
        // Configuración del WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Navegar a la página de registro
        driver.get("http://localhost:3000/");

        //Busca el botón "Reservar" usando su CssSelector
        WebElement registrarseHomeButton = driver.findElement(By.cssSelector("a[href=\"/signup\"]"));

        // Verifica si el botón "Registrarse" se muestra en la página
        if (registrarseHomeButton.isDisplayed()) {
            System.out.println("El botón 'Registrarse' está presente en la página.");
        } else {
            System.out.println("El botón 'Registrarse' no está presente en la página.");
        }

        // Hace click en el botón "Registrarse"
        WebElement registrarseButton = driver.findElement(By.cssSelector("a[href=\"/signup\"]"));
        registrarseButton.click();

        //Tiempo para que cargue
        Thread.sleep(1000);

        // Ingresar los datos en los campos correspondientes
        WebElement nombreInput = driver.findElement(By.xpath("//*[@id=\"name\"]"));
        nombreInput.sendKeys("Victoria");

        // Verificar que los campos no superen el limite de caracteres
        String nombreInputString = nombreInput.getAttribute("value");
        assert nombreInputString.length() <= 36 : "El campo no debe superar los 36 caracteres";

        WebElement usuarioInput = driver.findElement(By.cssSelector("input[id=\"username\"]"));
        usuarioInput.sendKeys("vickytester");

        // Verificar que los campos no superen el limite de caracteres
        String usuarioInputString = usuarioInput.getAttribute("value");
        assert usuarioInputString.length() <= 36 : "El campo no debe superar los 36 caracteres";

        WebElement apellidoInput = driver.findElement(By.cssSelector("input[id=\"lastname\"]"));
        apellidoInput.sendKeys("stancic");

        // Verificar que los campos no superen el limite de caracteres
        String apellidoInputString = apellidoInput.getAttribute("value");
        assert apellidoInputString.length() <= 36 : "El campo no debe superar los 36 caracteres";

        WebElement emailInput = driver.findElement(By.cssSelector("[type=email]"));
        emailInput.sendKeys("vicky@hotmail.com");

        WebElement contraseñaInput = driver.findElement(By.cssSelector("[type=password]"));
        contraseñaInput.sendKeys("password123");

        WebElement confirmarContraseñaInput = driver.findElement(By.id("confirmpassword"));
        confirmarContraseñaInput.sendKeys("password123");

        WebElement confirmarCheckbox = driver.findElement(By.xpath("//div[@class='box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10']"));
        confirmarCheckbox.click();

        WebElement registrarseButtonConfirmar = driver.findElement(By.cssSelector("button[type=\"submit\"]"));
        registrarseButtonConfirmar.click();

        // Verificar que los campos no estén vacíos utilizando assertions
        assert !nombreInput.getAttribute("value").isEmpty() : "El campo nombre no puede estar vacío";
        assert !apellidoInput.getAttribute("value").isEmpty() : "El campo apellido no puede estar vacío";
        assert !usuarioInput.getAttribute("value").isEmpty() : "El campo usuario no puede estar vacío";
        assert !emailInput.getAttribute("value").isEmpty() : "El campo email no puede estar vacío";
        assert !contraseñaInput.getAttribute("value").isEmpty() : "El campo contraseña no puede estar vacío";
        assert !confirmarContraseñaInput.getAttribute("value").isEmpty() : "El campo verificar contraseña no puede estar vacío";

        //Verificar campo email
        //String emailImputString = emailInput.getAttribute("value");
        //Assert.assertTrue(Pattern.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", emailImputString),
          //      "El campo de correo electrónico no cumple con el formato requerido");
            //    System.out.println("El campo de correo electrónico cumple con el requisito");

        // Cerrar el navegador
       // driver.quit();
    }
}