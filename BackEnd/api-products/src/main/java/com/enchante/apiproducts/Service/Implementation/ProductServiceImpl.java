package com.enchante.apiproducts.Service.Implementation;

import com.enchante.apiproducts.Mapper.ProductMapper;
import com.enchante.apiproducts.Model.Category;
import com.enchante.apiproducts.Model.DTO.ProductDTO;
import com.enchante.apiproducts.Model.Product;
import com.enchante.apiproducts.Repository.CategoryRepository;
import com.enchante.apiproducts.Repository.ProductRepository;
import com.enchante.apiproducts.Service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProductDTO getProductById(Integer id) {

        Product product = productRepository.findById(id).orElse(null);

        if (product != null) {
            //return ProductMapper.mapToProductDto(product);
            return modelMapper.map(product, ProductDTO.class);
        }
        return null;
    }

    @Override
    public List<ProductDTO> getAllProducts() {

        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsDTO = new ArrayList<>();

        for (Product product : products) {
            //ProductDTO pDTO = ProductMapper.mapToProductDto(product);
            ProductDTO pDTO = modelMapper.map(product, ProductDTO.class);
            productsDTO.add(pDTO);
        }

        return productsDTO;
    }

    @Override
    public List<ProductDTO> getProductsByCategory(String category) {

        Optional<Category> c = categoryRepository.findCategoryByTitle(category);

        if (c.isPresent()) {

            List<Product> products = productRepository.findProductsByCategoryTitle(category);
            List<ProductDTO> productsDTO = new ArrayList<>();

            for (Product product : products) {
                //ProductDTO pDTO = ProductMapper.mapToProductDto(product);
                ProductDTO pDTO = modelMapper.map(product, ProductDTO.class);
                productsDTO.add(pDTO);
            }

            return productsDTO;
        }

        return null;
    }

    @Override
    public ProductDTO createProduct(ProductDTO product) {

        if (categoryRepository.existsById(product.getCategoryId())) {
            Category category = categoryRepository.findById(product.getCategoryId()).get();
            Product p = modelMapper.map(product, Product.class);
            p.setCategory(category);
            productRepository.save(p);
            return modelMapper.map(p, ProductDTO.class);
        }
        return null;

    }

    @Override
    public ProductDTO updateProduct(Integer id, ProductDTO product) {

        if (productRepository.existsById(id)) {
            Category category = categoryRepository.findById(product.getCategoryId()).get();
            Product p = modelMapper.map(product, Product.class);
            p.setId(id); // Asegurar que el ID sea el correcto
            p.setCategory(category);

            p = productRepository.save(p);
            return modelMapper.map(p, ProductDTO.class);
        }
        return null;
    }

    @Override
    public void deleteProduct(Integer id) {

        productRepository.deleteById(id);
    }

}