package com.enchante.apiproducts.Service;

import com.enchante.apiproducts.Model.Product;

import java.util.List;

public interface ProductService {

    Product getProductById(Integer id);

    List<Product> getAllProducts();

    List<Product> getProductsByCategory(String category);

    Product createProduct(Product product);

    void updateProduct(Product product);

    void deleteProduct(Integer id);

}