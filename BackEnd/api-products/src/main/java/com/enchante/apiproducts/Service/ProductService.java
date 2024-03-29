package com.enchante.apiproducts.Service;

import com.enchante.apiproducts.Model.DTO.ProductDTO;

import java.util.List;

public interface ProductService {

    ProductDTO getProductById(Integer id);

    List<ProductDTO> getAllProducts();

    List<ProductDTO> getProductsByCategory(Integer id);

    ProductDTO createProduct(ProductDTO product);

    ProductDTO updateProduct(Integer id, ProductDTO product);

    void deleteProduct(Integer id);

    ProductDTO randomProduct();

    List<ProductDTO> randomProducts();

}