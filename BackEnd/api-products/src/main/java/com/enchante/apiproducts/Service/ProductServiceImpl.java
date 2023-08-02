package com.enchante.apiproducts.Service;

import com.enchante.apiproducts.Model.Product;
import com.enchante.apiproducts.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product getProductById(Integer id) {

        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {

        return productRepository.findProductsByCategoryTitle(category);
    }

    @Override
    public Product createProduct(Product product) {

        return productRepository.save(product);
    }

    @Override
    public void updateProduct(Product product) {

        if (productRepository.existsById(product.getId())) {
            productRepository.save(product);
        }
    }

    @Override
    public void deleteProduct(Integer id) {

        productRepository.deleteById(id);
    }

}