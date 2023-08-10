package com.enchante.apiproducts.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Integer id;
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private Integer categoryId;

}