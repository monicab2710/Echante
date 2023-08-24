package com.enchante.apiproducts.Service;

import com.enchante.apiproducts.Model.DTO.CategoryDTO;

import java.util.List;

public interface CategoryService {

    CategoryDTO getCategoryById(Integer id);

    List<CategoryDTO> getAllCategories();

}