package com.enchante.apiproducts.Controller;

import com.enchante.apiproducts.Model.DTO.ProductDTO;
import com.enchante.apiproducts.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        ProductDTO product = productService.createProduct(p);

        if (product != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id, @RequestBody ProductDTO p) {

        ProductDTO product = productService.updateProduct(id, p);

        if (product != null) {
            return ResponseEntity.ok().body(product);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {

        productService.deleteProduct(id);
        return ResponseEntity.ok().body("Product deleted successfully");
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

}