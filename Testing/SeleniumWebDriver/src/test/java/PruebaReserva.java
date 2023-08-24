import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;

public class PruebaReserva {
    public static void main(String[] args) throws InterruptedException {
        // Establecer la ubicación del controlador de ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Crear una instancia de WebDriver
        WebDriver driver = new ChromeDriver();

        // Abrir la página local
        driver.get("http://localhost:3000/");

        //Busca el botón "Reservar" usando su CssSelector
        WebElement reservarButton = driver.findElement(By.cssSelector("a[href=\"/reservar\"]"));

        // Verifica si el botón "Reservar" se muestra en la página
        if (reservarButton.isDisplayed()) {
            System.out.println("El botón 'Reservar' está presente en la página.");
        } else {
            System.out.println("El botón 'Reservar' no está presente en la página.");
        }

        // Realizar acciones de prueba aquí
        WebElement reservaButton = driver.findElement(By.cssSelector("a[href=\"/reservar\"]"));
        reservaButton.click();

        //Tiempo para que cargue
        Thread.sleep(1000);

        // Ingresar los datos en los campos correspondientes

        // Llenar el formulario de reserva
        WebElement motivoInput = driver.findElement(By.xpath("//input[@placeholder='Cuéntanos el motivo de tu reserva']"));
        motivoInput.sendKeys("Reunión de negocios");

        WebElement fechaInput = driver.findElement(By.xpath("//input[@type='date']"));
        fechaInput.sendKeys("25/08/2023");

        WebElement horaInput = driver.findElement(By.xpath("//input[@type='time']"));
        horaInput.sendKeys("15:00");

        //Tiempo para que cargue
        Thread.sleep(1000);

        //FALLA
        WebElement personasInput = driver.findElement(By.xpath("//input[@placeholder='2']"));
        personasInput.sendKeys("4");

        WebElement mensajeInput = driver.findElement(By.xpath("//textarea[@placeholder='Envíanos un mensaje']"));
        mensajeInput.sendKeys("Necesitamos una mesa en un área tranquila.");

        // Enviar el formulario
        WebElement enviarButton = driver.findElement(By.xpath("//button[normalize-space()='Reservar']"));
        enviarButton.click();

        // Verificar si el formulario se envió exitosamente
        //WebElement mensajeExito = driver.findElement(By.id("mensaje-exito"));
        //Assert.assertTrue(mensajeExito.isDisplayed(), "El mensaje de éxito no se mostró después de enviar la reserva.");

        // Verifica si la alerta "Reserva exitosa" se muestra en la página
        /*if (enviarButton.isDisplayed()) {
            System.out.println("La alerta 'Reserva exitosa' está presente en la página.");
        } else {
            System.out.println("La alerta 'Reserva exitosa' no está presente en la página.");
        }*/

        // Verifica si el botón "Reservar" se muestra en la página
       /* if (enviarButton.isDisplayed()) {
            System.out.println("El botón 'Reservar' está presente en la página.");
        } else {
            System.out.println("El botón 'Reservar' no está presente en la página.");
        }*/

        // Cerrar el navegador
        // driver.quit();
    }
}
