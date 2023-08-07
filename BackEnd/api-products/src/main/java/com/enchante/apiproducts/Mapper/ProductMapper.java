package com.enchante.apiproducts.Mapper;

import com.enchante.apiproducts.Model.DTO.ProductDTO;
import com.enchante.apiproducts.Model.Product;

// Mapper Manual
public class ProductMapper {

    // Convert Product JPA Entity into ProductDTO
    public static ProductDTO mapToProductDto(Product product) {

        ProductDTO productDto = new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getPrice(),
                product.getCategory().getId()
        );
        return productDto;
    }

}
