package com.enchante.apiproducts.Service.Implementation;

import com.enchante.apiproducts.Model.Category;
import com.enchante.apiproducts.Model.DTO.CategoryDTO;
import com.enchante.apiproducts.Repository.CategoryRepository;
import com.enchante.apiproducts.Service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryDTO getCategoryById(Integer id) {

        Category category = categoryRepository.findById(id).orElse(null);

        if (category != null) {
            return modelMapper.map(category, CategoryDTO.class);
        }
        return null;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {

        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();

        for (Category category : categories) {
            CategoryDTO cDTO = modelMapper.map(category, CategoryDTO.class);
            categoriesDTO.add(cDTO);
        }

        return categoriesDTO;
    }

}