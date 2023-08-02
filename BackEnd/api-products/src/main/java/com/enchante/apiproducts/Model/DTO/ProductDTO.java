package com.enchante.apiproducts.Model.DTO;

import com.enchante.apiproducts.Model.Category;
import lombok.Data;

@Data
public class ProductDTO {

    private Integer id;
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private CategoryDTO category;

}