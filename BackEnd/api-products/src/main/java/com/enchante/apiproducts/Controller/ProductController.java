package com.enchante.apiproducts.Controller;

import com.enchante.apiproducts.Model.DTO.ProductDTO;
import com.enchante.apiproducts.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {

        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id) {

        ProductDTO response = productService.getProductById(id);

        if (response != null) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Integer id) {

        List<ProductDTO> response = productService.getProductsByCategory(id);

        if (response != null) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO p) {

        if ((!isAlpha(p.getName())) || (!isAlpha(p.getDescription())) || (!isValidURL(p.getImageUrl()))) {
            return ResponseEntity.badRequest().build();
        }

        ProductDTO product = productService.createProduct(p);

        if (product != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id, @RequestBody ProductDTO p) {

        if ((!isAlpha(p.getName())) || (!isAlpha(p.getDescription())) || (!isValidURL(p.getImageUrl()))) {
            return ResponseEntity.badRequest().build();
        }

        ProductDTO product = productService.updateProduct(id, p);

        if (product != null) {
            return ResponseEntity.ok().body(product);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {

        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().body("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is not product with that id");
        }
    }

    @GetMapping("/featured")
    public ResponseEntity<ProductDTO> featuredProduct() {

        try {
            return ResponseEntity.ok(productService.randomProduct());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProductDTO>> getRandomProducts() {

        try {
            return ResponseEntity.ok().body(productService.randomProducts());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }

    }

    public Boolean isAlpha(String s) {

        String regexPattern = "^[a-zA-Z]*$";
        return Pattern.compile(regexPattern).matcher(s).matches();
    }

    public Boolean isValidURL(String url) {

        try {
            new URL(url).toURI();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}